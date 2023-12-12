# Nifty Leage App

[![Validate, build, and test on every push](https://github.com/NiftyLeague/NiftyLeagueAppV2/actions/workflows/ci.yml/badge.svg)](https://github.com/NiftyLeague/NiftyLeagueAppV2/actions/workflows/ci.yml)

This repository holds all the code for the Nifty League App v2.

## Prerequisites

Make sure you have installed all of the **following** prerequisites on your development machine:

- Node => `lts/iron`
- NPM => `^8.x.x`
- Yarn => `^1.22.x`
- Git => `^2.x.x`

## Usage

Please use `yarn` instead of `npm`.

### Prepare and install husky

```bash
yarn prepare
```

### Install all depedencies

```bash
yarn
```

### Run local

```bash
yarn dev
```

### Run production

```bash
yarn start
```

### Run test

```bash
yarn test
```

### Build the project

```bash
yarn build
```

## Contribute

First, clone the repository, then run the following commands:

```bash
$ git clone https://github.com/NiftyLeague/NiftyLeagueAppV2
$ cd NiftyLeagueAppV2
$ cp .env-sample .env
$ yarn install && yarn prepare
$ yarn start
```

Please fill up the `.env` variables before run `yarn start`

We recommend that you use [Visual Studio Code](https://code.visualstudio.com/) to work on this project. We use [ESLint](https://github.com/eslint/eslint) & [Prettier](https://github.com/prettier/prettier) to keep our code consistent in terms of style and reducing defects. We recommend installing the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) & [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.prettier-vscode) as well.

### Commit message types

- feat: The new feature you're adding to a particular application
- fix: A bug fix
- refactor: Refactoring a specific section of the codebase
- test: Everything related to testing
- docs: Everything related to documentation
- chore: Regular code maintenance

### Naming conditions

Branch naming: `{linear_username}/{ticket-title}`<br>
Pull request title: `[LINEAR_ID] Title`<br>
Commit message: `{type}: short meaningful description`<br>

## License

[MIT](https://choosealicense.com/licenses/mit/)
