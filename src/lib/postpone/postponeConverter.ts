import xmljs from 'xml-js';
import cloneDeep from 'lodash.clonedeep';
import { PostponeOutput } from './PostponeOutput';
import { PostponeUserInput } from '../../types/PostponeUserInput';
import { postponeBasis } from './postponeBasis';

// TODO remove fallbacks, they should be unncessary now
export function convertPostponeToJson(
  postponeUserInput: PostponeUserInput,
): PostponeOutput {
  const form: PostponeOutput = cloneDeep(postponeBasis);
  form.dokument.hlavicka.dic = postponeUserInput.dic;
  const [firstName, ...lastNames] = postponeUserInput.meno_priezvisko
    .split(' ')
    .map(v => v.trim());
  // const [beforeSlash, afterSlash] = postponeUserInput.rodne_cislo.split('/');

  form.dokument.hlavicka.fyzickaOsoba.meno = firstName;
  form.dokument.hlavicka.fyzickaOsoba.priezvisko = lastNames.join(' ');
  // form.dokument.hlavicka.fyzickaOsoba.rodneCislo.rcPredLom = beforeSlash;
  // form.dokument.hlavicka.fyzickaOsoba.rodneCislo.rcZaLom = afterSlash;

  form.dokument.hlavicka.sidlo.psc = postponeUserInput.psc;
  form.dokument.hlavicka.sidlo.obec = postponeUserInput.obec;
  form.dokument.hlavicka.sidlo.ulica = postponeUserInput.ulica;
  form.dokument.hlavicka.sidlo.supisneOrientacneCislo = postponeUserInput.cislo;
  form.dokument.hlavicka.sidlo.stat = postponeUserInput.stat;

  form.dokument.hlavicka.novaLehota.predlzenie493a = postponeUserInput.prijmy_zo_zahranicia
    ? '0'
    : '1';

  form.dokument.hlavicka.novaLehota.predlzenie493b = postponeUserInput.prijmy_zo_zahranicia
    ? '1'
    : '0';

  form.dokument.hlavicka.novaLehota.datumLehota = postponeUserInput.prijmy_zo_zahranicia
    ? '30.09.2020'
    : '30.06.2020';

  form.dokument.hlavicka.vypracoval.dna = postponeUserInput.datum;

  return form;
}

export function convertPostponeToXML(postponeUserInput: PostponeUserInput) {
  const jsonForm = convertPostponeToJson(postponeUserInput);
  let XMLForm = `<?xml version="1.0" encoding="utf-8"?>\n`;
  XMLForm += xmljs.js2xml(jsonForm, {
    compact: true,
    spaces: 3,
  });

  return XMLForm;
}
