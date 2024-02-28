import Decimal from 'decimal.js'

export interface Summary {
  prijmy: Decimal
  pausalneVydavky: Decimal
  zaplatenePoistneSpolu: Decimal
  nezdanitelnaCastNaSeba: Decimal
  nezdanitelnaCastNaPartnera: Decimal
  zakladDane: Decimal
  danSpolu: Decimal
  preddavkyNaDan: Decimal
  danovyBonusNaDeti: Decimal
  danovyBonusNaUroky: Decimal
  danovyBonusNaVyplatenie: Decimal
  danovyBonysNaVyplatenieUroky: Decimal
  danovyPreplatokNaVyplatenie: Decimal
  danNaUhradu: Decimal
  prijemNehnutelnost: Decimal,
  vydavkyNehnutelnost: Decimal,
}
