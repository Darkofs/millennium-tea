@echo off
echo ===================================================
echo [Git Sync] Starting automatic pull ^& push...
echo ===================================================

echo [Git Sync] Pulling latest changes from remote...
git pull origin main
if %ERRORLEVEL% neq 0 (
    echo [Git Sync] WARNING: git pull failed or has conflicts.
)

echo [Git Sync] Staging all changes...
git add .

echo [Git Sync] Committing changes...
git commit -m "Auto-sync: %DATE% %TIME%"
if %ERRORLEVEL% neq 0 (
    echo [Git Sync] No new changes to commit.
) else (
    echo [Git Sync] Changes committed.
)

echo [Git Sync] Pushing changes to remote...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo [Git Sync] ERROR: git push failed.
    pause
    exit /b %ERRORLEVEL%
)

echo ===================================================
echo [Git Sync] Synchronization completed successfully!
echo ===================================================
timeout /t 3
