import { TaxForm } from '../../types/TaxForm';
import { completeInput } from '../../../__tests__/testCases/completeInput';

/** This file is mostly deprecated, use /__tests__/testCases/completeInput */
const basicTaxForm: TaxForm = {
  ...completeInput,
  r001_dic: '111111111',
  // R002_datum_narodenia: "22.2.1993",
  r003_nace: '62232',
  r004_priezvisko: 'Retzer',
  r005_meno: 'Julius',
  r007_ulica: 'Kastielska',
  r008_cislo: '13',
  r009_psc: '82105',
  r010_obec: 'Bratislava',
  r011_stat: 'Slovensko',
  t1r2_prijmy: 20000,
  t1r10_prijmy: 20000,
  t1r10_vydavky: 14000, // Pausalne 12000 + 2000 poistne
  r041: 20000,
  r042: 14000,
  r043: 6000,
  // r044: 0,
  r047: 6000,
  r055: 6000,
  r057: 6000,
  r072_pred_znizenim: 6000,
  r073: 3937.35,
  r077_nezdanitelna_cast: 3937.35,
  r078_zaklad_dane_z_prijmov: 2062.65,
  r080_zaklad_dane_celkovo: 2062.65,
  r081: 391.9,
  r090: 391.9,
  r105_dan: 391.9,
  r107: 391.9,
  r113: 391.9,
  r125_dan_na_uhradu: 391.9,
  r029_poberal_dochodok: true,
  r030_vyska_dochodku: 800,
  priloha3_r08_poistne: 2000,
  priloha3_r11_socialne: 1000,
  priloha3_r13_zdravotne: 1000,
  r037_uplatnuje_uroky: true,
  r037_zaplatene_uroky: 200,
  r037_pocetMesiacov: 12,
  datum: '19.02.2020',
};

export default basicTaxForm;
