import { convertToJson, convertToXML } from "./xmlConverter";
import basicTaxForm from "./basicTaxForm";
import basic from "./basic";

var libxml = require("libxmljs");

describe("convertToJson", () => {
  test("Case 1", () => {
    const result = convertToJson(basicTaxForm);
    expect(result).toMatchObject(basic);
  });
});

describe("convertToXML", () => {
  test.only("Validation", () => {
    const result = convertToXML(basicTaxForm);
    var xsd = libxml.parseXml(schema);
    var xml = libxml.parseXml(result);

    xml.validate(xsd);
    expect(xml.validationErrors).toBe(null);
  });
  test.skip("Case 1", () => {
    const result = convertToXML(basicTaxForm);
    expect(result).toBe(xml);
  });
});

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<dokument>
   <hlavicka>
      <dic>111111111</dic>
      <datumNarodenia />
      <typDP>
         <rdp>1</rdp>
         <odp>0</odp>
         <ddp>0</ddp>
      </typDP>
      <zdanovacieObdobie>
         <rok>2019</rok>
         <datumDDP />
      </zdanovacieObdobie>
      <skNace>
         <k1>62</k1>
         <k2>01</k2>
         <k3>0</k3>
         <cinnost>Počítačové programovanie</cinnost>
      </skNace>
      <priezvisko>Retzer</priezvisko>
      <meno>Julius</meno>
      <titul />
      <titulZa />
      <adresaTrvPobytu>
         <ulica>Kastielska</ulica>
         <cislo>13</cislo>
         <psc>82105</psc>
         <obec>Bratislava</obec>
         <stat>Slovensko</stat>
      </adresaTrvPobytu>
      <nerezident>0</nerezident>
      <prepojeniePar2>0</prepojeniePar2>
      <adresaObvPobytu>
         <ulica />
         <cislo />
         <psc />
         <obec />
      </adresaObvPobytu>
      <zastupca>
         <priezvisko />
         <meno />
         <titul />
         <titulZa />
         <rodneCislo />
         <ulica />
         <cislo />
         <psc />
         <obec />
         <stat />
         <tel />
         <email />
      </zastupca>
   </hlavicka>
   <telo>
      <r29>0</r29>
      <r30 />
      <r31>
         <priezviskoMeno />
         <rodneCislo />
      </r31>
      <r32>
         <uplatnujemNCZDNaManzela>0</uplatnujemNCZDNaManzela>
         <vlastnePrijmy />
         <pocetMesiacov />
      </r32>
      <r33>
         <uplatNCZDNaKupelStarostlivost>0</uplatNCZDNaKupelStarostlivost>
         <preukazZaplatUhrady />
      </r33>
      <r34>
         <dieta>
            <priezviskoMeno />
            <rodneCislo />
            <kupelnaStarostlivost>0</kupelnaStarostlivost>
            <m00>0</m00>
            <m01>0</m01>
            <m02>0</m02>
            <m03>0</m03>
            <m04>0</m04>
            <m05>0</m05>
            <m06>0</m06>
            <m07>0</m07>
            <m08>0</m08>
            <m09>0</m09>
            <m10>0</m10>
            <m11>0</m11>
            <m12>0</m12>
         </dieta>
         <dieta>
            <priezviskoMeno />
            <rodneCislo />
            <kupelnaStarostlivost>0</kupelnaStarostlivost>
            <m00>0</m00>
            <m01>0</m01>
            <m02>0</m02>
            <m03>0</m03>
            <m04>0</m04>
            <m05>0</m05>
            <m06>0</m06>
            <m07>0</m07>
            <m08>0</m08>
            <m09>0</m09>
            <m10>0</m10>
            <m11>0</m11>
            <m12>0</m12>
         </dieta>
         <dieta>
            <priezviskoMeno />
            <rodneCislo />
            <kupelnaStarostlivost>0</kupelnaStarostlivost>
            <m00>0</m00>
            <m01>0</m01>
            <m02>0</m02>
            <m03>0</m03>
            <m04>0</m04>
            <m05>0</m05>
            <m06>0</m06>
            <m07>0</m07>
            <m08>0</m08>
            <m09>0</m09>
            <m10>0</m10>
            <m11>0</m11>
            <m12>0</m12>
         </dieta>
         <dieta>
            <priezviskoMeno />
            <rodneCislo />
            <kupelnaStarostlivost>0</kupelnaStarostlivost>
            <m00>0</m00>
            <m01>0</m01>
            <m02>0</m02>
            <m03>0</m03>
            <m04>0</m04>
            <m05>0</m05>
            <m06>0</m06>
            <m07>0</m07>
            <m08>0</m08>
            <m09>0</m09>
            <m10>0</m10>
            <m11>0</m11>
            <m12>0</m12>
         </dieta>
      </r34>
      <r35udajeDalsieDeti>0</r35udajeDalsieDeti>
      <r36 />
      <r37>
         <uplatDanBonusZaplatUroky>0</uplatDanBonusZaplatUroky>
         <zaplateneUroky />
         <pocetMesiacov />
      </r37>
      <r38 />
      <r38a />
      <r39 />
      <r40 />
      <tabulka1>
         <t1r1>
            <s1 />
            <s2 />
         </t1r1>
         <t1r2>
            <s1>20000.00</s1>
            <s2>14000.00</s2>
         </t1r2>
         <t1r3>
            <s1 />
            <s2 />
         </t1r3>
         <t1r4>
            <s1 />
            <s2 />
         </t1r4>
         <t1r5>
            <s1 />
            <s2 />
         </t1r5>
         <t1r6>
            <s1 />
            <s2 />
         </t1r6>
         <t1r7>
            <s1 />
            <s2 />
         </t1r7>
         <t1r8>
            <s1 />
            <s2 />
         </t1r8>
         <t1r9>
            <s1 />
            <s2 />
         </t1r9>
         <t1r10>
            <s1>20000.00</s1>
            <s2>14000.00</s2>
         </t1r10>
         <t1r11>
            <s1 />
            <s2 />
         </t1r11>
         <t1r12>
            <s1 />
            <s2 />
         </t1r12>
         <t1r13>
            <s1 />
            <s2 />
         </t1r13>
      </tabulka1>
      <vydavkyPar6ods11_ods1a2>0</vydavkyPar6ods11_ods1a2>
      <vydavkyPar6ods11_ods3>0</vydavkyPar6ods11_ods3>
      <vydavkyPar6ods11_ods4>0</vydavkyPar6ods11_ods4>
      <vydavkyPar6ods10_ods1a2>0</vydavkyPar6ods10_ods1a2>
      <vydavkyPar6ods10_ods4>0</vydavkyPar6ods10_ods4>
      <vydavkyPoistPar6ods11_ods1a2>2000.00</vydavkyPoistPar6ods11_ods1a2>
      <uplatnujemPar17ods17_ods1a2>0</uplatnujemPar17ods17_ods1a2>
      <uplatnujemPar17ods17_ods3a4>0</uplatnujemPar17ods17_ods3a4>
      <ukoncujemUplatnovaniePar17ods17_ods1a2>0</ukoncujemUplatnovaniePar17ods17_ods1a2>
      <ukoncujemUplatnovaniePar17ods17_ods3a4>0</ukoncujemUplatnovaniePar17ods17_ods3a4>
      <tabulka1a>
         <t1r1>
            <s1 />
            <s2 />
         </t1r1>
         <t1r2>
            <s1 />
            <s2 />
         </t1r2>
         <t1r3>
            <s1 />
            <s2 />
         </t1r3>
         <t1r4>
            <s1 />
            <s2 />
         </t1r4>
         <t1r5>
            <s1 />
            <s2 />
         </t1r5>
      </tabulka1a>
      <tabulka1b>
         <t1r1>
            <s1 />
            <s2 />
         </t1r1>
         <t1r2>
            <s1 />
            <s2 />
         </t1r2>
      </tabulka1b>
      <r41>20000.00</r41>
      <r42>14000.00</r42>
      <r43>6000.00</r43>
      <r44 />
      <r45 />
      <r46 />
      <r47>6000.00</r47>
      <r48 />
      <r49>
         <predchObdobie>
            <rok />
            <strata />
         </predchObdobie>
      </r49>
      <r50>
         <predchObdobie>
            <rok />
            <strata />
         </predchObdobie>
      </r50>
      <r51>
         <predchObdobie>
            <rok />
            <strata />
         </predchObdobie>
      </r51>
      <r52>
         <predchObdobie>
            <rok />
            <strata />
         </predchObdobie>
      </r52>
      <r53 />
      <r54 />
      <r55>6000.00</r55>
      <r56 />
      <r57>6000.00</r57>
      <r58 />
      <r59 />
      <r60 />
      <r61 />
      <r62 />
      <r63 />
      <r64 />
      <r65 />
      <tabulka2>
         <t2r1>
            <s1 />
            <s2 />
         </t2r1>
         <t2r2>
            <s1 />
            <s2 />
         </t2r2>
         <t2r3>
            <s1 />
            <s2 />
         </t2r3>
         <t2r4>
            <s1 />
            <s2 />
         </t2r4>
         <t2r5>
            <s1 />
            <s2 />
         </t2r5>
         <t2r6>
            <s1 />
            <s2 />
         </t2r6>
         <t2r7>
            <s1 />
            <s2 />
         </t2r7>
         <t2r8>
            <s1 />
            <s2 />
         </t2r8>
         <t2r9>
            <s1 />
            <s2 />
         </t2r9>
         <t2r10>
            <s1 />
            <s2 />
         </t2r10>
         <t2r11>
            <s1 />
            <s2 />
         </t2r11>
         <t2r12>
            <s1 />
         </t2r12>
      </tabulka2>
      <r66 />
      <r67 />
      <r68 />
      <tabulka3>
         <t3r1>
            <s1 />
            <s2 />
         </t3r1>
         <t3r2>
            <s1 />
            <s2 />
         </t3r2>
         <t3r3>
            <s1 />
            <s2 />
         </t3r3>
         <t3r4>
            <s1 />
            <s2 />
         </t3r4>
         <t3r5>
            <s1 />
            <s2 />
         </t3r5>
         <t3r6>
            <s1 />
            <s2 />
         </t3r6>
         <t3r7>
            <s1 />
            <s2 />
         </t3r7>
         <t3r8>
            <s1 />
            <s2 />
         </t3r8>
         <t3r9>
            <s1 />
            <s2 />
         </t3r9>
         <t3r10>
            <s1 />
            <s2 />
         </t3r10>
         <t3r11>
            <s1 />
            <s2 />
         </t3r11>
         <t3r12>
            <s1 />
            <s2 />
         </t3r12>
         <t3r13>
            <s1 />
            <s2 />
         </t3r13>
         <t3r14>
            <s1 />
            <s2 />
         </t3r14>
         <t3r15>
            <s1 />
            <s2 />
         </t3r15>
         <t3r16>
            <s1 />
            <s2 />
         </t3r16>
         <t3r17>
            <s1 />
            <s2 />
         </t3r17>
         <t3r18>
            <s1 />
         </t3r18>
         <t3r19>
            <s1 />
            <s2 />
         </t3r19>
      </tabulka3>
      <r69 />
      <r70 />
      <r71 />
      <r72>6000.00</r72>
      <r73>3937.35</r73>
      <r74 />
      <r75 />
      <r76 />
      <r76a />
      <r76b />
      <r77>3937.35</r77>
      <r78>2062.65</r78>
      <r79 />
      <r80>2062.65</r80>
      <r81>391.90</r81>
      <r82 />
      <r83 />
      <r84 />
      <r85 />
      <r86 />
      <r87 />
      <r88 />
      <r89 />
      <r90>391.90</r90>
      <r91 />
      <r92 />
      <r93 />
      <r94 />
      <r95 />
      <r96 />
      <r97 />
      <r98 />
      <r99 />
      <r100 />
      <r101 />
      <r102 />
      <r103 />
      <r104 />
      <r105>391.90</r105>
      <r106 />
      <r107>391.90</r107>
      <r108 />
      <r109 />
      <r110 />
      <r111 />
      <r112 />
      <r113>391.90</r113>
      <r114 />
      <r115 />
      <r116 />
      <r117 />
      <r118 />
      <r119 />
      <r120 />
      <r121 />
      <r122 />
      <r123 />
      <r124 />
      <r125>391.90</r125>
      <r126 />
      <r127 />
      <r128 />
      <r129 />
      <r130 />
      <r131 />
      <r132 />
      <r133 />
      <r134 />
      <r135 />
      <r136 />
      <r137 />
      <r138 />
      <r139>0</r139>
      <r140 />
      <neuplatnujem>1</neuplatnujem>
      <splnam3per>0</splnam3per>
      <r141 />
      <r142>
         <ico />
         <pravnaForma />
         <obchMeno>
            <riadok />
            <riadok />
         </obchMeno>
         <ulica />
         <cislo />
         <psc />
         <obec />
         <suhlasZaslUdaje>0</suhlasZaslUdaje>
      </r142>
      <osobitneZaznamy>
         <uvadza>0</uvadza>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <udajeOprijmoch>
            <kodStatu />
            <druhPrimuPar />
            <druhPrimuOds />
            <druhPrimuPis />
            <prijmy />
            <vydavky />
            <zTohoVydavky />
         </udajeOprijmoch>
         <rekreaciaPar19ods2>0</rekreaciaPar19ods2>
         <rekreaciaSuma />
         <zaznamy />
      </osobitneZaznamy>
      <r143>3</r143>
      <datumVyhlasenia>19.02.2020</datumVyhlasenia>
      <danovyPreplatokBonus>
         <vyplatitDanovyBonus>0</vyplatitDanovyBonus>
         <vyplatitDanovyBonusUroky>0</vyplatitDanovyBonusUroky>
         <vratitDanPreplatok>0</vratitDanPreplatok>
         <sposobPlatby>
            <poukazka>0</poukazka>
            <ucet>0</ucet>
            <ucetZahranicie>0</ucetZahranicie>
         </sposobPlatby>
         <bankovyUcet>
            <IBAN />
         </bankovyUcet>
         <datum />
      </danovyPreplatokBonus>
      <prilPodielyNaZisku>
         <pr1 />
         <pr2 />
         <pr3 />
         <pr4>
            <s1 />
            <s2 />
         </pr4>
         <pr5>
            <s1 />
            <s2 />
         </pr5>
         <pr6>
            <s1 />
            <s2 />
         </pr6>
         <pr7 />
         <pr8>7</pr8>
         <pr9 />
         <pr10 />
         <pr11 />
         <pr12 />
         <pr13 />
         <pr14 />
         <pr15 />
         <pr16 />
         <pr17 />
         <pr18 />
         <pr19 />
         <pr20 />
         <pr21 />
         <pr22>
            <s1 />
            <s2 />
         </pr22>
         <pr23>
            <s1 />
            <s2 />
         </pr23>
         <pr24>
            <s1 />
            <s2 />
         </pr24>
         <pr25 />
         <pr26>35</pr26>
         <pr27 />
         <pr28 />
      </prilPodielyNaZisku>
      <socZdravPoistenie>
         <pr1>
            <s1 />
            <s2 />
         </pr1>
         <pr2 />
         <pr3 />
         <pr4 />
         <pr5 />
         <pr6 />
         <pr7 />
         <pr8 />
         <pr9 />
         <pr10 />
         <pr11>1000.00</pr11>
         <pr12 />
         <pr13>1000.00</pr13>
         <pr14 />
         <pr15 />
         <priPrimoch6ods1a2VediemPU>0</priPrimoch6ods1a2VediemPU>
         <datum>19.02.2020</datum>
      </socZdravPoistenie>
   </telo>
</dokument>
`;

const schema = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Riadne, opravne a dodatocne danove priznanie k dani z prijmov fyzickej osoby, typ B, vzor 2019 -->
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">
	<xsd:annotation>
		<xsd:documentation>DPFO-B-2019</xsd:documentation>
	</xsd:annotation>
	<!-- prazdny retazec -->
	<xsd:simpleType name="emptyStr">
		<xsd:restriction base="xsd:string">
			<xsd:enumeration value=""/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinna boolovska hodnota 0 alebo 1 -->
	<xsd:simpleType name="only_0_1">
		<xsd:restriction base="xsd:decimal">
			<xsd:totalDigits value="1"/>
			<xsd:pattern value="[0-1]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 7 -->
	<xsd:simpleType name="fix7">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[7]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 15 -->
	<xsd:simpleType name="fix15">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[1][5]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 35 -->
	<xsd:simpleType name="fix35">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[3][5]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 2014 -->
	<xsd:simpleType name="fix2014">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[2][0][1][4]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 2015 -->
	<xsd:simpleType name="fix2015">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[2][0][1][5]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 2016 -->
	<xsd:simpleType name="fix2016">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[2][0][1][6]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinne cislo 2017 -->
	<xsd:simpleType name="fix2017">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[2][0][1][7]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- povinna boolovska hodnota -->
	<xsd:simpleType name="fixBool">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[0-1]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- nepovinne cele cislo -->
	<xsd:simpleType name="optInt">
		<xsd:union memberTypes="xsd:integer emptyStr"/>
	</xsd:simpleType>
	<!-- nepovinne desatinne cislo -->
	<xsd:simpleType name="optDec">
		<xsd:union memberTypes="decimalWithTwoDec emptyStr"/>
	</xsd:simpleType>
	<!-- cislo tvaru N (12.2) -->
	<xsd:simpleType name="decimalWithTwoDec">
		<xsd:restriction base="xsd:decimal">
			<xsd:totalDigits value="12"/>
			<xsd:fractionDigits value="2"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- nepovinne cele cislo na 1 -->
	<xsd:simpleType name="optInt1">
		<xsd:union memberTypes="integerWithOneDigit emptyStr"/>
	</xsd:simpleType>
	<xsd:simpleType name="integerWithOneDigit">
		<xsd:restriction base="xsd:integer">
			<xsd:totalDigits value="1"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- nepovinne cele cislo na 2 -->
	<xsd:simpleType name="optInt2">
		<xsd:union memberTypes="integerWithTwoDigit emptyStr"/>
	</xsd:simpleType>
	<xsd:simpleType name="integerWithTwoDigit">
		<xsd:restriction base="xsd:integer">
			<xsd:totalDigits value="2"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- cislo tvaru N (2) -->
	<xsd:simpleType name="optDecimalWithTwoDigit">
		<xsd:union memberTypes="decimalWithTwoDigit emptyStr"/>
	</xsd:simpleType>
	<xsd:simpleType name="decimalWithTwoDigit">
		<xsd:restriction base="xsd:decimal">
			<xsd:totalDigits value="2"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- cislo tvaru N (1) -->
	<xsd:simpleType name="optDecimalWithOneDigit">
		<xsd:union memberTypes="decimalWithOneDigit emptyStr"/>
	</xsd:simpleType>
	<xsd:simpleType name="decimalWithOneDigit">
		<xsd:restriction base="xsd:decimal">
			<xsd:totalDigits value="1"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- nepovinny datum -->
	<xsd:simpleType name="optDateLine">
		<xsd:union memberTypes="date emptyStr"/>
	</xsd:simpleType>
	<!-- povinny datum -->
	<xsd:simpleType name="date">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="(((([0])?[1-9])|([1-2][0-9])|([3][0]))[.]((([0])?[13-9])|([1][0-2]))[.]([0-9][0-9][0-9][0-9]))"/>
			<xsd:pattern value="([3][1][.]((([0])?[13578])|([1][02]))[.]([0-9][0-9][0-9][0-9]))"/>
			<xsd:pattern value="(((([0])?[1-9])|([1][0-9])|([2][0-8]))[.]([0])?[2][.]([0-9][0-9][0-9][0-9]))"/>
			<xsd:pattern value="([2][9][.]([0])?[2])[.][0-9][0-9][13579][26]"/>
			<xsd:pattern value="([2][9][.]([0])?[2])[.][0-9][0-9][02468][048]"/>
		</xsd:restriction>
	</xsd:simpleType>
	<!-- korenovy element -->
	<xsd:element name="dokument">
		<xsd:complexType>
			<xsd:sequence>
				<xsd:element name="hlavicka" type="hlavickaType"/>
				<xsd:element name="telo" type="teloType"/>
			</xsd:sequence>
		</xsd:complexType>
	</xsd:element>
	<xsd:complexType name="hlavickaType">
		<xsd:sequence>
			<xsd:element name="dic" type="xsd:string"/>
			<xsd:element name="datumNarodenia" type="optDateLine"/>
			<xsd:element name="typDP" type="typDPType"/>
			<xsd:element name="zdanovacieObdobie" type="zdanovacieObdobieType"/>
			<xsd:element name="skNace" type="skNaceType"/>
			<xsd:element name="priezvisko" type="xsd:string"/>
			<xsd:element name="meno" type="xsd:string"/>
			<xsd:element name="titul" type="xsd:string"/>
			<xsd:element name="titulZa" type="xsd:string"/>
			<xsd:element name="adresaTrvPobytu" type="adresaTrvPobytuType"/>
			<xsd:element name="nerezident" type="only_0_1"/>
			<xsd:element name="prepojeniePar2" type="only_0_1"/>
			<xsd:element name="adresaObvPobytu" type="adresaObvPobytuType"/>
			<xsd:element name="zastupca" type="zastupcaType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="typDPType">
		<xsd:sequence>
			<xsd:element name="rdp" type="only_0_1"/>
			<xsd:element name="odp" type="only_0_1"/>
			<xsd:element name="ddp" type="only_0_1"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="zdanovacieObdobieType">
		<xsd:sequence>
			<xsd:element name="rok" type="optInt"/>
			<xsd:element name="datumDDP" type="optDateLine"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="skNaceType">
		<xsd:sequence>
			<xsd:element name="k1" type="optInt2"/>
			<xsd:element name="k2" type="optInt2"/>
			<xsd:element name="k3" type="optInt1"/>
			<xsd:element name="cinnost" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="adresaTrvPobytuType">
		<xsd:sequence>
			<xsd:element name="ulica" type="xsd:string"/>
			<xsd:element name="cislo" type="xsd:string"/>
			<xsd:element name="psc" type="xsd:string"/>
			<xsd:element name="obec" type="xsd:string"/>
			<xsd:element name="stat" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="adresaObvPobytuType">
		<xsd:sequence>
			<xsd:element name="ulica" type="xsd:string"/>
			<xsd:element name="cislo" type="xsd:string"/>
			<xsd:element name="psc" type="xsd:string"/>
			<xsd:element name="obec" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="zastupcaType">
		<xsd:sequence>
			<xsd:element name="priezvisko" type="xsd:string"/>
			<xsd:element name="meno" type="xsd:string"/>
			<xsd:element name="titul" type="xsd:string"/>
			<xsd:element name="titulZa" type="xsd:string"/>
			<xsd:element name="rodneCislo" type="xsd:string"/>
			<xsd:element name="ulica" type="xsd:string"/>
			<xsd:element name="cislo" type="xsd:string"/>
			<xsd:element name="psc" type="xsd:string"/>
			<xsd:element name="obec" type="xsd:string"/>
			<xsd:element name="stat" type="xsd:string"/>
			<xsd:element name="tel" type="xsd:string"/>
			<xsd:element name="email" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="teloType">
		<xsd:sequence>
			<xsd:element name="r29" type="only_0_1"/>
			<xsd:element name="r30" type="optDec"/>
			<xsd:element name="r31" type="manzel"/>
			<xsd:element name="r32" type="nczdManzel"/>
			<xsd:element name="r33" type="nczdKupelnaStarostlivost"/>
			<xsd:element name="r34" type="r34Type"/>
			<xsd:element name="r35udajeDalsieDeti" type="only_0_1"/>
			<xsd:element name="r36" type="optDec"/>
			<xsd:element name="r37" type="danBonusZaplatUroky"/>
			<xsd:element name="r38" type="optDec"/>
			<xsd:element name="r38a" type="optDec"/>
			<xsd:element name="r39" type="optDec"/>
			<xsd:element name="r40" type="optDec"/>
			<xsd:element name="tabulka1" type="tabulka1Type"/>
			<xsd:element name="vydavkyPar6ods11_ods1a2" type="only_0_1"/>
			<xsd:element name="vydavkyPar6ods11_ods3" type="only_0_1"/>
			<xsd:element name="vydavkyPar6ods11_ods4" type="only_0_1"/>
			<xsd:element name="vydavkyPar6ods10_ods1a2" type="only_0_1"/>
			<xsd:element name="vydavkyPar6ods10_ods4" type="only_0_1"/>
			<xsd:element name="vydavkyPoistPar6ods11_ods1a2" type="optDec"/>
			<xsd:element name="uplatnujemPar17ods17_ods1a2" type="only_0_1"/>
			<xsd:element name="uplatnujemPar17ods17_ods3a4" type="only_0_1"/>
			<xsd:element name="ukoncujemUplatnovaniePar17ods17_ods1a2" type="only_0_1"/>
			<xsd:element name="ukoncujemUplatnovaniePar17ods17_ods3a4" type="only_0_1"/>
			<xsd:element name="tabulka1a" type="tabulka1aType"/>
			<xsd:element name="tabulka1b" type="tabulka1bType"/>
			<xsd:element name="r41" type="optDec"/>
			<xsd:element name="r42" type="optDec"/>
			<xsd:element name="r43" type="optDec"/>
			<xsd:element name="r44" type="optDec"/>
			<xsd:element name="r45" type="optDec"/>
			<xsd:element name="r46" type="optDec"/>
			<xsd:element name="r47" type="optDec"/>
			<xsd:element name="r48" type="optDec"/>
			<xsd:element name="r49" type="r49Type"/>
			<xsd:element name="r50" type="r50Type"/>
			<xsd:element name="r51" type="r51Type"/>
			<xsd:element name="r52" type="r52Type"/>
			<xsd:element name="r53" type="optDec"/>
			<xsd:element name="r54" type="optDec"/>
			<xsd:element name="r55" type="optDec"/>
			<xsd:element name="r56" type="optDec"/>
			<xsd:element name="r57" type="optDec"/>
			<xsd:element name="r58" type="optDec"/>
			<xsd:element name="r59" type="optDec"/>
			<xsd:element name="r60" type="optDec"/>
			<xsd:element name="r61" type="optDec"/>
			<xsd:element name="r62" type="optDec"/>
			<xsd:element name="r63" type="optDec"/>
			<xsd:element name="r64" type="optDec"/>
			<xsd:element name="r65" type="optDec"/>
			<xsd:element name="tabulka2" type="tabulka2Type"/>
			<xsd:element name="r66" type="optDec"/>
			<xsd:element name="r67" type="optDec"/>
			<xsd:element name="r68" type="optDec"/>
			<xsd:element name="tabulka3" type="tabulka3Type"/>
			<xsd:element name="r69" type="optDec"/>
			<xsd:element name="r70" type="optDec"/>
			<xsd:element name="r71" type="optDec"/>
			<xsd:element name="r72" type="optDec"/>
			<xsd:element name="r73" type="optDec"/>
			<xsd:element name="r74" type="optDec"/>
			<xsd:element name="r75" type="optDec"/>
			<xsd:element name="r76" type="optDec"/>
			<xsd:element name="r76a" type="optDec"/>
			<xsd:element name="r76b" type="optDec"/>
			<xsd:element name="r77" type="optDec"/>
			<xsd:element name="r78" type="optDec"/>
			<xsd:element name="r79" type="optDec"/>
			<xsd:element name="r80" type="optDec"/>
			<xsd:element name="r81" type="optDec"/>
			<xsd:element name="r82" type="optDec"/>
			<xsd:element name="r83" type="optDec"/>
			<xsd:element name="r84" type="optDec"/>
			<xsd:element name="r85" type="optDec"/>
			<xsd:element name="r86" type="optDec"/>
			<xsd:element name="r87" type="optDec"/>
			<xsd:element name="r88" type="optDec"/>
			<xsd:element name="r89" type="optDec"/>
			<xsd:element name="r90" type="optDec"/>
			<xsd:element name="r91" type="optDec"/>
			<xsd:element name="r92" type="optDec"/>
			<xsd:element name="r93" type="optDec"/>
			<xsd:element name="r94" type="optDec"/>
			<xsd:element name="r95" type="optDec"/>
			<xsd:element name="r96" type="optDec"/>
			<xsd:element name="r97" type="optDec"/>
			<xsd:element name="r98" type="optDec"/>
			<xsd:element name="r99" type="optDec"/>
			<xsd:element name="r100" type="optDec"/>
			<xsd:element name="r101" type="optDec"/>
			<xsd:element name="r102" type="optDec"/>
			<xsd:element name="r103" type="optDec"/>
			<xsd:element name="r104" type="optDec"/>
			<xsd:element name="r105" type="optDec"/>
			<xsd:element name="r106" type="optDec"/>
			<xsd:element name="r107" type="optDec"/>
			<xsd:element name="r108" type="optDec"/>
			<xsd:element name="r109" type="optDec"/>
			<xsd:element name="r110" type="optDec"/>
			<xsd:element name="r111" type="optDec"/>
			<xsd:element name="r112" type="optDec"/>
			<xsd:element name="r113" type="optDec"/>
			<xsd:element name="r114" type="optDec"/>
			<xsd:element name="r115" type="optDec"/>
			<xsd:element name="r116" type="optDec"/>
			<xsd:element name="r117" type="optDec"/>
			<xsd:element name="r118" type="optDec"/>
			<xsd:element name="r119" type="optDec"/>
			<xsd:element name="r120" type="optDec"/>
			<xsd:element name="r121" type="optDec"/>
			<xsd:element name="r122" type="optDec"/>
			<xsd:element name="r123" type="optDec"/>
			<xsd:element name="r124" type="optDec"/>
			<xsd:element name="r125" type="optDec"/>
			<xsd:element name="r126" type="optDec"/>
			<xsd:element name="r127" type="optDec"/>
			<xsd:element name="r128" type="optDec"/>
			<xsd:element name="r129" type="optDec"/>
			<xsd:element name="r130" type="optDec"/>
			<xsd:element name="r131" type="optDec"/>
			<xsd:element name="r132" type="optDec"/>
			<xsd:element name="r133" type="optDec"/>
			<xsd:element name="r134" type="optDec"/>
			<xsd:element name="r135" type="xsd:string"/>
			<xsd:element name="r136" type="optDec"/>
			<xsd:element name="r137" type="optDec"/>
			<xsd:element name="r138" type="optDec"/>
			<xsd:element name="r139" type="only_0_1"/>
			<xsd:element name="r140" type="optInt"/>
			<xsd:element name="neuplatnujem" type="only_0_1"/>
			<xsd:element name="splnam3per" type="only_0_1"/>
			<xsd:element name="r141" type="optDec"/>
			<xsd:element name="r142" type="r142Type"/>
			<xsd:element name="osobitneZaznamy" type="osobitneZaznamyType"/>
			<xsd:element name="r143" type="optInt"/>
			<xsd:element name="datumVyhlasenia" type="optDateLine"/>
			<xsd:element name="danovyPreplatokBonus" type="danovyPreplatokBonusType"/>
			<xsd:element name="prilPar30cOdpocetVydavkov" type="prilPar30cOdpocetVydavkovType" minOccurs="0" maxOccurs="unbounded"/>
			<xsd:element name="prilPodielyNaZisku" type="prilPodielyNaZiskuType"/>
			<xsd:element name="socZdravPoistenie" type="socZdravPoistenieType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="manzel">
		<xsd:sequence>
			<xsd:element name="priezviskoMeno" type="xsd:string"/>
			<xsd:element name="rodneCislo" type="optInt"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="nczdManzel">
		<xsd:sequence>
			<xsd:element name="uplatnujemNCZDNaManzela" type="only_0_1"/>
			<xsd:element name="vlastnePrijmy" type="optDec"/>
			<xsd:element name="pocetMesiacov" type="optInt"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="nczdKupelnaStarostlivost">
		<xsd:sequence>
			<xsd:element name="uplatNCZDNaKupelStarostlivost" type="only_0_1"/>
			<xsd:element name="preukazZaplatUhrady" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r34Type">
		<xsd:sequence>
			<xsd:element name="dieta" type="dietaType" minOccurs="4" maxOccurs="20"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="dietaType">
		<xsd:sequence>
			<xsd:element name="priezviskoMeno" type="xsd:string"/>
			<xsd:element name="rodneCislo" type="optInt"/>
			<xsd:element name="kupelnaStarostlivost" type="only_0_1"/>
			<xsd:element name="m00" type="only_0_1"/>
			<xsd:element name="m01" type="only_0_1"/>
			<xsd:element name="m02" type="only_0_1"/>
			<xsd:element name="m03" type="only_0_1"/>
			<xsd:element name="m04" type="only_0_1"/>
			<xsd:element name="m05" type="only_0_1"/>
			<xsd:element name="m06" type="only_0_1"/>
			<xsd:element name="m07" type="only_0_1"/>
			<xsd:element name="m08" type="only_0_1"/>
			<xsd:element name="m09" type="only_0_1"/>
			<xsd:element name="m10" type="only_0_1"/>
			<xsd:element name="m11" type="only_0_1"/>
			<xsd:element name="m12" type="only_0_1"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="danBonusZaplatUroky">
		<xsd:sequence>
			<xsd:element name="uplatDanBonusZaplatUroky" type="only_0_1"/>
			<xsd:element name="zaplateneUroky" type="optDec"/>
			<xsd:element name="pocetMesiacov" type="optInt"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tabulka1Type">
		<xsd:sequence>
			<xsd:element name="t1r1" type="tab2stlpceType"/>
			<xsd:element name="t1r2" type="tab2stlpceType"/>
			<xsd:element name="t1r3" type="tab2stlpceType"/>
			<xsd:element name="t1r4" type="tab2stlpceType"/>
			<xsd:element name="t1r5" type="tab2stlpceType"/>
			<xsd:element name="t1r6" type="tab2stlpceType"/>
			<xsd:element name="t1r7" type="tab2stlpceType"/>
			<xsd:element name="t1r8" type="tab2stlpceType"/>
			<xsd:element name="t1r9" type="tab2stlpceType"/>
			<xsd:element name="t1r10" type="tab2stlpceType"/>
			<xsd:element name="t1r11" type="tab2stlpceType"/>
			<xsd:element name="t1r12" type="tab2stlpceType"/>
			<xsd:element name="t1r13" type="tab2stlpceType"/>
			<!-- new 2016 -->
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tabulka1aType">
		<xsd:sequence>
			<xsd:element name="t1r1" type="tab2stlpceType"/>
			<xsd:element name="t1r2" type="tab2stlpceType"/>
			<xsd:element name="t1r3" type="tab2stlpceType"/>
			<xsd:element name="t1r4" type="tab2stlpceType"/>
			<xsd:element name="t1r5" type="tab2stlpceType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tabulka1bType">
		<xsd:sequence>
			<xsd:element name="t1r1" type="tab2stlpceType"/>
			<xsd:element name="t1r2" type="tab2stlpceType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tab2stlpceType">
		<xsd:sequence>
			<xsd:element name="s1" type="optDec"/>
			<xsd:element name="s2" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tabulka2Type">
		<xsd:sequence>
			<xsd:element name="t2r1" type="tab2stlpceType"/>
			<xsd:element name="t2r2" type="tab2stlpceType"/>
			<xsd:element name="t2r3" type="tab2stlpceType"/>
			<xsd:element name="t2r4" type="tab2stlpceType"/>
			<xsd:element name="t2r5" type="tab2stlpceType"/>
			<xsd:element name="t2r6" type="tab2stlpceType"/>
			<xsd:element name="t2r7" type="tab2stlpceType"/>
			<xsd:element name="t2r8" type="tab2stlpceType"/>
			<xsd:element name="t2r9" type="tab2stlpceType"/>
			<xsd:element name="t2r10" type="tab2stlpceType"/>
			<xsd:element name="t2r11" type="tab2stlpceType"/>
			<xsd:element name="t2r12" type="tab1stlpecType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tab1stlpecType">
		<xsd:sequence>
			<xsd:element name="s1" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="tabulka3Type">
		<xsd:sequence>
			<xsd:element name="t3r1" type="tab2stlpceType"/>
			<xsd:element name="t3r2" type="tab2stlpceType"/>
			<xsd:element name="t3r3" type="tab2stlpceType"/>
			<xsd:element name="t3r4" type="tab2stlpceType"/>
			<xsd:element name="t3r5" type="tab2stlpceType"/>
			<xsd:element name="t3r6" type="tab2stlpceType"/>
			<xsd:element name="t3r7" type="tab2stlpceType"/>
			<xsd:element name="t3r8" type="tab2stlpceType"/>
			<xsd:element name="t3r9" type="tab2stlpceType"/>
			<xsd:element name="t3r10" type="tab2stlpceType"/>
			<xsd:element name="t3r11" type="tab2stlpceType"/>
			<xsd:element name="t3r12" type="tab2stlpceType"/>
			<xsd:element name="t3r13" type="tab2stlpceType"/>
			<xsd:element name="t3r14" type="tab2stlpceType"/>
			<xsd:element name="t3r15" type="tab2stlpceType"/>
			<xsd:element name="t3r16" type="tab2stlpceType"/>
			<xsd:element name="t3r17" type="tab2stlpceType"/>
			<xsd:element name="t3r18" type="tab1stlpecType"/>
			<xsd:element name="t3r19" type="tab2stlpceType"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r49Type">
		<xsd:sequence>
			<xsd:element name="predchObdobie" type="r49_2014_Type"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r49_2014_Type">
		<xsd:sequence>
			<xsd:element name="rok" type="optInt"/>
			<xsd:element name="strata" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r50Type">
		<xsd:sequence>
			<xsd:element name="predchObdobie" type="r50_2015_Type"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r50_2015_Type">
		<xsd:sequence>
			<xsd:element name="rok" type="optInt"/>
			<xsd:element name="strata" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r51Type">
		<xsd:sequence>
			<xsd:element name="predchObdobie" type="r51_2016_Type"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r51_2016_Type">
		<xsd:sequence>
			<xsd:element name="rok" type="optInt"/>
			<xsd:element name="strata" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r52Type">
		<xsd:sequence>
			<xsd:element name="predchObdobie" type="r52_2017_Type"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r52_2017_Type">
		<xsd:sequence>
			<xsd:element name="rok" type="optInt"/>
			<xsd:element name="strata" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="r142Type">
		<xsd:sequence>
			<xsd:element name="ico" type="optInt"/>
			<xsd:element name="pravnaForma" type="xsd:string"/>
			<xsd:element name="obchMeno" type="obchMenoType"/>
			<xsd:element name="ulica" type="xsd:string"/>
			<xsd:element name="cislo" type="xsd:string"/>
			<xsd:element name="psc" type="xsd:string"/>
			<xsd:element name="obec" type="xsd:string"/>
			<xsd:element name="suhlasZaslUdaje" type="only_0_1"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="obchMenoType">
		<xsd:sequence>
			<xsd:element name="riadok" type="xsd:string" minOccurs="2" maxOccurs="2"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="osobitneZaznamyType">
		<xsd:sequence>
			<xsd:element name="uvadza" type="only_0_1"/>
			<xsd:element name="udajeOprijmoch" type="udajeOprijmochType" minOccurs="6" maxOccurs="20"/>
			<xsd:element name="rekreaciaPar19ods2" type="only_0_1"/>
			<xsd:element name="rekreaciaSuma" type="optDec"/>
			<xsd:element name="zaznamy" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<!-- priloha k Paragrafu 30c -->
	<xsd:complexType name="prilPar30cOdpocetVydavkovType">
		<xsd:sequence>
			<xsd:element name="projektCislo" type="optInt"/>
			<xsd:element name="pocetProjektov" type="optInt"/>
			<xsd:element name="datumRealizacie" type="optDateLine"/>
			<xsd:element name="r01" type="odpocetUdajeType"/>
			<xsd:element name="r02" type="odpocetUdajeType"/>
			<xsd:element name="r03" type="odpocetUdajeType"/>
			<xsd:element name="r04" type="odpocetUdajeType"/>
			<xsd:element name="r05" type="odpocetUdajeType"/>
			<xsd:element name="r06" type="optDec"/>
			<xsd:element name="ciele" type="xsd:string"/>
			<xsd:element name="r07" type="optDec"/>
			<xsd:element name="r08" type="optDec"/>
			<xsd:element name="r09" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="odpocetUdajeType">
		<xsd:sequence>
			<xsd:element name="zdanObdobieOd" type="optDateLine"/>
			<xsd:element name="zdanObdobieDo" type="optDateLine"/>
			<xsd:element name="narok" type="optDec"/>
			<xsd:element name="odpocitanaCast" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="danovyPreplatokBonusType">
		<xsd:sequence>
			<xsd:element name="vyplatitDanovyBonus" type="only_0_1"/>
			<xsd:element name="vyplatitDanovyBonusUroky" type="only_0_1"/>
			<xsd:element name="vratitDanPreplatok" type="only_0_1"/>
			<xsd:element name="sposobPlatby" type="sposobPlatbyType"/>
			<xsd:element name="bankovyUcet" type="bankovyUcetType"/>
			<xsd:element name="datum" type="optDateLine"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="sposobPlatbyType">
		<xsd:sequence>
			<xsd:element name="poukazka" type="only_0_1"/>
			<xsd:element name="ucet" type="only_0_1"/>
			<xsd:element name="ucetZahranicie" type="only_0_1"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="bankovyUcetType">
		<xsd:sequence>
			<xsd:element name="IBAN" type="xsd:string"/>
		</xsd:sequence>
	</xsd:complexType>
	<!-- udajeOprijmoch - osobitne zaznamy -->
	<xsd:complexType name="udajeOprijmochType">
		<xsd:sequence>
			<xsd:element name="kodStatu" type="xsd:string"/>
			<xsd:element name="druhPrimuPar" type="xsd:string"/>
			<xsd:element name="druhPrimuOds" type="optInt"/>
			<xsd:element name="druhPrimuPis" type="xsd:string"/>
			<xsd:element name="prijmy" type="optDec"/>
			<xsd:element name="vydavky" type="optDec"/>
			<xsd:element name="zTohoVydavky" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="prilPodielyNaZiskuType">
		<xsd:sequence>
			<xsd:element name="pr1" type="optDec"/>
			<xsd:element name="pr2" type="optDec"/>
			<xsd:element name="pr3" type="optDec"/>
			<xsd:element name="pr4" type="tab2stlpceType"/>
			<xsd:element name="pr5" type="tab2stlpceType"/>
			<xsd:element name="pr6" type="tab2stlpceType"/>
			<xsd:element name="pr7" type="optDec"/>
			<xsd:element name="pr8" type="fix7"/>
			<xsd:element name="pr9" type="optDec"/>
			<xsd:element name="pr10" type="optDec"/>
			<xsd:element name="pr11" type="optDec"/>
			<xsd:element name="pr12" type="optDec"/>
			<xsd:element name="pr13" type="optDec"/>
			<xsd:element name="pr14" type="optDec"/>
			<xsd:element name="pr15" type="optDec"/>
			<xsd:element name="pr16" type="optDec"/>
			<xsd:element name="pr17" type="optDec"/>
			<xsd:element name="pr18" type="optDec"/>
			<xsd:element name="pr19" type="optDec"/>
			<xsd:element name="pr20" type="optDec"/>
			<xsd:element name="pr21" type="optDec"/>
			<xsd:element name="pr22" type="tab2stlpceType"/>
			<xsd:element name="pr23" type="tab2stlpceType"/>
			<xsd:element name="pr24" type="tab2stlpceType"/>
			<xsd:element name="pr25" type="optDec"/>
			<xsd:element name="pr26" type="fix35"/>
			<xsd:element name="pr27" type="optDec"/>
			<xsd:element name="pr28" type="optDec"/>
		</xsd:sequence>
	</xsd:complexType>
	<xsd:complexType name="socZdravPoistenieType">
		<xsd:sequence>
			<xsd:element name="pr1" type="tab2stlpceType"/>
			<xsd:element name="pr2" type="optDec"/>
			<xsd:element name="pr3" type="optDec"/>
			<xsd:element name="pr4" type="optDec"/>
			<xsd:element name="pr5" type="optDec"/>
			<xsd:element name="pr6" type="optDec"/>
			<xsd:element name="pr7" type="optDec"/>
			<xsd:element name="pr8" type="optDec"/>
			<xsd:element name="pr9" type="optDec"/>
			<xsd:element name="pr10" type="optDec"/>
			<xsd:element name="pr11" type="optDec"/>
			<xsd:element name="pr12" type="optDec"/>
			<xsd:element name="pr13" type="optDec"/>
			<xsd:element name="pr14" type="optDec"/>
			<xsd:element name="pr15" type="optDec"/>
			<xsd:element name="priPrimoch6ods1a2VediemPU" type="only_0_1"/>
			<xsd:element name="datum" type="optDateLine"/>
		</xsd:sequence>
	</xsd:complexType>
</xsd:schema>
`;
