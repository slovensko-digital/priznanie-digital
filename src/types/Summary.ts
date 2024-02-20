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
  danovyBonusNaVyplatenie: Decimal
  danovyPreplatokNaVyplatenie: Decimal
  danNaUhradu: Decimal
}
