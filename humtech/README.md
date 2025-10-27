# Hum Tech Web Platform

Enterprise-ready Angular application for Hum Tech showcasing services, Harm Academy programs, careers, insights, and admin tooling.

## Getting Started

```bash
npm install
npm run start
```

The application runs at `http://localhost:4200`.

## Tech Stack

- Angular with standalone components and lazy-loaded routes
- TailwindCSS for styling with centralized theming
- GSAP ScrollTrigger for animation orchestration
- RxJS signals for reactive state
- Mock data services prepared for ASP.NET Core API integration

## Project Highlights

- Dynamic content sourced from strongly typed services (`src/app/core/services`)
- Global color system via `tailwind.config.js` and CSS variables (`src/styles/styles.css`)
- Reusable component library under `src/app/shared/components`
- Admin workspace prepared for CRUD management and future authentication
- HTTP interceptors handling base URL prefixing, authentication headers, error notifications, and loading states

## Scripts

- `npm run start` – serve the dev build with HMR
- `npm run build` – production build
- `npm run test` – unit tests (Jest/Karma)

## Directory Overview

```
src/
  app/
    core/          # models, services, interceptors, guards
    shared/        # reusable components, directives, pipes, animations
    features/      # lazy features (home, services, academy, careers, blog, contact, admin)
    layouts/       # main and admin layouts
    app.routes.ts  # top-level routing configuration
  styles/          # Tailwind and global styles
  environments/    # environment configuration
```

## API Integration

Services currently expose CRUD interfaces backed by mock data. Swap implementations to connect with ASP.NET Core APIs using `ApiService` and registered interceptors.

## Deployment

1. Configure environment variables in `src/environments/`
2. Run `npm run build`
3. Serve the `dist/humtech/browser` output with any static host or integrate with ASP.NET Core middleware.
