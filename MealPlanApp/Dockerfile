# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia tudo da solução (precisa do .sln e todos os projetos)
COPY . .

# Restaura dependências com base na solução
RUN dotnet restore "MealPlanApp.sln"

# Publica o projeto principal
RUN dotnet publish "MealPlanApp/MealPlanApp.csproj" -c Release -o /app/publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

# Define variáveis padrão (podem ser sobrescritas pelo docker-compose)
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Development

EXPOSE 8080
ENTRYPOINT ["dotnet", "MealPlanApp.dll"]
