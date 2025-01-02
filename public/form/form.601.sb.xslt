<!--<?xml version="1.0" encoding="UTF-8"?>-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="text" indent="yes" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*" />
  <xsl:template match="/dokument">
    <xsl:text>DAŇOVÉ PRIZNANIE K DANI Z PRÍJMOV FYZICKEJ OSOBY pre daňovníka, ktorý má príjmy podľa § 5 až 8 zákona č. 595/2003 Z. z. o dani z príjmov v znení neskorších predpisov (ďalej len "zákon")</xsl:text>
    <xsl:apply-templates select="./hlavicka"/>
    <xsl:apply-templates select="./telo"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:apply-templates select="./typDP"/>
    <xsl:apply-templates select="./dic"/>
    <xsl:apply-templates select="./datumNarodenia"/>
    <xsl:apply-templates select="./zdanovacieObdobie"/>
    <xsl:apply-templates select="./skNace"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>I. ODDIEL - ÚDAJE O DAŇOVNÍKOVI</xsl:text>
    <xsl:apply-templates select="./priezvisko"/>
    <xsl:apply-templates select="./meno"/>
    <xsl:apply-templates select="./titul"/>
    <xsl:apply-templates select="./titulZa"/>
    <xsl:apply-templates select="./adresaTrvPobytu"/>
    <xsl:apply-templates select="./nerezident"/>
    <xsl:apply-templates select="./prepojeniePar2"/>
    <xsl:apply-templates select="./adresaObvPobytu"/>
    <xsl:apply-templates select="./zastupca"/>
  </xsl:template>
	<xsl:template match="/dokument/hlavicka/nerezident">
		<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>Sekcia rezident: </xsl:text>
		<xsl:apply-templates select="./nerezident" />
		<xsl:if test="nerezident = '1'">
			<xsl:apply-templates select="./datumOd" />
			<xsl:apply-templates select="./datumDo" />
			<xsl:apply-templates select="./TIN" />
		</xsl:if>
		<xsl:text>&#xA;</xsl:text>
	</xsl:template>

	<xsl:template match="nerezident">
		<xsl:if test="./text()">
			<xsl:text>&#xA;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>12 - Daňový nerezident: </xsl:text>
			<xsl:call-template name="string-replace-all">
				<xsl:with-param name="text" select="." />
				<xsl:with-param name="replace" select="'&#10;'" />
				<xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
	<xsl:template match="datumOd">
		<xsl:if test="./text()">
			<xsl:text>&#xA;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>Dátum od: </xsl:text>
			<xsl:call-template name="string-replace-all">
				<xsl:with-param name="text" select="." />
				<xsl:with-param name="replace" select="'&#10;'" />
				<xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<xsl:template match="datumDo">
		<xsl:if test="./text()">
			<xsl:text>&#xA;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>Dátum do: </xsl:text>
			<xsl:call-template name="string-replace-all">
				<xsl:with-param name="text" select="." />
				<xsl:with-param name="replace" select="'&#10;'" />
				<xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<xsl:template match="TIN">
		<xsl:if test="./text()">
			<xsl:text>&#xA;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>&#09;</xsl:text>
			<xsl:text>Identifikačné číslo na daňové účely (TIN), pridelené v štáte daňovej rezidencie: </xsl:text>
			<xsl:call-template name="string-replace-all">
				<xsl:with-param name="text" select="." />
				<xsl:with-param name="replace" select="'&#10;'" />
				<xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
  <xsl:template match="/dokument/hlavicka/typDP">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Druh daňov&#233;ho priznania</xsl:text>
    <xsl:apply-templates select="./rdp"/>
    <xsl:apply-templates select="./odp"/>
    <xsl:apply-templates select="./ddp"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zdanovacieObdobie">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./datumDDP"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/skNace">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>03 - SK NACE - Hlavná, prevažná činnosť</xsl:text>
    <xsl:apply-templates select="./cinnost"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>kód: </xsl:text>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="./k1" />
      <xsl:with-param name="replace" select="'&#10;'" />
      <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
    </xsl:call-template>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="./k2" />
      <xsl:with-param name="replace" select="'&#10;'" />
      <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
    </xsl:call-template>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="./k3" />
      <xsl:with-param name="replace" select="'&#10;'" />
      <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
    </xsl:call-template>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Adresa trval&#233;ho pobytu v deň podania daňov&#233;ho priznania na &#250;zem&#237; Slovenskej republiky alebo v zahranič&#237;</xsl:text>
    <xsl:apply-templates select="./ulica"/>
    <xsl:apply-templates select="./cislo"/>
    <xsl:apply-templates select="./psc"/>
    <xsl:apply-templates select="./obec"/>
    <xsl:apply-templates select="./stat"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaObvPobytu">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Adresa bydliska alebo adresa pobytu na území Slovenskej republiky, kde sa daňovník zdržiaval v zdaňovacom období</xsl:text>
    <xsl:apply-templates select="./ulica"/>
    <xsl:apply-templates select="./cislo"/>
    <xsl:apply-templates select="./psc"/>
    <xsl:apply-templates select="./obec"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>II. ODDIEL - &#218;DAJE O Z&#193;KONNOM Z&#193;STUPCOVI ALEBO DEDIČOVI ALEBO Z&#193;STUPCOVI ALEBO SPR&#193;VCOVI V KONKURZNOM KONAN&#205;, KTOR&#221; POD&#193;VA DAŇOV&#201; PRIZNANIE (ďalej len &quot;z&#225;stupca&quot;)</xsl:text>
    <xsl:apply-templates select="./priezvisko"/>
    <xsl:apply-templates select="./meno"/>
    <xsl:apply-templates select="./titul"/>
    <xsl:apply-templates select="./titulZa"/>
    <xsl:apply-templates select="./rodneCislo"/>
    <xsl:apply-templates select="./ulica"/>
    <xsl:apply-templates select="./cislo"/>
    <xsl:apply-templates select="./psc"/>
    <xsl:apply-templates select="./obec"/>
    <xsl:apply-templates select="./stat"/>
    <xsl:apply-templates select="./tel"/>
    <xsl:apply-templates select="./email"/>
  </xsl:template>
  <xsl:template match="/dokument/telo">
    <!--<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>Telo</xsl:text>-->
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>III. ODDIEL - ÚDAJE NA UPLATNENIE ZNÍŽENIA ZÁKLADU DANE (§ 11 zákona) A DAŇOVÉHO BONUSU (§ 33 zákona)</xsl:text>
    <xsl:apply-templates select="./r29"/>
    <xsl:apply-templates select="./r30"/>
    <xsl:apply-templates select="./r31"/>
    <xsl:apply-templates select="./r32"/>
    <xsl:apply-templates select="./r33"/>
    <xsl:apply-templates select="./r33a"/>
    <xsl:apply-templates select="./uplatnujemPar33Ods8"/>
    <xsl:apply-templates select="./r34"/>
    <xsl:apply-templates select="./r34a"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>IV. ODDIEL - ÚDAJE NA UPLATNENIE DAŇOVÉHO BONUSU NA ZAPLATENÉ ÚROKY (§ 33a zákona)</xsl:text>
    <xsl:apply-templates select="./r35"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>V. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV ZO ZÁVISLEJ ČINNOSTI (§ 5 zákona) - v eurách</xsl:text>
    <xsl:apply-templates select="./r36"/>
    <xsl:apply-templates select="./r36a"/>
    <xsl:apply-templates select="./r37"/>
    <xsl:apply-templates select="./r38"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>VI. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV Z PODNIKANIA, Z INEJ SAMOSTATNEJ ZÁROBKOVEJ ČINNOSTI, Z PRENÁJMU A Z POUŽITIA DIELA A UMELECKÉHO VÝKONU (§ 6 zákona) - v eurách</xsl:text>
    <xsl:apply-templates select="./tabulka1"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:apply-templates select="./mikrodanovnikPar2w"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Uplatňujem preukázateľné výdavky z daňovej evidencie podľa § 6 ods. 11 zákona</xsl:text>
    <xsl:apply-templates select="./vydavkyPar6ods11_ods1a2"/>
    <xsl:apply-templates select="./vydavkyPar6ods11_ods3"/>
    <xsl:apply-templates select="./vydavkyPar6ods11_ods4"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Uplatňujem výdavky percentom z príjmov podľa § 6 ods. 10 zákona</xsl:text>
    <xsl:apply-templates select="./vydavkyPar6ods10_ods1a2"/>
    <xsl:apply-templates select="./vydavkyPar6ods10_ods4"/>
    <xsl:apply-templates select="./vydavkyPoistPar6ods11_ods1a2"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Uplatňujem osobitný spôsob zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</xsl:text>
    <xsl:apply-templates select="./uplatnujemPar17ods17_ods1a2"/>
    <xsl:apply-templates select="./uplatnujemPar17ods17_ods3a4"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Ukončujem uplatňovanie osobitného spôsobu zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</xsl:text>
    <xsl:apply-templates select="./ukoncujemUplatnovaniePar17ods17_ods1a2"/>
    <xsl:apply-templates select="./ukoncujemUplatnovaniePar17ods17_ods3a4"/>
    <xsl:apply-templates select="./tabulka1a"/>
    <xsl:apply-templates select="./tabulka1b"/>
    <xsl:apply-templates select="./r39"/>
    <xsl:apply-templates select="./r40"/>
    <xsl:apply-templates select="./r41"/>
    <xsl:apply-templates select="./r42"/>
    <xsl:apply-templates select="./r43"/>
    <xsl:apply-templates select="./r44"/>
    <xsl:apply-templates select="./r45"/>
    <xsl:apply-templates select="./r46"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Daňová strata uplatňovaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona</xsl:text>
    <xsl:apply-templates select="./r47"/>
    <xsl:apply-templates select="./r48"/>
    <xsl:apply-templates select="./r49"/>
    <xsl:apply-templates select="./r50"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Uplatnenie daňovej straty z predchádzajúcich zdaňovacích období v príslušnom zdaňovacom období</xsl:text>
    <xsl:apply-templates select="./r51"/>
    <xsl:apply-templates select="./r52"/>
    <xsl:apply-templates select="./r53"/>
    <xsl:apply-templates select="./r54"/>
    <xsl:apply-templates select="./r55"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Uplatnenie odpočtu výdavkov (nákladov) na výskum a vývoj podľa § 30c zákona a odpočtu výdavkov (nákladov) na investície podľa § 30e zákona (vypĺňa sa aj príloha č. 1, resp. aj príloha č. 1b)</xsl:text>
    <xsl:apply-templates select="./r56"/>
    <xsl:apply-templates select="./r57"/>
    <xsl:apply-templates select="./r58"/>
    <xsl:apply-templates select="./r59"/>
    <xsl:apply-templates select="./r60"/>
    <xsl:apply-templates select="./r61"/>
    <xsl:apply-templates select="./r62"/>
    <xsl:apply-templates select="./r63"/>
    <xsl:apply-templates select="./r64"/>
    <xsl:apply-templates select="./r65"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>VII. ODDIEL - VÝPOČET OSOBITNÉHO ZÁKLADU DANE Z PRÍJMOV Z KAPITÁLOVÉHO MAJETKU (§ 7 zákona) - v eurách</xsl:text>
    <xsl:apply-templates select="./tabulka2"/>
    <xsl:apply-templates select="./r66"/>
    <xsl:apply-templates select="./r67"/>
    <xsl:apply-templates select="./r68"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>VIII. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z OSTATNÝCH PRÍJMOV (§ 8 zákona) - v eurách</xsl:text>
    <xsl:apply-templates select="./tabulka3"/>
    <xsl:apply-templates select="./r69"/>
    <xsl:apply-templates select="./r70"/>
    <xsl:apply-templates select="./r71"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>IX. ODDIEL - VÝPOČET DANE podľa § 15 zákona - v eurách</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Zníženie základu dane o nezdaniteľné časti podľa § 11 zákona</xsl:text>
    <xsl:apply-templates select="./r72"/>
    <xsl:apply-templates select="./r73"/>
    <xsl:apply-templates select="./r74"/>
    <xsl:apply-templates select="./r75"/>
    <xsl:apply-templates select="./r77"/>
    <xsl:apply-templates select="./r78"/>
    <xsl:apply-templates select="./r79"/>
    <xsl:apply-templates select="./r80"/>
    <xsl:apply-templates select="./r81"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane zo základu dane zisteného podľa § 4 ods. 1 písm. a) zákona po vyňatí príjmov zo zdrojov v zahraničí</xsl:text>
    <xsl:apply-templates select="./r82"/>
    <xsl:apply-templates select="./r83"/>
    <xsl:apply-templates select="./r84"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane zo základu dane zisteného podľa § 4 ods. 1 písm a) zákona uznanej na zápočet na tuzemskú daňovú povinnosť zo zaplatenej dane v zahraničí podľa zmluvy o zamedzení dvojitého zdanenia (§ 45 ods. 1 zákona)</xsl:text>
    <xsl:apply-templates select="./r85"/>
    <xsl:apply-templates select="./r86"/>
    <xsl:apply-templates select="./r87"/>
    <xsl:apply-templates select="./r88"/>
    <xsl:apply-templates select="./r89"/>
    <xsl:apply-templates select="./r90"/>
    <xsl:apply-templates select="./r91"/>
    <xsl:apply-templates select="./r92"/>
    <xsl:apply-templates select="./r93"/>
    <xsl:apply-templates select="./r94"/>
    <xsl:apply-templates select="./r95"/>
    <xsl:apply-templates select="./r96"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane zo základu dane zisteného podľa § 4 ods. 1 písm. b) zákona po vyňatí príjmov zo zdrojov v zahraničí</xsl:text>
    <xsl:apply-templates select="./r97"/>
    <xsl:apply-templates select="./r98"/>
    <xsl:apply-templates select="./r99"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane zo základu dane zisteného podľa § 4 ods. 1 písm b) zákona uznanej na zápočet na tuzemskú daňovú povinnosť zo zaplatenej dane v zahraničí podľa zmluvy o zamedzení dvojitého zdanenia (§ 45 ods. 1 zákona)</xsl:text>
    <xsl:apply-templates select="./r100"/>
    <xsl:apply-templates select="./r101"/>
    <xsl:apply-templates select="./r102"/>
    <xsl:apply-templates select="./r103"/>
    <xsl:apply-templates select="./r104"/>
    <xsl:apply-templates select="./r105"/>
    <xsl:apply-templates select="./r106"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane z osobitného základu dane podľa § 7 zákona po vyňatí príjmov zo zdrojov v zahraničí</xsl:text>
    <xsl:apply-templates select="./r107"/>
    <xsl:apply-templates select="./r108"/>
    <xsl:apply-templates select="./r109"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane z osobitného základu dane podľa § 7 zákona uznanej na zápočet na tuzemskú daňovú povinnosť zo zaplatenej dane v zahraničí podľa zmluvy o zamedzení dvojitého zdanenia (§ 45 ods. 1 zákona)</xsl:text>
    <xsl:apply-templates select="./r110"/>
    <xsl:apply-templates select="./r111"/>
    <xsl:apply-templates select="./r112"/>
    <xsl:apply-templates select="./r113"/>
    <xsl:apply-templates select="./r114"/>
    <xsl:apply-templates select="./r115"/>
    <xsl:apply-templates select="./r116"/>
    <xsl:apply-templates select="./r116a"/>
    <xsl:apply-templates select="./r117"/>
    <xsl:apply-templates select="./r118"/>
    <xsl:apply-templates select="./r119"/>
    <xsl:apply-templates select="./r120"/>
    <xsl:apply-templates select="./r121"/>
    <xsl:apply-templates select="./r122"/>
    <xsl:apply-templates select="./r123"/>
    <xsl:apply-templates select="./r124"/>
    <xsl:apply-templates select="./r125"/>
    <xsl:apply-templates select="./r126"/>
    <xsl:apply-templates select="./r127"/>
    <xsl:apply-templates select="./r128"/>
    <xsl:apply-templates select="./r129"/>
    <xsl:apply-templates select="./r130"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Zrazený preddavok na daň</xsl:text>
    <xsl:apply-templates select="./r131"/>
    <xsl:apply-templates select="./r132"/>
    <xsl:apply-templates select="./r133"/>
    <xsl:apply-templates select="./r134"/>
    <xsl:apply-templates select="./r135"/>
    <xsl:apply-templates select="./r136"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>X. ODDIEL - ROZDIELY Z DODATOČNÉHO DAŇOVÉHO PRIZNANIA - v eurách</xsl:text>
    <xsl:apply-templates select="./r137"/>
    <xsl:apply-templates select="./r138"/>
    <xsl:apply-templates select="./r139"/>
    <xsl:apply-templates select="./r140"/>
    <xsl:apply-templates select="./r141"/>
    <xsl:apply-templates select="./r142"/>
    <xsl:apply-templates select="./r143"/>
    <xsl:apply-templates select="./r144"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>XI. ODDIEL - ÚDAJE O DAŇOVNÍKOVI S OBMEDZENOU DAŇOVOU POVINNOSŤOU (nerezidentovi)</xsl:text>
    <xsl:apply-templates select="./r145"/>
    <xsl:apply-templates select="./r146"/>
    <xsl:apply-templates select="./r147"/>
    <xsl:apply-templates select="./r148"/>
    <xsl:apply-templates select="./r149"/>
    <xsl:apply-templates select="./r150"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>XII. ODDIEL - VYHLÁSENIE o poukázaní podielu zaplatenej dane z príjmov fyzickej osoby podľa § 50 zákona</xsl:text>
    <xsl:apply-templates select="./neuplatnujem"/>
    <xsl:apply-templates select="./splnam3per"/>
    <xsl:apply-templates select="./r151"/>
    <xsl:apply-templates select="./r152"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>XIII. ODDIEL - MIESTO NA OSOBITNÉ ZÁZNAMY DAŇOVNÍKA</xsl:text>
    <xsl:apply-templates select="./osobitneZaznamy"/>
    <xsl:apply-templates select="./r153"/>
    <xsl:apply-templates select="./datumVyhlasenia"/>
    <xsl:apply-templates select="./danovyPreplatokBonus"/>
    <xsl:apply-templates select="./prilPar30cOdpocetVydavkov"/>
    <xsl:apply-templates select="./pril1bPar30eVydavkyInvesticie"/>
    <xsl:apply-templates select="./prilPodielyNaZisku"/>
    <xsl:apply-templates select="./socZdravPoistenie"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r31">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#218;daje o manželke (manželovi), ktor&#225;(&#253;) žije s daňovn&#237;kom v dom&#225;cnosti na uplatnenie nezdaniteľných častí základu dane</xsl:text>
    <xsl:apply-templates select="./priezviskoMeno"/>
    <xsl:apply-templates select="./rodneCislo"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r32">
    <xsl:text>&#xA;</xsl:text>
    <xsl:apply-templates select="./uplatnujemNCZDNaManzela"/>
    <xsl:apply-templates select="./vlastnePrijmy"/>
    <xsl:apply-templates select="./pocetMesiacov"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Údaje o vyživovaných deťoch žijúcich s daňovníkom v domácnosti na uplatnenie daňového zvýhodnenia na vyživované dieťa podľa § 33 zákona (ďalej len "daňový bonus podľa zákona")</xsl:text>
    <xsl:apply-templates select="./dieta"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Dieťa</xsl:text>
    <xsl:apply-templates select="./priezviskoMeno"/>
    <xsl:apply-templates select="./rodneCislo"/>
    <xsl:apply-templates select="./kupelnaStarostlivost"/>
    <xsl:apply-templates select="./m00"/>
    <xsl:apply-templates select="./m01"/>
    <xsl:apply-templates select="./m02"/>
    <xsl:apply-templates select="./m03"/>
    <xsl:apply-templates select="./m04"/>
    <xsl:apply-templates select="./m05"/>
    <xsl:apply-templates select="./m06"/>
    <xsl:apply-templates select="./m07"/>
    <xsl:apply-templates select="./m08"/>
    <xsl:apply-templates select="./m09"/>
    <xsl:apply-templates select="./m10"/>
    <xsl:apply-templates select="./m11"/>
    <xsl:apply-templates select="./m12"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34">
    <xsl:text>&#xA;</xsl:text>
    <xsl:apply-templates select="./priezviskoMeno"/>
    <xsl:apply-templates select="./rodneCislo"/>
    <xsl:apply-templates select="./m00"/>
    <xsl:apply-templates select="./m01"/>
    <xsl:apply-templates select="./m02"/>
    <xsl:apply-templates select="./m03"/>
    <xsl:apply-templates select="./m04"/>
    <xsl:apply-templates select="./m05"/>
    <xsl:apply-templates select="./m06"/>
    <xsl:apply-templates select="./m07"/>
    <xsl:apply-templates select="./m08"/>
    <xsl:apply-templates select="./m09"/>
    <xsl:apply-templates select="./m10"/>
    <xsl:apply-templates select="./m11"/>
    <xsl:apply-templates select="./m12"/>
    <xsl:apply-templates select="./druhaOsobaPodalaDPvSR"/>
    <xsl:apply-templates select="./dokladRocZuct"/>
    <xsl:apply-templates select="./dokladVyskaDane"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Tabuľka č. 1 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 6 z&#225;kona (vypĺňa sa, len ak daňovn&#237;k &#250;čtuje v s&#250;stave jednoduch&#233;ho &#250;čtovn&#237;ctva alebo uplatňuje v&#253;davky percentom z pr&#237;jmov, alebo vedie evidenciu podľa &#167; 6 ods. 11 z&#225;kona)</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>R. Druh príjmov podľa &#167; 6 zákona</xsl:text>
    <xsl:apply-templates select="./t1r1"/>
    <xsl:apply-templates select="./t1r2"/>
    <xsl:apply-templates select="./t1r3"/>
    <xsl:apply-templates select="./t1r4"/>
    <xsl:apply-templates select="./t1r5"/>
    <xsl:apply-templates select="./t1r6"/>
    <xsl:apply-templates select="./t1r7"/>
    <xsl:apply-templates select="./t1r8"/>
    <xsl:apply-templates select="./t1r9"/>
    <xsl:apply-templates select="./t1r10"/>
    <xsl:apply-templates select="./t1r11"/>
    <xsl:apply-templates select="./t1r12"/>
    <xsl:apply-templates select="./t1r13"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1 z poľnohospod&#225;rskej v&#253;roby, lesn&#233;ho a vodn&#233;ho hospod&#225;rstva / ods. 1 písm. a)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r2">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2 zo živnosti / ods. 1 písm. b)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r3">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3 z podnikania vykon&#225;van&#233;ho podľa osobitn&#253;ch predpisov / ods. 1 písm. c)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r4">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4 spoločn&#237;kov v. o. s. a komplement&#225;rov kom. spol. / ods. 1 písm. d)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r5">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5 z vytvorenia diela a z podania umeleckého výkonu, pri ktorých daňovník uplatnil postup podľa § 43 ods. 14 zákona a z vydávania, rozmnožovania a rozširovania diel na vlastné náklady a z vytvorenia alebo zhotovenia iného predmetu duševného vlastníctva a z použitia iného predmetu duševného vlastníctva alebo z postúpenia práv k predmetu duševného vlastníctva /ods. 2 písm. a)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r6">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>6 z činnost&#237;, ktor&#233; nie s&#250; živnosťou ani podnikan&#237;m /ods. 2 písm. b)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r7">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>7 znalcov a tlmočn&#237;kov za činnosť podľa osobitn&#233;ho predpisu /ods. 2 písm. c)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r8">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>8 z činnost&#237; sprostredkovateľov, ktor&#233; nie s&#250; živnosťou /ods. 2 písm. d)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r9">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>9 z činnosti športovca alebo športov&#233;ho odborn&#237;ka podľa osobitn&#233;ho predpisu vr&#225;tane pr&#237;jmov na z&#225;klade zmluvy o sponzorstve v športe /ods. 2 písm. e)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r10">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>10 spolu r. 1 až 9</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r11">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>11 z pren&#225;jmu nehnuteľnost&#237; /ods. 3</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r12">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>12 z použitia diela a umeleck&#233;ho v&#253;konu, ak nepatria do pr&#237;jmov podľa &#167; 6 ods. 2 p&#237;sm. a) z&#225;kona uv&#225;dzan&#253;ch na r. 5 /ods. 4</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r13">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>13 spolu r. 11 a 12</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Tabuľka č. 1a - &#218;daje daňovn&#237;ka s pr&#237;jmami z podnikania, z inej samostatnej z&#225;robkovej činnosti, z pren&#225;jmu a z použitia diela a umeleck&#233;ho v&#253;konu z daňovej evidencie podľa &#167; 6 ods. 11 z&#225;kona a daňovn&#237;ka s pr&#237;jmami z pren&#225;jmu a z použitia diela a umeleck&#233;ho v&#253;konu z &#250;čtovn&#237;ctva podľa &#167; 6 ods. 13 z&#225;kona</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>R. Druh</xsl:text>
    <xsl:apply-templates select="./t1r1"/>
    <xsl:apply-templates select="./t1r2"/>
    <xsl:apply-templates select="./t1r3"/>
    <xsl:apply-templates select="./t1r4"/>
    <xsl:apply-templates select="./t1r5"/>
    <xsl:apply-templates select="./t1r6"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1 Zostatkov&#225; cena hmotn&#233;ho majetku zaraden&#233;ho do obchodn&#233;ho majetku</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r2">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2 Zostatkov&#225; cena nehmotn&#233;ho majetku zaraden&#233;ho do obchodn&#233;ho majetku</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r3">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3 Z&#225;soby</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r4">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4 Pohľad&#225;vky</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r5">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5 Z&#225;v&#228;zky</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r6">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>6 Finančný majetok</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1b">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Tabuľka č. 1b - &#218;daje daňovn&#237;ka s pr&#237;jmami z podnikania, z inej samostatnej z&#225;robkovej činnosti, z použitia diela a umeleck&#233;ho v&#253;konu z evidencie, ktor&#250; vedie podľa &#167; 6 ods. 10 z&#225;kona, ak uplatňuje v&#253;davky percentom z pr&#237;jmov</xsl:text>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>47</xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47/udaje">
    <xsl:apply-templates select="./r02"/>
    <xsl:apply-templates select="./r03"/>
    <xsl:apply-templates select="./r04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>47</xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48/udaje">
    <xsl:apply-templates select="./r02"/>
    <xsl:apply-templates select="./r03"/>
    <xsl:apply-templates select="./r04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>47</xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49/udaje">
    <xsl:apply-templates select="./r02"/>
    <xsl:apply-templates select="./r03"/>
    <xsl:apply-templates select="./r04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>51 : </xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>

  <xsl:template match="/dokument/telo/r50/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 Rok vykázania daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/udaje/r02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 Suma vykázanej daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/udaje/r03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>5 Suma daňovej straty, ktorá môže byť odpočítavaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r51">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>51 Uplatnenie daňovej straty vykázanej za rok 2020, najviac do sumy uvedenej v r. 4 stĺpec 47, maximálne však do sumy uvedenej v r. 45: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r52">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>52 Daňová strata z r. 48, maximálne do sumy uvedenej v r. 45: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <!--<xsl:template match="/dokument/telo/r52/udaje">
		<xsl:apply-templates select="./r02"/>
		<xsl:apply-templates select="./r03"/>
		<xsl:apply-templates select="./r04"/>
		<xsl:apply-templates select="./r05"/>
	</xsl:template>-->
  <xsl:template match="/dokument/telo/tabulka2">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Tabuľka č. 2 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 7 z&#225;kona</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>R. Druh príjmov podľa &#167; 7 zákona</xsl:text>
    <xsl:apply-templates select="./t2r1"/>
    <xsl:apply-templates select="./t2r2"/>
    <xsl:apply-templates select="./t2r3"/>
    <xsl:apply-templates select="./t2r4"/>
    <xsl:apply-templates select="./t2r5"/>
    <xsl:apply-templates select="./t2r6"/>
    <xsl:apply-templates select="./t2r7"/>
    <xsl:apply-templates select="./t2r8"/>
    <xsl:apply-templates select="./t2r9"/>
    <xsl:apply-templates select="./t2r10"/>
    <xsl:apply-templates select="./t2r11"/>
    <xsl:apply-templates select="./t2r12"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1 &#250;roky a ostatn&#233; v&#253;nosy z cenn&#253;ch papierov /ods. 1 písm. a)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r2">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2 &#250;roky, v&#253;hry a in&#233; v&#253;nosy z vkladov na vkladn&#253;ch knižk&#225;ch, z peňažn&#253;ch prostriedkov na vkladovom &#250;čte, na &#250;čte stavebn&#233;ho sporiteľa a z bežn&#233;ho &#250;čtu okrem &#250;rokov uveden&#253;ch v &#167; 6 ods. 5 p&#237;sm. b) z&#225;kona /ods. 1 písm. b)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r3">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3 &#250;roky a in&#233; v&#253;nosy z poskytnut&#253;ch &#250;verov a p&#244;žičiek a &#250;roky z hodnoty splaten&#233;ho vkladu v dohodnutej v&#253;ške spoločn&#237;kov verejn&#253;ch obchodn&#253;ch spoločnost&#237; /ods. 1 písm. c)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r4">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4 dávky z celoeurópskeho osobného dôchodkového produktu a dávky z doplnkového dôchodkového sporenia /ods. 1 písm. d)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r5">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5 plnenia z poistenia pre pr&#237;pad dožitia určit&#233;ho veku; jednorazov&#233; vyrovnanie alebo odbytn&#233; vypl&#225;can&#233; v pr&#237;pade poistenia os&#244;b pri predčasnom skončen&#237; poistenia /ods. 1 písm. e)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r6">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>6 v&#253;nosy zo zmeniek okrem pr&#237;jmov z ich predaja /ods. 1 písm. f)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r7">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>7 pr&#237;jmy z podielov&#253;ch listov dosiahnut&#233; z ich vyplatenia (vr&#225;tenia) /ods. 1 písm. g)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r8">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>8 v&#253;nosy zo št&#225;tnych dlhopisov a št&#225;tnych pokladničn&#253;ch pouk&#225;žok /ods. 1 písm. h)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r9">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>9 v&#253;nos, ktor&#253; vznik&#225; pri splatnosti cenn&#233;ho papiera z rozdielu medzi menovitou hodnotou cenn&#233;ho papiera a emisn&#253;m kurzom pri jeho vydan&#237; /ods. 2</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r10">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>10 rozdiel medzi menovitou hodnotou dlhopisu alebo pokladničnej pouk&#225;žky a nižšou obstar&#225;vacou cenou /ods. 3</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r11">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>11 spolu r. 1 až 10</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r12">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>12 pr&#237;jmy dosiahnut&#233; z vyplatenia (vr&#225;tenia) podielov&#253;ch listov obstaran&#253;ch do 31. decembra 2003, na ktor&#233; sa uplatňuje oslobodenie od dane podľa &#167; 52b ods. 11 zákona v s&#250;lade s &#167; 52 ods. 20 z&#225;kona</xsl:text>
    <xsl:apply-templates select="./s1"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Tabuľka č. 3 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 8 z&#225;kona</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>R. Druh príjmov podľa &#167; 8 z&#225;kona</xsl:text>
    <xsl:apply-templates select="./t3r1"/>
    <xsl:apply-templates select="./t3r2"/>
    <xsl:apply-templates select="./t3r3"/>
    <xsl:apply-templates select="./t3r4"/>
    <xsl:apply-templates select="./t3r5"/>
    <xsl:apply-templates select="./t3r6"/>
    <xsl:apply-templates select="./t3r7"/>
    <xsl:apply-templates select="./t3r8"/>
    <xsl:apply-templates select="./t3r9"/>
    <xsl:apply-templates select="./t3r10"/>
    <xsl:apply-templates select="./t3r11"/>
    <xsl:apply-templates select="./t3r12"/>
    <xsl:apply-templates select="./t3r13"/>
    <xsl:apply-templates select="./t3r14"/>
    <xsl:apply-templates select="./t3r15"/>
    <xsl:apply-templates select="./t3r16"/>
    <xsl:apply-templates select="./t3r17"/>
    <xsl:apply-templates select="./t3r18"/>
    <xsl:apply-templates select="./t3r19"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1 z príležitostných činností vrátane príjmov z príležitostnej poľnohospodárskej výroby, lesného a vodného hospodárstva a z príležitostného prenájmu hnuteľných vecí /ods. 1 písm. a)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r2">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2 z prevodu vlastn&#237;ctva nehnuteľnost&#237; /ods. 1 písm. b)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r3">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3 z predaja hnuteľn&#253;ch vec&#237; /ods. 1 písm. c)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r4">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4 z prevodu opci&#237; /ods. 1 písm. d)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r5">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5 z prevodu cenn&#253;ch papierov /ods. 1 písm. e)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r6">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>6 z prevodu &#250;časti (podielu) na s. r. o., kom. spol. alebo z prevodu člensk&#253;ch pr&#225;v družstva /ods. 1 písm. f)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r7">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>7 zo zdeden&#253;ch pr&#225;v z priemyseln&#233;ho a in&#233;ho duševn&#233;ho vlastn&#237;ctva vr&#225;tane autorsk&#253;ch pr&#225;v a pr&#225;v pr&#237;buzn&#253;ch autorsk&#233;mu pr&#225;vu /ods. 1 písm. g)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r8">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>8 d&#244;chodky a podobn&#233; opakuj&#250;ce sa požitky /ods. 1 písm. h)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r9">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>9 v&#253;hry a ceny /ods. 1 písm. i) a j)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r10">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>10 pr&#237;jmy z deriv&#225;tov&#253;ch oper&#225;ci&#237; /ods. 1 písm. k)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r11">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>11 peňažn&#233; plnenie a nepeňažn&#233; plnenie prijat&#233; pri v&#253;kone klinick&#233;ho sk&#250;šania /ods. 1 písm. l)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r12">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>12 n&#225;hrada nemajetkovej ujmy, okrem n&#225;hrady nemajetkovej ujmy, ktor&#225; bola sp&#244;soben&#225; trestn&#253;m činom /ods. 1 písm. n)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r13">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>13 na z&#225;klade zmluvy o sponzorstve v športe, prijat&#233; športovcom podľa osobitn&#233;ho predpisu /ods. 1 písm. p)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r14">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>14 n&#225;hrada za stratu času dobrovoľn&#237;ka zap&#237;san&#233;ho v informačnom syst&#233;me športu podľa osobitn&#233;ho predpisu /ods. 1 písm. r)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r15">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>15 príjmy z prerozdelenia kapitálového fondu z príspevkov /ods. 1 písm. s)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r16">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>16 príjmy z predaja virtuálnej meny /ods. 1 písm. t)</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r17">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>17 in&#233;</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r18">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>18 kladn&#253; rozdiel medzi vyššou hodnotou nepeňažn&#233;ho vkladu započ&#237;tanou na vklad spoločn&#237;ka a hodnotou vkladan&#233;ho majetku /ods. 2</xsl:text>
    <xsl:apply-templates select="./s1"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r19">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>19 Spolu r. 1 až 18</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r152">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>152 &#218;DAJE O PRIJ&#205;MATEĽOVI</xsl:text>
    <xsl:apply-templates select="./ico"/>
    <xsl:apply-templates select="./obchMeno"/>
    <xsl:apply-templates select="./suhlasZaslUdaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy">
    <xsl:apply-templates select="./uvadza"/>
    <xsl:apply-templates select="./udajeOprijmoch"/>
    <xsl:apply-templates select="./rekreaciaPar19ods2"/>
    <xsl:apply-templates select="./rekreaciaSuma"/>
    <xsl:apply-templates select="./zaznamy"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Údaje o príjmoch a výdavkoch dosahovaných daňovníkom s neobmedzenou daňovou povinnosťou zo zdrojov v zahraničí, ktoré sú súčasťou základu dane, osobitného základu dane podľa § 7a 51e zákona</xsl:text>
    <xsl:apply-templates select="./kodStatu"/>
    <xsl:apply-templates select="./druhPrimuPar"/>
    <xsl:apply-templates select="./druhPrimuOds"/>
    <xsl:apply-templates select="./druhPrimuPis"/>
    <xsl:apply-templates select="./prijmy"/>
    <xsl:apply-templates select="./vydavky"/>
    <xsl:apply-templates select="./zTohoVydavky"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/rekreaciaPar19ods2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Uplatňujem pr&#237;spevok na rekre&#225;ciu podľa &#167; 19 ods. 2 p&#237;sm. w) z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/rekreaciaSuma">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška pr&#237;spevku na rekre&#225;ciu: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>XIV. ODDIEL - ŽIADOSŤ O VR&#193;TENIE DAŇOV&#201;HO PREPLATKU ALEBO O VYPLATENIE DAŇOV&#201;HO BONUSU</xsl:text>
    <xsl:apply-templates select="./vyplatitDanovyBonus"/>
    <xsl:apply-templates select="./vyplatitDanovyBonusUroky"/>
    <xsl:apply-templates select="./vratitDanPreplatok"/>
    <xsl:apply-templates select="./sposobPlatby"/>
    <xsl:apply-templates select="./bankovyUcet"/>
    <xsl:apply-templates select="./datum"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Sp&#244;sob platby</xsl:text>
    <xsl:apply-templates select="./poukazka"/>
    <xsl:apply-templates select="./ucet"/>
    <xsl:apply-templates select="./ucetZahranicie"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/bankovyUcet">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Bankov&#253; &#250;čet</xsl:text>
    <xsl:apply-templates select="./IBAN"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>PR&#205;LOHA č. 1 - Odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj a &#250;daje o projektoch v&#253;skumu a v&#253;voja podľa &#167; 30c z&#225;kona</xsl:text>
    <xsl:apply-templates select="./projektCislo"/>
    <xsl:apply-templates select="./pocetProjektov"/>
    <xsl:apply-templates select="./datumRealizacie"/>
    <xsl:apply-templates select="./r01"/>
    <xsl:apply-templates select="./r02"/>
    <xsl:apply-templates select="./r03"/>
    <xsl:apply-templates select="./r04"/>
    <xsl:apply-templates select="./r05"/>
    <xsl:apply-templates select="./r06"/>
    <xsl:apply-templates select="./ciele"/>
    <xsl:apply-templates select="./r07"/>
    <xsl:apply-templates select="./r08"/>
    <xsl:apply-templates select="./r09"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1.</xsl:text>
    <xsl:apply-templates select="./zdanObdobieOd"/>
    <xsl:apply-templates select="./zdanObdobieDo"/>
    <xsl:apply-templates select="./narok"/>
    <xsl:apply-templates select="./odpocitanaCast"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2.</xsl:text>
    <xsl:apply-templates select="./zdanObdobieOd"/>
    <xsl:apply-templates select="./zdanObdobieDo"/>
    <xsl:apply-templates select="./narok"/>
    <xsl:apply-templates select="./odpocitanaCast"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3.</xsl:text>
    <xsl:apply-templates select="./zdanObdobieOd"/>
    <xsl:apply-templates select="./zdanObdobieDo"/>
    <xsl:apply-templates select="./narok"/>
    <xsl:apply-templates select="./odpocitanaCast"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4.</xsl:text>
    <xsl:apply-templates select="./zdanObdobieOd"/>
    <xsl:apply-templates select="./zdanObdobieDo"/>
    <xsl:apply-templates select="./narok"/>
    <xsl:apply-templates select="./odpocitanaCast"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5.</xsl:text>
    <xsl:apply-templates select="./zdanObdobieOd"/>
    <xsl:apply-templates select="./zdanObdobieDo"/>
    <xsl:apply-templates select="./narok"/>
    <xsl:apply-templates select="./odpocitanaCast"/>
  </xsl:template>

  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>PR&#205;LOHA č. 1b - Evidencia a odpočet výdavkov (nákladov) na investície podľa § 30e zákona</xsl:text>
    <xsl:apply-templates select="./r01"/>
    <xsl:apply-templates select="./r02"/>
    <xsl:apply-templates select="./r03"/>
    <xsl:apply-templates select="./r04"/>
    <xsl:apply-templates select="./r05"/>
    <xsl:apply-templates select="./r06"/>
    <xsl:apply-templates select="./r07"/>
    <xsl:apply-templates select="./r08"/>
    <xsl:apply-templates select="./r09"/>
    <xsl:apply-templates select="./r10"/>
    <xsl:apply-templates select="./r11"/>
    <xsl:apply-templates select="./r12"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r01">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>1</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r02">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>2</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r03">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>3</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r04">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>4</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r05">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>5</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r06">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>6</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r07">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>7</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r08">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>8</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r09">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>9</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r10">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>10</xsl:text>
    <xsl:apply-templates select="./s01Od"/>
    <xsl:apply-templates select="./s01Do"/>
    <xsl:apply-templates select="./s02"/>
    <xsl:apply-templates select="./s03"/>
    <xsl:apply-templates select="./s04"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r11">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>11 SPOLU: </xsl:text>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="." />
      <xsl:with-param name="replace" select="'&#10;'" />
      <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
    </xsl:call-template>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie/r12">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>12 Plánovaná výška preinvestovania priemernej hodnoty investícií v % podľa § 30e ods. 8 zákona:</xsl:text>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="." />
      <xsl:with-param name="replace" select="'&#10;'" />
      <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie//s01Od">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie//s01Do">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie//s02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Hodnota investície zaradená do užívania alebo obchodného majetku podľa § 30e ods. 5 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie//s03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Výška vykázaného nároku na odpočet výdavkov (nákladov) na investície podľa § 30e ods. 1 zákona v zdaňovacom období: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/pril1bPar30eVydavkyInvesticie//s04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>časť odpočítavaná v príslušnom zdaňovacom období: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/prilPodielyNaZisku">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>PRÍLOHA č. 2 - Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona, ak sú vyplácané od právnickej osoby, ktorá je daňovníkom štátu, s ktorým má Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia a od právnickej osoby, ktorá je daňovníkom štátu, s ktorým nemá Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia, pričom nejde o daňovníka nespolupracujúceho štátu podľa § 2 písm. x) zákona</xsl:text>
    <xsl:apply-templates select="./pr1"/>
    <xsl:apply-templates select="./pr2"/>
    <xsl:apply-templates select="./pr3"/>
    <xsl:apply-templates select="./pr4"/>
    <xsl:apply-templates select="./pr5"/>
    <xsl:apply-templates select="./pr6"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane z osobitného základu dane podľa § 51e zákona podielov na zisku (dividendy) a ostatných príjmov, ktoré sú súčasťou tohto osobitného základu dane, ktoré sú vyplácané od právnickej osoby, ktorá je daňovníkom štátu, s ktorým má Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia a od právnickej osoby, ktorá je daňovníkom štátu, s ktorým nemá Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia, pričom nejde o daňovníka nespolupracujúceho štátu podľa § 2 písm. x) zákona</xsl:text>
    <xsl:apply-templates select="./pr7"/>
    <xsl:apply-templates select="./pr8"/>
    <xsl:apply-templates select="./pr9"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane po vyňatí podielov na zisku (dividend) a ostatných príjmov zo zdrojov v zahraničí, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</xsl:text>
    <xsl:apply-templates select="./pr10"/>
    <xsl:apply-templates select="./pr11"/>
    <xsl:apply-templates select="./pr12"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane uznanej na zápočet na daňovú povinnosť v tuzemsku zo zaplatenej dane v zahraničí z podielov na zisku (dividend) a ostatných príjmov, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</xsl:text>
    <xsl:apply-templates select="./pr13"/>
    <xsl:apply-templates select="./pr14"/>
    <xsl:apply-templates select="./pr15"/>
    <xsl:apply-templates select="./pr16"/>
    <xsl:apply-templates select="./pr17"/>
    <xsl:apply-templates select="./pr18"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona, ak sú vyplácané od právnickej osoby, ktorá je daňovníkom nespolupracujúceho štátu podľa § 2 písm. x) zákona</xsl:text>
    <xsl:apply-templates select="./pr19"/>
    <xsl:apply-templates select="./pr20"/>
    <xsl:apply-templates select="./pr21"/>
    <xsl:apply-templates select="./pr22"/>
    <xsl:apply-templates select="./pr23"/>
    <xsl:apply-templates select="./pr24"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Výpočet dane z osobitného základu dane podľa § 51e zákona podielov na zisku (dividendy) a ostatných príjmov, ktoré sú súčasťou tohto osobitného základu dane, ktoré sú vyplácané od právnickej osoby, ktorá je daňovníkom nespolupracujúceho štátu podľa § 2 písm. x) zákona</xsl:text>
    <xsl:apply-templates select="./pr25"/>
    <xsl:apply-templates select="./pr26"/>
    <xsl:apply-templates select="./pr27"/>
    <xsl:apply-templates select="./pr28"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>04 Vyrovnací podiel</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>05 Podiel na likvidačnom zostatku</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>06 Spolu</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>22 Vyrovnací podiel</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>23 Podiel na likvidačnom zostatku</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>24 Spolu</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>PRÍLOHA č. 3 - Údaje na účely sociálneho poistenia a zdravotného poistenia</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Na účely sociálneho poistenia a zdravotného poistenia</xsl:text>
    <xsl:apply-templates select="./pr1"/>
    <xsl:apply-templates select="./pr2"/>
    <xsl:apply-templates select="./pr3"/>
    <xsl:apply-templates select="./pr4"/>
    <xsl:apply-templates select="./pr5"/>
    <xsl:apply-templates select="./pr6"/>
    <xsl:apply-templates select="./pr7"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Na účely sociálneho poistenia a zdravotného poistenia</xsl:text>
    <xsl:apply-templates select="./pr8"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>z toho</xsl:text>
    <xsl:apply-templates select="./pr9"/>
    <xsl:apply-templates select="./pr10"/>
    <xsl:apply-templates select="./pr11"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>z toho</xsl:text>
    <xsl:apply-templates select="./pr12"/>
    <xsl:apply-templates select="./pr13"/>
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>z toho</xsl:text>
    <xsl:apply-templates select="./pr14"/>
    <xsl:apply-templates select="./priPrimoch6ods1a2VediemPU"/>
    <xsl:apply-templates select="./pr15"/>
    <xsl:apply-templates select="./datum"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr1">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>01 Príjmy (výnosy) z výkonu osobnej asistencie uvádzané v VI. oddiele ako súčasť základu dane (čiastkového základu dane) z príjmov podľa § 6 ods. 1 a 2 zákona /§ 6 ods. 2 písm. b) zákona</xsl:text>
    <xsl:apply-templates select="./s1"/>
    <xsl:apply-templates select="./s2"/>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/dic">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
	   <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>01 - DIČ (ak nie je pridelené, uvádza sa rodné číslo): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/typDP/rdp">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>daňov&#233; priznanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/typDP/odp">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>opravn&#233; daňov&#233; priznanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/typDP/ddp">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>dodatočn&#233; daňov&#233; priznanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zdanovacieObdobie/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <!--<xsl:text>&#09;</xsl:text>-->
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Za rok: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zdanovacieObdobie/datumDDP">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>D&#225;tum zistenia skutočnosti na podanie dodatočn&#233;ho daňov&#233;ho priznania: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/skNace/cinnost">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>činnosť: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/skNace/k1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>k1: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/skNace/k2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>k2: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/skNace/k3">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>k3: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu/ulica">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>07 - Ulica: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu/cislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>08 - S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu/psc">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>09 - PSČ: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu/obec">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>10 - Obec: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaTrvPobytu/stat">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>11 - Št&#225;t: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaObvPobytu/ulica">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>14 - Ulica: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaObvPobytu/cislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>15 - S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaObvPobytu/psc">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>16 - PSČ: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/adresaObvPobytu/obec">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>17 - Obec: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/priezvisko">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>18 - Priezvisko: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/meno">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>19 - Meno: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/titul">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>20 - Titul (pred menom): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/titulZa">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>20 - Titul (za priezviskom): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/rodneCislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>21 - Rodn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/ulica">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>22 - Ulica: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/cislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>23 - S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/psc">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>24 - PSČ: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/obec">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>25 - Obec: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/stat">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>26 - Št&#225;t: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/tel">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>27 - Telef&#243;nne č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/zastupca/email">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>28 - Emailov&#225; adresa: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/datumNarodenia">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>02 - D&#225;tum narodenia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/priezvisko">
    <xsl:if test="./text()">
		<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
      <xsl:text>04 - Priezvisko: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/meno">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>05 - Meno: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/titul">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>06 - Titul (pred menom): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/titulZa">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>06 - Titul (za priezviskom): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/hlavicka/prepojeniePar2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>13 - Ekonomick&#233;, person&#225;lne alebo in&#233; prepojenie podľa &#167; 2 p&#237;sm. n) z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r29">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>Údaje o poberaní dôchodkov uvedených v § 11 ods. 6 zákona</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>29 Poberal (a) som na začiatku zdaňovacieho obdobia d&#244;chodok (ky) uveden&#253; (&#233;) v &#167; 11 ods. 6 z&#225;kona alebo mi bol tento (tieto) d&#244;chodok (ky) priznan&#253; (&#233;) sp&#228;tne k začiatku pr&#237;slušn&#233;ho zdaňovacieho obdobia (vypĺňa sa, len ak daňovn&#237;k bol poberateľom d&#244;chodku uveden&#233;ho v &#167; 11 ods. 6 z&#225;kona na začiatku zdaňovacieho obdobia alebo mu tento d&#244;chodok bol priznan&#253; sp&#228;tne k začiatku pr&#237;slušn&#233;ho zdaňovacieho obdobia): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r30">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>30 &#218;hrnn&#225; suma d&#244;chodku (ov) uveden&#233;ho (n&#253;ch) v &#167; 11 ods. 6 z&#225;kona za zdaňovacie obdobie (v eur&#225;ch): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r31/priezviskoMeno">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>31 - Priezvisko a meno: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r31/rodneCislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Rodn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r32/uplatnujemNCZDNaManzela">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>32 uplatňujem nezdaniteľn&#250; časť z&#225;kladu dane na manželku (manžela) podľa &#167; 11 ods. 3 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r32/vlastnePrijmy">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Vlastn&#233; pr&#237;jmy (v eur&#225;ch): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r32/pocetMesiacov">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Počet mesiacov: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/priezviskoMeno">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>33 - Priezvisko a meno: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/rodneCislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Rodn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/r33/dieta/m00">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Daňový bonus podľa zákona uplatňujem v mesiacoch</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 1-12: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m01">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 01: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 02: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 03: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 04: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m05">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 05: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m06">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 06: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m07">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 07: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m08">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 08: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m09">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 09: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m10">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 10: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m11">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 11: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33/dieta/m12">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 12: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r33a">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>33a Údaje o ďalších vyživovaných deťoch uvádzam v XIII. oddiele v členení podľa r. 33: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/uplatnujemPar33Ods8">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Údaje druhej oprávnenej osoby vyživujúcej dieťa (deti) v domácnosti uvedené na r. 33</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Uplatňujem postup podľa § 33 ods. 8 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/priezviskoMeno">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>34 - Priezvisko a meno: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/rodneCislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Rodn&#233; č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/r34/m00">
    <xsl:if test="./text()">
		<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>Mesiace, na začiatku ktorých druhá oprávnená osoba splnila podmienky na uplatnenie daňového bonusu podľa zákona</xsl:text>
		<xsl:text>&#xA;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
		<xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 1-12: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m01">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 01: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 02: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 03: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 04: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m05">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 05: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m06">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 06: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m07">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 07: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m08">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 08: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m09">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 09: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m10">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 10: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m11">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 11: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/m12">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>mesiac 12: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/druhaOsobaPodalaDPvSR">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Oznamujem, že druhá oprávnená osoba uvedená na r. 34 podala daňové priznanie na území Slovenskej republiky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/dokladRocZuct">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Druhá oprávnená osoba uvedená na r. 34 na území Slovenskej republiky nepodala daňové priznanie, preto k daňovému priznaniu prikladám:</xsl:text>
		<xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>kópiu dokladu o vykonanom ročnom zúčtovaní preddavkov na daň z príjmov zo závislej činnosti podľa zákona (ďalej len „ročné zúčtovanie“) druhej oprávnenej osoby: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34/dokladVyskaDane">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>kópiu dokladu preukazujúceho výšku základu dane z príjmov podľa § 5 zákona druhej oprávnenej osoby, ktorej ročné zúčtovanie nebolo vykonané, a nemala povinnosť podať daňové priznanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r34a">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>34a - Základ dane (čiastkový základ dane) z príjmov zo závislej činnosti alebo z príjmov z podnikania alebo z inej samostatnej zárobkovej činnosti alebo ich úhrn druhej oprávnenej osoby z r. 34, pre uplatnenie daňového bonusu podľa zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35">
    <xsl:apply-templates select="./uplatDanBonusZaplatUroky"/>
    <xsl:apply-templates select="./zaplateneUroky"/>
    <xsl:apply-templates select="./pocetMesiacov"/>
    <xsl:apply-templates select="./datumZacatiaUroceniaUveru"/>
    <xsl:apply-templates select="./datumUzavretiaZmluvyOUvere"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35/uplatDanBonusZaplatUroky">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>35 uplatňujem daňový bonus na zaplatené úroky podľa § 33a zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35/zaplateneUroky">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zaplatené úroky za zdaňovacie obdobie (v eurách): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35/pocetMesiacov">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Počet mesiacov: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35/datumZacatiaUroceniaUveru">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Dátum začatia úročenia úveru: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r35/datumUzavretiaZmluvyOUvere">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Dátum uzavretia zmluvy o úvere na bývanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r36">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>36 Úhrn príjmov od všetkých zamestnávateľov: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r36a">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>z toho </xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>36a úhrn príjmov plynúcich na základe dohôd o prácach vykonávaných mimo pracovného pomeru: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r37">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>37 &#218;hrn povinn&#233;ho poistn&#233;ho (&#167; 5 ods. 8 z&#225;kona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r38">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>38 Z&#225;klad dane (čiastkov&#253; z&#225;klad dane) (r. 36 - r. 37): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r2/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r2/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r3/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r3/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r4/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r4/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r5/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r5/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r6/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r6/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r7/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r7/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r8/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r8/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r9/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r9/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r10/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r10/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r11/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r11/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r12/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r12/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r13/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1/t1r13/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/mikrodanovnikPar2w">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Spĺňam podmienky pre  mikrodaňovn&#237;ka podľa § 2 písm. w) z&#225;kona pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona a uplatňujem si výhody z toho plynúce určené v zákone: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPar6ods11_ods1a2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPar6ods11_ods3">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPar6ods11_ods4">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 4 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPar6ods10_ods1a2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPar6ods10_ods4">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 4 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/vydavkyPoistPar6ods11_ods1a2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Preuk&#225;zateľne zaplaten&#233; poistn&#233; z pr&#237;jmov podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/uplatnujemPar17ods17_ods1a2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/uplatnujemPar17ods17_ods3a4">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 a 4 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/ukoncujemUplatnovaniePar17ods17_ods1a2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/ukoncujemUplatnovaniePar17ods17_ods3a4">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 a 4 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r2/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r2/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r3/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r3/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r4/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r4/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r5/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r5/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r6/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1a/t1r6/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1b/t1r1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1b/t1r1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1b/t1r2/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka1b/t1r2/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Na konci zdaňovacieho obdobia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r39">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>39 Pr&#237;jmy z tabuľky č. 1, stĺ. 1, r. 10: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r40">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>40 V&#253;davky z tabuľky č. 1, stĺ. 2, r. 10: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r41">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>41 Z&#225;klad dane (kladn&#253; rozdiel r. 39 a r. 40); v&#253;sledok hospod&#225;renia (zisk): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r42">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>42 Strata (z&#225;porn&#253; rozdiel r. 39 a r. 40); v&#253;sledok hospod&#225;renia (strata): -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r43">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>43 Položky zvyšuj&#250;ce z&#225;klad dane (znižuj&#250;ce stratu) (&#167; 17 až &#167; 17b , &#167; 17d, &#167; 19 ods. 3 p&#237;sm. n) a &#167; 21 ods. 1 p&#237;sm. h) tret&#237; bod z&#225;kona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r44">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>44 Položky znižuj&#250;ce z&#225;klad dane (zvyšuj&#250;ce stratu) (&#167;17 až &#167; 17b a &#167; 17d z&#225;kona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r45">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">45 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 1 a 2 zákona (r. 41 + r. 42 + r. 43 - r. 44) &gt; 0: + </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r46">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">46 Daňová strata z príjmov podľa § 6 ods. 1 a 2 zákona (r. 41 + r. 42 + r. 43 - r. 44) &lt; 0: -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>47 : </xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 Rok vykázania daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47/udaje/r02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 Suma vykázanej daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47/udaje/r03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>3 Suma daňovej straty odpočítaná v predchádzajúcich zdaňovacích obdobiach: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r47/udaje/r04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>4 Suma daňovej straty, ktorá môže byť odpočítavaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>48 : </xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 Rok vykázania daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48/udaje/r02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 Suma vykázanej daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48/udaje/r03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>3 Suma daňovej straty odpočítaná v predchádzajúcich zdaňovacích obdobiach: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r48/udaje/r04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>4 Suma daňovej straty, ktorá môže byť odpočítavaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>49 : </xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 Rok vykázania daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49/udaje/r02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 Suma vykázanej daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49/udaje/r03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>3 Suma daňovej straty odpočítaná v predchádzajúcich zdaňovacích obdobiach: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r49/udaje/r04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>4 Suma daňovej straty, ktorá môže byť odpočítavaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50">
    <xsl:text>&#xA;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>&#09;</xsl:text>
    <xsl:text>50 : </xsl:text>
    <xsl:apply-templates select="./rok"/>
    <xsl:apply-templates select="./udaje"/>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/rok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 Rok vykázania daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/udaje/r02">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 Suma vykázanej daňovej straty: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/udaje/r03">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>3 Suma daňovej straty odpočítaná v predchádzajúcom zdaňovacom období: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r50/udaje/r04">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>4 Suma daňovej straty, ktorá môže byť odpočítavaná podľa § 30, § 52zza ods. 16 a § 52zzb ods. 5 zákona vo výške 50 % sumy uvedenej v r. 45, maximálne však do sumy zodpovedajúcej rozdielu súm uvedených v r. 2 a r. 3: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r53">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>53 Uplatnenie daňovej straty vykázanej za rok 2021, najviac do sumy uvedenej v r. 4 stĺpec 50, maximálne však
do sumy zodpovedajúcej kladnému rozdielu sumy uvedenej v r.45 a súm na (r. 52 + r.52a) : </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r54">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>54 Uplatnenie daňovej straty vykázanej za rok 2022, najviac do sumy uvedenej v r. 3 stĺpec 51, maximálne však do sumy zodpovedajúcej kladnému rozdielu sumy uvedenej v r. 45 a súm na (r.52 + r. 52a + r.53): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r55">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>55 Znížený čiastkový základ dane z príjmov podľa § 6 ods. 1 a 2 zákona o stratu z predchádzajúcich zdaňovacích období (r. 45 - r. 52 - r.52a - r. 53 - r. 54): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r56">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>56 Odpočet výdavkov (nákladov) na výskum a vývoj podľa § 30c zákona a na investície podľa § 30e zákona maximálne do sumy uvedenej v r. 55 (r. 9 prílohy č. 1 + r. 11 prílohy č. 1b): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r57">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>57 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 1 a 2 zákona znížený o odpočet výdavkov (nákladov) na výskum a vývoj a na investície (r. 55 - r. 56): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r58">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>58 Pr&#237;jmy z tabuľky č. 1, stĺ. 1, r. 13: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r59">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>59 V&#253;davky z tabuľky č. 1, stĺ. 2, r. 13: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r60">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>60 Z&#225;klad dane (rozdiel r. 58 a r. 59): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r61">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>61 V&#253;sledok hospod&#225;renia (zisk): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r62">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>62 V&#253;sledok hospod&#225;renia (strata): -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r63">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>63 Položky zvyšuj&#250;ce z&#225;klad dane (znižuj&#250;ce stratu) [&#167; 17 až &#167; 17b , &#167; 17d, &#167; 19 ods. 3 p&#237;sm. n) a &#167; 21 ods. 1 p&#237;sm. h) tret&#237; bod z&#225;kona]: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r64">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text >64 Položky znižuj&#250;ce z&#225;klad dane (zvyšuj&#250;ce stratu) (&#167;17 až &#167; 17b a &#167; 17d z&#225;kona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r65">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">65 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 3 a 4 zákona r.60 + [(r.61 + r.63 – r.64)>0; ak je tento rozdiel záporný, r. 65 = r. 60] alebo r. 60 + [(r. 62 + r. 63 – r. 64) > 0; ak je tento rozdiel záporný, r. 65 = r. 60]: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r2/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r2/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r3/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r3/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r4/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r4/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r5/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r5/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r6/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r6/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r7/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r7/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r8/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r8/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r9/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r9/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r10/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r10/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r11/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r11/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka2/t2r12/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r66">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>66 Pr&#237;jmy z tabuľky č. 2, r. 11, stĺ. 1: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r67">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>67 V&#253;davky z tabuľky č. 2, r. 11, stĺ. 2: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r68">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>68 Osobitn&#253; z&#225;klad dane podľa &#167; 7 z&#225;kona (r. 66 - r. 67, ak je tento rozdiel z&#225;porn&#253;, uv&#225;dza sa na r. 68 nula): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r2/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r2/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r3/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r3/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r4/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r4/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r5/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r5/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r6/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r6/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r7/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r7/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r8/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r8/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r9/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r9/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r10/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r10/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r11/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r11/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r12/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r12/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r13/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r13/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r14/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r14/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r15/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r15/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r16/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r16/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r17/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r17/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r18/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r19/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/tabulka3/t3r19/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r69">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>69 Príjmy z tabuľky č. 3, r. 19, stĺ. 1: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r70">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>70 Výdavky z tabuľky č. 3, r. 19, stĺ. 2: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r71">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>71 Základ dane (čiastkový základ dane) (r. 69 - r. 70): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r72">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>72 Základ dane z príjmov podľa § 5 a § 6 ods. 1 a 2 zákona pred znížením o nezdaniteľnú časť základu dane (r. 38 + r. 57): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r73">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>73 ods. 2 - na daňovníka vypočítaná zo sumy v r. 72: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r74">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>74 ods. 3 - na manželku (manžela) vypočítaná zo sumy v r. 72: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r75">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>75 ods. 8 - na preukázateľne zaplatené príspevky na celoeurópsky osobný dôchodkový produkt a príspevky na doplnkové dôchodkové sporenie maximálne vo výške 180 eur: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/r77">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>77 Spolu (r. 73 + r. 74 + r.75) maxim&#225;lne do v&#253;šky z&#225;kladu dane na r. 72: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r78">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>78 Základ dane z príjmov podľa § 5 po znížení o nezdaniteľnú časť (r. 38 - r. 77, ak je rozdiel r. 38 a r. 77 záporný, uvádza sa v r. 78 nula): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r79">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>79 Suma príspevkov alebo ich častí, o ktorú sa zvyšuje základ dane z príjmov podľa § 11 ods. 11 a § 52zza ods. 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r80">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>80 Základ dane zistený podľa § 4 ods. 1 písm. a) zákona (r. 78 + r. 65 + r. 71 + r. 79): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r81">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>81 Daň zo základu dane zisteného podľa § 4 ods.1 písm. a) zákona uvedeného v riadku 80: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r82">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>82 Úhrn vyňatých príjmov podľa § 5, § 6 ods. 3 a 4 a § 8 zákona [základov dane (+)]: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r83">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>83 Základ dane znížený o úhrn vyňatých príjmov (r. 80 - r. 82) (ak je rozdiel r. 80 a 82 záporný, uvádza sa v r. 83 nula): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r84">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>84 Daň zo základu dane zisteného podľa § 4 ods. 1 písm. a) zákona po vyňatí príjmov zo zdrojov v zahraničí uvedeného v riadku 83: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r85">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>85 Úhrn príjmov (základov dane) podľa §5, § 6 ods. 3 a 4 a § 8 zákona zo zdrojov v zahraničí: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r86">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>86 Daň zaplatená v zahraničí z príjmov z r. 85 - uvádza sa suma zaplatenej dane podľa zmluvy o zamedzení dvojitého zdanenia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r87">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>87 Výpočet percenta dane na účely zápočtu r. 85 :  [(r. 38 + r. 65 + r. 71 - r. 82) alebo (r. 38 + r. 65 + r. 71)] x 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r88">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>88 Z dane zaplatenej v zahraničí možno započítať [(r. 84 alebo r. 81) x r. 87] : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r89">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>89 Daň uznaná na zápočet (r. 88 maximálne do sumy v r. 86): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r90">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>90 Daň zo základu dane zisteného podľa § 4 ods 1. písm. a) zákona po vyňatí a zápočte (daňová povinnosť) (r. 84 alebo r. 81) alebo (r. 84 - r. 89 alebo r. 81 - r. 89): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r91">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>91 Zostatok nezdaniteľnej časti základu dane z r. 77 (ak r. 78 = 0, potom r. 77 - r. 38, inak 0): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r92">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>92 Základ dane z príjmov podľa § 6 ods. 1 a 2 zákona po znížení o nezdaniteľnú časť (r. 57 - r. 91): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r93">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>93 Suma príspevkov alebo ich častí, o ktorú sa zvyšuje základ dane z príjmov podľa § 11 ods. 11 a § 52zza ods. 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r94">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>94 Základ dane zistený podľa § 4 ods. 1 písm. b) zákona (r. 92 + r. 93): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r95">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>95 Zdaniteľné príjmy (výnosy) z podnikania a z inej samostatnej zárobkovej činnosti podľa § 6 ods. 1 a 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r96">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>96 Daň zo základu dane zisteného podľa § 4 ods.1 písm. b) zákona uvedeného v riadku 94: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r97">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>97 Úhrn vyňatých príjmov podľa § 6 ods. 1 a 2 zákona [základov dane (+) a daňových strát (-)]: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r98">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>98 Základ dane znížený/zvýšený o úhrn vyňatých príjmov (r. 94 - r. 97) (ak je rozdiel r. 94 a 97 záporný, uvádza sa v r. 98 nula): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r99">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>99 Daň zo základu dane zisteného podľa § 4 ods. 1 písm. b) zákona po vyňatí príjmov zo zdrojov v zahraničí uvedeného v riadku 98: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r100">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>100 Úhrn príjmov (základov dane) podľa § 6 ods. 1 a 2 zákona zo zdrojov v zahraničí: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r101">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>101 Daň zaplatená v zahraničí z príjmov z r. 100 - uvádza sa suma zaplatenej dane podľa zmluvy o zamedzení dvojitého zdanenia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r102">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>102 Výpočet percenta dane na účely zápočtu r. 100 : [(r. 57 - r. 97) alebo r. 57 ] x 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r103">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>103 Z dane zaplatenej v zahraničí možno započítať [(r. 99 alebo r. 96) x r. 102] : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r104">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>104 Daň uznaná na zápočet (r. 103 maximálne do sumy v r. 101): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r105">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>105 Daň zo základu dane zisteného podľa § 4 ods 1. písm. b) zákona po vyňatí a zápočte (daňová povinnosť) (r. 99 alebo r. 96) alebo (r. 99 - r. 104 alebo r. 96 - r. 104): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r106">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>106 Daň (19 %) z osobitného základu dane z príjmov podľa § 7 zákona uvedeného v r. 68: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r107">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>107 Úhrn vyňatých príjmov (základov dane) podľa § 7 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r108">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>108 Základ dane znížený/zvýšený o úhrn vyňatých príjmov (r. 68 - r. 107) (ak je rozdiel r. 68 a r. 107 záporný, uvádza sa v r. 108 nula): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r109">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>109 Daň z osobitného základu dane podľa § 7 zákona po vyňatí príjmov zo zdrojov v zahraničí zo základu dane uvedeného v riadku 108: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r110">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>110 Úhrn príjmov (základov dane) podľa § 7 zákona zo zdrojov v zahraničí: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r111">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>111 Daň zaplatená v zahraničí z príjmov uvedených v r. 110 - uvádza sa suma zaplatenej dane podľa zmluvy o zamedzení dvojitého zdanenia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r112">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>112 V&#253;počet percenta dane na &#250;čely z&#225;počtu r. 110 : [(r. 68 - r. 107) alebo r. 68] x 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r113">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>113 Z dane zaplatenej v zahranič&#237; možno započ&#237;tať [(r. 109 alebo r. 106) x r. 112] : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r114">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>114 Daň uznan&#225; na z&#225;počet (r. 113 maxim&#225;lne do sumy na r. 111): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r115">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>115 Daň z osobitného základu dane podľa § 7 zákona po vyňatí a zápočte (r. 109 alebo r. 106) alebo (r. 109 - r. 114 alebo r. 106 - r. 114): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r116">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>116 Daň (daňová povinnosť) zo základu dane zisteného podľa § 4 zákona, z osobitného základu dane podľa § 7 zákona a z osobitného základu dane podľa § 51e zákona (r. 90 + r. 105 + r. 115 + r. 28 Prílohy č. 2): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r116a">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>116a Navýšený základ dane na účely výpočtu daňového bonusu podľa zákona (r. 34a / 12 × počet zaškrtnutých mesiacov v r. 34 + r. 38 + r.45): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r117">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>117 Nárok na daňový bonus podľa zákona (na jedno dieťa alebo úhrn na viac vyživovaných detí): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r118">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>118 Daň (daňová povinnosť) znížená o daňový bonus podľa zákona (r. 116 - r. 117): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r119">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>119 Suma daňového bonusu podľa zákona priznaného a vyplateného zamestnávateľom: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r120">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">120 Rozdiel riadkov r. 117 - r. 119 &gt; 0: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r121">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">121 Suma daňového bonusu podľa zákona na poukázanie správcom dane r. 120 - r. 116 &gt;0: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r122">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">122 Zamestnávateľom nesprávne vyplatený daňový bonus podľa zákona r. 119 - r. 117 &gt; 0: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r123">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">123 Nárok na daňový bonus na zaplatené úroky podľa § 33a zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r124">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>124 Daň (daňová povinnosť) znížená o daňový bonus podľa zákona a o daňový bonus na zaplatené úroky podľa § 33a zákona (r. 118 - r. 123): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r125">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>125 Suma daňového bonusu na zaplatené úroky podľa § 33a zákona priznaného a vyplateného zamestnávateľom: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r126">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">126 Rozdiel r. 123 - r. 125 &gt; 0: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r127">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">127 Suma daňového bonusu na zaplatené úroky podľa § 33a zákona na poukázanie správcom dane r. 126 - r. 118 > 0:  </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r128">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>128 Suma zamestnaneckej pr&#233;mie nespr&#225;vne vyplatenej zamestn&#225;vateľom alebo spr&#225;vcom dane: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r129">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>129 Suma preddavku vybran&#225; podľa &#167; 43 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r130">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>130 Suma preddavku vybraná pri vyplatení (vrátení) podielového listu obstaraného do 31. decembra 2003 podľa § 43 ods. 10 zákona (z príjmov uvedených v r. 12 tabuľky č. 2): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r131">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>131 &#167; 35 z&#225;kona - z pr&#237;jmov zo z&#225;vislej činnosti: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r132">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>132 &#167; 44 z&#225;kona - na zabezpečenie dane: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r133">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>133 Zaplatené preddavky na daň podľa § 34 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r134">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>134 Zaplatené preddavky na daň podľa § 35 ods. 10 a 11 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r135">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>135 Daň na úhradu vrátane zamestnávateľom nesprávne vyplateného daňového bonusu podľa zákona</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>r. 116 - r. 117 + r. 119 + r. 121 - r. 123 + r. 125 + r. 127 + r. 128 - r. 129 - r. 130 - r. 131 - r. 132 - r. 133 -</xsl:text>
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>r. 134(+): +</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r136">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>136 Daňový preplatok znížený o zamestnávateľom nesprávne vyplatený daňový bonus podľa zákona r. 116 - r. 117 + r. 119 + r. 121 - r. 123 + r. 125 + r. 127 + r. 128 - r. 129 - r. 130 - r. 131 - r. 132 - r. 133 - r. 134 (-): -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r137">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>137 Daň (daňová povinnosť) z r. 116 daňového priznania alebo r. 56 daňového priznania typ A alebo r. 06 ročného zúčtovania: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r138">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>138 Zvýšenie (+) alebo zníženie (-) dane (r. 116 - r. 137): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r139">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>139 Daň na úhradu z r. 135 alebo daňový preplatok z r. 136 daňového priznania alebo z r. 71 alebo r. 72 daňového priznania typ A alebo r. 21 ročného zúčtovania: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r140">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">140 Daň na úhradu (+) alebo daňový preplatok (-) (r. 135 alebo r. 136) - r. 139 + [(r. 151 daňového priznania) - 2% alebo 3% z r. 124) &gt; 0] alebo (r. 135 alebo r. 136) - r. 139 + [(r. 83 daňového priznania typ A - 2% alebo 3% z r. 124) &gt; 0] alebo (r. 135 alebo r. 136) - r. 139 + [(r. 13 vyhlásenia o poukázaní sumy podielu zaplatenej dane - 2% alebo 3% z r. 124) &gt; 0]: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r141">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>141 Suma daňového bonusu podľa zákona na poukázanie správcom dane z r. 121 daňového priznania alebo z r. 61 daňového priznania typ A alebo r. 12 ročného zúčtovania: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r142">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>142 Rozdiel súm daňového bonusu podľa zákona na poukázanie správcom dane (+), na vrátenie správcovi dane (-) (r. 121 - r. 141): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r143">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>143 Suma daňového bonusu na zaplatené úroky podľa § 33a zákona na poukázanie správcom dane z r. 127 daňového priznania alebo z r. 67 daňového priznania typ A alebo r. 16 ročného zúčtovania: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r144">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>144 Rozdiel súm daňového bonusu na zaplatené úroky podľa § 33a zákona na poukázanie správcom dane (+), na vrátenie správcovi dane (-) (r. 127 - r. 143): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r145">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>145 Št&#225;t daňovej rezidencie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r146">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>146 Úhrn všetkých zdaniteľných príjmov plynúcich zo zdrojov na území Slovenskej republiky a zo zdrojov v zahraničí v eurách: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r147">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>147 Výška výnosu z prenájmu nehnuteľnosti podľa § 6 ods. 3 zákona, ak nerezident účtuje v sústave podvojného účtovníctva: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r148">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>148 Výška príjmu (výnosu) z prevodu nehnuteľností, ktoré sú zaradené do obchodného majetku nerezidenta s príjmami podľa § 6 ods. 1 a 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r149">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>149 Uplatňujem lehotu na podanie daňov&#233;ho priznania podľa &#167; 49 ods. 7 prvej vety z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r150">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>150 Počet stálych prevádzkarní umiestnených na území Slovenskej republiky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/neuplatnujem">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>neuplatňujem postup podľa &#167; 50 z&#225;kona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/splnam3per">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>spĺňam podmienky na pouk&#225;zanie 3 % z dane: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r151">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>151 2 % alebo 3 % zo zaplatenej dane (minimálne 3 eurá) z r. 124: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r152/ico">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>IČO: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r152/obchMeno">
    <xsl:if test="./riadok[1]/text() or ./riadok[2]/text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Obchodn&#233; meno (n&#225;zov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="concat(./riadok[1], ./riadok[2])" />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/r152/suhlasZaslUdaje">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>súhlasím so zaslaním údajov (meno, priezvisko a adresa trvalého pobytu) mnou určenému prijímateľovi podielu zaplatenej dane uvedenému v r.152 podľa § 50 ods. 8 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/uvadza">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Uv&#225;dzam osobitn&#233; z&#225;znamy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/kodStatu">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>K&#243;d št&#225;tu: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuPar">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Druh pr&#237;jmu &#167;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuOds">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Druh pr&#237;jmu ods. : </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuPis">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Druh pr&#237;jmu p&#237;sm. : </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/prijmy">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/vydavky">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/zTohoVydavky">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>z toho v&#253;davky: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/osobitneZaznamy/zaznamy">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Z&#225;znamy: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/r153">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>153 Počet pr&#237;loh: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/datumVyhlasenia">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Vyhlasujem, že všetky &#250;daje uveden&#233; v daňovom priznan&#237; s&#250; spr&#225;vne a &#250;pln&#233;. D&#225;tum: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/vyplatitDanovyBonus">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Žiadam o vyplatenie daňov&#233;ho bonusu alebo rozdielu daňov&#233;ho bonusu podľa z&#225;kona (r. 121 alebo rozdiel z r. 142 ak je kladn&#253;): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/vyplatitDanovyBonusUroky">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Žiadam o vyplatenie daňového bonusu na zaplatené úroky alebo rozdielu daňového bonusu na zaplatené úroky podľa § 33a zákona (r. 127 alebo rozdiel z r. 144, ak je kladný): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/poukazka">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>poštovou pouk&#225;žkou: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/ucet">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>na &#250;čet: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/ucetZahranicie">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>na účet v zahraničí, ktorého nie som majiteľom: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/bankovyUcet/IBAN">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>IBAN: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/vratitDanPreplatok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Žiadam o vr&#225;tenie daňov&#233;ho preplatku podľa &#167; 79 z&#225;kona č. 563/2009 Z.z. o spr&#225;ve dan&#237; (daňov&#253; poriadok) a o zmene a doplnen&#237; niektor&#253;ch z&#225;konov v znen&#237; neskorš&#237;ch predpisov (z r. 136 alebo rozdiel z r. 140, ak je z&#225;porn&#253;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/danovyPreplatokBonus/datum">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>D&#225;tum: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/projektCislo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Projekt č&#237;slo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/pocetProjektov">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Počet projektov: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/datumRealizacie">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>D&#225;tum začiatku realiz&#225;cie projektu: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/zdanObdobieOd">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/zdanObdobieDo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/narok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj podľa § 30c ods. 1 zákona v zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/odpocitanaCast">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/zdanObdobieOd">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/zdanObdobieDo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/narok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj podľa § 30c ods. 1 zákona v zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/odpocitanaCast">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/zdanObdobieOd">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/zdanObdobieDo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/narok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj podľa § 30c ods. 1 zákona v zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/odpocitanaCast">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/zdanObdobieOd">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/zdanObdobieDo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/narok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj podľa § 30c ods. 1 zákona v zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/odpocitanaCast">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/zdanObdobieOd">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie od: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/zdanObdobieDo">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Zdaňovacie obdobie do: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/narok">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj podľa § 30c ods. 1 zákona v zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/odpocitanaCast">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r06">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>6. SPOLU: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/ciele">
    <xsl:if test="./text()">
        <xsl:text>&#xA;</xsl:text>
        <xsl:text>&#09;</xsl:text>
        <xsl:text>&#09;</xsl:text>
        <xsl:text>&#09;</xsl:text>
        <xsl:text>Ciele projektu, ktor&#233; s&#250; dosiahnuteľn&#233; podľa doby jeho realiz&#225;cie a merateľn&#233; po jeho ukončen&#237;: </xsl:text>
        <xsl:variable name="cleaned-text">
            <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text" select="." />
                <xsl:with-param name="replace" select="'%0A'" />
                <xsl:with-param name="by" select="''" />
            </xsl:call-template>
        </xsl:variable>
        <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$cleaned-text" />
            <xsl:with-param name="replace" select="'&#10;'" />
            <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
        </xsl:call-template>
    </xsl:if>
</xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r07">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>7. Odpočet podľa § 30c ods. 1 zákona (súčet všetkých r. 6 Prílohy č. 1): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r08">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>8. Odpočet podľa § 30c ods. 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r09">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>9. SPOLU odpočet podľa § 30c ods. 1 a 2 zákona za všetky projekty (r. 7 + r. 8): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>01 Podiel na zisku (dividenda): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>02 Podiel člena pozemkového spoločenstva s právnou subjektivitou na zisku a na majetku: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr3">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>03 Podiel na výsledku podnikania vyplácaný tichému spoločníkovi: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 - Suma príjmov (výnosov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 - Suma výdavkov (nákladov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 - Suma príjmov (výnosov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 - Suma výdavkov (nákladov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>1 - Suma príjmov (výnosov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>2 - Suma výdavkov (nákladov): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr7">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>07 Osobitný základ dane podľa § 51e zákona (r. 06 stĺ. 1 - r. 06 stĺ. 2): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr8">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>08 Sadzba dane (v %): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr9">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>09 Daň z osobitného základu dane vypočítaná sadzbou dane podľa § 15 písm. a) tretieho bodu zákona (r. 07 x r. 08) : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr10">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>10 Úhrn vyňatých podielov na zisku (dividend) a ostatných príjmov (základov dane), ktoré sú súčasťou príjmov uvedených v r. 06: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr11">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>11 Podiely na zisku (dividendy) a ostatné príjmy (základy dane) znížené o úhrn vyňatých podielov na zisku (r. 07 - r. 10): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr12">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>12 Daň po vyňatí podielov na zisku (dividend) a ostatných príjmov (základov dane) zo zdrojov v zahraničí (r. 11 x r. 08) : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr13">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>13 Úhrn podielov na zisku (dividend) a ostatných príjmov (základov dane), ktoré sú súčasťou príjmov uvedených v r. 06: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr14">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>14 Daň zaplatená v zahraničí z príjmov z r. 13 - uvádza sa suma zaplatenej dane podľa zmluvy o zamedzení dvojitého zdanenia: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr15">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>15 Výpočet percenta dane na účely zápočtu r. 13 : [(r. 07 - r. 10) alebo r. 07] x 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr16">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>16 Z dane zaplatenej v zahraničí možno započítať [(r. 12 alebo r. 09) x r. 15] : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr17">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>17 Daň uznaná na zápočet (r. 16 maximálne do sumy v r. 14): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr18">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>18 Daň z osobitného základu dane podľa § 51e zákona po vyňatí a zápočte (r. 12 alebo r. 09) alebo (r. 12 - r. 17 alebo r. 09 - r. 17): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr19">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>19 Podiel na zisku (dividenda): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr20">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>20 Podiel člena pozemkového spoločenstva s právnou subjektivitou na zisku a na majetku: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr21">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>21 Podiel na výsledku podnikania vyplácaný tichému spoločníkovi: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma príjmu (výnosu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma výdavku (nákladu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma príjmu (výnosu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma výdavku (nákladu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma príjmu (výnosu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Suma výdavku (nákladu): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr25">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>25 Osobitný základ dane podľa § 51e zákona (r. 24 stĺ. 1 - r. 24 stĺ. 2): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr26">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>26 Sadzba dane (v %): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr27">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>27 Daň z osobitného základu dane vypočítaná sadzbou dane podľa § 15 písm. a) štvrtého bodu zákona (r. 25 x r. 26) : 100: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/prilPodielyNaZisku/pr28">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>28 Daň z osobitného základu dane podľa § 51e zákona (r. 18 + r. 27): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr1/s1">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pr&#237;jmy (v&#253;nosy): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr1/s2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>V&#253;davky (n&#225;klady): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr2">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>02 Základ dane z príjmov z výkonu osobného asistenta (kladný rozdiel medzi príjmami a výdavkami); výsledok hospodárenia (zisk): +</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr3">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>03 Strata z príjmov z výkonu osobného asistenta (záporný rozdiel); výsledok hospodárenia (strata): -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr4">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>04 Položky zvyšujúce základ dane (znižujúce stratu) (§ 17 až § 17b, § 17d, § 19 ods.3 písm. n) a § 21 ods. 1 písm. h) tretí bod zákona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr5">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>05 Položky znižujúce základ dane (zvyšujúce stratu) (§ 17 až § 17b a § 17 d zákona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr6">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">06 Základ dane (čiastkový základ dane) z príjmov z výkonu osobného asistenta po úprave o položky zvyšujúce základ dane alebo znižujúce základ dane (r. 02 + r. 04 - r. 05) > 0 alebo (r. 03 + r. 04 - r. 05) > 0: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr7">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text disable-output-escaping="yes">07 Daňová strata z príjmov z výkonu osobného asistenta po úprave o položky znižujúce stratu alebo zvyšujúce stratu (r. 02 + r. 04 - r. 05) &lt; 0 alebo (r. 03 + r. 04 - r. 05) &lt; 0: -</xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr8">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>08 Úhrn povinného poistného (§ 5 ods. 8 zákona): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr9">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>09 úhrn poistného na sociálne poistenie (zabezpečenie): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr10">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>10 úhrn poistného na zdravotné poistenie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr11">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>11 Preukázateľne zaplatené poistné na sociálne poistenie z príjmov podľa § 6 ods. 1 a 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr12">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>12 preukázateľne zaplatené poistné na dobrovoľné sociálne poistenie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr13">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>13 Preukázateľne zaplatené poistné na zdravotné poistenie z príjmov podľa § 6 ods. 1 a 2 zákona: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr14">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>14 preukázateľne zaplatené preddavky na zdravotné poistenie z príjmov podľa § 6 ods. 1 a 2 zákona príslušné k zdaňovaciemu obdobiu, za ktoré sa podáva daňové priznanie: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/pr15">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>15 Výnosy podľa § 6 ods. 1 a 2 zákona (vypĺňa sa, len ak daňovník vedie podvojné účtovníctvo a nevypĺňa r. 1 až 3 a r. 5 až 9 v tabuľke č. 1): </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/priPrimoch6ods1a2VediemPU">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>Pri príjmoch podľa § 6 ods. 1 a 2 zákona vediem podvojné účtovníctvo: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template match="/dokument/telo/socZdravPoistenie/datum">
    <xsl:if test="./text()">
      <xsl:text>&#xA;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>&#09;</xsl:text>
      <xsl:text>D&#225;tum: </xsl:text>
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="." />
        <xsl:with-param name="replace" select="'&#10;'" />
        <xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
  <xsl:template name="formatToSkDate">
    <xsl:param name="date" />
    <xsl:variable name="dateString" select="string($date)" />
    <xsl:choose>
      <xsl:when test="$dateString != '' and string-length($dateString)=10 and string(number(substring($dateString, 1, 4))) != 'NaN' ">
        <xsl:value-of select="concat(substring($dateString, 9, 2), '.', substring($dateString, 6, 2), '.', substring($dateString, 1, 4))" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dateString"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="booleanCheckboxToString">
    <xsl:param name="boolValue" />
    <xsl:variable name="boolValueString" select="string($boolValue)" />
    <xsl:choose>
      <xsl:when test="$boolValueString = 'true' ">
        <xsl:text>Áno</xsl:text>
      </xsl:when>
      <xsl:when test="$boolValueString = 'false' ">
        <xsl:text>Nie</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$boolValueString"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="formatTimeTrimMinutes">
    <xsl:param name="time" />
    <xsl:variable name="timeString" select="string($time)" />
    <xsl:if test="$timeString != ''">
      <xsl:value-of select="substring($timeString, 1, 5)" />
    </xsl:if>
  </xsl:template>
	<xsl:template name="string-replace-all">
		<xsl:param name="text" />
		<xsl:param name="replace" />
		<xsl:param name="by" />
		<xsl:choose>
			<xsl:when test="contains($text, $replace)">
				<xsl:value-of select="substring-before($text, $replace)" />
				<xsl:value-of select="$by" />
				<xsl:call-template name="string-replace-all">
					<xsl:with-param name="text" select="substring-after($text, $replace)" />
					<xsl:with-param name="replace" select="$replace" />
					<xsl:with-param name="by" select="$by" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$text" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
  <xsl:template name="formatToSkDateTime">
    <xsl:param name="dateTime" />
    <xsl:variable name="dateSubstring" select="substring($dateTime, 1, 10)" />
    <xsl:variable name="timeSubstring" select="substring($dateTime, 12, 8)" />
    <xsl:variable name="dateString">
      <xsl:choose>
        <xsl:when test="$dateSubstring != '' and string-length($dateSubstring)=10 and string(number(substring($dateSubstring, 1, 4))) != 'NaN' ">
          <xsl:value-of select="concat(substring($dateSubstring, 9, 2), '.', substring($dateSubstring, 6, 2), '.', substring($dateSubstring, 1, 4))" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$dateSubstring"></xsl:value-of>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="timeString">
      <xsl:if test="$timeSubstring != ''">
        <xsl:value-of select="substring($timeSubstring, 1, 5)" />
      </xsl:if>
    </xsl:variable>
    <xsl:value-of select="concat($dateString,' ',$timeString)"/>
  </xsl:template>
</xsl:stylesheet>

