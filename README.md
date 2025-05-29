O projeto é dividido em três partes:

Backend (API .NET 8): C# + Entity Framework + PostgreSQL + Azure Service Bus + SignalR

Worker (Background Service): C# consumindo a fila do Azure Service Bus

Frontend: React + TailwindCSS + Vite + SignalR

Prova TMB/
├── front-tmb/                  # Frontend React + Tailwind
├── OrderManagement.Api/        # API .NET 8 (C#)
├── OrderProcessing.Worker/     # Worker para consumo do Service Bus
├── .gitignore


Como rodar o projeto
1. Pré-requisitos
.NET 8 SDK+
Node.js 18+
Conta Azure com Service Bus (ou usar Azure Service Bus Emulator para dev)
Docker + Docker Compose

2. Configuração do Backend (API)
Configurar appsettings.json:
  Configure a connection string do PostgreSQL.
  Configure as credenciais do Azure Service Bus.
Aplicar migrations e criar o banco:
  cd OrderManagement.Api
  dotnet ef database update
Rodar a API:
  dotnet run

3. Configuração do Worker
   Configure o mesmo appsettings.json do backend (connection string e service bus).
Rodar o worker:
  cd OrderProcessing.Worker
  dotnet run

4. Configuração do Frontend
Instalar dependências:
  cd front-tmb
  npm install
Rodar o projeto:
  cnpm run dev


   
