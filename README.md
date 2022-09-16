# Rubics app express template

App using express and vite for creating dashboard and components for Rubics.  
`node 14.20.0`

## Development
`yarn dev` Builds the server and listens to changes  
`yarn web` Builds the dashboard and components and listens for changes in `/public` and hot-reloads

Uses `ts-node` to restart server automatically, and `livereload` on web content to automatic refresh pages.  
**NOTICE:** livereloading in dev has a memory leak. It will add the same component module in memory on every refresh  
If you run low on memory, you should refresh `yarn dev` and `yarn web`

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
API endpoint for this is under `POST /rubics/components/mycomponent` where rubics post props and pageContext to you can SSR render the React component.  
Remember to change/add `rubics-app-config.json` under `config - key:component - name:MyComponent

## Views / EJS
Express is using EJS as a rendering engine. All views for rendering  you'll find in the `views` folder.  
Only view now is for the dashboard. Add more or change if you need to change html headers.

## API structure
This is the basic API structure. This should stay like this to keep everything the same.

- /api (Base for api)
  - /v1 (Version managing ov api)
    - /config (Basic methods for changing config)
    - /public (All public endpoints should be under here)
- /rubics
  - /components (endpoints for rubics components)
    - /mycomponent (POST: Return components with help of context and config)
  - /dashboard (All endpoints for rendering dashboard SSR)
    - / (Get index of dashboard)
  - /webhooks (Webhooks from rubics)
    - /app-settings-update (Updates app settings in config) 

### Dashboard
When adding new endpoints for dashboard you have to remember to add a get endpoint in the /dashboard path.  
You can then add data to the store to populate the dashboard.

### Components
Adding a new component is pretty easy.
Add a new folder under `/src/components`:  
`/src/components/MyNewComponent` and add 3 files `index.tsx` `MyNewComponent.tsx` `MyNewComponent.css`.  
Builder and API will automatically add the folder and a new endpoint `/rubics/compoments/mynewcomponent`  
**Remember** to add new config in `rubics-app-config.json`

```
 {
    "key": "component",
    "value": {
      "name": "mynewcomponent",
      "label": "MyNewComponent",
      "icon": "layout",
      "renderUrl": "http://localhost:2000/rubics/components/mynewcomponent",
      "props": []
    }
  }
```

## Seeding
When working with apps you should add seeding to the database for new users! So you can jump inn to the app and directly start coding!  
Seeding is done with the file `seed.ts`. This can use the `*model*.mock.ts` under model's folder.