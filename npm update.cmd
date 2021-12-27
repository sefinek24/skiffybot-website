@echo off
set line=--------------------------------------------------------------------
CALL ncu -u
echo %line%
CALL npm install
echo %line%
CALL npm update
echo %line%
CALL npm audit fix
echo %line%
pause