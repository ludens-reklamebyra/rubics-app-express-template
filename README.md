# Rubics app express template

App using express and vite for creating dashboard and components for Rubics.  
`node 14.20.0`

## Development
`yarn dev` Builds the server and listens to changes  
`yarn web` Builds the dashboard and components and listens for changes

## Test
`yarn test` Runs vitest and finds all files ending in test.ts/x  
`yarn test:ui` Recommended: Run test with vitest GUI

## Config
In `rubics-app-config.json` you'll find settings you can post to rubics-service `/api/v1/admin/apps` to start testing localy 

## Build
`yarn build` Builds dashboard and components with minify, hash and .gz

## Rubics components
This template support rubics components out of the box.  
In the folder `src/components/MyComponent` you find a simple components that is publishable in rubics dashboard.  
API endpoint for this is under `POST /rubics/components/my-component` where rubics post props and pageContext to you can srr render the React component.  
Remember to change/add `rubics-app-config.json` under `config - key:component - name:MyComponent

## API structure

- /api (Base for api)
  - /v1 (Version managing ov api)
    - /config (Basic methods for changing config)
    - /public (All public endpoints should be under here)
- /rubics
  - /components (endpoints for rubics components)
    - /my-component (POST: Return components with help of context and config)
  - /dashboard (All endpoints for rendering dashboard SSR)
    - / (Get index of dashboard)
  - /webhooks (Webhooks from rubics)
    - /app-settings-update (Updates app settings in config) 