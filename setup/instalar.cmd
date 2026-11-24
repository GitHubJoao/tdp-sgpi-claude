@echo off
rem Copia, uma vez, os ficheiros que as ferramentas remotas nao podem escrever:
rem   prompts\        -> .claude\commands\  (comandos / do Claude Code)
rem   setup\github\   -> .github\           (gitleaks + CODEOWNERS)
rem Correr na raiz do repositorio: setup\instalar.cmd
cd /d "%~dp0.."
xcopy prompts .claude\commands\ /I /Y >nul
xcopy setup\github .github\ /E /I /Y >nul
echo Copiado. Agora: git add .claude .github ^&^& git commit -m "setup: comandos e gitleaks" ^&^& git push
