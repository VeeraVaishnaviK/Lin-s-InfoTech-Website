# Lin's InfoTech - Advanced Start Script
# This script kills existing processes on ports 3000, 5000, and 8000, 
# then launches all services with appropriate delays.

Write-Host "--- Lin's InfoTech Ecosystem - Cleanup & Startup ---" -ForegroundColor Cyan

# 1. Cleanup existing processes
Write-Host "Checking for existing processes on ports 3000, 5000, 8000..." -ForegroundColor Gray
$ports = @(3000, 5000, 8000)
foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        Write-Host "Found process on port $port. Killing it..." -ForegroundColor Yellow
        $connections | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    }
}

Write-Host "Cleanup complete." -ForegroundColor Green
Start-Sleep -Seconds 1

# 2. Start AI Services (FastAPI)
Write-Host "Launching AI Services (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai-services; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload" -WindowStyle Normal
Start-Sleep -Seconds 2

# 3. Start Backend (Express)
Write-Host "Launching Backend (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal
Write-Host "Waiting for Backend to connect to Database..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# 4. Start Frontend (Next.js)
Write-Host "Launching Frontend (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

Write-Host "`nAll windows launched!" -ForegroundColor Green
Write-Host "IMPORTANT: Please wait until the Frontend window says 'Ready' before opening the browser." -ForegroundColor White
Write-Host "Website: http://localhost:3000" -ForegroundColor Cyan
