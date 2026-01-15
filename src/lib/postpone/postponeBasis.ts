import { PostponeOutput } from './PostponeOutput'

export const postponeBasis: PostponeOutput = {
  dokument: {
    hlavicka: {
      dic: '',
      zaRok: 'xxxx',
      datumOd: '',
      datumDo: '',
      dovodDoplnenia: '0',
      datumPovodne: '',
      fyzickaOsoba: {
        priezvisko: '',
        meno: '',
        titulPred: '',
        titulZa: '',
        rodneCislo: { rcPredLom: '', rcZaLom: '' },
        datumNarodenia: '',
      },
      pravnickaOsoba: {
        obchodneMeno: {
          riadok: ''
        },
        ico: '',
      },
      sidlo: {
        ulica: '',
        supisneOrientacneCislo: '',
        psc: '',
        obec: '',
        stat: '',
      },
      adresaSr: {
        ulica: '',
        supisneOrientacneCislo: '',
        psc: '',
        obec: '',
      },
      novaLehota: {
        predlzenie493a: '1',
        predlzenie493b: '0',
        datumLehota: '30.06.2022',
      },
      vypracoval: {
        vypr: '',
        dna: 'xxx',
        telefon: '',
      },
      podpis: '1',
    },
  },
}
