#!/usr/bin/env node
// servicestudio-open-mcp — minimal MCP (stdio) server that asks Service Studio 11
// to open a module from an environment. Zero dependencies (Node >= 18).
//
// It uses Service Studio's own command-line switch:
//   ServiceStudio.exe -downloadAndOpen -eSpaceKey <KEY> [-elementKey <KEY>] -url <HOST>
// If Service Studio is already running, the running instance picks up the request.
//
// Env vars (optional):
//   SERVICESTUDIO_EXE   full path to ServiceStudio.exe
//   SERVICESTUDIO_HOST  default environment host (e.g. outsystems-dev.turismodeportugal.pt)

'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const SERVER_INFO = { name: 'servicestudio-open', version: '1.0.0' };
const DEFAULT_EXE_CANDIDATES = [
  'C:\\Program Files\\OutSystems\\Service Studio 11\\Service Studio\\ServiceStudio.exe',
  'C:\\Program Files\\OutSystems\\Development Environment 11\\Service Studio\\ServiceStudio.exe',
];
const GUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const HOST_RE = /^[A-Za-z0-9](?:[A-Za-z0-9.-]{0,251}[A-Za-z0-9])?(?::\d{1,5})?$/;

function findExe() {
  const fromEnv = process.env.SERVICESTUDIO_EXE;
  if (fromEnv) return fromEnv;
  return DEFAULT_EXE_CANDIDATES.find((p) => { try { return fs.existsSync(p); } catch { return false; } })
    || DEFAULT_EXE_CANDIDATES[0];
}

const TOOLS = [
  {
    name: 'openModule',
    description:
      'Open an OutSystems 11 module from an environment in Service Studio (same as "Open from Environment"). ' +
      'Pass the module key (eSpaceKey) as returned by the OutSystems MCP searchApps tool, and the environment host. ' +
      'Optionally pass elementKey to jump to a specific element (action, screen, entity) inside the module. ' +
      'Returns as soon as Service Studio has been asked to open it; opening takes a few seconds to a minute — ' +
      'confirm with the OutSystems MCP listOpenModules tool before working on the module.',
    inputSchema: {
      type: 'object',
      properties: {
        eSpaceKey: { type: 'string', description: "The module's key (GUID), e.g. from searchApps." },
        host: { type: 'string', description: 'Environment host name, e.g. outsystems-dev.turismodeportugal.pt. Defaults to SERVICESTUDIO_HOST.' },
        elementKey: { type: 'string', description: 'Optional key of an element inside the module to navigate to.' },
      },
      required: ['eSpaceKey'],
      additionalProperties: false,
    },
  },
];

function openModule(args) {
  const eSpaceKey = String(args.eSpaceKey || '').trim();
  const host = String(args.host || process.env.SERVICESTUDIO_HOST || '').trim()
    .replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  const elementKey = args.elementKey ? String(args.elementKey).trim() : '';

  if (!GUID_RE.test(eSpaceKey)) throw new Error(`eSpaceKey must be a GUID, got "${eSpaceKey}"`);
  if (!host) throw new Error('host is required (or set SERVICESTUDIO_HOST)');
  if (!HOST_RE.test(host)) throw new Error(`Invalid host "${host}"`);
  if (elementKey && !GUID_RE.test(elementKey) && !/^[A-Za-z0-9*_.-]{1,200}$/.test(elementKey)) {
    throw new Error(`Invalid elementKey "${elementKey}"`);
  }

  const exe = findExe();
  if (!fs.existsSync(exe)) throw new Error(`ServiceStudio.exe not found at "${exe}". Set SERVICESTUDIO_EXE.`);

  const cliArgs = ['-downloadAndOpen', '-eSpaceKey', eSpaceKey];
  if (elementKey) cliArgs.push('-elementKey', elementKey);
  cliArgs.push('-url', host);

  const child = spawn(exe, cliArgs, { detached: true, stdio: 'ignore', windowsHide: false });
  child.on('error', (e) => log(`spawn error: ${e.message}`));
  child.unref();

  return `Asked Service Studio to open module ${eSpaceKey} from ${host}` +
    (elementKey ? ` (element ${elementKey})` : '') +
    `. Command: "${exe}" ${cliArgs.join(' ')}. ` +
    'Check listOpenModules in a few seconds; Service Studio may show dialogs (login, references) the user must answer.';
}

// ---------- minimal JSON-RPC over stdio ----------
function log(msg) { process.stderr.write(`[servicestudio-open] ${msg}\n`); }
function send(obj) { process.stdout.write(JSON.stringify(obj) + '\n'); }
function reply(id, result) { send({ jsonrpc: '2.0', id, result }); }
function fail(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;
  switch (method) {
    case 'initialize':
      return reply(id, {
        protocolVersion: (params && params.protocolVersion) || '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });
    case 'ping':
      return reply(id, {});
    case 'tools/list':
      return reply(id, { tools: TOOLS });
    case 'tools/call': {
      const name = params && params.name;
      const args = (params && params.arguments) || {};
      if (name !== 'openModule') return fail(id, -32602, `Unknown tool: ${name}`);
      try {
        return reply(id, { content: [{ type: 'text', text: openModule(args) }] });
      } catch (e) {
        return reply(id, { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true });
      }
    }
    default:
      if (method && method.startsWith('notifications/')) return; // no response to notifications
      if (isRequest) return fail(id, -32601, `Method not found: ${method}`);
  }
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return fail(null, -32700, 'Parse error'); }
  try { handle(msg); } catch (e) { log(e.stack || e.message); if (msg.id != null) fail(msg.id, -32603, e.message); }
});
rl.on('close', () => process.exit(0));
log(`ready (exe: ${findExe()})`);
