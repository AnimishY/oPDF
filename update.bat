@echo off
REM filepath: c:\Users\Animi\OneDrive\Desktop\oPDF\update.bat

echo ============================================
echo   AnimishY PDF Vault - Update Script
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Error: Python is not installed or not in PATH
    echo    Please install Python 3 and try again
    pause
    exit /b 1
)

echo Using Python: 
python --version
echo.

REM Run the update script
echo Running update_pdfs.py...
echo.
python update_pdfs.py

REM Check if the script ran successfully
if %errorlevel% equ 0 (
    echo.
    echo √ Update completed successfully!
    echo    You can now open index.html in your browser
) else (
    echo.
    echo X Update failed. Please check the error messages above
    pause
    exit /b 1
)

echo.
echo ============================================
pause