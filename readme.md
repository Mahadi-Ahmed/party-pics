# Build a website where users can upload pictures from the wedding

# Requirements:

TODO:
- [x] Get the domain mahadia.dev
- [x] Create a subdomain dipti.mahadia.dev
- [x] upload super simple hello world index.html
- [x] add react
- [x] add tailwind/shadcn
- [x] add functionality to upload files to browser
- [x] list uploaded pictures
- [x] show one preview
- [x] create a component to show/preview uploaded pictures
- [x] add carousel component
- [x] add favico
- [x] add site title
- [x] create stage deployment
- [] add design
- [] add toast when upload is successfull/failed
- [] make sure original format is preserved when uploading


## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
