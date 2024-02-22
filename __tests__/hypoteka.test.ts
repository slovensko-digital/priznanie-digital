import { TAX_YEAR } from '../src/lib/calculation'
import { validate } from '../src/pages/uroky'
import { testValidation } from './utils/testValidation'

describe.only('hypoteka', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { r035_uplatnuje_uroky: undefined },
        expected: ['r035_uplatnuje_uroky'],
      },
      { input: { r035_uplatnuje_uroky: false }, expected: [] },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 1,
        },
        expected: ['uroky_dalsi_uver_uplatnuje'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 2,
        },
        expected: ['uroky_rok_uzatvorenia', 'uroky_zaciatok_urocenia_den', 'uroky_zaciatok_urocenia_mesiac', 'uroky_zaciatok_urocenia_rok'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          uroky_rok_uzatvorenia: TAX_YEAR-1,
          hypoteka_step: 2,
        },
        expected: ['uroky_zaciatok_urocenia_den', 'uroky_zaciatok_urocenia_mesiac', 'uroky_zaciatok_urocenia_rok'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          uroky_rok_uzatvorenia: TAX_YEAR-1,
          uroky_zaciatok_urocenia_den: '1',
          uroky_zaciatok_urocenia_mesiac: '1',
          uroky_zaciatok_urocenia_rok: TAX_YEAR-1,
          hypoteka_step: 2,
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 3,
        },
        expected: ['uroky_dalsi_dlznik'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 3,
          uroky_dalsi_dlznik: true,
        },
        expected: ['uroky_pocet_dlznikov'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 3,
          uroky_dalsi_dlznik: false,
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 4,
        },
        expected: ['uroky_splnam_vek_kriteria'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 4,
          uroky_splnam_vek_kriteria: true,
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 5,
        },
        expected: ['uroky_splnam_prijem'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 5,
          uroky_splnam_prijem: true,
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 6,
          r035_zaplatene_uroky: undefined,
        },
        expected: ['r035_zaplatene_uroky'],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 6,
          r035_zaplatene_uroky: '123,45',
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 6,
          r035_zaplatene_uroky: '123.45',
        },
        expected: [],
      },
      {
        input: {
          r035_uplatnuje_uroky: true,
          hypoteka_step: 6,
          r035_zaplatene_uroky: '123,45a',
        },
        expected: ['r035_zaplatene_uroky'],
      }
    ])
  })
})
