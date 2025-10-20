#!/bin/bash
set -e

echo "⏳ Aguardando SQL Server iniciar..."
until /opt/mssql-tools18/bin/sqlcmd -S sqlserver -U sa -P "Your_password123" -C -Q "SELECT 1" &>/dev/null
do
  sleep 2
done

echo "✅ Banco pronto! Iniciando API..."
exec dotnet MealPlanApp.dll
