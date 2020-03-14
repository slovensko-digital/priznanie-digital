export interface PostponeUserInput {
  prijmyZoZahranicia?: boolean;
  rodne_cislo: string;
  dic: string;
  prijmy_zo_zahranicia: boolean;

  /**   01 - DIČ (ak nie je pridelené| uvádza sa rodné číslo)*/
  // r001_dic: string;
  // /** Spoločné pole pre meno a priezvisko **/
  // meno_priezvisko: string;
  // /**   07 - Ulica*/
  // r007_ulica: string;
  // /**   08 - Súpisné/orientačné číslo **/
  // r008_cislo: string;
  // /**   09 - PSČ **/
  // r009_psc: string;
  // /**   10 - Obec **/
  // r010_obec: string;
  // /**   11 - Štát **/
  // r011_stat: string;
}
