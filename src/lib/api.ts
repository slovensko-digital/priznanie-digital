import {
  AutoformResponseBody,
  PSCResponseBody,
  SaveEmailAttributes,
  SaveEmailResponse,
} from '../types/api';
import fetch from 'isomorphic-unfetch';

export const getCity = async (zip: string) => {
  const response = await fetch(
    `https://api.posta.sk/private/search?q=${zip}&m=zip`,
  );
  const pscData: PSCResponseBody = await response.json();
  return pscData?.offices?.[0]?.name ?? '';
};

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/autoform?name=${name}`).then(response => response.json());

  /** In case of just testing on localhost
    return [
      {
        id: 1358414,
        cin: "50 158 635",
        tin: 2120264674,
        vatin: null,
        name: "Slovensko.Digital",
        datahub_corporate_body: {
          id: 1358414,
          url:
            "https://datahub.ekosystem.slovensko.digital/api/datahub/corporate_bodies/1358414",
        },
        formatted_address:
          "Staré Grunty 6207/12, 841 04 Bratislava - mestská časť Karlova Ves",
        street: "Staré Grunty",
        reg_number: 6207,
        building_number: "12",
        street_number: "6207/12",
        formatted_street: "Staré Grunty 6207/12",
        postal_code: "841 04",
        municipality: "Bratislava - mestská časť Karlova Ves",
        country: "Slovenská republika",
        established_on: "2016-01-29",
        terminated_on: null,
        vatin_paragraph: null,
        registration_office: "MV SR",
        registration_number: "VVS/1-900/90-48099",
      },
    ];
     */
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
