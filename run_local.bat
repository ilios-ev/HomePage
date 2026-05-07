@echo off
TITLE Ilios Web Development Server
echo ==========================================
echo Starting Ilios Golf Cars Local Server...
echo ==========================================
echo.
echo [1/2] Checking dependencies...
if not exist node_modules (
    echo node_modules not found. Installing...
    call npm install
)

echo [2/2] Launching Tailwind and Live Server...
echo.
call npm run dev

pause
