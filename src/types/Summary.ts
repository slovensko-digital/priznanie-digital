import Decimal from 'decimal.js'

export interface Summary {
  prijmy: Decimal
  pausalneVydavky: Decimal
  zaplatenePoistneSpolu: Decimal
  nezdanitelnaCastNaSeba: Decimal
  nezdanitelnaCastNaPartnera: Decimal
  prispevkyNaDochodkovePoistenie: Decimal
  zakladDane: Decimal
  danSpolu: Decimal
  preddavkyNaDan: Decimal
  danovyBonusNaDeti: Decimal
  danovyBonusNaUroky: Decimal
  danovyBonusPreplatokNaVyplatenie: Decimal
  danNaUhradu: Decimal
  prijemNehnutelnost: Decimal,
  vydavkyNehnutelnost: Decimal,
}
