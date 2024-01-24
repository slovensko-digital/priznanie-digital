# [priznanie.digital](https://priznanie.digital/)

![Deployment](https://github.com/priznanie-digital/priznanie-digital/workflows/Deployment/badge.svg)

Tax filing application for self employed professionals in Slovakia.

**Daňové priznanie pre živnostníkov s paušálnymi výdavkami (DPFO typ B)**

Daňové priznanie je jeden z najväčších byrokratických strašiakov podnikateľov. A pritom pri zadaní pár jednoduchých
údajov si ho môže vyplniť ktokoľvek za pár minút bez väčších problémov. Chceme takto malými krokmi uľahčiť život
státisicom živnostníkov. Ak ste SZČO (živnostník) a uplatňujete si paušálne výdavky, tak vám pomôžeme vyplniť daňové
priznanie (k dani z príjmov fyzickej osoby, typ B) a tiež vás detailne prevedieme aj procesom podania na stránkach
Finančnej správy.

## Project details

Tech stack:

- written in [Typescript](https://www.typescriptlang.org/), styles via [css-modules](https://github.com/css-modules/css-modules)
- design based on [GOV.UK design system](https://design-system.service.gov.uk/), modified for [navody.digital](https://github.com/slovensko-digital/navody.digital)
- based on [Next.js](https://nextjs.org/).
- financial calculations via [decimal.js](https://mikemcl.github.io/decimal.js/).
- forms via [formik](https://formik.org/)
- testing via [jest](https://jestjs.io/) and [cypress](https://www.cypress.io/) (with [cypress dashboard](https://dashboard.cypress.io/projects/ivst8i))
- code formatted via [prettier](https://prettier.io/)

**To contribute** fork [this Github repo](https://github.com/priznanie-digital/priznanie-digital) and create a pull request.
If you are not familiar with the process [see this guide](https://github.com/firstcontributions/first-contributions/blob/master/README.md).

## How to develop

You need [yarn](https://yarnpkg.com/getting-started/install) and [node 16.13.2](https://nodejs.org/en/).

Install dependencies:

```bash
yarn
```
Create environment variables:
```bash
cp .env.example .env
```

Run the application:

```bash
yarn dev
```

Open http://localhost:3000/ in browser.

## Run tests

Unit tests via [jest](https://jestjs.io/):

```bash
yarn test
```

Functional tests via [Cypress](https://www.cypress.io/):

```bash
yarn cy:run
```

Run functional tests interactively:

```bash
yarn cy:open
```

Before committing your code don't forget to format and check syntax:

```bash
yarn prettier
yarn lint
yarn check:ts
```

## Feature flags

- `you-shall=not-pass` allows direct access to any URL, you dont have to go through whole flow. Also enables debug mode for redirect at the end of the flow (see Navody.Digital Integration below). `/debug` page enables you to toggle this cookie.

## Environment variables

Add `.env` file with env variables:

- _sendinbluetoken_ (for sending feedback emails via 3rd party service [sendinblue](https://www.sendinblue.com/))
- _NEXT_PUBLIC_navodyBaseUrl_ (redirect to instructions for next steps after generating xmls)

## Environments

- staging: https://priznanie.staging.slovensko.digital/
- production: https://priznanie.digital/

## Infrastructure

- Github repository: https://github.com/priznanie-digital/priznanie-digital
- Deployed to staging env via [Github Action - Deployment](https://github.com/priznanie-digital/priznanie-digital/actions?query=workflow%3ADeployment)

## Navody.Digital Integration

When the flow is complete we redirect to Navody.Digital. It takes care of sending emails and downloading files.

To debug this integration set `you-shall=not-pass` cookie. Instead of automatic redirect you will be able to redirect manually (by clicking a button) or download the XML file. This approach is used also for functional tests.

## Pull request checks

Tested via [Github Action - Quality Assurance](https://github.com/priznanie-digital/priznanie-digital/actions?query=workflow%3A%22Quality+Assurance%22):

- Lint and Typescript check:
  ```bash
  yarn lint
  yarn check:ts
  ```
- Unit tests:
  ```bash
  yarn test --ci
  ```
- Functional tests:
  - build and start server:
  ```bash
  yarn build
  yarn start
  ```
  - run functional tests via Cypress - [cypress-io/github-action](https://github.com/cypress-io/github-action)
  - runs in parallel and reports to [Cypress Dashboard](https://dashboard.cypress.io/projects/ivst8i)

## Talk to us

You can [reach us on Slovensko.Digital slack](http://slack.slovensko.digital/), channel _#priznanie_digital_.
