# priznanie.digital - Návod na vyplnenie daňového priznania pre SZČO

![Github CI](https://github.com/priznanie-digital/priznanie-digital/workflows/Github%20%20CI/badge.svg?branch=master)

Daňové priznanie je jeden z najväčších byrokratických strašiakov podnikateľov. A pritom pri zadaní pár jednoduchých údajov si
ho môže vyplniť ktokoľvek za pár minút bez väčších problémov. Chceme takto malými krokmi uľahčiť život státisicom živnostníkov.
Ak ste SZČO (živnostník) a uplatňujete si paušálne výdavky, tak vám pomôžeme vyplniť daňové priznanie (k dani z príjmov fyzickej osoby, typ B) a tiež vás detailne prevedieme aj procesom podania na stránkach Finančnej správy.

## How to develop

In your terminal, run the following command:

```bash
npm run dev
```

## Run Jest Tests

```bash
npm test
```

## Run e2e tests

```bash
npm run cy:open
```

## Env variables
Add .env file with necessary env variables

## Environments

* staging: https://priznanie.staging.slovensko.digital/

## Infrastructure

* Github repository: https://github.com/wormyy/priznanie-digital
* Travis CI: https://travis-ci.com/github/wormyy/priznanie-digital


## Notes

We use [HummusJS](https://github.com/galkahana/HummusJS) to generate PDFs (its not maintained  for a few months now). Unfortunatelly the more popular PDFKit library [does not support editing existing files](https://github.com/foliojs/pdfkit).
