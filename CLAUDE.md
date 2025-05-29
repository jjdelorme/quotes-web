# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular 17 web application that displays quotes. It has two main features:
- Display all quotes from a backend service
- Generate random quotes using Google's Gemini 1.5 API

The main branch uses mock data, while the complete branch has actual backend integration.

## Common Commands

```bash
# Start development server (http://localhost:4200)
ng serve

# Build for production (output to dist/quotes)
ng build

# Run tests (Karma/Jasmine)
ng test

# Build and watch for changes
ng build --watch --configuration development
```

## Architecture

The application uses Angular 17 with standalone components and follows a service-based architecture:

- **AppComponent** (`src/app/app.component.ts`): Main component that handles UI state and user interactions
  - `getAllQuotes()`: Fetches and displays all quotes
  - `getRandomQuote()`: Generates a random quote based on user input

- **QuoteService** (`src/app/quote-service.ts`): Handles data fetching
  - Currently returns mock data in the main branch
  - Designed to connect to two backend services:
    - Java/GCP serverless service for all quotes
    - Gemini 1.5 API for random quote generation

- **Quote Model** (`src/app/quote.ts`): Simple interface with `text` and `author` properties

## UI Framework

Uses Angular Material with the Indigo-Pink theme. Key components:
- mat-toolbar for header
- mat-card for quote display
- mat-button for actions
- mat-form-field and mat-input for user input

## Testing

Tests use Karma and Jasmine. Run with `ng test`. Test files follow the `.spec.ts` naming convention.