@echo off
chcp 65001 >nul
title s30s demo
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0demo.ps1" %*
pause
