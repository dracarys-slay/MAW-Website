@echo off
REM Run this file as Administrator to allow port 8080 through Windows Firewall
REM Right-click on this file and select "Run as Administrator"

echo.
echo ========================================
echo   Firewall Configuration Helper
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator!
    echo.
    echo How to run as Administrator:
    echo 1. Right-click on this file
    echo 2. Select "Run as Administrator"
    echo 3. Click Yes when prompted
    echo.
    pause
    exit /b 1
)

echo Adding firewall rule for MAW Robotics Server...
echo.

REM Add inbound rule for port 8080
netsh advfirewall firewall add rule name="MAW Robotics Website" dir=in action=allow protocol=tcp localport=8080 description="Allow MAW Robotics website access" >nul 2>&1

if %errorLevel% equ 0 (
    echo.
    echo SUCCESS! Port 8080 has been allowed through the firewall.
    echo.
    echo You can now access the website from other computers at:
    echo   http://192.168.1.75:8080
    echo.
) else (
    echo ERROR: Could not add firewall rule. Please check your privileges.
    echo.
)

pause
