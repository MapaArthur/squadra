This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

<br />

### Project Structure

- This project is bootstrapped using [Create React App](https://github.com/facebook/create-react-app).
- **Flux** is used for state management and all Flux specific files are located inside `src/flux`. Transitioning to a more robust solution such as Redux is also fairly simple.
- Rotas podem ser definidas no module `src/routes.js` com path, layout e component.
- Todos os templates primários estão localizados dentro de `src/views`.
- O diretório `src/components` possui os subcomponentes específicos de cada template primário em seus subdiretórios.
- O diretório `src/utils` contém catch de erro e login.
- Os styles do layout herdados do Shards Dashboard são puxados do submódulo `src/shards-dashboard` dentro de `src/App.js`.
- Outros styles extras específicos das bibliotecas usadas estão localizadas dentro de `src/assets`.
- Os layouts estão localizados no diretório `src/layouts`. O layout padrão (`src/layouts/Default.js`) consiste em navbar, sidebar e footer, entretando, é possível criar e usar novos layouts assim como seus styles.
- Para o layout padrão (`src/layouts/Default.js`) é possível alterar as cores de cada item (navbar, sidebar e footer) individualmente no arquivo css (`src/layouts/Default.css`).
- É possível criar items e items com subitems do sidebar no module `src/data/sidebar-nav-items.js` com os atributos: type (Item ou Collapse), title (nome de exibição), htmlBefore (icon antes do title), htmlAfter (icon depois do title). Tipos Collapse possuem subitems: items (array de Item) e os tipos Item possuem um caminho: to (path).
- É possível alterar a logo da empresa e o texto que aparecem no sidebar em `src/components/layout/MainSidebar/SidebarMainNavbar.js`. É possível também remover o texto e mostrar somente a logo passando props `hideLogoText={true}` ao chamar `<MainSidebar/>` no layout usado.
- Existem vários componentes de exemplo que devem ser removidos ao iniciar um projeto.
<br />
