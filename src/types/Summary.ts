import Decimal from 'decimal.js'

export interface Summary {
  prijmy: Decimal
  zdravotnePoistne: Decimal
  socialnePoistne: Decimal
  zaplatenePoistneSpolu: Decimal
  zvyhodnenieNaManz: Decimal
  danovyBonusNaDieta: Decimal
  prispevokNaDochodkovePoist: Decimal
  zakladDane: Decimal
  danovyPreplatok: Decimal
  danNaUhradu: Decimal
  zaplatenePreddavky: Decimal
}
