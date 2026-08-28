## Critical Rules
- Always fix linter errors (`npm run lint`).

## Development Commands

- **Build**: `npm run build` (or `ng build`)
- **Test**: `npm test -- --watch=false --browsers=ChromeHeadless`
  > *Note*: Default `npm test` launches an interactive browser in watch mode; always use headless non-watching flags in CI/agent environments.
- **Launch / Dev Server**: `npm start` (or `ng serve`, serves on `http://localhost:4200`)
- **Lint**: `npm run lint` (or `ng lint`)