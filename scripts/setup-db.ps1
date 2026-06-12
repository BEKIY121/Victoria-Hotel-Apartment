# Victoria Hotel — PostgreSQL one-time setup
# Run in pgAdmin Query Tool (connected as postgres superuser), OR:
#   & "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -f scripts/setup-database.sql

Write-Host "Victoria Hotel PostgreSQL Setup" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Open pgAdmin 4 (installed with PostgreSQL 16)"
Write-Host "Step 2: Connect to the local PostgreSQL server as user 'postgres'"
Write-Host "Step 3: Open Query Tool and run the SQL in: scripts/setup-database.sql"
Write-Host ""
Write-Host "That script will:"
Write-Host "  - Set postgres password to: victoriahotel"
Write-Host "  - Create database: victoria_hotel"
Write-Host ""
Write-Host "Step 4: From the project folder, run:"
Write-Host "  npm run db:push"
Write-Host "  npm run db:seed"
Write-Host ""
Write-Host "Default admin after seed: admin@victoriahotel.et / changeme"
Write-Host ""

$sqlPath = Join-Path $PSScriptRoot "setup-database.sql"
if (Test-Path $sqlPath) {
  Write-Host "SQL file: $sqlPath" -ForegroundColor Green
}
