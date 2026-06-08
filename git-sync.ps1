# Git Auto-Sync Script for PowerShell
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "[Git Sync] Starting automatic pull & push..." -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# 1. Pull changes
Write-Host "[Git Sync] Pulling latest changes from remote..." -ForegroundColor Blue
git pull origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Git Sync] WARNING: git pull returned non-zero exit code. There might be conflicts or connection issues." -ForegroundColor Yellow
}

# 2. Add changes
Write-Host "[Git Sync] Staging all changes..." -ForegroundColor Blue
git add .

# 3. Commit changes
Write-Host "[Git Sync] Committing changes..." -ForegroundColor Blue
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto-sync: $timestamp"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Git Sync] No changes to commit." -ForegroundColor Yellow
} else {
    Write-Host "[Git Sync] Changes committed." -ForegroundColor Green
}

# 4. Push changes
Write-Host "[Git Sync] Pushing changes to remote..." -ForegroundColor Blue
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[Git Sync] ERROR: git push failed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit $LASTEXITCODE
}

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "[Git Sync] Synchronization completed successfully!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan
Start-Sleep -Seconds 3
