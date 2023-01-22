export interface AutoFormSubject {
  id: number
  /**  IČ0 */
  cin: string
  /**  DIČ niekedy sa z api vracia null*/
  tin?: string
  /** IČ DPH */
  vatin: string;
  name: string;
  formatted_address: string;
  street: string;
  reg_number?: string;
  building_number: string;
  street_number: string;
  formatted_street: string;
  postal_code: string;
  municipality: string;
  country: string;
  established_on: string;
  terminated_on?: null;
  vatin_paragraph: string;
  registration_office: string;
  registration_number: string;
  main_corporate_body?: null;
  updated_at: string;
  legal_form?: string;
  main_economic_activity: MainEconomicActivity;
  statutory_bodies?: (Statutory)[] | null;
  statutory?: (Statutory)[] | null;
  datahub_corporate_body: DatahubCorporateBody;
  value: string;
}
export interface MainEconomicActivity {
  code: string;
  name: string;
}
export interface Statutory {
  type: string;
  first_name: string;
  last_name: string;
  prefixes: string;
  postfixes: string;
  formatted_name: string;
  street: string;
  reg_number?: null;
  building_number: string;
  postal_code: string;
  municipality: string;
  country: string;
}
export interface DatahubCorporateBody {
  id: number;
  url: string;
}