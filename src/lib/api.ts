import { AutoformResponseBody, PSCResponseBody } from '../types/api';

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
  name: string,
  email: string,
  newsletter: boolean,
): Promise<boolean> => {
  // TODO make it POST and send info in the body
  return fetch(
    `/api/email?name=${name}&email=${email}&newsletter=${
      newsletter ? 'true' : 'false'
    }`,
  ).then(response => response.json());
};
