# Quotes Vue App

This is the Vue.js version of the Quotes application, converted from Angular.

## Setup

1. Install dependencies:
```bash
cd vue-app
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Features

- Display all quotes (currently using mock data)
- Generate random quotes based on user input
- Material Design UI using Vuetify
- TypeScript support

## Project Structure

```
vue-app/
├── src/
│   ├── App.vue          # Main component
│   ├── main.ts          # Application entry point
│   ├── composables/     # Vue composables (services)
│   │   └── useQuoteService.ts
│   └── types/           # TypeScript types
│       └── quote.ts
├── public/              # Static assets
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## Differences from Angular Version

- Uses Vue 3 Composition API instead of Angular components
- Vuetify instead of Angular Material (similar Material Design)
- Composables instead of Angular services
- Vite instead of Angular CLI for build tooling
- Runs on port 3000 instead of 4200