# my-addon (volto-addon)

A new add-on for Volto

[![npm](https://img.shields.io/npm/v/volto-addon)](https://www.npmjs.com/package/volto-addon)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://collective.github.io/volto-addon/)
[![Code analysis checks](https://github.com/collective/volto-addon/actions/workflows/code.yml/badge.svg)](https://github.com/collective/volto-addon/actions/workflows/code.yml)
[![Unit tests](https://github.com/collective/volto-addon/actions/workflows/unit.yml/badge.svg)](https://github.com/collective/volto-addon/actions/workflows/unit.yml)

## Features

<!-- List your awesome features here -->

## Installation

To install your project, you must choose the method appropriate to your version of Volto.


### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon volto-addon
cd my-volto-project
```

Add `volto-addon` to your package.json:

```JSON
"addons": [
    "volto-addon"
],

"dependencies": {
    "volto-addon": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

### Volto 18 and later

Add `volto-addon` to your `package.json`:

```json
"dependencies": {
    "volto-addon": "*"
}
```

Add `volto-addon` to your `volto.config.js`:

```javascript
const addons = ['volto-addon'];
```

If this package provides a Volto theme, and you want to activate it, then add the following to your `volto.config.js`:

```javascript
const theme = 'volto-addon';
```

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Pre-requisites

-   [Node.js](https://6.docs.plone.org/install/create-project.html#node-js)
-   [Make](https://6.docs.plone.org/install/create-project.html#make)
-   [Docker](https://6.docs.plone.org/install/create-project.html#docker)


### Make convenience commands

Run `make help` to list the available commands.

```text
help                                 Show this help
install                              Installs the dev environment using mrs-developer
i18n                                 Sync i18n
format                               Format codebase
lint                                 Lint Codebase
test                                 Run unit tests
test-ci                              Run unit tests in CI
storybook-start                      Start Storybook server on port 6006
storybook-build                      Build Storybook
start-backend-docker                 Starts a Docker-based backend for developing
start-test-acceptance-frontend-dev   Start acceptance frontend in dev mode
start-test-acceptance-frontend       Start acceptance frontend in prod mode
start-test-acceptance-server         Start acceptance server
test-acceptance                      Start Cypress in interactive mode
test-acceptance-headless             Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make start-backend-docker
```

In a separate terminal session, start the frontend.

```shell
pnpm start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make start-test-acceptance-frontend-dev
```

In the second session, start the backend acceptance server.

```shell
make start-test-acceptance-server
```

In the third session, start the Cypress interactive test runner.

```shell
make test-acceptance
```

## License

The project is licensed under the MIT license.
