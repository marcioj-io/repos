
---

````markdown
# 🍽️ MealPlanApp - Full Stack

Aplicação completa composta por:
- **Backend:** ASP.NET Core 9 + SQL Server (DDD + MediatR)
- **Frontend:** React + Nginx
- **Orquestração:** Docker Compose

---

## 📦 Pré-requisitos

- Docker e Docker Compose instalados  
- Portas livres:
  - `5000` → API  
  - `3000` → Frontend  
  - `1433` → SQL Server (opcional para acesso externo)

---

## ▶️ Como Rodar a Stack Completa

1. **Derrube containers antigos (se existirem):**
   ```bash
   docker-compose down -v
````

2. **Suba tudo com build:**

   ```bash
   docker-compose up --build
   ```

3. **Acesse:**

   * 🖥️ Frontend → [http://localhost:3000](http://localhost:3000)
   * ⚙️ API → [http://localhost:5000/swagger](http://localhost:5000/swagger)
   * 🗄️ Banco de Dados → localhost:1433

---

# 🧠 BACKEND

Aplicação ASP.NET Core + SQL Server dockerizada, com arquitetura em camadas (DDD) e MediatR.

---

## 📂 Estrutura de Pastas

```text
MealPlanApp/
│
├─ MealPlanApp.Api
│   ├─ Controllers/
│   │   └─ MealPlanController.cs
│   ├─ Program.cs
│   └─ MealPlanApp.Api.csproj
│
├─ MealPlanApp.Application
│   ├─ Features/
│   │   └─ MealPlans/
│   │       ├─ Commands/
│   │       └─ Queries/
│   └─ MealPlanApp.Application.csproj
│
├─ MealPlanApp.Domain
│   ├─ Dtos/
│   ├─ Entities/
│   └─ MealPlanApp.Domain.csproj
│
├─ MealPlanApp.Infrastructure
│   ├─ Persistence/
│   └─ MealPlanApp.Infrastructure.csproj
│
└─ docker-compose.yml
```

> 💡 Gere a árvore no Windows com:
>
> ```powershell
> tree /f
> ```

---

## ⚙️ Comandos Docker (Backend)

**Build da aplicação**

```powershell
docker-compose build
```

**Subir containers**

```powershell
docker-compose up
```

> A API espera o SQL Server estar **healthy** antes de iniciar, evitando erros de conexão.

**Reiniciar containers**

```powershell
docker-compose restart
```

**Parar containers**

```powershell
docker-compose down
```

> O `restart: unless-stopped` garante reinício automático em caso de falha, exceto se você parar manualmente.

---

## 🧪 Testando a API

*Swagger:* [http://localhost:5000/swagger](http://localhost:5000/swagger)

### Rotas principais

```http
GET    /api/mealplan
GET    /api/mealplan/{id}
POST   /api/mealplan
PUT    /api/mealplan/{id}
DELETE /api/mealplan/{id}
```

---

## ⚠️ Observações Importantes

1. O SQL Server leva alguns segundos para inicializar e criar o banco `MealPlanDb`.
2. O `healthcheck` do SQL Server e o `depends_on` garantem a ordem de inicialização.
3. Caso a API não suba automaticamente, inicie manualmente:

   ```powershell
   docker-compose up api
   ```

---

# 💻 FRONTEND

Aplicação React servida via **Nginx**, conectando à API .NET hospedada em `http://localhost:5000`.

---

## 📂 Estrutura

```text
MealPlanFront/
│
├─ src/
│   ├─ components/
│   ├─ pages/
│   └─ services/
│
├─ public/
│   ├─ index.html
│   └─ favicon.ico
│
└─ Dockerfile
```

---

## 🔗 Conexão com o Backend

A URL da API pode ser configurada em:

```js
// Exemplo: src/services/api.js
export const API_URL = "http://localhost:5000/api";
```

O **Nginx** faz o proxy reverso para essa URL no container.

---

## 🛠️ Logs e Diagnóstico

**Logs da API**

```bash
docker-compose logs -f mealplanapi
```

**Logs do Frontend**

```bash
docker-compose logs -f frontend
```

**Logs do SQL Server**

```bash
docker-compose logs -f sqlserver
```

---

## 🧩 Conexão com o Banco

String de conexão padrão no backend:

```
Server=sqlserver,1433;Database=MealPlanDb;
User Id=sa;Password=Your_password123;
Encrypt=False;TrustServerCertificate=True
```

> Dentro da rede Docker, o host do banco é `sqlserver`.

---

## 🧾 Estrutura Final da Stack

```text
MealPlanApp/        → API ASP.NET Core
MealPlanFront/      → Frontend React
docker-compose.yml  → Orquestra toda a stack
```

---

## 🧰 Tecnologias

**Backend**

* .NET 9 + ASP.NET Core
* SQL Server
* MediatR
* DDD + CQRS
* Docker Compose

**Frontend**

* React
* Nginx
* Axios / Fetch API
* Docker

> ⚠️ **Observação Importante:**
>
> Após o primeiro `docker-compose up --build`, é possível que o container da API apareça como **"exited"** ou **"not running"**.
>
> Isso ocorre porque o SQL Server ainda está inicializando o banco `MealPlanDb` quando a API tenta se conectar.
>
> ✅ **Solução:** basta reiniciar o serviço da API manualmente após alguns segundos:
>
> ```bash
> docker-compose restart mealplanapi
> ```
>
> Depois disso, a aplicação funcionará normalmente.
