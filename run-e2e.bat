@echo off
cd /d "%~dp0"
REM Usage:
REM   run-e2e.bat                      -> default dataset
REM   run-e2e.bat austria_female       -> another dataset from data\testdata.js
set DATASET=%1
if "%DATASET%"=="" set DATASET=default
maestro test -e DATASET=%DATASET% --format HTML-DETAILED --output results\report.html --test-output-dir results .
start "" results\report.html
pause
