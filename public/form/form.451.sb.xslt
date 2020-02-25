<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="text" indent="yes" omit-xml-declaration="yes"/>
<xsl:strip-space elements="*" />
<xsl:template match="/dokument">
<xsl:text>DPFOBv19 - Daňov&#233; priznanie k dani z pr&#237;jmov fyzickej osoby (typ B) za zdaňovacie obdobie 2019 (platn&#233; od 1.1.2020)</xsl:text>
<xsl:apply-templates select="./hlavicka"/>
<xsl:apply-templates select="./telo"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>hlavicka</xsl:text>
<xsl:apply-templates select="./dic"/>
<xsl:apply-templates select="./datumNarodenia"/>
<xsl:apply-templates select="./typDP"/>
<xsl:apply-templates select="./zdanovacieObdobie"/>
<xsl:apply-templates select="./skNace"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>I. ODDIEL - ÚDAJE O DAŇOVNÍKOVI</xsl:text>
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
<xsl:template match="/dokument/hlavicka/typDP">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Druh daňov&#233;ho priznania</xsl:text>
<xsl:apply-templates select="./rdp"/>
<xsl:apply-templates select="./odp"/>
<xsl:apply-templates select="./ddp"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zdanovacieObdobie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie</xsl:text>
<xsl:apply-templates select="./rok"/>
<xsl:apply-templates select="./datumDDP"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/skNace">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>SK NACE</xsl:text>
<xsl:apply-templates select="./cinnost"/>
<xsl:apply-templates select="./k1"/>
<xsl:apply-templates select="./k2"/>
<xsl:apply-templates select="./k3"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Adresa trval&#233;ho pobytu v deň podania daňov&#233;ho priznania na &#250;zem&#237; Slovenskej republiky alebo v zahranič&#237;</xsl:text>
<xsl:apply-templates select="./ulica"/>
<xsl:apply-templates select="./cislo"/>
<xsl:apply-templates select="./psc"/>
<xsl:apply-templates select="./obec"/>
<xsl:apply-templates select="./stat"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaObvPobytu">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Adresa pobytu na &#250;zem&#237; Slovenskej republiky, kde sa daňovn&#237;k obvykle zdržiaval v zdaňovacom obdob&#237;</xsl:text>
<xsl:apply-templates select="./ulica"/>
<xsl:apply-templates select="./cislo"/>
<xsl:apply-templates select="./psc"/>
<xsl:apply-templates select="./obec"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>II. ODDIEL - &#218;DAJE O Z&#193;KONNOM Z&#193;STUPCOVI ALEBO DEDIČOVI ALEBO Z&#193;STUPCOVI ALEBO SPR&#193;VCOVI V KONKURZNOM KONAN&#205;, KTOR&#221; POD&#193;VA DAŇOV&#201; PRIZNANIE (ďalej len &quot;z&#225;stupca&quot;)</xsl:text>
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
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>Telo</xsl:text>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>III. ODDIEL - ÚDAJE NA UPLATNENIE ZNÍŽENIA ZÁKLADU DANE (§ 11 zákona) A DAŇOVÉHO BONUSU (§ 33 zákona)</xsl:text>
<xsl:apply-templates select="./r29"/>
<xsl:apply-templates select="./r30"/>
<xsl:apply-templates select="./r31"/>
<xsl:apply-templates select="./r32"/>
<xsl:apply-templates select="./r33"/>
<xsl:apply-templates select="./r34"/>
<xsl:apply-templates select="./r35udajeDalsieDeti"/>
<xsl:apply-templates select="./r36"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>IV. ODDIEL - ÚDAJE NA UPLATNENIE DAŇOVÉHO BONUSU NA ZAPLATENÉ ÚROKY (§ 33a zákona)</xsl:text>
<xsl:apply-templates select="./r37"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV ZO ZÁVISLEJ ČINNOSTI (§ 5 zákona) - v eurách</xsl:text>
<xsl:apply-templates select="./r38"/>
<xsl:apply-templates select="./r38a"/>
<xsl:apply-templates select="./r39"/>
<xsl:apply-templates select="./r40"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>VI. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV Z PODNIKANIA, Z INEJ SAMOSTATNEJ ZÁROBKOVEJ ČINNOSTI, Z PRENÁJMU A Z POUŽITIA DIELA A UMELECKÉHO VÝKONU (§ 6 zákona) - v eurách</xsl:text>
<xsl:apply-templates select="./tabulka1"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Uplatňujem preukázateľné výdavky z daňovej evidencie podľa § 6 ods. 11 zákona</xsl:text>
<xsl:apply-templates select="./vydavkyPar6ods11_ods1a2"/>
<xsl:apply-templates select="./vydavkyPar6ods11_ods3"/>
<xsl:apply-templates select="./vydavkyPar6ods11_ods4"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Uplatňujem výdavky percentom z príjmov podľa § 6 ods. 10 zákona</xsl:text>
<xsl:apply-templates select="./vydavkyPar6ods10_ods1a2"/>
<xsl:apply-templates select="./vydavkyPar6ods10_ods4"/>
<xsl:apply-templates select="./vydavkyPoistPar6ods11_ods1a2"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Uplatňujem osobitný spôsob zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</xsl:text>
<xsl:apply-templates select="./uplatnujemPar17ods17_ods1a2"/>
<xsl:apply-templates select="./uplatnujemPar17ods17_ods3a4"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ukončujem uplatňovanie osobitného spôsobu zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</xsl:text>
<xsl:apply-templates select="./ukoncujemUplatnovaniePar17ods17_ods1a2"/>
<xsl:apply-templates select="./ukoncujemUplatnovaniePar17ods17_ods3a4"/>
<xsl:apply-templates select="./tabulka1a"/>
<xsl:apply-templates select="./tabulka1b"/>
<xsl:apply-templates select="./r41"/>
<xsl:apply-templates select="./r42"/>
<xsl:apply-templates select="./r43"/>
<xsl:apply-templates select="./r44"/>
<xsl:apply-templates select="./r45"/>
<xsl:apply-templates select="./r46"/>
<xsl:apply-templates select="./r47"/>
<xsl:apply-templates select="./r48"/>
<xsl:apply-templates select="./r49"/>
<xsl:apply-templates select="./r50"/>
<xsl:apply-templates select="./r51"/>
<xsl:apply-templates select="./r52"/>
<xsl:apply-templates select="./r53"/>
<xsl:apply-templates select="./r54"/>
<xsl:apply-templates select="./r55"/>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>VII. ODDIEL - VÝPOČET OSOBITNÉHO ZÁKLADU DANE Z PRÍJMOV Z KAPITÁLOVÉHO MAJETKU (§ 7 zákona) - v eurách</xsl:text>
<xsl:apply-templates select="./tabulka2"/>
<xsl:apply-templates select="./r66"/>
<xsl:apply-templates select="./r67"/>
<xsl:apply-templates select="./r68"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>VIII. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z OSTATNÝCH PRÍJMOV (§ 8 zákona) - v eurách</xsl:text>
<xsl:apply-templates select="./tabulka3"/>
<xsl:apply-templates select="./r69"/>
<xsl:apply-templates select="./r70"/>
<xsl:apply-templates select="./r71"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>IX. ODDIEL - VÝPOČET DANE podľa § 15 zákona - v eurách</xsl:text>
<xsl:apply-templates select="./r72"/>
<xsl:apply-templates select="./r73"/>
<xsl:apply-templates select="./r74"/>
<xsl:apply-templates select="./r75"/>
<xsl:apply-templates select="./r76"/>
<xsl:apply-templates select="./r76a"/>
<xsl:apply-templates select="./r76b"/>
<xsl:apply-templates select="./r77"/>
<xsl:apply-templates select="./r78"/>
<xsl:apply-templates select="./r79"/>
<xsl:apply-templates select="./r80"/>
<xsl:apply-templates select="./r81"/>
<xsl:apply-templates select="./r82"/>
<xsl:apply-templates select="./r83"/>
<xsl:apply-templates select="./r84"/>
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
<xsl:apply-templates select="./r97"/>
<xsl:apply-templates select="./r98"/>
<xsl:apply-templates select="./r99"/>
<xsl:apply-templates select="./r100"/>
<xsl:apply-templates select="./r101"/>
<xsl:apply-templates select="./r102"/>
<xsl:apply-templates select="./r103"/>
<xsl:apply-templates select="./r104"/>
<xsl:apply-templates select="./r105"/>
<xsl:apply-templates select="./r106"/>
<xsl:apply-templates select="./r107"/>
<xsl:apply-templates select="./r108"/>
<xsl:apply-templates select="./r109"/>
<xsl:apply-templates select="./r110"/>
<xsl:apply-templates select="./r111"/>
<xsl:apply-templates select="./r112"/>
<xsl:apply-templates select="./r113"/>
<xsl:apply-templates select="./r114"/>
<xsl:apply-templates select="./r115"/>
<xsl:apply-templates select="./r116"/>
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
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>X. ODDIEL - ROZDIELY Z DODATOČNÉHO DAŇOVÉHO PRIZNANIA - v eurách</xsl:text>
<xsl:apply-templates select="./r127"/>
<xsl:apply-templates select="./r128"/>
<xsl:apply-templates select="./r129"/>
<xsl:apply-templates select="./r130"/>
<xsl:apply-templates select="./r131"/>
<xsl:apply-templates select="./r132"/>
<xsl:apply-templates select="./r133"/>
<xsl:apply-templates select="./r134"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>XI. ODDIEL - ÚDAJE O DAŇOVNÍKOVI S OBMEDZENOU DAŇOVOU POVINNOSŤOU (nerezidentovi)</xsl:text>
<xsl:apply-templates select="./r135"/>
<xsl:apply-templates select="./r136"/>
<xsl:apply-templates select="./r137"/>
<xsl:apply-templates select="./r138"/>
<xsl:apply-templates select="./r139"/>
<xsl:apply-templates select="./r140"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>XII. ODDIEL - VYHLÁSENIE o poukázaní podielu zaplatenej dane z príjmov fyzickej osoby podľa § 50 zákona</xsl:text>
<xsl:apply-templates select="./neuplatnujem"/>
<xsl:apply-templates select="./splnam3per"/>
<xsl:apply-templates select="./r141"/>
<xsl:apply-templates select="./r142"/>
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>XIII. ODDIEL - MIESTO NA OSOBITNÉ ZÁZNAMY DAŇOVNÍKA</xsl:text>
<xsl:apply-templates select="./osobitneZaznamy"/>
<xsl:apply-templates select="./r143"/>
<xsl:apply-templates select="./datumVyhlasenia"/>
<xsl:apply-templates select="./danovyPreplatokBonus"/>
<xsl:apply-templates select="./prilPar30cOdpocetVydavkov"/>
<xsl:apply-templates select="./prilPodielyNaZisku"/>
<xsl:apply-templates select="./socZdravPoistenie"/>
</xsl:template>
<xsl:template match="/dokument/telo/r31">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#218;daje o manželke (manželovi), ktor&#225;(&#253;) žije s daňovn&#237;kom v dom&#225;cnosti na uplatnenie nezdaniteľných častí základu dane</xsl:text>
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
<xsl:apply-templates select="./uplatNCZDNaKupelStarostlivost"/>
<xsl:apply-templates select="./preukazZaplatUhrady"/>
</xsl:template>
<xsl:template match="/dokument/telo/r34">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r34 &#218;daje o vyživovan&#253;ch deťoch žij&#250;cich s daňovn&#237;kom v dom&#225;cnosti na uplatnenie daňov&#233;ho bonusu podľa &#167; 33 z&#225;kona</xsl:text>
<xsl:apply-templates select="./dieta"/>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Dieťa</xsl:text>
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
<xsl:template match="/dokument/telo/tabulka1">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Tabuľka č. 1 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 6 z&#225;kona (vypĺňa len daňovn&#237;k, ktor&#253; &#250;čtuje v s&#250;stave jednoduch&#233;ho &#250;čtovn&#237;ctva alebo uplatňuje v&#253;davky percentom z pr&#237;jmov, alebo vedie evidenciu podľa &#167; 6 ods. 11 z&#225;kona)</xsl:text>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r1 z poľnohospod&#225;rskej v&#253;roby, lesn&#233;ho a vodn&#233;ho hospod&#225;rstva</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r2 zo živnosti</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r3">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r3 z podnikania vykon&#225;van&#233;ho podľa osobitn&#253;ch predpisov</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r4">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r4 spoločn&#237;kov v. o. s. a komplement&#225;rov kom. spol.</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r5">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r5 z vytvorenia diela a umeleck&#233;ho v&#253;konu a z použitia alebo poskytnutia pr&#225;v z priemyseln&#233;ho alebo in&#233;ho duševn&#233;ho vlastn&#237;ctva</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r6">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r6 z činnost&#237;, ktor&#233; nie s&#250; živnosťou ani podnikan&#237;m</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r7">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r7 znalcov a tlmočn&#237;kov za činnosť podľa osobitn&#233;ho predpisu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r8">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r8 z činnost&#237; sprostredkovateľov, ktor&#233; nie s&#250; živnosťou</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r9">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r9 z činnosti športovca alebo športov&#233;ho odborn&#237;ka podľa osobitn&#233;ho predpisu vr&#225;tane pr&#237;jmov na z&#225;klade zmluvy o sponzorstve v športe</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r10">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r10 spolu r. 1 až 9</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r11">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r11 z pren&#225;jmu nehnuteľnost&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r12">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r12 z použitia diela a umeleck&#233;ho v&#253;konu, ak nepatria do pr&#237;jmov podľa &#167; 6 ods. 2 p&#237;sm. a) z&#225;kona uv&#225;dzan&#253;ch na r. 5</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r13">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1r13 spolu r. 11 a 12</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Tabuľka č. 1a - &#218;daje daňovn&#237;ka s pr&#237;jmami z podnikania, z inej samostatnej z&#225;robkovej činnosti, z pren&#225;jmu a z použitia diela a umeleck&#233;ho v&#253;konu z daňovej evidencie podľa &#167; 6 ods. 11 z&#225;kona a daňovn&#237;ka s pr&#237;jmami z pren&#225;jmu a z použitia diela a umeleck&#233;ho v&#253;konu z &#250;čtovn&#237;ctva podľa &#167; 6 ods. 13 z&#225;kona</xsl:text>
<xsl:apply-templates select="./t1r1"/>
<xsl:apply-templates select="./t1r2"/>
<xsl:apply-templates select="./t1r3"/>
<xsl:apply-templates select="./t1r4"/>
<xsl:apply-templates select="./t1r5"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r1">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1ar1 Zostatkov&#225; cena hmotn&#233;ho majetku zaraden&#233;ho do obchodn&#233;ho majetku</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1ar2 Zostatkov&#225; cena nehmotn&#233;ho majetku zaraden&#233;ho do obchodn&#233;ho majetku</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r3">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1ar3 Z&#225;soby</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r4">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1ar4 Pohľad&#225;vky</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r5">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1ar5 Z&#225;v&#228;zky</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Tabuľka č. 1b - &#218;daje daňovn&#237;ka s pr&#237;jmami z podnikania, z inej samostatnej z&#225;robkovej činnosti, z použitia diela a umeleck&#233;ho v&#253;konu z evidencie, ktor&#250; vedie podľa &#167; 6 ods. 10 z&#225;kona, ak uplatňuje v&#253;davky percentom z pr&#237;jmov</xsl:text>
<xsl:apply-templates select="./t1r1"/>
<xsl:apply-templates select="./t1r2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r1">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1br1 Z&#225;soby</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t1br2 Pohľad&#225;vky</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/r49">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r49</xsl:text>
<xsl:apply-templates select="./predchObdobie"/>
</xsl:template>
<xsl:template match="/dokument/telo/r49/predchObdobie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Daňové straty z predchádzajúcich zdaňovacích období odpočítavané podľa § 30 zákona 2014</xsl:text>
<xsl:apply-templates select="./rok"/>
<xsl:apply-templates select="./strata"/>
</xsl:template>
<xsl:template match="/dokument/telo/r50">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r50</xsl:text>
<xsl:apply-templates select="./predchObdobie"/>
</xsl:template>
<xsl:template match="/dokument/telo/r50/predchObdobie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Daňové straty z predchádzajúcich zdaňovacích období odpočítavané podľa § 30 zákona 2015</xsl:text>
<xsl:apply-templates select="./rok"/>
<xsl:apply-templates select="./strata"/>
</xsl:template>
<xsl:template match="/dokument/telo/r51">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r51</xsl:text>
<xsl:apply-templates select="./predchObdobie"/>
</xsl:template>
<xsl:template match="/dokument/telo/r51/predchObdobie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Daňové straty z predchádzajúcich zdaňovacích období odpočítavané podľa § 30 zákona 2016</xsl:text>
<xsl:apply-templates select="./rok"/>
<xsl:apply-templates select="./strata"/>
</xsl:template>
<xsl:template match="/dokument/telo/r52">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r52</xsl:text>
<xsl:apply-templates select="./predchObdobie"/>
</xsl:template>
<xsl:template match="/dokument/telo/r52/predchObdobie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Daňové straty z predchádzajúcich zdaňovacích období odpočítavané podľa § 30 zákona 2017</xsl:text>
<xsl:apply-templates select="./rok"/>
<xsl:apply-templates select="./strata"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Tabuľka č. 2 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 7 z&#225;kona</xsl:text>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r1 &#250;roky a ostatn&#233; v&#253;nosy z cenn&#253;ch papierov</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r2 &#250;roky, v&#253;hry a in&#233; v&#253;nosy z vkladov na vkladn&#253;ch knižk&#225;ch, z peňažn&#253;ch prostriedkov na vkladovom &#250;čte, na &#250;čte stavebn&#233;ho sporiteľa a z bežn&#233;ho &#250;čtu okrem &#250;rokov uveden&#253;ch v &#167; 6 ods. 5 p&#237;sm. b) z&#225;kona</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r3">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r3 &#250;roky a in&#233; v&#253;nosy z poskytnut&#253;ch &#250;verov a p&#244;žičiek a &#250;roky z hodnoty splaten&#233;ho vkladu v dohodnutej v&#253;ške spoločn&#237;kov verejn&#253;ch obchodn&#253;ch spoločnost&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r4">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r4 d&#225;vky z doplnkov&#233;ho d&#244;chodkov&#233;ho sporenia</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r5">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r5 plnenia z poistenia pre pr&#237;pad dožitia určit&#233;ho veku; jednorazov&#233; vyrovnanie alebo odbytn&#233; vypl&#225;can&#233; v pr&#237;pade poistenia os&#244;b pri predčasnom skončen&#237; poistenia</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r6">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r6 v&#253;nosy zo zmeniek okrem pr&#237;jmov z ich predaja</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r7">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r7 pr&#237;jmy z podielov&#253;ch listov dosiahnut&#233; z ich vyplatenia (vr&#225;tenia)</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r8">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r8 v&#253;nosy zo št&#225;tnych dlhopisov a št&#225;tnych pokladničn&#253;ch pouk&#225;žok</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r9">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r9 v&#253;nos, ktor&#253; vznik&#225; pri splatnosti cenn&#233;ho papiera z rozdielu medzi menovitou hodnotou cenn&#233;ho papiera a emisn&#253;m kurzom pri jeho vydan&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r10">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r10 rozdiel medzi menovitou hodnotou dlhopisu alebo pokladničnej pouk&#225;žky a nižšou obstar&#225;vacou cenou</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r11">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r11 spolu r. 1 až 10</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r12">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t2r12 pr&#237;jmy dosiahnut&#233; z vyplatenia (vr&#225;tenia) podielov&#253;ch listov obstaran&#253;ch do 31. decembra 2003, na ktor&#233; sa uplatňuje oslobodenie od dane podľa &#167; 52b ods. 11 v s&#250;lade s &#167; 52 ods. 20 z&#225;kona</xsl:text>
<xsl:apply-templates select="./s1"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Tabuľka č. 3 - prehľad pr&#237;jmov a v&#253;davkov podľa &#167; 8 z&#225;kona</xsl:text>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r1 z pr&#237;ležitostn&#253;ch činnost&#237; vr&#225;tane pr&#237;jmov z pr&#237;ležitostnej poľnohospod&#225;rskej v&#253;roby, lesn&#233;ho a vodn&#233;ho hospod&#225;rstva a z pr&#237;ležitostn&#233;ho pren&#225;jmu hnuteľn&#253;ch vec&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r2">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r2 z prevodu vlastn&#237;ctva nehnuteľnost&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r3">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r3 z predaja hnuteľn&#253;ch vec&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r4">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r4 z prevodu opci&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r5">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r5 z prevodu cenn&#253;ch papierov</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r6">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r6 z prevodu &#250;časti (podielu) na s. r. o., kom. spol. alebo z prevodu člensk&#253;ch pr&#225;v družstva</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r7">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r7 zo zdeden&#253;ch pr&#225;v z priemyseln&#233;ho a in&#233;ho duševn&#233;ho vlastn&#237;ctva vr&#225;tane autorsk&#253;ch pr&#225;v a pr&#225;v pr&#237;buzn&#253;ch autorsk&#233;mu pr&#225;vu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r8">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r8 d&#244;chodky a podobn&#233; opakuj&#250;ce sa požitky</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r9">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r9 v&#253;hry a ceny</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r10">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r10 pr&#237;jmy z deriv&#225;tov&#253;ch oper&#225;ci&#237;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r11">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r11 peňažn&#233; plnenie a nepeňažn&#233; plnenie prijat&#233; pri v&#253;kone klinick&#233;ho sk&#250;šania</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r12">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r12 n&#225;hrada nemajetkovej ujmy, okrem n&#225;hrady nemajetkovej ujmy, ktor&#225; bola sp&#244;soben&#225; trestn&#253;m činom</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r13">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r13 na z&#225;klade zmluvy o sponzorstve v športe, prijat&#233; športovcom podľa osobitn&#233;ho predpisu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r14">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r14 n&#225;hrada za stratu času dobrovoľn&#237;ka zap&#237;san&#233;ho v informačnom syst&#233;me športu podľa osobitn&#233;ho predpisu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r15">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r15 príjmy z prerozdelenia kapitálového fondu z príspevkov</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r16">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r16 príjmy z predaja virtuálnej meny</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r17">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r17 in&#233;</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r18">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r18 kladn&#253; rozdiel medzi vyššou hodnotou nepeňažn&#233;ho vkladu započ&#237;tanou na vklad spoločn&#237;ka a hodnotou vkladan&#233;ho majetku</xsl:text>
<xsl:apply-templates select="./s1"/>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r19">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>t3r19 Spolu r. 1 až 18</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/r142">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r142 &#218;DAJE O PRIJ&#205;MATEĽOVI</xsl:text>
<xsl:apply-templates select="./ico"/>
<xsl:apply-templates select="./obchMeno"/>
<xsl:apply-templates select="./pravnaForma"/>
<xsl:apply-templates select="./ulica"/>
<xsl:apply-templates select="./cislo"/>
<xsl:apply-templates select="./psc"/>
<xsl:apply-templates select="./obec"/>
<xsl:apply-templates select="./suhlasZaslUdaje"/>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>XIII. ODDIEL - MIESTO NA OSOBITN&#201; Z&#193;ZNAMY DAŇOVN&#205;KA</xsl:text>
<xsl:apply-templates select="./uvadza"/>
<xsl:apply-templates select="./udajeOprijmoch"/>
<xsl:apply-templates select="./rekreaciaPar19ods2"/>
<xsl:apply-templates select="./rekreaciaSuma"/>
<xsl:apply-templates select="./zaznamy"/>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#218;daje o pr&#237;jmoch a v&#253;davkoch dosahovan&#253;ch daňovn&#237;kom s neobmedzenou daňovou povinnosťou zo zdrojov v zahranič&#237;, ktor&#233; s&#250; s&#250;časťou z&#225;kladu dane, osobitného základu dane podľa § 7 a § 51e zákona</xsl:text>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Uplatňujem pr&#237;spevok na rekre&#225;ciu podľa &#167; 19 ods. 2 p&#237;sm. w) z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/rekreaciaSuma">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška pr&#237;spevku na rekre&#225;ciu: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>XIV. ODDIEL - ŽIADOSŤ O VR&#193;TENIE DAŇOV&#201;HO PREPLATKU ALEBO O VYPLATENIE DAŇOV&#201;HO BONUSU</xsl:text>
<xsl:apply-templates select="./vyplatitDanovyBonus"/>
<xsl:apply-templates select="./vyplatitDanovyBonusUroky"/>
<xsl:apply-templates select="./vratitDanPreplatok"/>
<xsl:apply-templates select="./sposobPlatby"/>
<xsl:apply-templates select="./bankovyUcet"/>
<xsl:apply-templates select="./datum"/>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Sp&#244;sob platby</xsl:text>
<xsl:apply-templates select="./poukazka"/>
<xsl:apply-templates select="./ucet"/>
<xsl:apply-templates select="./ucetZahranicie"/>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/bankovyUcet">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Bankov&#253; &#250;čet</xsl:text>
<xsl:apply-templates select="./IBAN"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PR&#205;LOHA č. 1 - Odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj a &#250;daje o projektoch v&#253;skumu a v&#253;voja podľa &#167; 30c z&#225;kona</xsl:text>
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
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r01</xsl:text>
<xsl:apply-templates select="./zdanObdobieOd"/>
<xsl:apply-templates select="./zdanObdobieDo"/>
<xsl:apply-templates select="./narok"/>
<xsl:apply-templates select="./odpocitanaCast"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r02</xsl:text>
<xsl:apply-templates select="./zdanObdobieOd"/>
<xsl:apply-templates select="./zdanObdobieDo"/>
<xsl:apply-templates select="./narok"/>
<xsl:apply-templates select="./odpocitanaCast"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r03</xsl:text>
<xsl:apply-templates select="./zdanObdobieOd"/>
<xsl:apply-templates select="./zdanObdobieDo"/>
<xsl:apply-templates select="./narok"/>
<xsl:apply-templates select="./odpocitanaCast"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r04</xsl:text>
<xsl:apply-templates select="./zdanObdobieOd"/>
<xsl:apply-templates select="./zdanObdobieDo"/>
<xsl:apply-templates select="./narok"/>
<xsl:apply-templates select="./odpocitanaCast"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r05</xsl:text>
<xsl:apply-templates select="./zdanObdobieOd"/>
<xsl:apply-templates select="./zdanObdobieDo"/>
<xsl:apply-templates select="./narok"/>
<xsl:apply-templates select="./odpocitanaCast"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PRÍLOHA č. 2 - Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</xsl:text>
<xsl:apply-templates select="./pr1"/>
<xsl:apply-templates select="./pr2"/>
<xsl:apply-templates select="./pr3"/>
<xsl:apply-templates select="./pr4"/>
<xsl:apply-templates select="./pr5"/>
<xsl:apply-templates select="./pr6"/>
<xsl:apply-templates select="./pr7"/>
<xsl:apply-templates select="./pr8"/>
<xsl:apply-templates select="./pr9"/>
<xsl:apply-templates select="./pr10"/>
<xsl:apply-templates select="./pr11"/>
<xsl:apply-templates select="./pr12"/>
<xsl:apply-templates select="./pr13"/>
<xsl:apply-templates select="./pr14"/>
<xsl:apply-templates select="./pr15"/>
<xsl:apply-templates select="./pr16"/>
<xsl:apply-templates select="./pr17"/>
<xsl:apply-templates select="./pr18"/>
<xsl:apply-templates select="./pr19"/>
<xsl:apply-templates select="./pr20"/>
<xsl:apply-templates select="./pr21"/>
<xsl:apply-templates select="./pr22"/>
<xsl:apply-templates select="./pr23"/>
<xsl:apply-templates select="./pr24"/>
<xsl:apply-templates select="./pr25"/>
<xsl:apply-templates select="./pr26"/>
<xsl:apply-templates select="./pr27"/>
<xsl:apply-templates select="./pr28"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr4 Vyrovnací podiel</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr5 Podiel na likvidačnom zostatku</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr6 Spolu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr22 Vyrovnací podiel</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr23 Podiel na likvidačnom zostatku</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr24 Spolu</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PR&#205;LOHA č.3 - &#218;daje na &#250;čely soci&#225;lneho poistenia a zdravotn&#233;ho poistenia</xsl:text>
<xsl:apply-templates select="./pr1"/>
<xsl:apply-templates select="./pr2"/>
<xsl:apply-templates select="./pr3"/>
<xsl:apply-templates select="./pr4"/>
<xsl:apply-templates select="./pr5"/>
<xsl:apply-templates select="./pr6"/>
<xsl:apply-templates select="./pr7"/>
<xsl:apply-templates select="./pr8"/>
<xsl:apply-templates select="./pr9"/>
<xsl:apply-templates select="./pr10"/>
<xsl:apply-templates select="./pr11"/>
<xsl:apply-templates select="./pr12"/>
<xsl:apply-templates select="./pr13"/>
<xsl:apply-templates select="./pr14"/>
<xsl:apply-templates select="./priPrimoch6ods1a2VediemPU"/>
<xsl:apply-templates select="./pr15"/>
<xsl:apply-templates select="./datum"/>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr1">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr1 Pr&#237;jmy (v&#253;nosy) z v&#253;konu osobnej asistencie uv&#225;dzan&#233; v VI. oddiele ako s&#250;časť z&#225;kladu dane (čiastkov&#233;ho z&#225;kladu dane) z pr&#237;jmov podľa &#167; 6 ods. 1 a 2 z&#225;kona</xsl:text>
<xsl:apply-templates select="./s1"/>
<xsl:apply-templates select="./s2"/>
</xsl:template>
<xsl:template match="/dokument/hlavicka/dic">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>DIČ: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/typDP/rdp">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>daňov&#233; priznanie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/typDP/odp">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>opravn&#233; daňov&#233; priznanie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/typDP/ddp">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>dodatočn&#233; daňov&#233; priznanie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zdanovacieObdobie/rok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Za rok: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zdanovacieObdobie/datumDDP">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>D&#225;tum zistenia skutočnosti na podanie dodatočn&#233;ho daňov&#233;ho priznania: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/skNace/cinnost">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>činnosť: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/skNace/k1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>k1: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/skNace/k2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>k2: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/skNace/k3">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>k3: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu/ulica">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ulica: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu/cislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu/psc">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PSČ: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu/obec">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Obec: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaTrvPobytu/stat">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Št&#225;t: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaObvPobytu/ulica">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ulica: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaObvPobytu/cislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaObvPobytu/psc">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PSČ: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/adresaObvPobytu/obec">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Obec: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/priezvisko">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Priezvisko: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/meno">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Meno: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/titul">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Titul (pred menom): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/titulZa">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Titul (za priezviskom): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/rodneCislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rodn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/ulica">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ulica: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/cislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>S&#250;pisn&#233;/orientačn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/psc">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PSČ: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/obec">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Obec: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/stat">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Št&#225;t: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/tel">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Telef&#243;nne č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/zastupca/email">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Emailov&#225; adresa: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/datumNarodenia">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>D&#225;tum narodenia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/priezvisko">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Priezvisko: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/meno">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Meno: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/titul">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Titul (pred menom): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/titulZa">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Titul (za priezviskom): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/nerezident">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Daňovn&#237;k s obmedzenou daňovou povinnosťou (nerezident) podľa &#167; 2 p&#237;sm. e) bod 1 a 2 z&#225;kona a pr&#237;slušn&#233;ho čl&#225;nku zmluvy o zamedzen&#237; dvojit&#233;ho zdanenia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/hlavicka/prepojeniePar2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ekonomick&#233;, person&#225;lne alebo in&#233; prepojenie podľa &#167; 2 p&#237;sm. r) z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r29">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Poberal (a) som na začiatku zdaňovacieho obdobia d&#244;chodok (ky) uveden&#253; (&#233;) v &#167; 11 ods. 6 z&#225;kona alebo mi bol tento (tieto) d&#244;chodok (ky) priznan&#253; (&#233;) sp&#228;tne k začiatku pr&#237;slušn&#233;ho zdaňovacieho obdobia (vypĺňa sa, len ak daňovn&#237;k bol poberateľom d&#244;chodku uveden&#233;ho v &#167; 11 ods. 6 z&#225;kona na začiatku zdaňovacieho obdobia alebo mu tento d&#244;chodok bol priznan&#253; sp&#228;tne k začiatku pr&#237;slušn&#233;ho zdaňovacieho obdobia): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r30">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#218;hrnn&#225; suma d&#244;chodku (ov) uveden&#233;ho (n&#253;ch) v &#167; 11 ods. 6 z&#225;kona za zdaňovacie obdobie (v eur&#225;ch): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r31/priezviskoMeno">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Priezvisko a meno: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r31/rodneCislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rodn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r32/uplatnujemNCZDNaManzela">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>uplatňujem nezdaniteľn&#250; časť z&#225;kladu dane na manželku (manžela) podľa &#167; 11 ods. 3 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r32/vlastnePrijmy">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Vlastn&#233; pr&#237;jmy (v eur&#225;ch): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r32/pocetMesiacov">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Počet mesiacov: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r33/uplatNCZDNaKupelStarostlivost">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>uplatňujem nezdaniteľn&#250; časť z&#225;kladu dane na k&#250;peľn&#250; starostlivosť za manželku (manžela) podľa &#167; 11 ods. 14 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r33/preukazZaplatUhrady">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Vlastn&#233; pr&#237;jmy (v eur&#225;ch): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/priezviskoMeno">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Priezvisko a meno: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/rodneCislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rodn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/kupelnaStarostlivost">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>K&#250;peľn&#225; starostlivosť: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m00">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 1-12: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m01">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 01: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m02">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 02: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m03">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 03: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m04">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 04: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m05">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 05: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m06">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 06: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m07">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 07: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m08">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 08: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m09">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 09: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m10">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 10: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m11">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 11: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r34/dieta/m12">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>mesiac 12: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r35udajeDalsieDeti">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r35 Údaje o ďalších vyživovaných deťoch uvádzam v XIII. oddiele v členení podľa r. 34: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r36">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r36 Preukázateľne zaplatené úhrady na kúpelnú starostlivosť za vyživované dieťa (deti) v úhrne najviac do výšky 50 eur za rok za každé z týchto detí: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r37">
<xsl:apply-templates select="./uplatDanBonusZaplatUroky"/>
<xsl:apply-templates select="./zaplateneUroky"/>
<xsl:apply-templates select="./pocetMesiacov"/>
</xsl:template>
<xsl:template match="/dokument/telo/r37/uplatDanBonusZaplatUroky">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r37 uplatňujem daňový bonus na zaplatené úroky podľa § 33a zákona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r37/zaplateneUroky">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zaplatené úroky za zdaňovacie obdobie (v eurách): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r37/pocetMesiacov">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Počet mesiacov: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r38">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r38 Úhrn príjmov od všetkých zamestnávateľov: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r38a">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r38a z toho úhrn príjmoch plynúcich na základe dohôd o prácach vykonávaných mimo pracovného pomeru: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r39">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r39 &#218;hrn povinn&#233;ho poistn&#233;ho (&#167; 5 ods. 8 z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r40">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r40 Z&#225;klad dane (čiastkov&#253; z&#225;klad dane) (r. 38 - r. 39): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r2/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r2/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r3/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r3/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r4/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r4/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r5/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r5/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r6/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r6/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r7/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r7/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r8/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r8/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r9/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r9/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r10/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r10/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r11/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r11/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r12/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r12/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r13/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1/t1r13/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPar6ods11_ods1a2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPar6ods11_ods3">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPar6ods11_ods4">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 4 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPar6ods10_ods1a2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPar6ods10_ods4">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 4 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/vydavkyPoistPar6ods11_ods1a2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Preuk&#225;zateľne zaplaten&#233; poistn&#233; z pr&#237;jmov podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/uplatnujemPar17ods17_ods1a2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/uplatnujemPar17ods17_ods3a4">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 a 4 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/ukoncujemUplatnovaniePar17ods17_ods1a2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/ukoncujemUplatnovaniePar17ods17_ods3a4">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 3 a 4 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r2/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r2/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r3/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r3/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r4/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r4/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r5/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1a/t1r5/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r2/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na začiatku zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka1b/t1r2/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Na konci zdaňovacieho obdobia: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r41">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r41 Pr&#237;jmy z tabuľky č. 1, stĺ. 1, r. 10: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r42">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r42 V&#253;davky z tabuľky č. 1, stĺ. 2, r. 10: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r43">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r43 Z&#225;klad dane (kladn&#253; rozdiel r. 41 a r. 42); v&#253;sledok hospod&#225;renia (zisk): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r44">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r44 Strata (z&#225;porn&#253; rozdiel r. 41 a r. 42); v&#253;sledok hospod&#225;renia (strata): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r45">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r45 Položky zvyšuj&#250;ce z&#225;klad dane (znižuj&#250;ce stratu) (&#167; 17 až &#167; 17b , &#167; 17d, &#167; 19 ods. 3 p&#237;sm. n) a &#167; 21 ods. 1 p&#237;sm. h) tret&#237; bod z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r46">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r46 Položky znižuj&#250;ce z&#225;klad dane (zvyšuj&#250;ce stratu) (&#167;17 až &#167; 17b a &#167; 17d z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r47">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r47 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 1 a 2 zákona (r. 43 + r. 44 + r. 45 - r. 46) &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r48">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r48 Daňová strata z príjmov podľa § 6 ods. 1 a 2 zákona (r. 43 + r. 44 + r. 45 - r. 46) &lt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r49/predchObdobie/rok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rok: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r49/predchObdobie/strata">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Strata: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r50/predchObdobie/rok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rok: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r50/predchObdobie/strata">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Strata: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r51/predchObdobie/rok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rok: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r51/predchObdobie/strata">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Strata: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r52/predchObdobie/rok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Rok: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r52/predchObdobie/strata">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Strata: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r53">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r53 Súčet daňových strát z r. 49 až 52 odpočítavaných podľa § 30 zákona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r54">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r54 1/4 zo sumy uvedenej v r. 53 vypočítanej podľa § 30 zákona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r55">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r55 Znížený čiastkový základ dane z príjmov podľa § 6 ods. 1 a 2 zákona o stratu z predchádzajúcich zdaňovacích období maximálne do sumy v r. 47 (r. 47 - r. 54): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r56">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r56 Odpočet výdavkov (nákladov) na výskum a vývoj podľa § 30c zákona maximálne do sumy uvedenej v r. 55 (r. 9 prílohy č. 1): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r57">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r57 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 1 a 2 zákona znížený o odpočet výdavkov (nákladov) na výskum a vývoj zaokrúhlený na eurocenty nadol (r. 55 - r. 56): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r58">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r58 Pr&#237;jmy z tabuľky č. 1, stĺ. 1, r. 13: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r59">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r59 V&#253;davky z tabuľky č. 1, stĺ. 2, r. 13: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r60">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r60 Z&#225;klad dane (rozdiel r. 58 a r. 59): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r61">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r61 V&#253;sledok hospod&#225;renia (zisk): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r62">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r62 V&#253;sledok hospod&#225;renia (strata): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r63">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r63 Položky zvyšuj&#250;ce z&#225;klad dane (znižuj&#250;ce stratu) (&#167; 17 až &#167; 17b , &#167; 17d, &#167; 19 ods. 3 p&#237;sm. n) a &#167; 21 ods. 1 p&#237;sm. h) tret&#237; bod z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r64">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r64 Položky znižuj&#250;ce z&#225;klad dane (zvyšuj&#250;ce stratu) (&#167;17 až &#167; 17b a &#167; 17d z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r65">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r65 Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 3 a ods. 4 zákona r.60 + [(r.61 + r.63 – r.64) &gt; 0; ak je tento rozdiel záporný, r. 65 = r. 60] alebo r. 60 + [(r. 62 + r. 63 – r. 64) &gt; 0; ak je tento rozdiel záporný, r. 65 = r. 60]: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r2/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r2/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r3/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r3/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r4/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r4/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r5/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r5/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r6/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r6/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r7/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r7/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r8/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r8/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r9/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r9/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r10/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r10/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r11/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r11/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka2/t2r12/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r66">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r66 Pr&#237;jmy z tabuľky č. 2, r. 11, stĺ. 1: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r67">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r67 V&#253;davky z tabuľky č. 2, r. 11, stĺ. 2: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r68">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r68 Osobitn&#253; z&#225;klad dane podľa &#167; 7 z&#225;kona (r. 66 - r. 67, ak je tento rozdiel z&#225;porn&#253;, uv&#225;dza sa na r. 68 nula): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r2/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r2/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r3/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r3/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r4/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r4/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r5/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r5/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r6/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r6/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r7/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r7/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r8/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r8/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r9/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r9/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r10/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r10/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r11/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r11/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r12/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r12/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r13/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r13/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r14/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r14/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r15/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r15/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r16/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r16/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r17/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r17/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r18/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r19/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/tabulka3/t3r19/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r69">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r69 Pr&#237;jmy z tabuľky č. 3, r. 17, stĺ. 1: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r70">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r70 V&#253;davky z tabuľky č. 3, r. 17, stĺ. 2: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r71">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r71 Z&#225;klad dane (čiastkov&#253; z&#225;klad dane) (r. 69 - r. 70): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r72">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r72 Z&#225;klad dane z pr&#237;jmov podľa &#167; 5 a &#167; 6 ods. 1 a 2 z&#225;kona pred zn&#237;žen&#237;m o nezdaniteľn&#250; časť z&#225;kladu: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r73">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r73 ods. 2 - na daňovn&#237;ka20) vypoč&#237;tan&#225; zo sumy na r. 72: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r74">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r74 ods. 3 - na manželku (manžela)20) vypoč&#237;tan&#225; zo sumy na r. 72: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r75">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r75 ods. 10 - na preukázateľne zaplatené príspevky na doplnkové dôchodkové sporenie maximálne vo výške 180 eur: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r76">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r76 ods. 14 - na preukázateľne zaplatené úhrady súvisiace s kúpeľnou starostlivosťou a s ňou spojenými službami: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r76a">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r76a z toho za daňovníka: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r76b">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r76b za manželku (manžela) a deti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r77">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r77 Spolu (r. 73 + r. 74 + r.75 + r.76) maxim&#225;lne do v&#253;šky z&#225;kladu dane na r. 72: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r78">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r78 Z&#225;klad dane z pr&#237;jmov podľa &#167; 5 a &#167; 6 ods. 1 a 2 z&#225;kona po zn&#237;žen&#237; o nezdaniteľn&#250; časť (r. 72 - r. 77): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r79">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r79 Suma pr&#237;spevkov, o ktor&#250; sa zvyšuje z&#225;klad dane podľa &#167; 11 ods. 9 a 13 a &#167; 52 zo z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r80">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r80 Z&#225;klad dane zisten&#253; podľa &#167; 4 z&#225;kona (r. 78 + r. 65 + r. 71 + r. 79): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r81">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r81 Daň zo z&#225;kladu dane zisten&#233;ho podľa &#167; 4 z&#225;kona uveden&#233;ho na riadku 80 zaokr&#250;hlen&#225; na eurocenty nadol: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r82">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r82 &#218;hrn vyňat&#253;ch pr&#237;jmov podľa &#167; 5, 6 a 8 z&#225;kona [z&#225;kladov dane (+) a daňov&#253;ch str&#225;t (-)]: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r83">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r83 Z&#225;klad dane zn&#237;žen&#253;/zv&#253;šen&#253; o &#250;hrn vyňat&#253;ch pr&#237;jmov (r. 80 - r. 82) (ak je rozdiel r. 80 a 82 z&#225;porn&#253;, uv&#225;dza sa na r. 83 nula): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r84">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r84 Daň zo z&#225;kladu dane zisten&#233;ho podľa &#167; 4 z&#225;kona po vyňat&#237; pr&#237;jmov zo zdrojov v zahranič&#237; uveden&#233;ho na riadku 83 zaokr&#250;hlen&#225; na eurocenty nadol: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r85">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r85 &#218;hrn pr&#237;jmov (z&#225;kladov dane) podľa &#167; 5, 6 a 8 z&#225;kona zo zdrojov v zahranič&#237; (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r86">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r86 Daň zaplaten&#225; v zahranič&#237; z pr&#237;jmov z r. 85 - uv&#225;dza sa suma zaplatenej dane podľa zmluvy o zamedzen&#237; dvojit&#233;ho zdanenia (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r87">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r87 V&#253;počet percenta dane na &#250;čely z&#225;počtu r. 85 : [(r. 36 + r. 57 + r. 65 + r. 71 - r. 82) alebo (r. 36 + r. 57 + r. 65 + r. 71)] x 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r88">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r88 Z dane zaplatenej v zahranič&#237; možno započ&#237;tať [(r. 84 alebo r. 81) x r. 87] : 100 (zaokr&#250;hlen&#233; na eurocenty nahor): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r89">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r89 Daň uznan&#225; na z&#225;počet (r. 88 maxim&#225;lne do sumy na r. 86): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r90">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r90 Daň zo z&#225;kladu dane zisten&#233;ho podľa &#167; 4 z&#225;kona po vyňat&#237; a z&#225;počte (daňov&#225; povinnosť) (r. 84 alebo r. 81) alebo (r. 84 - r. 89 alebo r. 81 - r. 89): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r91">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r91 Daň (19 %) z osobitn&#233;ho z&#225;kladu dane z pr&#237;jmov podľa &#167; 7 z&#225;kona uveden&#233;ho na r. 68 zaokr&#250;hlen&#225; na eurocenty nadol: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r92">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r92 &#218;hrn vyňat&#253;ch pr&#237;jmov podľa &#167; 7 z&#225;kona [z&#225;kladov dane (+) a daňov&#253;ch str&#225;t (-)]: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r93">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r93 Z&#225;klad dane zn&#237;žen&#253;/zv&#253;šen&#253; o &#250;hrn vyňat&#253;ch pr&#237;jmov (r. 68 - r. 92) (ak je rozdiel r. 68 a 92 z&#225;porn&#253;, uv&#225;dza sa na r. 93 nula): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r94">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r94 Daň z osobitn&#233;ho z&#225;kladu dane podľa &#167; 7 z&#225;kona po vyňat&#237; pr&#237;jmov zo zdrojov v zahranič&#237; zo z&#225;kladu dane uveden&#233;ho na riadku 93 zaokr&#250;hlen&#225; na eurocenty nadol: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r95">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r95 &#218;hrn pr&#237;jmov (z&#225;kladov dane) podľa &#167; 7 z&#225;kona zo zdrojov v zahranič&#237; (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r96">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r96 Daň zaplaten&#225; v zahranič&#237; z pr&#237;jmov z r. 95 - uv&#225;dza sa suma zaplatenej dane podľa zmluvy o zamedzen&#237; dvojit&#233;ho zdanenia (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r97">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r97 V&#253;počet percenta dane na &#250;čely z&#225;počtu r. 95 : [(r. 68 - r. 92) alebo r. 68] x 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r98">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r98 Z dane zaplatenej v zahranič&#237; možno započ&#237;tať [(r. 94 alebo r. 91) x r. 97] : 100 (zaokr&#250;hlen&#233; na eurocenty nahor): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r99">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r99 Daň uznan&#225; na z&#225;počet (r. 98 maxim&#225;lne do sumy na r. 96): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r100">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r100 Daň z osobitn&#233;ho z&#225;kladu dane podľa &#167; 7 z&#225;kona po vyňat&#237; a z&#225;počte (r. 94 alebo r. 91) alebo (r. 94 - r. 99 alebo r. 91 - r. 99): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r101">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r101 &#218;hrn &#250;rokov&#253;ch pr&#237;jmov zo št&#225;tov a z&#225;visl&#253;ch &#250;zem&#237; (podľa pr&#237;lohy č. 3 z&#225;kona) (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r102">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r102 Daň zaplaten&#225; v zahranič&#237; z pr&#237;jmov z r. 101 - uv&#225;dza sa len suma zaplatenej dane podľa smernice (zaokr&#250;hlen&#233; na eurocenty nadol): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r103">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r103 Daň z pr&#237;jmov z r. 101 uznan&#225; na z&#225;počet (suma zaplatenej dane podľa smernice z r. 102 maxim&#225;lne do sumy na r. 100): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r104">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r104 Daň (daňov&#225; povinnosť) z osobitn&#233;ho z&#225;kladu dane podľa &#167; 7 z&#225;kona po zn&#237;žen&#237; o daň uznan&#250; na z&#225;počet (r. 100 - r. 103) alebo r. 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r105">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r105 Daň (daňov&#225; povinnosť) zo z&#225;kladu dane zisten&#233;ho podľa &#167; 4 z&#225;kona a z osobitn&#233;ho z&#225;kladu dane podľa &#167; 7 z&#225;kona (r.90 + r.104): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r106">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r106 N&#225;rok na daňov&#253; bonus (na jedno dieťa alebo &#250;hrn na viac vyživovan&#253;ch deti) podľa &#167; 33 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r107">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r107 Daň (daňov&#225; povinnosť) zn&#237;žen&#225; o daňov&#253; bonus (r. 105 - r. 106): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r108">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r108 Suma daňov&#233;ho bonusu priznan&#233;ho a vyplaten&#233;ho zamestn&#225;vateľom alebo spr&#225;vcom dane: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r109">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r109 Rozdiel riadkov r. 106 - r. 108 &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r110">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r110 Suma daňov&#233;ho bonusu na pouk&#225;zanie spr&#225;vcom dane r. 109 - r. 105 &gt;0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r111">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r111 Zamestn&#225;vateľom nespr&#225;vne vyplaten&#253; daňov&#253; bonus r. 108 - r. 106 &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r112">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r112 Nárok na daňový bonus na zaplatené úroky podľa § 33a zákona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r113">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r113 Daň (daňová povinnosť) znížená o daňový bonus podľa § 33 zákona a o daňový bonus na zaplatené úroky podľa § 33a zákona (r. 107 - r. 112): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r114">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r114 Suma daňového bonusu podľa § 33a zákona priznaného a vyplateného zamestnávateľom: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r115">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r115 Rozdiel r. 112 - r. 114 &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r116">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r116 Suma daňového bonusu podľa § 33a zákona na poukázanie správcom dane 28) r. 115 - r. 107 &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r117">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r117 Suma zamestnaneckej pr&#233;mie nespr&#225;vne vyplatenej zamestn&#225;vateľom alebo spr&#225;vcom dane: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r118">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r118 Suma preddavku vybran&#225; podľa &#167; 43 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r119">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r119 Suma preddavku vybran&#225; pri vyplaten&#237; (vr&#225;ten&#237;) podielov&#233;ho listu obstaran&#233;ho do 31. decembra 2003 podľa &#167; 43 ods. 10 z&#225;kona (z pr&#237;jmov uveden&#253;ch v r. 12 tabuľky č. 2): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r120">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r120 Zrazený preddavok na daň &#167; 35 z&#225;kona - z pr&#237;jmov zo z&#225;vislej činnosti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r121">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r121 &#167; 44 z&#225;kona - na zabezpečenie dane: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r122">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r122 Zaplaten&#233; preddavky na daň podľa &#167; 34 okrem preddavkov zaplaten&#253;ch podľa &#167; 34 ods. 6 a 7 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r123">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r123 Zaplaten&#233; preddavky na daň podľa &#167; 34 ods. 6 a 7 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r124">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r124 Zaplaten&#225; daň (časť dane) z &#250;rokov&#253;ch pr&#237;jmov uznan&#225; za daňov&#253; preplatok (&#167; 45 ods. 4 z&#225;kona) (r. 102 - r. 103): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r125">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r125 Daň na úhradu vrátane zamestnávateľom nesprávne vyplateného daňového bonusu podľa § 33 zákona r. 105 - r. 106 + r. 108 + r. 110 - r. 112 + r. 114 + r. 116 + r. 117 - r. 118 - r. 119 - r. 120 - r. 121 - r. 122 - r. 123 - r. 124 (+): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r126">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r126 Daňový preplatok znížený o zamestnávateľom nesprávne vyplatený daňový bonus podľa § 33 zákona r. 105 - r. 106 + r. 108 + r. 110 - r. 112 + r. 114 + r. 116 + r. 117 - r. 118 - r. 119 - r. 120 - r. 121 - r. 122 - r. 123 - r. 124 (-): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r127">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r127 Daň (daňová povinnosť) z r. 105 daňového priznania alebo r. 56 daňového priznania typ A alebo r. 06 ročného zúčtovania preddavkov na daň z príjmov zo závislej činnosti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r128">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r128 Zvýšenie (+) alebo zníženie (-) dane (r. 105 - r. 127): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r129">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r129 Daň na úhradu z r. 125 alebo daňový preplatok z r. 126 daňového priznania alebo z r. 71 alebo r. 72 daňového priznania typ A alebo r. 21 ročného zúčtovania preddavkov na daň z príjmov zo závislej činnosti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r130">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r130 Daň na úhradu (+) alebo daňový preplatok (-) (r. 125 alebo r. 126) - r. 129 + [(r. 141 daňového priznania - 2% alebo 3% z r. 113) &gt; 0] alebo (r. 125 alebo r. 126) - r. 129 + [(r. 83 daňového priznania typ A - 2% alebo 3% z r. 113) &gt; 0] alebo (r. 125 alebo r. 126) - r. 129 + [(r. 13 vyhlásenia o poukázaní sumy podielu zaplatenej dane - 2% alebo 3% z r. 113) &gt; 0]: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r131">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r131 Suma daňového bonusu podľa § 33 zákona na poukázanie správcom dane z r. 110 daňového priznania alebo z r. 61 daňového priznania typ A alebo r. 12 ročného zúčtovania preddavkov na daň z príjmov zo závislej činnosti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r132">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r132 Rozdiel súm daňového bonusu podľa § 33 zákona na poukázanie správcom dane (+), na vrátenie správcovi dane (-) (r. 110 - r. 131): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r133">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r133 Suma daňového bonusu na zaplatené úroky podľa § 33a zákona na poukázanie správcom dane z r. 116 daňového priznania alebo z r. 67 daňového priznania typ A alebo r. 16 ročného zúčtovania preddavkov na daň z príjmov zo závislej činnosti: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r134">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r134 Rozdiel súm daňového bonusu na zaplatené úroky podľa § 33a zákona na poukázanie správcom dane (+), na vrátenie správcovi dane (-) (r. 116 - r. 133): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r135">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r135 Št&#225;t daňovej rezidencie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r136">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r136 &#218;hrn všetk&#253;ch zdaniteľn&#253;ch pr&#237;jmov plyn&#250;cich zo zdrojov na &#250;zem&#237; Slovenskej republiky a zo zdrojov v zahranič&#237; v eur&#225;ch: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r137">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r137 V&#253;ška v&#253;nosu z pren&#225;jmu nehnuteľnosti podľa &#167; 6 ods. 3 z&#225;kona, ak nerezident &#250;čtuje v s&#250;stave podvojn&#233;ho &#250;čtovn&#237;ctva: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r138">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r138 V&#253;ška pr&#237;jmu (v&#253;nosu) z prevodu nehnuteľnost&#237;, ktor&#233; s&#250; zaraden&#233; do obchodn&#233;ho majetku nerezidenta s pr&#237;jmami podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r139">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r139 Uplatňujem lehotu na podanie daňov&#233;ho priznania podľa &#167; 49 ods. 7 prvej vety z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r140">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r140 Počet st&#225;lych prev&#225;dzkarn&#237; umiestnen&#253;ch na &#250;zem&#237; Slovenskej republiky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/neuplatnujem">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>neuplatňujem postup podľa &#167; 50 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/splnam3per">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>spĺňam podmienky na pouk&#225;zanie 3 % z dane: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r141">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r141 2 % alebo 3 % zo zaplatenej dane z r. 113 (minim&#225;lne 3 eur&#225;) zaokr&#250;len&#233; na eurocenty nadol: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/ico">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>IČO: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/obchMeno">
<xsl:if test="./riadok[1]/text() or ./riadok[2]/text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Obchodn&#233; meno (n&#225;zov): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="concat(./riadok[1], ./riadok[2])" /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/pravnaForma">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#225;vna forma: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/ulica">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ulica: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/cislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>S&#250;pisn&#233; / orientačn&#233; č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/psc">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>PSČ: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/obec">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Obec: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r142/suhlasZaslUdaje">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>s&#250;hlas&#237;m so zaslan&#237;m &#250;dajov (meno, priezvisko a trval&#253; pobyt) mnou určen&#233;mu prij&#237;mateľovi podielu zaplatenej dane uveden&#233;mu na r.124 podľa &#167; 50 ods. 8 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/uvadza">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Uv&#225;dzam osobitn&#233; z&#225;znamy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/kodStatu">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>K&#243;d št&#225;tu: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuPar">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Druh pr&#237;jmu &#167;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuOds">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Druh pr&#237;jmu ods. : </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/druhPrimuPis">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Druh pr&#237;jmu p&#237;sm. : </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/prijmy">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/vydavky">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/udajeOprijmoch/zTohoVydavky">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>z toho v&#253;davky: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/osobitneZaznamy/zaznamy">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Z&#225;znamy: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/r143">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r143 Počet pr&#237;loh: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/datumVyhlasenia">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Vyhlasujem, že všetky &#250;daje uveden&#233; v daňovom priznan&#237; s&#250; spr&#225;vne a &#250;pln&#233;. D&#225;tum: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/vyplatitDanovyBonus">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Žiadam o vyplatenie daňov&#233;ho bonusu alebo rozdielu daňov&#233;ho bonusu podľa &#167; 33 z&#225;kona (r. 110 alebo rozdiel z r. 132 ak je kladn&#253;): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/vyplatitDanovyBonusUroky">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Žiadam o vyplatenie daňového bonusu na zaplatené úroky alebo rozdielu daňového bonusu na zaplatené úroky podľa § 33a zákona (r. 116 alebo rozdiel z r. 134, ak je kladný): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/poukazka">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>poštovou pouk&#225;žkou: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/ucet">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>na &#250;čet: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/sposobPlatby/ucetZahranicie">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>na účet v zahraničí, ktorého nie som majiteľom: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/bankovyUcet/IBAN">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>IBAN: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/vratitDanPreplatok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Žiadam o vr&#225;tenie daňov&#233;ho preplatku podľa &#167; 79 z&#225;kona č. 563/2009 Z.z. o spr&#225;ve dan&#237; (daňov&#253; poriadok) a o zmene a doplnen&#237; niektor&#253;ch z&#225;konov v znen&#237; neskorš&#237;ch predpisov (z r. 126 alebo rozdiel z r. 130, ak je z&#225;porn&#253;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/danovyPreplatokBonus/datum">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>D&#225;tum: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/projektCislo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Projekt č&#237;slo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/pocetProjektov">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Počet projektov: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/datumRealizacie">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>D&#225;tum začiatku realiz&#225;cie projektu: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/zdanObdobieOd">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie od: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/zdanObdobieDo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie do: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/narok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj v zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r01/odpocitanaCast">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/zdanObdobieOd">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie od: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/zdanObdobieDo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie do: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/narok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj v zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r02/odpocitanaCast">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/zdanObdobieOd">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie od: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/zdanObdobieDo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie do: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/narok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj v zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r03/odpocitanaCast">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/zdanObdobieOd">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie od: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/zdanObdobieDo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie do: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/narok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj v zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r04/odpocitanaCast">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/zdanObdobieOd">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie od: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/zdanObdobieDo">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Zdaňovacie obdobie do: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/narok">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;ška vyk&#225;zan&#233;ho n&#225;roku na odpočet v&#253;davkov (n&#225;kladov) na v&#253;skum a v&#253;voj v zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r05/odpocitanaCast">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Časť odpoč&#237;tavan&#225; v danom zdaňovacom obdob&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r06">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r06 SPOLU: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/ciele">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Ciele projektu, ktor&#233; s&#250; dosiahnuteľn&#233; podľa doby jeho realiz&#225;cie a merateľn&#233; po jeho ukončen&#237;: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r07">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r07 Odpočet podľa § 30c ods. 1 zákona (súčet všetkých r. 6 Prílohy č. 1): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r08">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r08 Odpočet podľa § 30c ods. 2 zákona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPar30cOdpocetVydavkov/r09">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>r09 SPOLU odpočet podľa § 30c ods. 1 a 2 zákona za všetky projekty výskumu a vývoja (r. 7 + r. 8): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>

<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr1 Podiel na zisku (dividenda): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr2 Podiel člena pozemkového spoločenstva s právnou subjektivitou na zisku a na majetku: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr3">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr3 Podiel na výsledku podnikania vyplácaný tichému spoločníkovi: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr4/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr5/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr6/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr7">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr7 Osobitný základ dane podľa § 51e zákona (r. 06 stĺ. 1 - r. 06 stĺ. 2): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr8">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr8 Sadzba dane (v %): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr9">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr9 Daň z osobitného základu dane (zaokrúhlená na eurocenty nadol) vypočítaná sadzbou dane podľa § 15 písm. a) tretieho bodu zákona (r. 07 x r. 08) : 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr10">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr10 Úhrn vyňatých podielov na zisku (dividend) a ostatných príjmov (základov dane), ktoré sú súčasťou príjmov uvedených v r. 06: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr11">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr11 Podiely na zisku (dividendy) a ostatné príjmy (základy dane) znížené o úhrn vyňatých podielov na zisku (r. 07 - r. 10): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr12">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr12 Daň po vyňatí podielov na zisku (dividend) a ostatných príjmov (základov dane) zo zdrojov v zahraničí (zaokrúhlená na eurocenty nadol) (r. 11 x r. 08) : 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr13">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr13 Úhrn podielov na zisku (dividend) a ostatných príjmov (základov dane), ktoré sú súčasťou príjmov uvedených v r. 06: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr14">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr14 Daň zaplatená v zahraničí z príjmov z r. 13 - uvádza sa suma zaplatenej dane podľa zmluvy o zamedzení dvojitého zdanenia (zaokrúhlené na eurocenty nahor): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr15">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr15 Výpočet percenta dane na účely zápočtu r. 13 : [(r. 07 - r. 10) alebo r. 07] x 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr16">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr16 Z dane zaplatenej v zahraničí možno započítať [(r. 12 alebo r. 09) x r. 15] : 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr17">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr17 Daň uznaná na zápočet (r. 16 maximálne do sumy v r. 14): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr18">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr18 Daň z osobitného základu dane podľa § 51e zákona po vyňatí a zápočte (zaokrúhlená na eurocenty nadol) (r. 12 alebo r. 09) alebo (r. 12 - r. 17 alebo r. 09 - r. 17): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr19">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr19 Podiel na zisku (dividenda): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr20">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr20 Podiel člena pozemkového spoločenstva s právnou subjektivitou na zisku a na majetku: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr21">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr21 Podiel na výsledku podnikania vyplácaný tichému spoločníkovi: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr22/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr23/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma príjmu (výnosu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr24/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Suma výdavku (nákladu): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr25">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr25 Osobitný základ dane podľa § 51e zákona (r. 24 stĺ. 1 - r. 24 stĺ. 2): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr26">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr26 Sadzba dane (v %): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr27">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr27 Daň z osobitného základu dane (zaokrúhlená na eurocenty nadol) vypočítaná sadzbou dane podľa § 15 písm. a) štvrtého bodu zákona (r. 25 x r. 26) : 100: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/prilPodielyNaZisku/pr28">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr28 Daň z osobitného základu dane podľa § 51e zákona (zaokrúhlená na eurocenty nadol) 
(r. 18 + r. 27): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr1/s1">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pr&#237;jmy (v&#253;nosy): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr1/s2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>V&#253;davky (n&#225;klady): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr2">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr2 Z&#225;klad dane z pr&#237;jmov z v&#253;konu osobn&#233;ho asistenta (kladn&#253; rozdiel medzi pr&#237;jmami a v&#253;davkami); v&#253;sledok hospod&#225;renia (zisk): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr3">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr3 Strata z pr&#237;jmov z v&#253;konu osobn&#233;ho asistenta (z&#225;porn&#253; rozdiel); v&#253;sledok hospod&#225;renia (strata): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr4">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr4 Položky zvyšuj&#250;ce z&#225;klad dane (znižuj&#250;ce stratu) (&#167; 17 až &#167; 17b a, &#167; 17d, &#167; 19 ods.3 p&#237;sm. n) a &#167; 21 ods. 1 p&#237;sm. h) tret&#237; bod z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr5">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr5 Položky znižuj&#250;ce z&#225;klad dane (zvyšuj&#250;ce stratu) (&#167; 17 až &#167; 17b a &#167; 17 d z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr6">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr6 Z&#225;klad dane (čiastkov&#253; z&#225;klad dane) z pr&#237;jmov z v&#253;konu osobn&#233;ho asistenta po &#250;prave o položky zvyšuj&#250;ce z&#225;klad dane alebo znižuj&#250;ce z&#225;klad dane (r. 02 + r. 04 - r. 05) &gt; 0 alebo (r. 03 + r. 04 - r. 05) &gt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr7">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr7 Daňov&#225; strata z pr&#237;jmov z v&#253;konu osobn&#233;ho asistenta po &#250;prave o položky znižuj&#250;ce stratu alebo zvyšuj&#250;ce stratu (r. 02 + r. 04 - r. 05) &lt; 0 alebo (r. 03 + r. 04 - r. 05) &lt; 0: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr8">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr8 &#218;hrn povinn&#233;ho poistn&#233;ho (&#167; 5 ods. 8 z&#225;kona): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr9">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr9 &#250;hrn poistn&#233;ho na soci&#225;lne poistenie (zabezpečenie): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr10">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr10 &#250;hrn poistn&#233;ho na zdravotn&#233; poistenie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr11">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr11 Preuk&#225;zateľne zaplaten&#233; poistn&#233; na soci&#225;lne poistenie z pr&#237;jmov podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr12">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr12 preuk&#225;zateľne zaplaten&#233; poistn&#233; na dobrovoľn&#233; soci&#225;lne poistenie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr13">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr13 Preuk&#225;zateľne zaplaten&#233; poistn&#233; na zdravotn&#233; poistenie z pr&#237;jmov podľa &#167; 6 ods. 1 a 2 z&#225;kona: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr14">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr14 preukázateľne zaplatené preddavky na zdravotné poistenie z príjmov podľa § 6 ods. 1 a 2 zákona príslušné k zdaňovaciemu obdobiu, za ktoré sa podáva daňové priznanie: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/pr15">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>pr15 Výnosy podľa § 6 ods. 1 a 2 zákona (vypĺňa sa, len ak daňovník vedie podvojné účtovníctvo a nevypĺňa r. 1 až 3 a r. 5 až 9 v tabuľke č. 1): </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/priPrimoch6ods1a2VediemPU">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>Pri pr&#237;jmoch podľa &#167; 6 ods. 1 a 2 z&#225;kona vediem podvojn&#233; &#250;čtovn&#237;ctvo: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
</xsl:if>
</xsl:template>
<xsl:template match="/dokument/telo/socZdravPoistenie/datum">
<xsl:if test="./text()">
<xsl:text>&#xA;</xsl:text>
<xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>&#09;</xsl:text><xsl:text>D&#225;tum: </xsl:text><xsl:call-template name="string-replace-all"><xsl:with-param name="text" select="." /><xsl:with-param name="replace" select="'&#10;'" /><xsl:with-param name="by" select="'&#13;&#10;&#09;&#09;&#09;'" /></xsl:call-template>
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
<xsl:param name="text"/>
<xsl:param name="replace"/>
<xsl:param name="by"/>
<xsl:choose>
<xsl:when test="contains($text, $replace)">
<xsl:value-of select="substring-before($text,$replace)"/>
<xsl:value-of select="$by"/>
<xsl:call-template name="string-replace-all">
<xsl:with-param name="text" select="substring-after($text,$replace)"/>
<xsl:with-param name="replace" select="$replace"/>
<xsl:with-param name="by" select="$by" />
</xsl:call-template>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="$text"/>
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

