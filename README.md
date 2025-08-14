# Resume Flow
Problem: it's hard to organize your resume data. For instance, suppose you have multiple versions of your resume to submit to apply to different versions. If you make a change to one of your data, you have to manually change every single other versions as well. 

Solution: Resume Flow allows you to centralize and organize your resume data in one place. It will be able to save your data in [JSONResume](https://jsonresume.org/) schema. You can use tools to automatically generate your resumes, apply changes easily across different platforms programmatically using the JSON(such as your portfolio site), or simply customize what you are going to copy and paste into a document or Linkedin.

Shoutout to @Nerv3sine for helping me integrate this project into React and Typescript.


## Features
- Add, edit, and delete your resume data using intuitive UI
- Export your resume data into JSONResume
- Click and drag your highlights (for Experience and Project) to easily change their order
- "Show Bullets" allow you to easily copy your highlights (mainly for Linkedin)



## Instructions for setup:

1. Run `npm install`

You should now be set. To run, you just need to run the following command

- `npm run dev` - which will host the website locally

To have this accessible via Github Pages, I'd recommend looking into website deployment (with React) (with github pages probably as well, its different from hosting the website urself)

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
