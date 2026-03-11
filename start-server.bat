@echo off
REM Start MAW Robotics Website Server
REM This script starts the Python HTTP server to make the website accessible on the network

color 0A
echo.
echo ========================================
echo   MAW Robotics Website Server Launcher
echo ========================================
echo.
echo Initializing server...
echo.

REM Get the directory of this script
cd /d "%~dp0"

REM Display access information
echo.
echo SUCCESS! Server is starting...
echo.
echo Website Access Information:
echo ========================================
echo.
echo Local Access (this computer):
echo   http://localhost:8080
echo   http://127.0.0.1:8080
echo.
echo Network Access (other computers):
echo   http://192.168.1.75:8080
echo.
echo Test Page:
echo   http://192.168.1.75:8080/test.html
echo.
echo ========================================
echo.
echo IMPORTANT: Keep this window open while others access the website!
echo.
echo For troubleshooting, see: TROUBLESHOOTING.md
echo To allow through firewall, run: firewall-allow.bat as Administrator
echo.
echo Press CTRL+C to STOP the server
echo ========================================
echo.

REM Start the Python server
python server.py

REM If we get here, server stopped
echo.
echo Server has stopped.
pause
