export const getCity = (zip: string) => {
  return fetch(`https://api.posta.sk/private/search?q=${zip}&m=zip`)
    .then(response => response.json())
    .then(pscData => {
      return pscData &&
        pscData.offices &&
        pscData.offices[0] &&
        pscData.offices[0].name
        ? pscData.offices[0].name
        : "";
    });
};

export interface AutoformPerson {
  name: string;
  id: string;
  tin: string;
  formatted_address: string;
  street: string;
  street_number: string;
  postal_code: string;
  municipality: string;
  country: string;
}

export const getAutoformByPersonName = (
  firstName: string,
  lastName: string,
): Promise<AutoformPerson[]> => {
  return fetch(
    `api/autoform?firstName=${firstName}&lastName=${lastName}`,
  ).then(response => response.json());

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
