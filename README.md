# HumTech Platform

This repository hosts the Hum Tech customer experience platform. It contains a modern Angular frontend (in [`humtech/`](humtech/)) and an ASP.NET Core Web API (in [`api/`](api/)) that supplies the content and management endpoints required by the application.

## Frontend (Angular)
- **Path:** [`humtech/`](humtech/)
- **Tech stack:** Angular, TailwindCSS, GSAP
- **Scripts:**
  - `npm install`
  - `npm start` to run the development server on `http://localhost:4200`
  - `npm run build` for a production build

Refer to [`humtech/README.md`](humtech/README.md) for detailed setup, testing, and deployment notes.

## API (ASP.NET Core)
- **Path:** [`api/HumTech.Api`](api/HumTech.Api/)
- **Tech stack:** ASP.NET Core 8, Swashbuckle/Swagger
- **Key features:**
  - In-memory repositories seeded with the same domain entities the Angular application consumes
  - Full CRUD endpoints for hero content, services, team members, testimonials, jobs, courses, blog articles, FAQs, contact profiles, and stats
  - Configurable CORS policy sourced from `appsettings*.json`

### Running the API
```bash
cd api
export PATH="$HOME/.dotnet:$PATH" # ensure the .NET SDK from dotnet-install is on PATH
dotnet build
dotnet run --project HumTech.Api/HumTech.Api.csproj
```

The API listens on `https://localhost:7255`/`http://localhost:5255` by default. Interactive documentation is available at `/swagger` in development.

## Solution Structure
```
api/
  HumTech.sln
  HumTech.Api/
frontend/
  humtech/
```

Both projects are ready for CI/CD integration and can be deployed independently.
