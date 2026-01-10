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
    
    REM Git operations
    echo.
    echo ============================================
    echo   Committing and Pushing to GitHub
    echo ============================================
    echo.
    
    REM Check if git is installed
    git --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo X Warning: Git is not installed or not in PATH
        echo    Skipping GitHub push
        goto end
    )
    
    REM Check for changes (including untracked files)
    echo Checking for changes...
    git status --short
    echo.
    
    git diff-index --quiet HEAD --
    if %errorlevel% neq 0 goto haschanges
    
    git ls-files --others --exclude-standard | findstr "^" >nul
    if %errorlevel% equ 0 goto haschanges
    
    echo No changes to commit
    goto end
    
    :haschanges
    REM Stage all changes
    echo Staging changes...
    git add .
    
    REM Commit with timestamp
    echo Committing changes...
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
    git commit -m "Auto-update: %mydate% %mytime%"
    
    REM Push to GitHub
    echo Pushing to GitHub...
    git push
    
    if %errorlevel% equ 0 (
        echo.
        echo √ Successfully pushed to GitHub!
    ) else (
        echo.
        echo X Failed to push to GitHub
        echo    Please check your git configuration and try again
    )
    
) else (
    echo.
    echo X Update failed. Please check the error messages above
    pause
    exit /b 1
)

:end
echo.
echo ============================================
pause