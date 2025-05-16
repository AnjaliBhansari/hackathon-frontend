# Contributing Guidelines

## TypeScript Configuration Rules

1. **tsconfig.json Setup**

   - Use `"jsx": "preserve"` for Next.js projects
   - Set `"target": "es6"` or higher
   - Enable `"strict": true`
   - Use path aliases with `"baseUrl"` and `"paths"`

2. **Next.js Configuration**

   - Enable TypeScript JSX in `next.config.js`
   - Use proper file extensions:
     - `.tsx` for React components
     - `.ts` for non-React TypeScript files
     - `.js` only for legacy code

3. **File Structure**

   - Place React components in `src/pages` or `src/components`
   - Use TypeScript for all new files
   - Follow Next.js routing conventions

4. **Code Style**
   - Use TypeScript types for all props and state
   - Enable strict type checking
   - Use proper import paths with `@/` alias

## Common Issues & Solutions

1. **JSX Error Fix**

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "jsx": "preserve",
       "moduleResolution": "node"
     }
   }
   ```

2. **Next.js TypeScript Setup**
   ```javascript
   // next.config.js
   const nextConfig = {
     typescript: {
       jsx: true,
     },
   };
   ```
