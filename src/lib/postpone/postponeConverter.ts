import xmljs from 'xml-js';
import cloneDeep from 'lodash.clonedeep';
import { postponeBasis } from './postponeBasis';
import { PostponeUserInput } from '../../types/PostponeUserInput';
import { PostponeOutput } from './PostponeOutput';

// TODO remove fallbacks, they should be unncessary now
export function convertPostponeToJson(
  postponeUserInput: PostponeUserInput,
): PostponeOutput {
  const form: PostponeOutput = cloneDeep(postponeBasis);
  form.dokument.hlavicka.dic = postponeUserInput.dic;
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
