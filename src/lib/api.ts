import fetch from 'isomorphic-unfetch';
import {
  AutoformResponseBody,
  PSCResponseBody,
  SaveEmailAttributes,
  SaveEmailResponse,
} from '../types/api';

export const getCity = async (zip: string) => {
  const response = await fetch(
    `https://api.posta.sk/private/search?q=${zip}&m=zip`,
  );
  const pscData: PSCResponseBody = await response.json();
  return pscData?.offices?.[0].name ?? '';
};

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/autoform?name=${name}`).then(response => response.json());
};

export const saveEmail = async (
  email: string,
  attributes: SaveEmailAttributes,
): Promise<SaveEmailResponse> => {
  return fetch('/api/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, attributes }),
  }).then(response => response.json());
};
