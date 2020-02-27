function getElementsValXml(element){
	  return element.textContent || element.text || '';
}

var xml;
var stringBuilder;
// **************************************************
function createxmlfinal() {
	stringBuilder = new $.StringBuilder();
	stringBuilder.appendLine('<?xml version="1.0" encoding="utf-8"?>');

	stringBuilder.appendLine('<dokument>');
		// HLAVICKA zakladne info
		stringBuilder.appendLine('<hlavicka>');
			stringBuilder.appendLine('\t<dic>' + htmlEncode($('#cmbDic1').val()) + '</dic>');
			stringBuilder.appendLine('\t<datumNarodenia>' + htmlEncode($('#dtpDatumNarodenia2').val()) + '</datumNarodenia>');
			stringBuilder.appendLine('\t<typDP>');
				stringBuilder.appendLine('\t\t<rdp>' + (document.getElementById("rbDruhVykazuRiadny").checked?'1':'0') + '</rdp>');
				stringBuilder.appendLine('\t\t<odp>' + (document.getElementById("rbDruhVykazuOpravny").checked?'1':'0') + '</odp>');
				stringBuilder.appendLine('\t\t<ddp>' + (document.getElementById("rbDruhVykazuDodatocny").checked?'1':'0') + '</ddp>');
			stringBuilder.appendLine('\t</typDP>');
			stringBuilder.appendLine('\t<zdanovacieObdobie>');
				stringBuilder.appendLine('\t\t<rok>' + htmlEncode($('#cmbRok').val()) + '</rok>');
				stringBuilder.appendLine('\t\t<datumDDP>' + htmlEncode($('#dtpDatumDDP').val()) + '</datumDDP>');
			stringBuilder.appendLine('\t</zdanovacieObdobie>');
			stringBuilder.appendLine('\t<skNace>');
				stringBuilder.appendLine('\t\t<k1>' + htmlEncode($('#cmbSKNACE3').val()).substring(0,2) + '</k1>');
				stringBuilder.appendLine('\t\t<k2>' + htmlEncode($('#cmbSKNACE3').val()).substring(2,4) + '</k2>');
				stringBuilder.appendLine('\t\t<k3>' + htmlEncode($('#cmbSKNACE3').val()).substring(4,5) + '</k3>');
				stringBuilder.appendLine('\t\t<cinnost>' + htmlEncode($('#cmbSKNACE3 option:selected').text()).substr(8).replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ') + '</cinnost>');
			stringBuilder.appendLine('\t</skNace>');
			
			// I. Oddiel
			stringBuilder.appendLine('\t<priezvisko>' + htmlEncode($('#tbPriezvisko4').val()) + '</priezvisko>');
			stringBuilder.appendLine('\t<meno>' + htmlEncode($('#tbMeno5').val()) + '</meno>');
			stringBuilder.appendLine('\t<titul>' + htmlEncode($('#tbTitul6').val()) + '</titul>');
			stringBuilder.appendLine('\t<titulZa>' + htmlEncode($('#tbTitul62').val()) + '</titulZa>');
			stringBuilder.appendLine('\t<adresaTrvPobytu>');
				stringBuilder.appendLine('\t\t<ulica>' + htmlEncode($('#tbUlica7').val()) + '</ulica>');
				stringBuilder.appendLine('\t\t<cislo>' + htmlEncode($('#tbCisloDomu8').val()) + '</cislo>');
				stringBuilder.appendLine('\t\t<psc>' + htmlEncode($('#tbPSC9').val()) + '</psc>');
				stringBuilder.appendLine('\t\t<obec>' + htmlEncode($('#tbObec10').val()) + '</obec>');
				stringBuilder.appendLine('\t\t<stat>' + htmlEncode($('#tbStat11').val()) + '</stat>');
			stringBuilder.appendLine('\t</adresaTrvPobytu>');
			stringBuilder.appendLine('\t<nerezident>' + (document.getElementById("cbNerezident").checked?'1':'0') + '</nerezident>');
			stringBuilder.appendLine('\t<prepojeniePar2>' + (document.getElementById("cbPrepojenie").checked?'1':'0') + '</prepojeniePar2>');

			stringBuilder.appendLine('\t<adresaObvPobytu>');
				stringBuilder.appendLine('\t\t<ulica>' + htmlEncode($('#tbUlica14').val()) + '</ulica>');
				stringBuilder.appendLine('\t\t<cislo>' + htmlEncode($('#tbCisloDomu15').val()) + '</cislo>');
				stringBuilder.appendLine('\t\t<psc>' + htmlEncode($('#tbPSC16').val()) + '</psc>');
				stringBuilder.appendLine('\t\t<obec>' + htmlEncode($('#tbObec17').val()) + '</obec>');
			stringBuilder.appendLine('\t</adresaObvPobytu>');
			
			// II. Oddiel
			stringBuilder.appendLine('\t<zastupca>');
				stringBuilder.appendLine('\t<priezvisko>' + htmlEncode($('#tbPriezvisko18').val()) + '</priezvisko>');
				stringBuilder.appendLine('\t<meno>' + htmlEncode($('#tbMeno19').val()) + '</meno>');
				stringBuilder.appendLine('\t<titul>' + htmlEncode($('#tbTitulPred20').val()) + '</titul>');
				stringBuilder.appendLine('\t<titulZa>' + htmlEncode($('#tbTitulZa20').val()) + '</titulZa>');
				stringBuilder.appendLine('\t<rodneCislo>' + htmlEncode($('#t21_1RC').val()) + htmlEncode($('#t21_2RC').val()) + '</rodneCislo>');
				stringBuilder.appendLine('\t<ulica>' + htmlEncode($('#tbUlica22').val()) + '</ulica>');
				stringBuilder.appendLine('\t<cislo>' + htmlEncode($('#tbCislo23').val()) + '</cislo>');
				stringBuilder.appendLine('\t<psc>' + htmlEncode($('#tbPSC24').val()) + '</psc>');
				stringBuilder.appendLine('\t<obec>' + htmlEncode($('#tbObec25').val()) + '</obec>');
				stringBuilder.appendLine('\t<stat>' + htmlEncode($('#tbStat26').val()) + '</stat>');
				stringBuilder.appendLine('\t<tel>' + htmlEncode($('#tbTelCislo27').val()) + '</tel>');
				stringBuilder.appendLine('\t<email>' + htmlEncode($('#tbEmail28').val()) + '</email>');
			stringBuilder.appendLine('\t</zastupca>');
			
		stringBuilder.appendLine('</hlavicka>');
		
		// III. Oddiel
		stringBuilder.appendLine('<telo>');
			stringBuilder.appendLine('\t<r29>' + (document.getElementById("cbr29").checked ? '1' : '0') + '</r29>');
			stringBuilder.appendLine('\t<r30>' + htmlEncode($('#t30').val()) + '</r30>');
			stringBuilder.appendLine('\t<r31>');
				stringBuilder.appendLine('\t<priezviskoMeno>' + htmlEncode($('#r31_1').val()) + '</priezviskoMeno>');
				stringBuilder.appendLine('\t<rodneCislo>' + htmlEncode($('#r31_2a').val()) + htmlEncode($('#r31_2b').val()) + '</rodneCislo>');
			stringBuilder.appendLine('\t</r31>');
			stringBuilder.appendLine('\t<r32>');
				stringBuilder.appendLine('\t<uplatnujemNCZDNaManzela>' + (document.getElementById("r32_1").checked ? '1' : '0') + '</uplatnujemNCZDNaManzela>');
				stringBuilder.appendLine('\t<vlastnePrijmy>' + htmlEncode($('#r32_2').val()) + '</vlastnePrijmy>');
				stringBuilder.appendLine('\t<pocetMesiacov>' + htmlEncode($('#r32_3').val()) + '</pocetMesiacov>');
			stringBuilder.appendLine('\t</r32>');
			stringBuilder.appendLine('\t<r33>');
				stringBuilder.appendLine('\t<uplatNCZDNaKupelStarostlivost>' + (document.getElementById("r33_1").checked ? '1' : '0') + '</uplatNCZDNaKupelStarostlivost>');
				stringBuilder.appendLine('\t<preukazZaplatUhrady>' + htmlEncode($('#r33_2').val()) + '</preukazZaplatUhrady>');
			stringBuilder.appendLine('\t</r33>');
			
			stringBuilder.appendLine('\t<r34>');
			var repeatingCount = $('[id^=layoutRow27421]').length;
				
				var i = 1;
	            for (; i <= repeatingCount; i++) {
	                stringBuilder.appendLine('\t\t<dieta>');
		                stringBuilder.appendLine('\t\t\t<priezviskoMeno>' + htmlEncode(getPageValue1Xml(i, 'r34Priezvisko_1')) + '</priezviskoMeno>');
		                stringBuilder.appendLine('\t\t\t<rodneCislo>' + htmlEncode(getPageValue1Xml(i, 'r34RodCislo_2a')) + htmlEncode(getPageValue1Xml(i, 'r34RodCislo_2b')) + '</rodneCislo>');
		                stringBuilder.appendLine('\t\t\t<kupelnaStarostlivost>' + getPageValueCh1Xml(i, 'r34Ks') + '</kupelnaStarostlivost>');
		                stringBuilder.appendLine('\t\t\t<m00>' + getPageValueCh1Xml(i, 'cbM00_1') + '</m00>');
		                stringBuilder.appendLine('\t\t\t<m01>' + getPageValueCh1Xml(i, 'cbM01_1') + '</m01>');
		                stringBuilder.appendLine('\t\t\t<m02>' + getPageValueCh1Xml(i, 'cbM02_1') + '</m02>');
		                stringBuilder.appendLine('\t\t\t<m03>' + getPageValueCh1Xml(i, 'cbM03_1') + '</m03>');
		                stringBuilder.appendLine('\t\t\t<m04>' + getPageValueCh1Xml(i, 'cbM04_1') + '</m04>');
		                stringBuilder.appendLine('\t\t\t<m05>' + getPageValueCh1Xml(i, 'cbM05_1') + '</m05>');
		                stringBuilder.appendLine('\t\t\t<m06>' + getPageValueCh1Xml(i, 'cbM06_1') + '</m06>');
		                stringBuilder.appendLine('\t\t\t<m07>' + getPageValueCh1Xml(i, 'cbM07_1') + '</m07>');
		                stringBuilder.appendLine('\t\t\t<m08>' + getPageValueCh1Xml(i, 'cbM08_1') + '</m08>');
		                stringBuilder.appendLine('\t\t\t<m09>' + getPageValueCh1Xml(i, 'cbM09_1') + '</m09>');
		                stringBuilder.appendLine('\t\t\t<m10>' + getPageValueCh1Xml(i, 'cbM10_1') + '</m10>');
		                stringBuilder.appendLine('\t\t\t<m11>' + getPageValueCh1Xml(i, 'cbM11_1') + '</m11>');
		                stringBuilder.appendLine('\t\t\t<m12>' + getPageValueCh1Xml(i, 'cbM12_1') + '</m12>');
	                stringBuilder.appendLine('\t\t</dieta>');
	            }
			stringBuilder.appendLine('\t</r34>');
			stringBuilder.appendLine('\t<r35udajeDalsieDeti>' + (document.getElementById("r35").checked ? '1' : '0') + '</r35udajeDalsieDeti>');
			stringBuilder.appendLine('\t<r36>' + htmlEncode($('#r36').val()) + '</r36>');
	            
            
			// IV. Oddiel
			stringBuilder.appendLine('\t<r37>');
				stringBuilder.appendLine('\t<uplatDanBonusZaplatUroky>' + (document.getElementById("r37_1").checked ? '1' : '0') + '</uplatDanBonusZaplatUroky>');
				stringBuilder.appendLine('\t<zaplateneUroky>' + htmlEncode($('#r37_2').val()) + '</zaplateneUroky>');
				stringBuilder.appendLine('\t<pocetMesiacov>' + htmlEncode($('#r37_3').val()) + '</pocetMesiacov>');
			stringBuilder.appendLine('\t</r37>');
			
			// V. Oddiel
			stringBuilder.appendLine('\t<r38>' + htmlEncode($('#r38').val()) + '</r38>');
			stringBuilder.appendLine('\t<r38a>' + htmlEncode($('#r38a').val()) + '</r38a>');
			stringBuilder.appendLine('\t<r39>' + htmlEncode($('#r39').val()) + '</r39>');
			stringBuilder.appendLine('\t<r40>' + htmlEncode($('#r40').val()) + '</r40>');
			
			// VI. Oddiel
			stringBuilder.appendLine('\t<tabulka1>');
				stringBuilder.appendLine('\t\t<t1r1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R1S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R1S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r1>');
				stringBuilder.appendLine('\t\t<t1r2>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R2S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R2S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r2>');
				stringBuilder.appendLine('\t\t<t1r3>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R3S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R3S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r3>');
				stringBuilder.appendLine('\t\t<t1r4>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R4S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R4S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r4>');
				stringBuilder.appendLine('\t\t<t1r5>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R5S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R5S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r5>');
				stringBuilder.appendLine('\t\t<t1r6>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R6S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R6S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r6>');
				stringBuilder.appendLine('\t\t<t1r7>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R7S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R7S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r7>');
				stringBuilder.appendLine('\t\t<t1r8>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R8S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R8S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r8>');
				stringBuilder.appendLine('\t\t<t1r9>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R9S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R9S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r9>');
				stringBuilder.appendLine('\t\t<t1r10>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R10S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R10S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r10>');
				stringBuilder.appendLine('\t\t<t1r11>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R11S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R11S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r11>');
				stringBuilder.appendLine('\t\t<t1r12>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R12S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R12S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r12>');
				stringBuilder.appendLine('\t\t<t1r13>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1R13S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1R13S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r13>');
			stringBuilder.appendLine('\t</tabulka1>');
			stringBuilder.appendLine('\t<vydavkyPar6ods11_ods1a2>' + (document.getElementById("cbPriPrijmoch11Ods6Zak1a2").checked ? '1' : '0') + '</vydavkyPar6ods11_ods1a2>');
			stringBuilder.appendLine('\t<vydavkyPar6ods11_ods3>' + (document.getElementById("cbPriPrijmoch11Ods6Zak3").checked ? '1' : '0') + '</vydavkyPar6ods11_ods3>');
			stringBuilder.appendLine('\t<vydavkyPar6ods11_ods4>' + (document.getElementById("cbPriPrijmoch11Ods6Zak4").checked ? '1' : '0') + '</vydavkyPar6ods11_ods4>');
			stringBuilder.appendLine('\t<vydavkyPar6ods10_ods1a2>' + (document.getElementById("cbPriPrijmoch10Ods6Zak1a2").checked ? '1' : '0') + '</vydavkyPar6ods10_ods1a2>');
			stringBuilder.appendLine('\t<vydavkyPar6ods10_ods4>' + (document.getElementById("cbPriPrijmoch10Ods6Zak4").checked ? '1' : '0') + '</vydavkyPar6ods10_ods4>');
			stringBuilder.appendLine('\t<vydavkyPoistPar6ods11_ods1a2>' + htmlEncode($('#tbPrekazatenePoistne').val()) + '</vydavkyPoistPar6ods11_ods1a2>');
			stringBuilder.appendLine('\t<uplatnujemPar17ods17_ods1a2>' + (document.getElementById("cbPriPrijmoch17Ods6Zak1a2").checked ? '1' : '0') + '</uplatnujemPar17ods17_ods1a2>');
			stringBuilder.appendLine('\t<uplatnujemPar17ods17_ods3a4>' + (document.getElementById("cbPriPrijmoch17Ods6Zak3a4").checked ? '1' : '0') + '</uplatnujemPar17ods17_ods3a4>');
			stringBuilder.appendLine('\t<ukoncujemUplatnovaniePar17ods17_ods1a2>' + (document.getElementById("cbUkoncPriPrijmoch17Ods6Zak1a2").checked ? '1' : '0') + '</ukoncujemUplatnovaniePar17ods17_ods1a2>');
			stringBuilder.appendLine('\t<ukoncujemUplatnovaniePar17ods17_ods3a4>' + (document.getElementById("cbUkoncPriPrijmoch17Ods6Zak3a4").checked ? '1' : '0') + '</ukoncujemUplatnovaniePar17ods17_ods3a4>');
			stringBuilder.appendLine('\t<tabulka1a>');
				stringBuilder.appendLine('\t\t<t1r1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1aR1S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1aR1S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r1>');
				stringBuilder.appendLine('\t\t<t1r2>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1aR2S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1aR2S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r2>');
				stringBuilder.appendLine('\t\t<t1r3>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1aR3S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1aR3S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r3>');
				stringBuilder.appendLine('\t\t<t1r4>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1aR4S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1aR4S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r4>');
				stringBuilder.appendLine('\t\t<t1r5>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1aR5S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1aR5S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r5>');
			stringBuilder.appendLine('\t</tabulka1a>');

			stringBuilder.appendLine('\t<tabulka1b>');
				stringBuilder.appendLine('\t\t<t1r1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1bR1S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1bR1S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r1>');
				stringBuilder.appendLine('\t\t<t1r2>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t1bR2S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t1bR2S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t1r2>');
			stringBuilder.appendLine('\t</tabulka1b>');
						
			stringBuilder.appendLine('\t<r41>' + htmlEncode($('#t41').val()) + '</r41>');
			stringBuilder.appendLine('\t<r42>' + htmlEncode($('#t42').val()) + '</r42>');
			stringBuilder.appendLine('\t<r43>' + htmlEncode($('#t43').val()) + '</r43>');
			stringBuilder.appendLine('\t<r44>' + htmlEncode($('#t44').val()) + '</r44>');
			stringBuilder.appendLine('\t<r45>' + htmlEncode($('#t45').val()) + '</r45>');
			stringBuilder.appendLine('\t<r46>' + htmlEncode($('#t46').val()) + '</r46>');
			stringBuilder.appendLine('\t<r47>' + htmlEncode($('#t47').val()) + '</r47>');
			stringBuilder.appendLine('\t<r48>' + htmlEncode($('#t48').val()) + '</r48>');
			stringBuilder.appendLine('\t<r49>');
				stringBuilder.appendLine('\t\t<predchObdobie>');
					stringBuilder.appendLine('\t\t\t<rok>' + htmlEncode($('#tbR49rok').val()) + '</rok>');
					stringBuilder.appendLine('\t\t\t<strata>' + htmlEncode($('#tbR49strata').val()) + '</strata>');
				stringBuilder.appendLine('\t\t</predchObdobie>');
			stringBuilder.appendLine('\t</r49>');
			stringBuilder.appendLine('\t<r50>');
				stringBuilder.appendLine('\t\t<predchObdobie>');
					stringBuilder.appendLine('\t\t\t<rok>' + htmlEncode($('#tbR50rok').val()) + '</rok>');
					stringBuilder.appendLine('\t\t\t<strata>' + htmlEncode($('#tbR50strata').val()) + '</strata>');
				stringBuilder.appendLine('\t\t</predchObdobie>');
			stringBuilder.appendLine('\t</r50>');
			stringBuilder.appendLine('\t<r51>');
				stringBuilder.appendLine('\t\t<predchObdobie>');
					stringBuilder.appendLine('\t\t\t<rok>' + htmlEncode($('#tbR51rok').val()) + '</rok>');
					stringBuilder.appendLine('\t\t\t<strata>' + htmlEncode($('#tbR51strata').val()) + '</strata>');
				stringBuilder.appendLine('\t\t</predchObdobie>');
			stringBuilder.appendLine('\t</r51>');
			stringBuilder.appendLine('\t<r52>');
				stringBuilder.appendLine('\t\t<predchObdobie>');
					stringBuilder.appendLine('\t\t\t<rok>' + htmlEncode($('#tbR52rok').val()) + '</rok>');
					stringBuilder.appendLine('\t\t\t<strata>' + htmlEncode($('#tbR52strata').val()) + '</strata>');
				stringBuilder.appendLine('\t\t</predchObdobie>');
			stringBuilder.appendLine('\t</r52>');		
			stringBuilder.appendLine('\t<r53>' + htmlEncode($('#t53').val()) + '</r53>');
			stringBuilder.appendLine('\t<r54>' + htmlEncode($('#t54').val()) + '</r54>');
			stringBuilder.appendLine('\t<r55>' + htmlEncode($('#t55').val()) + '</r55>');
			stringBuilder.appendLine('\t<r56>' + htmlEncode($('#t56').val()) + '</r56>');
			stringBuilder.appendLine('\t<r57>' + htmlEncode($('#t57').val()) + '</r57>');
			stringBuilder.appendLine('\t<r58>' + htmlEncode($('#t58').val()) + '</r58>');
			stringBuilder.appendLine('\t<r59>' + htmlEncode($('#t59').val()) + '</r59>');
			stringBuilder.appendLine('\t<r60>' + htmlEncode($('#t60').val()) + '</r60>');
			stringBuilder.appendLine('\t<r61>' + htmlEncode($('#t61').val()) + '</r61>');
			stringBuilder.appendLine('\t<r62>' + htmlEncode($('#t62').val()) + '</r62>');
			stringBuilder.appendLine('\t<r63>' + htmlEncode($('#t63').val()) + '</r63>');		
			stringBuilder.appendLine('\t<r64>' + htmlEncode($('#t64').val()) + '</r64>');
			stringBuilder.appendLine('\t<r65>' + htmlEncode($('#t65').val()) + '</r65>');
			
			stringBuilder.appendLine('\t<tabulka2>');
				stringBuilder.appendLine('\t\t<t2r1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R1S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R1S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r1>');
				stringBuilder.appendLine('\t\t<t2r2>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R2S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R2S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r2>');
				stringBuilder.appendLine('\t\t<t2r3>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R3S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R3S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r3>');
				stringBuilder.appendLine('\t\t<t2r4>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R4S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R4S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r4>');
				stringBuilder.appendLine('\t\t<t2r5>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R5S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R5S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r5>');
				stringBuilder.appendLine('\t\t<t2r6>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R6S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R6S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r6>');
				stringBuilder.appendLine('\t\t<t2r7>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R7S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R7S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r7>');
				stringBuilder.appendLine('\t\t<t2r8>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R8S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R8S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r8>');
				stringBuilder.appendLine('\t\t<t2r9>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R9S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R9S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r9>');
				stringBuilder.appendLine('\t\t<t2r10>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R10S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R10S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r10>');
				stringBuilder.appendLine('\t\t<t2r11>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R11S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R11S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r11>');
				stringBuilder.appendLine('\t\t<t2r12>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R12S1').val()) + '</s1>');
					//stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t2R12S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t2r12>');
				//	stringBuilder.appendLine('\t\t<t2r13>');
				//	stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t2R13S1').val()) + '</s1>');
				//stringBuilder.appendLine('\t\t</t2r13>');
			stringBuilder.appendLine('\t</tabulka2>');
			
			stringBuilder.appendLine('\t<r66>' + htmlEncode($('#t66').val()) + '</r66>');
			stringBuilder.appendLine('\t<r67>' + htmlEncode($('#t67').val()) + '</r67>');
			stringBuilder.appendLine('\t<r68>' + htmlEncode($('#t68').val()) + '</r68>');
			
			// VIII. Oddiel
			stringBuilder.appendLine('\t<tabulka3>');
				stringBuilder.appendLine('\t\t<t3r1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R1S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R1S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r1>');
				stringBuilder.appendLine('\t\t<t3r2>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R2S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R2S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r2>');
				stringBuilder.appendLine('\t\t<t3r3>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R3S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R3S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r3>');
				stringBuilder.appendLine('\t\t<t3r4>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R4S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R4S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r4>');
				stringBuilder.appendLine('\t\t<t3r5>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R5S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R5S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r5>');
				stringBuilder.appendLine('\t\t<t3r6>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R6S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R6S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r6>');
				stringBuilder.appendLine('\t\t<t3r7>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R7S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R7S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r7>');
				stringBuilder.appendLine('\t\t<t3r8>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R8S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R8S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r8>');
				stringBuilder.appendLine('\t\t<t3r9>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R9S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R9S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r9>');
				stringBuilder.appendLine('\t\t<t3r10>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R10S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R10S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r10>');
				stringBuilder.appendLine('\t\t<t3r11>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R11S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R11S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r11>');
				stringBuilder.appendLine('\t\t<t3r12>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R12S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R12S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r12>');
				stringBuilder.appendLine('\t\t<t3r13>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R13S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R13S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r13>');
				stringBuilder.appendLine('\t\t<t3r14>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R14S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R14S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r14>');
				stringBuilder.appendLine('\t\t<t3r15>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R15S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R15S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r15>');
				stringBuilder.appendLine('\t\t<t3r16>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R16S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R16S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r16>');
				stringBuilder.appendLine('\t\t<t3r17>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R17S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R17S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r17>');
				stringBuilder.appendLine('\t\t<t3r18>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R18S1').val()) + '</s1>');
				stringBuilder.appendLine('\t\t</t3r18>');
				stringBuilder.appendLine('\t\t<t3r19>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#t3R19S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#t3R19S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</t3r19>');
			stringBuilder.appendLine('\t</tabulka3>');
			
			stringBuilder.appendLine('\t<r69>' + htmlEncode($('#t69').val()) + '</r69>');
			stringBuilder.appendLine('\t<r70>' + htmlEncode($('#t70').val()) + '</r70>');
			stringBuilder.appendLine('\t<r71>' + htmlEncode($('#t71').val()) + '</r71>');
			stringBuilder.appendLine('\t<r72>' + htmlEncode($('#t72').val()) + '</r72>');
			stringBuilder.appendLine('\t<r73>' + htmlEncode($('#t73').val()) + '</r73>');
			stringBuilder.appendLine('\t<r74>' + htmlEncode($('#t74').val()) + '</r74>');
			stringBuilder.appendLine('\t<r75>' + htmlEncode($('#t75').val()) + '</r75>');
			stringBuilder.appendLine('\t<r76>' + htmlEncode($('#t76').val()) + '</r76>');
			stringBuilder.appendLine('\t<r76a>' + htmlEncode($('#t76a').val()) + '</r76a>');
			stringBuilder.appendLine('\t<r76b>' + htmlEncode($('#t76b').val()) + '</r76b>');
			stringBuilder.appendLine('\t<r77>' + htmlEncode($('#t77').val()) + '</r77>');
			stringBuilder.appendLine('\t<r78>' + htmlEncode($('#t78').val()) + '</r78>');
			stringBuilder.appendLine('\t<r79>' + htmlEncode($('#t79').val()) + '</r79>');
			stringBuilder.appendLine('\t<r80>' + htmlEncode($('#t80').val()) + '</r80>');
			stringBuilder.appendLine('\t<r81>' + htmlEncode($('#t81').val()) + '</r81>');
			stringBuilder.appendLine('\t<r82>' + htmlEncode($('#t82').val()) + '</r82>');
			stringBuilder.appendLine('\t<r83>' + htmlEncode($('#t83').val()) + '</r83>');
			stringBuilder.appendLine('\t<r84>' + htmlEncode($('#t84').val()) + '</r84>');
			stringBuilder.appendLine('\t<r85>' + htmlEncode($('#t85').val()) + '</r85>');
			stringBuilder.appendLine('\t<r86>' + htmlEncode($('#t86').val()) + '</r86>');
			stringBuilder.appendLine('\t<r87>' + htmlEncode($('#t87').val()) + '</r87>');
			stringBuilder.appendLine('\t<r88>' + htmlEncode($('#t88').val()) + '</r88>');
			stringBuilder.appendLine('\t<r89>' + htmlEncode($('#t89').val()) + '</r89>');
			stringBuilder.appendLine('\t<r90>' + htmlEncode($('#t90').val()) + '</r90>');
			stringBuilder.appendLine('\t<r91>' + htmlEncode($('#t91').val()) + '</r91>');
			stringBuilder.appendLine('\t<r92>' + htmlEncode($('#t92').val()) + '</r92>');
			stringBuilder.appendLine('\t<r93>' + htmlEncode($('#t93').val()) + '</r93>');
			stringBuilder.appendLine('\t<r94>' + htmlEncode($('#t94').val()) + '</r94>');
			stringBuilder.appendLine('\t<r95>' + htmlEncode($('#t95').val()) + '</r95>');
			stringBuilder.appendLine('\t<r96>' + htmlEncode($('#t96').val()) + '</r96>');
			stringBuilder.appendLine('\t<r97>' + htmlEncode($('#t97').val()) + '</r97>');
			stringBuilder.appendLine('\t<r98>' + htmlEncode($('#t98').val()) + '</r98>');
			stringBuilder.appendLine('\t<r99>' + htmlEncode($('#t99').val()) + '</r99>');
			stringBuilder.appendLine('\t<r100>' + htmlEncode($('#t100').val()) + '</r100>');
			stringBuilder.appendLine('\t<r101>' + htmlEncode($('#t101').val()) + '</r101>');
			stringBuilder.appendLine('\t<r102>' + htmlEncode($('#t102').val()) + '</r102>');
			stringBuilder.appendLine('\t<r103>' + htmlEncode($('#t103').val()) + '</r103>');
			stringBuilder.appendLine('\t<r104>' + htmlEncode($('#t104').val()) + '</r104>');
			stringBuilder.appendLine('\t<r105>' + htmlEncode($('#t105').val()) + '</r105>');
			stringBuilder.appendLine('\t<r106>' + htmlEncode($('#t106').val()) + '</r106>');
			stringBuilder.appendLine('\t<r107>' + htmlEncode($('#t107').val()) + '</r107>');
			stringBuilder.appendLine('\t<r108>' + htmlEncode($('#t108').val()) + '</r108>');
			stringBuilder.appendLine('\t<r109>' + htmlEncode($('#t109').val()) + '</r109>');
			stringBuilder.appendLine('\t<r110>' + htmlEncode($('#t110').val()) + '</r110>');
			stringBuilder.appendLine('\t<r111>' + htmlEncode($('#t111').val()) + '</r111>');
			stringBuilder.appendLine('\t<r112>' + htmlEncode($('#t112').val()) + '</r112>');
			stringBuilder.appendLine('\t<r113>' + htmlEncode($('#t113').val()) + '</r113>');
			stringBuilder.appendLine('\t<r114>' + htmlEncode($('#t114').val()) + '</r114>');
			stringBuilder.appendLine('\t<r115>' + htmlEncode($('#t115').val()) + '</r115>');
			stringBuilder.appendLine('\t<r116>' + htmlEncode($('#t116').val()) + '</r116>');
			stringBuilder.appendLine('\t<r117>' + htmlEncode($('#t117').val()) + '</r117>');
			stringBuilder.appendLine('\t<r118>' + htmlEncode($('#t118').val()) + '</r118>');
			stringBuilder.appendLine('\t<r119>' + htmlEncode($('#t119').val()) + '</r119>');
			stringBuilder.appendLine('\t<r120>' + htmlEncode($('#t120').val()) + '</r120>');
			stringBuilder.appendLine('\t<r121>' + htmlEncode($('#t121').val()) + '</r121>');
			stringBuilder.appendLine('\t<r122>' + htmlEncode($('#t122').val()) + '</r122>');
			stringBuilder.appendLine('\t<r123>' + htmlEncode($('#t123').val()) + '</r123>');
			stringBuilder.appendLine('\t<r124>' + htmlEncode($('#t124').val()) + '</r124>');
			stringBuilder.appendLine('\t<r125>' + htmlEncode($('#t125').val()) + '</r125>');
			stringBuilder.appendLine('\t<r126>' + htmlEncode($('#t126').val()) + '</r126>');
			stringBuilder.appendLine('\t<r127>' + htmlEncode($('#t127').val()) + '</r127>');
			stringBuilder.appendLine('\t<r128>' + htmlEncode($('#t128').val()) + '</r128>');
			stringBuilder.appendLine('\t<r129>' + htmlEncode($('#t129').val()) + '</r129>');
			stringBuilder.appendLine('\t<r130>' + htmlEncode($('#t130').val()) + '</r130>');
			stringBuilder.appendLine('\t<r131>' + htmlEncode($('#t131').val()) + '</r131>');
			stringBuilder.appendLine('\t<r132>' + htmlEncode($('#t132').val()) + '</r132>');
			stringBuilder.appendLine('\t<r133>' + htmlEncode($('#t133').val()) + '</r133>');
			stringBuilder.appendLine('\t<r134>' + htmlEncode($('#t134').val()) + '</r134>');
			stringBuilder.appendLine('\t<r135>' + htmlEncode($('#t135').val()) + '</r135>');
			stringBuilder.appendLine('\t<r136>' + htmlEncode($('#t136').val()) + '</r136>');
			stringBuilder.appendLine('\t<r137>' + htmlEncode($('#t137').val()) + '</r137>');
			stringBuilder.appendLine('\t<r138>' + htmlEncode($('#t138').val()) + '</r138>');
            stringBuilder.appendLine('\t<r139>' + (document.getElementById("t139").checked ? '1' : '0') + '</r139>');
			stringBuilder.appendLine('\t<r140>' + htmlEncode($('#t140').val()) + '</r140>');
			stringBuilder.appendLine('\t<neuplatnujem>' + (document.getElementById("cbNeuplatnujem").checked ? '1' : '0') + '</neuplatnujem>');
			stringBuilder.appendLine('\t<splnam3per>' + (document.getElementById("cbSplnam3Per").checked?'1':'0') + '</splnam3per>');
			stringBuilder.appendLine('\t<r141>' + htmlEncode($('#tbPodiel141').val()) + '</r141>');
			
            stringBuilder.appendLine('\t<r142>');
            stringBuilder.appendLine('\t\t<ico>' + htmlEncode($('#tbico142').val()) + '</ico>');
			stringBuilder.appendLine('\t\t<pravnaForma>' + htmlEncode($('#PravnaForma142').val()) + '</pravnaForma>');
			stringBuilder.appendLine('\t\t<obchMeno>');
			stringBuilder.appendLine('\t\t\t<riadok><![CDATA[' + $('#tbObchMeno142').val().substr(0, 37) + ']]></riadok>');
			stringBuilder.appendLine('\t\t\t<riadok><![CDATA[' + $('#tbObchMeno142').val().substr(37, 37) + ']]></riadok>');
			stringBuilder.appendLine('\t\t</obchMeno>');
			stringBuilder.appendLine('\t\t<ulica>' + htmlEncode($('#tbUlica142').val()) + '</ulica>');
			stringBuilder.appendLine('\t\t<cislo>' + htmlEncode($('#tbCislo142').val()) + '</cislo>');
			stringBuilder.appendLine('\t\t<psc>' + htmlEncode($('#tbPSC142').val()) + '</psc>');
			stringBuilder.appendLine('\t\t<obec>' + htmlEncode($('#tbObec142').val()) + '</obec>');
			stringBuilder.appendLine('\t\t<suhlasZaslUdaje>' + (document.getElementById("chbSuhlas").checked?'1':'0') + '</suhlasZaslUdaje>');
			stringBuilder.appendLine('\t</r142>');

			// XIV. Oddiel
			stringBuilder.appendLine('\t<osobitneZaznamy>');
				stringBuilder.appendLine('\t\t<uvadza>' + (document.getElementById("cbUvadza").checked?'1':'0') + '</uvadza>');
				
				
			for (var i=0;i<20;i++)
			{
				if(i==0){
				stringBuilder.appendLine('\t\t<udajeOprijmoch>');
					stringBuilder.appendLine('\t\t\t<kodStatu>' + htmlEncode($('#odd13kod').val()) + '</kodStatu>');
					stringBuilder.appendLine('\t\t\t<druhPrimuPar>' + htmlEncode($('#odd13Par').val()) + '</druhPrimuPar>');
					stringBuilder.appendLine('\t\t\t<druhPrimuOds>' + htmlEncode($('#odd13Ods').val()) + '</druhPrimuOds>');
					stringBuilder.appendLine('\t\t\t<druhPrimuPis>' + htmlEncode($('#odd13Pism').val()) + '</druhPrimuPis>');
					stringBuilder.appendLine('\t\t\t<prijmy>' + htmlEncode($('#odd13Prijmy').val()) + '</prijmy>');
					stringBuilder.appendLine('\t\t\t<vydavky>' + htmlEncode($('#odd13Vydavky').val()) + '</vydavky>');
					stringBuilder.appendLine('\t\t\t<zTohoVydavky>' + htmlEncode($('#odd13zToho').val()) + '</zTohoVydavky>');
				stringBuilder.appendLine('\t\t</udajeOprijmoch>');
				}else{
				if(!document.getElementById("layoutRow27323_Repeating_"+i)) break;		
				stringBuilder.appendLine('\t\t<udajeOprijmoch>');
					stringBuilder.appendLine('\t\t\t<kodStatu>' + htmlEncode($('#odd13kod_Repeating_'+i).val()) + '</kodStatu>');
					stringBuilder.appendLine('\t\t\t<druhPrimuPar>' + htmlEncode($('#odd13Par_Repeating_'+i).val()) + '</druhPrimuPar>');
					stringBuilder.appendLine('\t\t\t<druhPrimuOds>' + htmlEncode($('#odd13Ods_Repeating_'+i).val()) + '</druhPrimuOds>');
					stringBuilder.appendLine('\t\t\t<druhPrimuPis>' + htmlEncode($('#odd13Pism_Repeating_'+i).val()) + '</druhPrimuPis>');
					stringBuilder.appendLine('\t\t\t<prijmy>' + htmlEncode($('#odd13Prijmy_Repeating_'+i).val()) + '</prijmy>');
					stringBuilder.appendLine('\t\t\t<vydavky>' + htmlEncode($('#odd13Vydavky_Repeating_'+i).val()) + '</vydavky>');
					stringBuilder.appendLine('\t\t\t<zTohoVydavky>' + htmlEncode($('#odd13zToho_Repeating_'+i).val()) + '</zTohoVydavky>');
				stringBuilder.appendLine('\t\t</udajeOprijmoch>');
				}
			}
			stringBuilder.appendLine('\t\t<rekreaciaPar19ods2>' + (document.getElementById("chbRekreacia").checked?'1':'0') + '</rekreaciaPar19ods2>');
			stringBuilder.appendLine('\t\t<rekreaciaSuma>' + htmlEncode($('#valRekreacia').val()) + '</rekreaciaSuma>');
			stringBuilder.appendLine('\t\t<zaznamy><![CDATA[' + $('#taZaznamy').val() + ']]></zaznamy>');
			stringBuilder.appendLine('\t</osobitneZaznamy>');

			stringBuilder.appendLine('\t<r143>' + htmlEncode($('#t143').val()) + '</r143>');
			stringBuilder.appendLine('\t<datumVyhlasenia>' + htmlEncode($('#dtpDatumSpravneUplne').val()) + '</datumVyhlasenia>');
			
			// XV. Oddiel
			stringBuilder.appendLine('\t<danovyPreplatokBonus>');
				stringBuilder.appendLine('\t\t<vyplatitDanovyBonus>' + (document.getElementById("cbVyplatit").checked?'1':'0') + '</vyplatitDanovyBonus>');
				stringBuilder.appendLine('\t\t<vyplatitDanovyBonusUroky>' + (document.getElementById("chBonus").checked?'1':'0') + '</vyplatitDanovyBonusUroky>');
				stringBuilder.appendLine('\t\t<vratitDanPreplatok>' + (document.getElementById("cbVratenie").checked?'1':'0') + '</vratitDanPreplatok>');
				stringBuilder.appendLine('\t\t<sposobPlatby>');
					stringBuilder.appendLine('\t\t\t<poukazka>' + (document.getElementById("cbPoukazkaDB").checked?'1':'0') + '</poukazka>');
					stringBuilder.appendLine('\t\t\t<ucet>' + (document.getElementById("cbUcetDB").checked?'1':'0') + '</ucet>');
					stringBuilder.appendLine('\t\t\t<ucetZahranicie>' + (document.getElementById("cbUcetZah").checked?'1':'0') + '</ucetZahranicie>');
				stringBuilder.appendLine('\t\t</sposobPlatby>');
				stringBuilder.appendLine('\t\t<bankovyUcet>');
				    stringBuilder.appendLine('\t\t\t<IBAN>' + htmlEncode($('#tbIBAN').val()) + '</IBAN>');
				stringBuilder.appendLine('\t\t</bankovyUcet>');
				stringBuilder.appendLine('\t\t<datum>' + htmlEncode($('#dtpDatumDB').val()) + '</datum>');
			stringBuilder.appendLine('\t</danovyPreplatokBonus>');
			
			var lr = $("[id^='layoutRow27435']");
			var polePoli = new Array();
			polePoli.push(lr.eq(0).find("[id^='DatumProjektu']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r1DatumOd']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r1DatumDo']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r1Vyska']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r1Odp']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r2DatumOd']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r2DatumDo']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r2Vyska']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r2Odp']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r3DatumOd']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r3DatumDo']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r3Vyska']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r3Odp']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r4DatumOd']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r4DatumDo']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r4Vyska']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r4Odp']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r5DatumOd']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r5DatumDo']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r5Vyska']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r5Odp']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r6']").val());
			polePoli.push(lr.eq(0).find("[id^='CieleProjektu']").val());
			polePoli.push(lr.eq(0).find("[id^='Pri1r7']").val());
			var anoNie = false;
			for(var tu = 0;tu<polePoli.length;tu++){
				if(polePoli[tu] != ""){
					anoNie = true;
				}
			}
			
			if(anoNie == true || lr.length > 1){
				lr.each(function(){
					stringBuilder.appendLine('\t<prilPar30cOdpocetVydavkov>');
						stringBuilder.appendLine('\t\t<projektCislo>' + htmlEncode($(this).find("[id^='ProjektCislo']").val()) + '</projektCislo>');
						stringBuilder.appendLine('\t\t<pocetProjektov>' + htmlEncode($(this).find("[id^='PocetProjektov']").val()) + '</pocetProjektov>');
						stringBuilder.appendLine('\t\t<datumRealizacie>' + htmlEncode($(this).find("[id^='DatumProjektu']").val()) + '</datumRealizacie>');
						stringBuilder.appendLine('\t\t<r01>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieOd>' + htmlEncode($(this).find("[id^='Pri1r1DatumOd']").val()) + '</zdanObdobieOd>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieDo>' + htmlEncode($(this).find("[id^='Pri1r1DatumDo']").val()) + '</zdanObdobieDo>');
							stringBuilder.appendLine('\t\t\t<narok>' + htmlEncode($(this).find("[id^='Pri1r1Vyska']").val()) + '</narok>');
							stringBuilder.appendLine('\t\t\t<odpocitanaCast>' + htmlEncode($(this).find("[id^='Pri1r1Odp']").val()) + '</odpocitanaCast>');
						stringBuilder.appendLine('\t\t</r01>');
						stringBuilder.appendLine('\t\t<r02>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieOd>' + htmlEncode($(this).find("[id^='Pri1r2DatumOd']").val()) + '</zdanObdobieOd>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieDo>' + htmlEncode($(this).find("[id^='Pri1r2DatumDo']").val()) + '</zdanObdobieDo>');
							stringBuilder.appendLine('\t\t\t<narok>' + htmlEncode($(this).find("[id^='Pri1r2Vyska']").val()) + '</narok>');
							stringBuilder.appendLine('\t\t\t<odpocitanaCast>' + htmlEncode($(this).find("[id^='Pri1r2Odp']").val()) + '</odpocitanaCast>');
						stringBuilder.appendLine('\t\t</r02>');
						stringBuilder.appendLine('\t\t<r03>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieOd>' + htmlEncode($(this).find("[id^='Pri1r3DatumOd']").val()) + '</zdanObdobieOd>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieDo>' + htmlEncode($(this).find("[id^='Pri1r3DatumDo']").val()) + '</zdanObdobieDo>');
							stringBuilder.appendLine('\t\t\t<narok>' + htmlEncode($(this).find("[id^='Pri1r3Vyska']").val()) + '</narok>');
							stringBuilder.appendLine('\t\t\t<odpocitanaCast>' + htmlEncode($(this).find("[id^='Pri1r3Odp']").val()) + '</odpocitanaCast>');
						stringBuilder.appendLine('\t\t</r03>');
						stringBuilder.appendLine('\t\t<r04>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieOd>' + htmlEncode($(this).find("[id^='Pri1r4DatumOd']").val()) + '</zdanObdobieOd>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieDo>' + htmlEncode($(this).find("[id^='Pri1r4DatumDo']").val()) + '</zdanObdobieDo>');
							stringBuilder.appendLine('\t\t\t<narok>' + htmlEncode($(this).find("[id^='Pri1r4Vyska']").val()) + '</narok>');
							stringBuilder.appendLine('\t\t\t<odpocitanaCast>' + htmlEncode($(this).find("[id^='Pri1r4Odp']").val()) + '</odpocitanaCast>');
						stringBuilder.appendLine('\t\t</r04>');
						stringBuilder.appendLine('\t\t<r05>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieOd>' + htmlEncode($(this).find("[id^='Pri1r5DatumOd']").val()) + '</zdanObdobieOd>');
							stringBuilder.appendLine('\t\t\t<zdanObdobieDo>' + htmlEncode($(this).find("[id^='Pri1r5DatumDo']").val()) + '</zdanObdobieDo>');
							stringBuilder.appendLine('\t\t\t<narok>' + htmlEncode($(this).find("[id^='Pri1r5Vyska']").val()) + '</narok>');
							stringBuilder.appendLine('\t\t\t<odpocitanaCast>' + htmlEncode($(this).find("[id^='Pri1r5Odp']").val()) + '</odpocitanaCast>');
						stringBuilder.appendLine('\t\t</r05>');
						stringBuilder.appendLine('\t\t<r06>' + htmlEncode($(this).find("[id^='Pri1r6']").val()) + '</r06>');
						stringBuilder.appendLine('\t\t<ciele>' + htmlEncode($(this).find("[id^='CieleProjektu']").val()) + '</ciele>');
						stringBuilder.appendLine('\t\t<r07>' + htmlEncode($(this).find("[id^='Pri1r7']").val()) + '</r07>');
						stringBuilder.appendLine('\t\t<r08>' + htmlEncode($(this).find("[id^='Pri1r8']").val()) + '</r08>');
						stringBuilder.appendLine('\t\t<r09>' + htmlEncode($(this).find("[id^='Pri1r9']").val()) + '</r09>');
					stringBuilder.appendLine('\t</prilPar30cOdpocetVydavkov>');
				});
			}
			
			stringBuilder.appendLine('\t<prilPodielyNaZisku>');
				stringBuilder.appendLine('\t\t<pr1>' + htmlEncode($('#tbPr2S1_01').val()) + '</pr1>');
				stringBuilder.appendLine('\t\t<pr2>' + htmlEncode($('#tbPr2S1_02').val()) + '</pr2>');
				stringBuilder.appendLine('\t\t<pr3>' + htmlEncode($('#tbPr2S1_03').val()) + '</pr3>');
				stringBuilder.appendLine('\t\t<pr4>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_04').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_04').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr4>');
				stringBuilder.appendLine('\t\t<pr5>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_05').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_05').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr5>');
				stringBuilder.appendLine('\t\t<pr6>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_06').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_06').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr6>');
				stringBuilder.appendLine('\t\t<pr7>' + htmlEncode($('#tbPr2_07').val()) + '</pr7>');
				stringBuilder.appendLine('\t\t<pr8>' + htmlEncode($('#tbPr2_08').val()) + '</pr8>');
				stringBuilder.appendLine('\t\t<pr9>' + htmlEncode($('#tbPr2_09').val()) + '</pr9>');
				stringBuilder.appendLine('\t\t<pr10>' + htmlEncode($('#tbPr2_10').val()) + '</pr10>');
				stringBuilder.appendLine('\t\t<pr11>' + htmlEncode($('#tbPr2_11').val()) + '</pr11>');
				stringBuilder.appendLine('\t\t<pr12>' + htmlEncode($('#tbPr2_12').val()) + '</pr12>');
				stringBuilder.appendLine('\t\t<pr13>' + htmlEncode($('#tbPr2_13').val()) + '</pr13>');
				stringBuilder.appendLine('\t\t<pr14>' + htmlEncode($('#tbPr2_14').val()) + '</pr14>');
				stringBuilder.appendLine('\t\t<pr15>' + htmlEncode($('#tbPr2_15').val()) + '</pr15>');
				stringBuilder.appendLine('\t\t<pr16>' + htmlEncode($('#tbPr2_16').val()) + '</pr16>');
				stringBuilder.appendLine('\t\t<pr17>' + htmlEncode($('#tbPr2_17').val()) + '</pr17>');
				stringBuilder.appendLine('\t\t<pr18>' + htmlEncode($('#tbPr2_18').val()) + '</pr18>');
				stringBuilder.appendLine('\t\t<pr19>' + htmlEncode($('#tbPr2S1_19').val()) + '</pr19>');
				stringBuilder.appendLine('\t\t<pr20>' + htmlEncode($('#tbPr2S1_20').val()) + '</pr20>');
				stringBuilder.appendLine('\t\t<pr21>' + htmlEncode($('#tbPr2S1_21').val()) + '</pr21>');
				stringBuilder.appendLine('\t\t<pr22>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_22').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_22').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr22>');
				stringBuilder.appendLine('\t\t<pr23>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_23').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_23').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr23>');
				stringBuilder.appendLine('\t\t<pr24>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr2S1_24').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr2S2_24').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr24>');
				stringBuilder.appendLine('\t\t<pr25>' + htmlEncode($('#tbPr2_25').val()) + '</pr25>');
				stringBuilder.appendLine('\t\t<pr26>' + htmlEncode($('#tbPr2_26').val()) + '</pr26>');
				stringBuilder.appendLine('\t\t<pr27>' + htmlEncode($('#tbPr2_27').val()) + '</pr27>');
				stringBuilder.appendLine('\t\t<pr28>' + htmlEncode($('#tbPr2_28').val()) + '</pr28>');
			stringBuilder.appendLine('\t</prilPodielyNaZisku>');

			stringBuilder.appendLine('\t<socZdravPoistenie>');
				stringBuilder.appendLine('\t\t<pr1>');
					stringBuilder.appendLine('\t\t\t<s1>' + htmlEncode($('#tbPr3S1').val()) + '</s1>');
					stringBuilder.appendLine('\t\t\t<s2>' + htmlEncode($('#tbPr3S2').val()) + '</s2>');
				stringBuilder.appendLine('\t\t</pr1>');
				stringBuilder.appendLine('\t\t<pr2>' + htmlEncode($('#tbPr3_02').val()) + '</pr2>');
				stringBuilder.appendLine('\t\t<pr3>' + htmlEncode($('#tbPr3_03').val()) + '</pr3>');
				stringBuilder.appendLine('\t\t<pr4>' + htmlEncode($('#tbPr3_04').val()) + '</pr4>');
				stringBuilder.appendLine('\t\t<pr5>' + htmlEncode($('#tbPr3_05').val()) + '</pr5>');
				stringBuilder.appendLine('\t\t<pr6>' + htmlEncode($('#tbPr3_06').val()) + '</pr6>');
				stringBuilder.appendLine('\t\t<pr7>' + htmlEncode($('#tbPr3_07').val()) + '</pr7>');
				stringBuilder.appendLine('\t\t<pr8>' + htmlEncode($('#tbPr3_08').val()) + '</pr8>');
				stringBuilder.appendLine('\t\t<pr9>' + htmlEncode($('#tbPr3_09').val()) + '</pr9>');
				stringBuilder.appendLine('\t\t<pr10>' + htmlEncode($('#tbPr3_10').val()) + '</pr10>');
				stringBuilder.appendLine('\t\t<pr11>' + htmlEncode($('#tbPr3_11').val()) + '</pr11>');
				stringBuilder.appendLine('\t\t<pr12>' + htmlEncode($('#tbPr3_12').val()) + '</pr12>');
				stringBuilder.appendLine('\t\t<pr13>' + htmlEncode($('#tbPr3_13').val()) + '</pr13>');
				stringBuilder.appendLine('\t\t<pr14>' + htmlEncode($('#tbPr3_14').val()) + '</pr14>');
				stringBuilder.appendLine('\t\t<pr15>' + htmlEncode($('#tbPr3_15').val()) + '</pr15>');
				stringBuilder.appendLine('\t\t<priPrimoch6ods1a2VediemPU>' + (document.getElementById("chPriPrijmoch").checked ? '1' : '0') + '</priPrimoch6ods1a2VediemPU>');
				stringBuilder.appendLine('\t\t<datum>' + htmlEncode($('#dtpDatumSoc').val()) + '</datum>');
			stringBuilder.appendLine('\t</socZdravPoistenie>');
			
		stringBuilder.appendLine('</telo>');
		
	stringBuilder.appendLine('</dokument>');

	return stringBuilder.string();
}

function getPageValue1Xml(page, element) {
    if (page == 1) {
        return $("#" + element).val();
    } else {
        var poradie = page - 1;
        return $("#" + element + "_Repeating_" + poradie).val();
    }
}

function getPageValueCh1Xml(page, element) {
    if (page == 1) { 
        return $("#" + element).is(':checked') ? '1' : '0'; 
    } else { 
        var poradie = page - 1; 
        return $("#" + element + "_Repeating_" + poradie).is(':checked') ? '1' : '0'; 
    } 
    /* 
    if (page == 1) { 
    return $("#" + element).is(':checked') ? '1' : '0'; 
    } 
    if (page == 2) { 
    return $("#" + element + "1").is(':checked') ? '1' : '0'; 
    } 
    if (page == 3) { 
    return $("#" + element + "3").is(':checked') ? '1' : '0'; 
    } 
    if (page > 3) { 
    var pomocna = (page - 3) + page; 
    return $("#" + element + pomocna).is(':checked') ? '1' : '0'; 
    } 
    */ 
}


//var xmlNodes;
function loadxmlfinal(text) {
    var xmlNodes = textToXML(text).documentElement.childNodes;
    for (var i = 0; i < xmlNodes.length; i++) {
        var aNode = xmlNodes[i];
        if (aNode.nodeName == "#text") continue;
        if (aNode.nodeName == "hlavicka") {
            processHlavicka(aNode);
        }
        if (aNode.nodeName == "telo") {
            processTelo(aNode);
        }
    }
}

function processHlavicka(hlavicka) {
    
    for (var i = 0; i < hlavicka.childNodes.length; i++) {
        var aNode = hlavicka.childNodes[i];
        if(aNode.nodeName == "#text") continue;
        
        switch(aNode.nodeName)
        {
        	case 'dic': $('#cmbDic1').val(getNodeValue(aNode)); break;
            case 'datumNarodenia': $('#dtpDatumNarodenia2').val(upravdatum(getNodeValue(aNode))); break;
            case 'typDP':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "rdp") $("#rbDruhVykazuRiadny").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "odp") $("#rbDruhVykazuOpravny").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "ddp") $("#rbDruhVykazuDodatocny").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                }
                break;
            case 'zdanovacieObdobie':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "rok") $('#cmbRok').val(getNodeValue(bNode));
                    if (bNode.nodeName == "datumDDP") $('#dtpDatumDDP').val(upravdatum(getNodeValue(bNode))).focusout();
                }
                break;
            case 'skNace':
            	var skNaceValue = "";
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "k1") skNaceValue = getNodeValue(bNode);
                    if (bNode.nodeName == "k2") skNaceValue = skNaceValue + getNodeValue(bNode);
                    if (bNode.nodeName == "k3") skNaceValue = skNaceValue + getNodeValue(bNode);
                    //if (bNode.nodeName == "cinnost") $('#DPFOB2011_DanovePriznanie_FOB_1tbHlavnaPrevaznaCinnost').val(getNodeValue(bNode).replace(/%0A/g, '\n'));
                }
                $('#cmbSKNACE3').val(skNaceValue);
                break;

            case 'priezvisko': $('#tbPriezvisko4').val(getNodeValue(aNode)); break;
            case 'meno': $('#tbMeno5').val(getNodeValue(aNode)); break;
            case 'titul': $('#tbTitul6').val(getNodeValue(aNode)); break;
            case 'titulZa': $('#tbTitul62').val(getNodeValue(aNode)); break;

            case 'adresaTrvPobytu':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "ulica") $('#tbUlica7').val(getNodeValue(bNode));
                    if (bNode.nodeName == "cislo") $('#tbCisloDomu8').val(getNodeValue(bNode));
                    if (bNode.nodeName == "psc") $('#tbPSC9').val(getNodeValue(bNode));
                    if (bNode.nodeName == "obec") $('#tbObec10').val(getNodeValue(bNode));
                    if (bNode.nodeName == "stat") $('#tbStat11').val(getNodeValue(bNode));
                }
                break;
            case 'nerezident': document.getElementById("cbNerezident").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'prepojeniePar2': document.getElementById("cbPrepojenie").checked = (getNodeValue(aNode) == '1' ? true : false); break;

            case 'adresaObvPobytu':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "ulica") $('#tbUlica14').val(getNodeValue(bNode));
                    if (bNode.nodeName == "cislo") $('#tbCisloDomu15').val(getNodeValue(bNode));
                    if (bNode.nodeName == "psc") $('#tbPSC16').val(getNodeValue(bNode));
                    if (bNode.nodeName == "obec") $('#tbObec17').val(getNodeValue(bNode));
                }
                break;  

            case 'zastupca':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "priezvisko") $('#tbPriezvisko18').val(getNodeValue(bNode));
                    if (bNode.nodeName == "meno") $('#tbMeno19').val(getNodeValue(bNode));
                    if (bNode.nodeName == "titul") $('#tbTitulPred20').val(getNodeValue(bNode));
                    if (bNode.nodeName == "titulZa") $('#tbTitulZa20').val(getNodeValue(bNode));
                    if (bNode.nodeName == "rodneCislo") { 
                        $('#t21_1RC').val(getNodeValue(bNode).substr(0,6));
                        $('#t21_2RC').val(getNodeValue(bNode).substr(6));
                    }
                    if (bNode.nodeName == "ulica") $('#tbUlica22').val(getNodeValue(bNode));
                    if (bNode.nodeName == "cislo") $('#tbCislo23').val(getNodeValue(bNode));
                    if (bNode.nodeName == "psc") $('#tbPSC24').val(getNodeValue(bNode));
                    if (bNode.nodeName == "obec") $('#tbObec25').val(getNodeValue(bNode));
                    if (bNode.nodeName == "stat") $('#tbStat26').val(getNodeValue(bNode));

                    if (bNode.nodeName == "tel") {
                    	var index = getNodeValue(bNode).indexOf('/');
                        $('#tbTelCislo27').val(getNodeValue(bNode));
                    }
                    if (bNode.nodeName == "email") $('#tbEmail28').val(getNodeValue(bNode));
                }
                break;    
                
            default: break;
        } // end switch
    } // end for
}

function processTelo(telo) {
    for (var i = 0; i < telo.childNodes.length; i++) {
        var aNode = telo.childNodes[i];
        if(aNode.nodeName == "#text") continue;

        switch(aNode.nodeName)
        {
            case 'r29': document.getElementById("cbr29").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'r30': $('#t30').val(getNodeValue(aNode)); break;
            case 'r31':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "priezviskoMeno") $('#r31_1').val(getNodeValue(bNode));
                    if (bNode.nodeName == "rodneCislo") {
						if(getNodeValue(bNode).length >= 9){
							$('#r31_2a').val(getNodeValue(bNode).substr(0,6));
							$('#r31_2b').val(getNodeValue(bNode).substr(6));
						}else{
							$('#r31_2a').val(getNodeValue(bNode).substr(0,4));
							$('#r31_2b').val(getNodeValue(bNode).substr(4));
						}
                    }
                }
                break;
            case 'r32':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
					if (bNode.nodeName == "uplatnujemNCZDNaManzela") document.getElementById("r32_1").checked = (getNodeValue(bNode) == '1' ? true : false);
                    if (bNode.nodeName == "vlastnePrijmy") $('#r32_2').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pocetMesiacov") $('#r32_3').val(getNodeValue(bNode));
                }
                break;
            case 'r33':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
					if (bNode.nodeName == "uplatNCZDNaKupelStarostlivost") document.getElementById("r33_1").checked = (getNodeValue(bNode) == '1' ? true : false);
                    if (bNode.nodeName == "preukazZaplatUhrady") $('#r33_2').val(getNodeValue(bNode));
                }
                break;

		  case 'r34':
                var dietaCount = 0;
				
				removeSections('layoutRow27421');			 				
				
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if (bNode.nodeName == "dieta") {
                        dietaCount++;
                        if (dietaCount > 4)
                        if (j != 0) { //&& j =< aNode.childNodes.length
                            var addButton = $('div[id^=layoutRow27421]').last().find('#addSectionlayoutRow27421');
                            addSection(4, 20, addButton);
                        }
                        //addSection(4, 20, $("#layoutRow19458_Repeating_" + (dietaCount - 2)));
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "priezviskoMeno") setPageValue1Xml(dietaCount, 'r34Priezvisko_1', getNodeValue(cNode));
                            if (cNode.nodeName == "rodneCislo") {
                            	//var splitResult = getNodeValue(cNode).split("/");
								if(getNodeValue(cNode).length >= 9){
									setPageValue1Xml(dietaCount, 'r34RodCislo_2a', getNodeValue(cNode).substr(0, 6));
									setPageValue1Xml(dietaCount, 'r34RodCislo_2b', getNodeValue(cNode).substr(6));
								}else{
									setPageValue1Xml(dietaCount, 'r34RodCislo_2a', getNodeValue(cNode).substr(0, 4));
									setPageValue1Xml(dietaCount, 'r34RodCislo_2b', getNodeValue(cNode).substr(4));
								}
                            }
                            if (cNode.nodeName == "kupelnaStarostlivost") setPageValueCh1Xml(dietaCount, 'r34Ks', getNodeValue(cNode));
                            if (cNode.nodeName == "m00") setPageValueCh1Xml(dietaCount, 'cbM00_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m01") setPageValueCh1Xml(dietaCount, 'cbM01_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m02") setPageValueCh1Xml(dietaCount, 'cbM02_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m03") setPageValueCh1Xml(dietaCount, 'cbM03_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m04") setPageValueCh1Xml(dietaCount, 'cbM04_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m05") setPageValueCh1Xml(dietaCount, 'cbM05_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m06") setPageValueCh1Xml(dietaCount, 'cbM06_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m07") setPageValueCh1Xml(dietaCount, 'cbM07_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m08") setPageValueCh1Xml(dietaCount, 'cbM08_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m09") setPageValueCh1Xml(dietaCount, 'cbM09_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m10") setPageValueCh1Xml(dietaCount, 'cbM10_1', getNodeValue(cNode));
                            if (cNode.nodeName == "m11") setPageValueCh1Xml(dietaCount, 'cbM11_1', getNodeValue(cNode));
       						if (cNode.nodeName == "m12") setPageValueCh1Xml(dietaCount, 'cbM12_1', getNodeValue(cNode));
							
                        }
                         
                    }
					
                }  
				 
                break;

           case 'r35udajeDalsieDeti': document.getElementById("r35").checked = (getNodeValue(aNode) == '1' ? true : false); break; 
           case 'r36': $('#r36').val(getNodeValue(aNode)); break;
           case 'r37':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
					if (bNode.nodeName == "uplatDanBonusZaplatUroky") document.getElementById("r37_1").checked = (getNodeValue(bNode) == '1' ? true : false);
                    if (bNode.nodeName == "zaplateneUroky") $('#r37_2').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pocetMesiacov") $('#r37_3').val(getNodeValue(bNode));
                }
                break;
           case 'r38': $('#r38').val(getNodeValue(aNode)); break;
           case 'r38a': $('#r38a').val(getNodeValue(aNode)); break;
           case 'r39': $('#r39').val(getNodeValue(aNode)); break;
           case 'r40': $('#r40').val(getNodeValue(aNode)); break;
           
           case 'tabulka1':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "t1r1") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R1S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R1S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r2") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R2S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R2S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r3") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R3S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R3S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r4") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R4S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R4S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r5") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R5S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R5S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r6") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R6S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R6S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r7") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R7S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R7S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r8") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R8S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R8S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r9") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R9S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R9S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r10") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R10S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R10S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r11") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R11S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R11S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r12") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R12S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R12S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t1r13") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1R13S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1R13S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
               }
               break;

            //case 'vydavky611':
            //    for (var j = 0; j < aNode.childNodes.length; j++) {
            //        var bNode = aNode.childNodes[j];
            //        if (bNode.nodeName == "prijmy612") $("#cbPriPrijmoch11Ods6Zak1a2").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "prijmy63") $("#cbPriPrijmoch11Ods6Zak3").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "prijmy64") $("#cbPriPrijmoch11Ods6Zak4").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //    }
            //    break;

            //case 'vydavky610':
            //    for (var j = 0; j < aNode.childNodes.length; j++) {
            //        var bNode = aNode.childNodes[j];
            //        if (bNode.nodeName == "prijmy612") $("#cbPriPrijmoch10Ods6Zak1a2").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "mesiace612") $('#tbPocetMesiacov1a2').val(getNodeValue(bNode));
            //        if (bNode.nodeName == "prijmy64") $("#cbPriPrijmoch10Ods6Zak4").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "mesiace64") $('#tbPocetMesiacov4').val(getNodeValue(bNode));
            //    }
            //    break;

            case 'vydavkyPar6ods11_ods1a2': document.getElementById("cbPriPrijmoch11Ods6Zak1a2").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'vydavkyPar6ods11_ods3': document.getElementById("cbPriPrijmoch11Ods6Zak3").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'vydavkyPar6ods11_ods4': document.getElementById("cbPriPrijmoch11Ods6Zak4").checked = (getNodeValue(aNode) == '1' ? true : false); break;

            case 'vydavkyPar6ods10_ods1a2': document.getElementById("cbPriPrijmoch10Ods6Zak1a2").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'vydavkyPar6ods10_ods4': document.getElementById("cbPriPrijmoch10Ods6Zak4").checked = (getNodeValue(aNode) == '1' ? true : false); break;

            case 'vydavkyPoistPar6ods11_ods1a2': $('#tbPrekazatenePoistne').val(getNodeValue(aNode)); break;

            case 'uplatnujemPar17ods17_ods1a2': document.getElementById("cbPriPrijmoch17Ods6Zak1a2").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'uplatnujemPar17ods17_ods3a4': document.getElementById("cbPriPrijmoch17Ods6Zak3a4").checked = (getNodeValue(aNode) == '1' ? true : false); break;

            case 'ukoncujemUplatnovaniePar17ods17_ods1a2': document.getElementById("cbUkoncPriPrijmoch17Ods6Zak1a2").checked = (getNodeValue(aNode) == '1' ? true : false); break;
            case 'ukoncujemUplatnovaniePar17ods17_ods3a4': document.getElementById("cbUkoncPriPrijmoch17Ods6Zak3a4").checked = (getNodeValue(aNode) == '1' ? true : false); break;

                //case 'uplatnujemOsobSposob':
            //    for (var j = 0; j < aNode.childNodes.length; j++) {
            //        var bNode = aNode.childNodes[j];
            //        if (bNode.nodeName == "prijmy612") $("#cbPriPrijmoch17Ods6Zak1a2").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "prijmy634") $("#cbPriPrijmoch17Ods6Zak3a4").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //    }
            //    break;

            //case 'ukoncujemOsobSposob':
            //    for (var j = 0; j < aNode.childNodes.length; j++) {
            //        var bNode = aNode.childNodes[j];
            //        if (bNode.nodeName == "prijmy612") $("#cbUkoncPriPrijmoch17Ods6Zak1a2").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //        if (bNode.nodeName == "prijmy634") $("#cbUkoncPriPrijmoch17Ods6Zak3a4").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
            //    }
            //    break;

           case 'tabulka1a':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "t1r1") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1aR1S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1aR1S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r2") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1aR2S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1aR2S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r3") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1aR3S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1aR3S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r4") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1aR4S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1aR4S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r5") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1aR5S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1aR5S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
               }
               break;

           case 'tabulka1b':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "t1r1") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1bR1S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1bR1S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t1r2") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t1bR2S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t1bR2S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
               }
               break;
               
           
           case 'r41': $('#t41').val(getNodeValue(aNode)); break;
           case 'r42': $('#t42').val(getNodeValue(aNode)); break;
           case 'r43': $('#t43').val(getNodeValue(aNode)); break;
           case 'r44': $('#t44').val(getNodeValue(aNode)); break;
           case 'r45': $('#t45').val(getNodeValue(aNode)); break;
           case 'r46': $('#t46').val(getNodeValue(aNode)); break;
           case 'r47': $('#t47').val(getNodeValue(aNode)); break;
           case 'r48': $('#t48').val(getNodeValue(aNode)); break;
           case 'r49': 
				var predchObdobie = aNode.getElementsByTagName('predchObdobie')[0];
				$("#tbR49rok").val(getElementsValXml(predchObdobie.getElementsByTagName('rok')[0]));
				$("#tbR49strata").val(getElementsValXml(predchObdobie.getElementsByTagName('strata')[0]));
				break;
           case 'r50': 
				var predchObdobie = aNode.getElementsByTagName('predchObdobie')[0];
				$("#tbR50rok").val(getElementsValXml(predchObdobie.getElementsByTagName('rok')[0]));
				$("#tbR50strata").val(getElementsValXml(predchObdobie.getElementsByTagName('strata')[0]));
				break;
		   case 'r51': 
				var predchObdobie = aNode.getElementsByTagName('predchObdobie')[0];
				$("#tbR51rok").val(getElementsValXml(predchObdobie.getElementsByTagName('rok')[0]));
				$("#tbR51strata").val(getElementsValXml(predchObdobie.getElementsByTagName('strata')[0]));
				break;
		   case 'r52': 
				var predchObdobie = aNode.getElementsByTagName('predchObdobie')[0];
				$("#tbR52rok").val(getElementsValXml(predchObdobie.getElementsByTagName('rok')[0]));
				$("#tbR52strata").val(getElementsValXml(predchObdobie.getElementsByTagName('strata')[0]));
				break;
           case 'r53': $('#t53').val(getNodeValue(aNode)); break;
           case 'r54': $('#t54').val(getNodeValue(aNode)); break;
           case 'r55': $('#t55').val(getNodeValue(aNode)); break;
           case 'r56': $('#t56').val(getNodeValue(aNode)); break;
           case 'r57': $('#t57').val(getNodeValue(aNode)); break;
           case 'r58': $('#t58').val(getNodeValue(aNode)); break;
           case 'r59': $('#t59').val(getNodeValue(aNode)); break;
           case 'r60': $('#t60').val(getNodeValue(aNode)); break;
           case 'r61': $('#t61').val(getNodeValue(aNode)); break;
           case 'r62': $('#t62').val(getNodeValue(aNode)); break;
           case 'r63': $('#t63').val(getNodeValue(aNode)); break;
           case 'r64': $('#t64').val(getNodeValue(aNode)); break;
           case 'r65': $('#t65').val(getNodeValue(aNode)); break;
           
           case 'tabulka2':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "t2r1") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R1S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R1S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r2") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R2S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R2S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r3") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R3S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R3S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r4") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R4S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R4S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r5") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R5S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R5S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r6") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R6S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R6S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r7") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R7S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R7S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r8") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R8S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R8S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r9") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R9S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R9S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r10") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R10S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R10S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r11") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R11S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t2R11S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t2r12") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t2R12S1').val(getNodeValue(bNode.childNodes[k]));
                           //if (bNode.childNodes[k].nodeName == "s2") $('#t2R12S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   //if (bNode.nodeName == "t2r13") {
                   //    for (var k = 0; k < bNode.childNodes.length; k++) {
                   //        if (bNode.childNodes[k].nodeName == "s1") $('#t2R13S1').val(getNodeValue(bNode.childNodes[k]));
                   //    }
                   //}
               }
               break;
           
           case 'r66': $('#t66').val(getNodeValue(aNode)); break;
           case 'r67': $('#t67').val(getNodeValue(aNode)); break;
           case 'r68': $('#t68').val(getNodeValue(aNode)); break;
           
           case 'tabulka3':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "t3r1") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R1S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R1S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r2") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R2S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R2S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r3") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R3S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R3S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r4") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R4S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R4S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r5") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R5S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R5S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r6") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R6S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R6S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r7") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R7S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R7S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r8") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R8S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R8S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r9") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R9S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R9S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r10") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R10S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R10S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r11") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R11S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R11S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r12") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R12S1').val(getNodeValue(bNode.childNodes[k]));
                           if (bNode.childNodes[k].nodeName == "s2") $('#t3R12S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r13") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R13S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R13S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
                   if (bNode.nodeName == "t3r14") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R14S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R14S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t3r15") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R15S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R15S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t3r16") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R16S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R16S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t3r17") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R17S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R17S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t3r18") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R18S1').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
				   if (bNode.nodeName == "t3r19") {
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           if (bNode.childNodes[k].nodeName == "s1") $('#t3R19S1').val(getNodeValue(bNode.childNodes[k]));
						   if (bNode.childNodes[k].nodeName == "s2") $('#t3R19S2').val(getNodeValue(bNode.childNodes[k]));
                       }
                   }
               }
               break;
           case 'r69': $('#t69').val(getNodeValue(aNode)); break;
           case 'r70': $('#t70').val(getNodeValue(aNode)); break;
           case 'r71': $('#t71').val(getNodeValue(aNode)); break;
           case 'r72': $('#t72').val(getNodeValue(aNode)); break;
           case 'r73': $('#t73').val(getNodeValue(aNode)); break;
           case 'r74': $('#t74').val(getNodeValue(aNode)); break;
           case 'r75': $('#t75').val(getNodeValue(aNode)); break;
           case 'r76': $('#t76').val(getNodeValue(aNode)); break;
           case 'r76a': $('#t76a').val(getNodeValue(aNode)); break;
           case 'r76b': $('#t76b').val(getNodeValue(aNode)); break;
           case 'r77': $('#t77').val(getNodeValue(aNode)); break;
           case 'r78': $('#t78').val(getNodeValue(aNode)); break;
           case 'r79': $('#t79').val(getNodeValue(aNode)); break;
           case 'r80': $('#t80').val(getNodeValue(aNode)); break;
           case 'r81': $('#t81').val(getNodeValue(aNode)); break;
           case 'r82': $('#t82').val(getNodeValue(aNode)).change(); break;
           case 'r83': $('#t83').val(getNodeValue(aNode)); break;
           case 'r84': $('#t84').val(getNodeValue(aNode)); break;
           case 'r85': $('#t85').val(getNodeValue(aNode)).change(); break;
           case 'r86': $('#t86').val(getNodeValue(aNode)); break;
           case 'r87': $('#t87').val(getNodeValue(aNode)); break;
           case 'r88': $('#t88').val(getNodeValue(aNode)); break;
           case 'r89': $('#t89').val(getNodeValue(aNode)); break;
           case 'r90': $('#t90').val(getNodeValue(aNode)); break;
           case 'r91': $('#t91').val(getNodeValue(aNode)); break;
           case 'r92': $('#t92').val(getNodeValue(aNode)).change(); break;
           case 'r93': $('#t93').val(getNodeValue(aNode)); break;
           case 'r94': $('#t94').val(getNodeValue(aNode)); break;
           case 'r95': $('#t95').val(getNodeValue(aNode)).change(); break;
           case 'r96': $('#t96').val(getNodeValue(aNode)); break;
           case 'r97': $('#t97').val(getNodeValue(aNode)); break;
           case 'r98': $('#t98').val(getNodeValue(aNode)); break;
           case 'r99': $('#t99').val(getNodeValue(aNode)); break;
           case 'r100': $('#t100').val(getNodeValue(aNode)); break;
           case 'r101': $('#t101').val(getNodeValue(aNode)).change(); break;
           case 'r102': $('#t102').val(getNodeValue(aNode)); break;
           case 'r103': $('#t103').val(getNodeValue(aNode)); break;
           case 'r104': $('#t104').val(getNodeValue(aNode)); break;
           case 'r105': $('#t105').val(getNodeValue(aNode)); break;
           case 'r106': $('#t106').val(getNodeValue(aNode)); break;
           case 'r107': $('#t107').val(getNodeValue(aNode)); break;
           case 'r108': $('#t108').val(getNodeValue(aNode)); break;
           case 'r109': $('#t109').val(getNodeValue(aNode)); break;
           case 'r110': $('#t110').val(getNodeValue(aNode)); break;
           case 'r111': $('#t111').val(getNodeValue(aNode)); break;
           case 'r112': $('#t112').val(getNodeValue(aNode)); break;
           case 'r113': $('#t113').val(getNodeValue(aNode)); break;
           case 'r114': $('#t114').val(getNodeValue(aNode)); break;
           case 'r115': $('#t115').val(getNodeValue(aNode)); break;
           case 'r116': $('#t116').val(getNodeValue(aNode)); break;
           case 'r117': $('#t117').val(getNodeValue(aNode)); break;
           case 'r118': $('#t118').val(getNodeValue(aNode)); break;
		   case 'r119': $('#t119').val(getNodeValue(aNode)); break;
		   case 'r120': $('#t120').val(getNodeValue(aNode)); break;
		   case 'r121': $('#t121').val(getNodeValue(aNode)); break;
		   case 'r122': $('#t122').val(getNodeValue(aNode)); break;
		   case 'r123': $('#t123').val(getNodeValue(aNode)); break;
		   case 'r124': $('#t124').val(getNodeValue(aNode)); break;
		   case 'r125': $('#t125').val(getNodeValue(aNode)); break;
		   case 'r126': $('#t126').val(getNodeValue(aNode)); break;
		   case 'r127': $('#t127').val(getNodeValue(aNode)); break;
		   case 'r128': $('#t128').val(getNodeValue(aNode)); break;
		   case 'r129': $('#t129').val(getNodeValue(aNode)); break;
		   case 'r130': $('#t130').val(getNodeValue(aNode)); break;
		   case 'r131': $('#t131').val(getNodeValue(aNode)); break;
		   case 'r132': $('#t132').val(getNodeValue(aNode)); break;
		   case 'r133': $('#t133').val(getNodeValue(aNode)); break;
		   case 'r134': $('#t134').val(getNodeValue(aNode)); break;
		   case 'r135': $('#t135').val(getNodeValue(aNode)); break;
		   case 'r136': $('#t136').val(getNodeValue(aNode)); break;
		   case 'r137': $('#t137').val(getNodeValue(aNode)); break;
		   case 'r138': $('#t138').val(getNodeValue(aNode)); break;
		   case 'r139': document.getElementById("t139").checked = (getNodeValue(aNode) == '1' ? true : false); break;
		   case 'r140': $('#t140').val(getNodeValue(aNode)); break;
		   case 'neuplatnujem': document.getElementById("cbNeuplatnujem").checked = (getNodeValue(aNode) == '1' ? true : false); break;
           case 'splnam3per': document.getElementById("cbSplnam3Per").checked = (getNodeValue(aNode) == '1' ? true : false); break;
           case 'r141': $('#tbPodiel141').val(getNodeValue(aNode)); break;
           case 'r142':
               for (var j = 0; j < aNode.childNodes.length; j++) {
                   var bNode = aNode.childNodes[j];
                   if (bNode.nodeName == "ico") $('#tbico142').val(getNodeValue(bNode));
                   if (bNode.nodeName == "pravnaForma") $('#PravnaForma142').val(getNodeValue(bNode));
                   if (bNode.nodeName == "obchMeno") {
                       //var obChMenoStr = "";
                       for (var k = 0; k < bNode.childNodes.length; k++) {
                           var cNode = bNode.childNodes[k];
                           //if (!cNode.firstChild) continue;
                           if (cNode.nodeName == "riadok") 
                           {
                               $('#tbObchMeno142').val($('#tbObchMeno142').val() + getNodeValue(cNode));
							}
                       }
                   }
                   if (bNode.nodeName == "ulica") $('#tbUlica142').val(getNodeValue(bNode));
                   if (bNode.nodeName == "cislo") $('#tbCislo142').val(getNodeValue(bNode));
                   if (bNode.nodeName == "psc") $('#tbPSC142').val(getNodeValue(bNode));
                   if (bNode.nodeName == "obec") $('#tbObec142').val(getNodeValue(bNode));
				   if (bNode.nodeName == "suhlasZaslUdaje") document.getElementById("chbSuhlas").checked = (getNodeValue(bNode) == '1' ? true : false);
               }
               break;
               
           case 'osobitneZaznamy':
		   

				var udajePocet = 0;
				var l = 0;
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                    if(bNode.nodeName != "#text"){
                    if (bNode.nodeName == "uvadza") $("#cbUvadza").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "udajeOprijmoch") {
                    if(l == 1)
						{
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (!cNode.firstChild) continue;
                            if (cNode.nodeName == "kodStatu") $('#odd13kod').val(getNodeValue(cNode));
							if (cNode.nodeName == "druhPrimuPar") $('#odd13Par').val(getNodeValue(cNode));
                            if (cNode.nodeName == "druhPrimuOds") $('#odd13Ods').val(getNodeValue(cNode));
							if (cNode.nodeName == "druhPrimuPis") $('#odd13Pism').val(getNodeValue(cNode));
                            if (cNode.nodeName == "prijmy") $('#odd13Prijmy').val(getNodeValue(cNode));
                            if (cNode.nodeName == "vydavky") $('#odd13Vydavky').val(getNodeValue(cNode));
                            if (cNode.nodeName == "zTohoVydavky") $('#odd13zToho').val(getNodeValue(cNode));
							}
                        }
					else
						{

						//udajePocet++;
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (!cNode.firstChild) continue;
							
                            if (cNode.nodeName == "kodStatu"){
								if(l>6)
								{
									var addButton = $('div[id^=layoutRow27323]').last().find('#addSectionlayoutRow27323');
									addSection(6, 20, addButton);
								}
								$('#odd13kod_Repeating_' + (l-1)).val(getNodeValue(cNode));
							}
                            if (cNode.nodeName == "druhPrimuPar") $('#odd13Par_Repeating_' + (l-1)).val(getNodeValue(cNode));
                            if (cNode.nodeName == "druhPrimuOds") $('#odd13Ods_Repeating_' + (l-1)).val(getNodeValue(cNode));
							if (cNode.nodeName == "druhPrimuPis") $('#odd13Pism_Repeating_' + (l-1)).val(getNodeValue(cNode));
                            if (cNode.nodeName == "prijmy") $('#odd13Prijmy_Repeating_' + (l-1)).val(getNodeValue(cNode));
                            if (cNode.nodeName == "vydavky") $('#odd13Vydavky_Repeating_' + (l-1)).val(getNodeValue(cNode));
                            if (cNode.nodeName == "zTohoVydavky") $('#odd13zToho_Repeating_' + (l-1)).val(getNodeValue(cNode));
							}
                        }
                    }
                    
                    if (bNode.nodeName == "rekreaciaPar19ods2") $('#chbRekreacia').attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "rekreaciaSuma") $('#valRekreacia').val(getNodeValue(bNode).replace(/%0A/g, '\n'));
                    if (bNode.nodeName == "zaznamy") $('#taZaznamy').val(getNodeValue(bNode).replace(/%0A/g, '\n'));
                	l++;
                }
                }
				break;
                
           case 'r143': $('#t143').val(getNodeValue(aNode)); break;              
           case 'datumVyhlasenia': $('#dtpDatumSpravneUplne').val(upravdatum(getNodeValue(aNode))); break;              

           case 'danovyPreplatokBonus':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                     
                    if (bNode.nodeName == "vyplatitDanovyBonus") $("#cbVyplatit").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "vyplatitDanovyBonusUroky") $("#chBonus").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "vratitDanPreplatok") $("#cbVratenie").attr("checked",(getNodeValue(bNode) == '1' ? true : false)).change();

                    if (bNode.nodeName == "sposobPlatby") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "poukazka") $("#cbPoukazkaDB").attr("checked",(getNodeValue(cNode) == '1' ? true : false)).change();
                            if (cNode.nodeName == "ucet") $("#cbUcetDB").attr("checked",(getNodeValue(cNode) == '1' ? true : false)).change();
                            if (cNode.nodeName == "ucetZahranicie") $("#cbUcetZah").attr("checked",(getNodeValue(cNode) == '1' ? true : false)).change();
                        }
                    }
                    if (bNode.nodeName == "bankovyUcet") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "IBAN") $('#tbIBAN').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "datum") $('#dtpDatumDB').val(upravdatum(getNodeValue(bNode)));
                }
                break;
				
			/*case 'prilPar30cOdpocetVydavkov' :
				$("#ProjektCislo").val(getElementsValXml(aNode.getElementsByTagName('projektCislo')[0]));
				$("#PocetProjektov").val(getElementsValXml(aNode.getElementsByTagName('pocetProjektov')[0]));
				$("#DatumProjektu").val(upravdatum(getElementsValXml(aNode.getElementsByTagName('datumRealizacie')[0])));
				var r01 = aNode.getElementsByTagName('r01')[0];
					$("#Pri1r1DatumOd").val(upravdatum(getElementsValXml(r01.getElementsByTagName('zdanObdobieOd')[0])));
					$("#Pri1r1DatumDo").val(upravdatum(getElementsValXml(r01.getElementsByTagName('zdanObdobieDo')[0])));
					$("#Pri1r1Vyska").val(getElementsValXml(r01.getElementsByTagName('narok')[0]));
					$("#Pri1r1Odp").val(getElementsValXml(r01.getElementsByTagName('odpocitanaCast')[0]));
				var r02 = aNode.getElementsByTagName('r02')[0];
					$("#Pri1r2DatumOd").val(upravdatum(getElementsValXml(r02.getElementsByTagName('zdanObdobieOd')[0])));
					$("#Pri1r2DatumDo").val(upravdatum(getElementsValXml(r02.getElementsByTagName('zdanObdobieDo')[0])));
					$("#Pri1r2Vyska").val(getElementsValXml(r02.getElementsByTagName('narok')[0]));
					$("#Pri1r2Odp").val(getElementsValXml(r02.getElementsByTagName('odpocitanaCast')[0]));
				var r03 = aNode.getElementsByTagName('r03')[0];
					$("#Pri1r3DatumOd").val(upravdatum(getElementsValXml(r03.getElementsByTagName('zdanObdobieOd')[0])));
					$("#Pri1r3DatumDo").val(upravdatum(getElementsValXml(r03.getElementsByTagName('zdanObdobieDo')[0])));
					$("#Pri1r3Vyska").val(getElementsValXml(r03.getElementsByTagName('narok')[0]));
					$("#Pri1r3Odp").val(getElementsValXml(r03.getElementsByTagName('odpocitanaCast')[0]));
				var r04 = aNode.getElementsByTagName('r04')[0];
					$("#Pri1r4DatumOd").val(upravdatum(getElementsValXml(r04.getElementsByTagName('zdanObdobieOd')[0])));
					$("#Pri1r4DatumDo").val(upravdatum(getElementsValXml(r04.getElementsByTagName('zdanObdobieDo')[0])));
					$("#Pri1r4Vyska").val(getElementsValXml(r04.getElementsByTagName('narok')[0]));
					$("#Pri1r4Odp").val(getElementsValXml(r04.getElementsByTagName('odpocitanaCast')[0]));
				var r05 = aNode.getElementsByTagName('r05')[0];
					$("#Pri1r5DatumOd").val(upravdatum(getElementsValXml(r05.getElementsByTagName('zdanObdobieOd')[0])));
					$("#Pri1r5DatumDo").val(upravdatum(getElementsValXml(r05.getElementsByTagName('zdanObdobieDo')[0])));
					$("#Pri1r5Vyska").val(getElementsValXml(r05.getElementsByTagName('narok')[0]));
					$("#Pri1r5Odp").val(getElementsValXml(r05.getElementsByTagName('odpocitanaCast')[0]));
				$("#Pri1r6").val(getElementsValXml(aNode.getElementsByTagName('r06')[0]));
				$("#CieleProjektu").val(htmlDecode(getElementsValXml(aNode.getElementsByTagName('ciele')[0])));
				$("#Pri1r7").val(getElementsValXml(aNode.getElementsByTagName('r07')[0]));
			break;*/

            case 'prilPodielyNaZisku':
        		for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                     
                    if (bNode.nodeName == "pr1") $('#tbPr2S1_01').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr2") $('#tbPr2S1_02').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr3") $('#tbPr2S1_03').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr4") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_04').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_04').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr5") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_05').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_05').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr6") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_06').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_06').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr7") $('#tbPr2_07').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr8") $('#tbPr2_08').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr9") $('#tbPr2_09').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr10") $('#tbPr2_10').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr11") $('#tbPr2_11').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr12") $('#tbPr2_12').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr13") $('#tbPr2_13').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr14") $('#tbPr2_14').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr15") $('#tbPr2_15').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr16") $('#tbPr2_16').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr17") $('#tbPr2_17').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr18") $('#tbPr2_18').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr19") $('#tbPr2S1_19').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr20") $('#tbPr2S1_20').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr21") $('#tbPr2S1_21').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr22") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_22').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_22').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr23") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_23').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_23').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr24") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr2S1_24').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr2S2_24').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr25") $('#tbPr2_25').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr26") $('#tbPr2_26').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr27") $('#tbPr2_27').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr28") $('#tbPr2_28').val(getNodeValue(bNode));
                }
                break;

            case 'socZdravPoistenie':
                for (var j = 0; j < aNode.childNodes.length; j++) {
                    var bNode = aNode.childNodes[j];
                     
                    if (bNode.nodeName == "pr1") {
                        for (var k = 0; k < bNode.childNodes.length; k++) {
                            var cNode = bNode.childNodes[k];
                            if (cNode.nodeName == "s1") $('#tbPr3S1').val(getNodeValue(cNode));
                            if (cNode.nodeName == "s2") $('#tbPr3S2').val(getNodeValue(cNode));
                        }
                    }
                    if (bNode.nodeName == "pr2") $('#tbPr3_02').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr3") $('#tbPr3_03').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr4") $('#tbPr3_04').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr5") $('#tbPr3_05').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr6") $('#tbPr3_06').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr7") $('#tbPr3_07').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr8") $('#tbPr3_08').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr9") $('#tbPr3_09').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr10") $('#tbPr3_10').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr11") $('#tbPr3_11').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr12") $('#tbPr3_12').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr13") $('#tbPr3_13').val(getNodeValue(bNode));
                    if (bNode.nodeName == "pr14") $('#tbPr3_14').val(getNodeValue(bNode));	
                    if (bNode.nodeName == "pr15") $('#tbPr3_15').val(getNodeValue(bNode));
                    if (bNode.nodeName == "priPrimoch6ods1a2VediemPU") $("#chPriPrijmoch").attr("checked", (getNodeValue(bNode) == '1' ? true : false)).change();
                    if (bNode.nodeName == "datum") $('#dtpDatumSoc').val(upravdatum(getNodeValue(bNode)));
                }
                break;
            	
            default: break;
        } // end switch
    }
	var prilPar30cOdpocetVydavkov = telo.getElementsByTagName('prilPar30cOdpocetVydavkov');
	
	if(prilPar30cOdpocetVydavkov.length != 0){
		for(var t = 0;t<prilPar30cOdpocetVydavkov.length;t++){
			var thisLR = $("[id^='layoutRow27435']:last");
			if(t != 0){
				addSection(1, 999, thisLR.find("[id^='addSectionlayoutRow27435']"));
				var policko = $("[id^='layoutRow27435']:last").find("[id^='Pri1r7']").attr("disabled",true);
				policko.attr("disabled",true);
			}
			var thisLR = $("[id^='layoutRow27435']:last");
			var prilPar30cOdpocetVydavkovXML = prilPar30cOdpocetVydavkov[t];
			
			thisLR.find("[id^='ProjektCislo']").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('projektCislo')[0]));
			thisLR.find("[id^='PocetProjektov']").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('pocetProjektov')[0]));
			thisLR.find("[id^='DatumProjektu']").val(upravdatum(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('datumRealizacie')[0])));
			var r01 = prilPar30cOdpocetVydavkovXML.getElementsByTagName('r01')[0];
				thisLR.find("[id^='Pri1r1DatumOd']").val(upravdatum(getElementsValXml(r01.getElementsByTagName('zdanObdobieOd')[0])));
				thisLR.find("[id^='Pri1r1DatumDo']").val(upravdatum(getElementsValXml(r01.getElementsByTagName('zdanObdobieDo')[0])));
				thisLR.find("[id^='Pri1r1Vyska']").val(getElementsValXml(r01.getElementsByTagName('narok')[0]));
				thisLR.find("[id^='Pri1r1Odp']").val(getElementsValXml(r01.getElementsByTagName('odpocitanaCast')[0]));
			var r02 = prilPar30cOdpocetVydavkovXML.getElementsByTagName('r02')[0];
				thisLR.find("[id^='Pri1r2DatumOd']").val(upravdatum(getElementsValXml(r02.getElementsByTagName('zdanObdobieOd')[0])));
				thisLR.find("[id^='Pri1r2DatumDo']").val(upravdatum(getElementsValXml(r02.getElementsByTagName('zdanObdobieDo')[0])));
				thisLR.find("[id^='Pri1r2Vyska']").val(getElementsValXml(r02.getElementsByTagName('narok')[0]));
				thisLR.find("[id^='Pri1r2Odp']").val(getElementsValXml(r02.getElementsByTagName('odpocitanaCast')[0]));
			var r03 = prilPar30cOdpocetVydavkovXML.getElementsByTagName('r03')[0];
				thisLR.find("[id^='Pri1r3DatumOd']").val(upravdatum(getElementsValXml(r03.getElementsByTagName('zdanObdobieOd')[0])));
				thisLR.find("[id^='Pri1r3DatumDo']").val(upravdatum(getElementsValXml(r03.getElementsByTagName('zdanObdobieDo')[0])));
				thisLR.find("[id^='Pri1r3Vyska']").val(getElementsValXml(r03.getElementsByTagName('narok')[0]));
				thisLR.find("[id^='Pri1r3Odp']").val(getElementsValXml(r03.getElementsByTagName('odpocitanaCast')[0]));
			var r04 = prilPar30cOdpocetVydavkovXML.getElementsByTagName('r04')[0];
				thisLR.find("[id^='Pri1r4DatumOd']").val(upravdatum(getElementsValXml(r04.getElementsByTagName('zdanObdobieOd')[0])));
				thisLR.find("[id^='Pri1r4DatumDo']").val(upravdatum(getElementsValXml(r04.getElementsByTagName('zdanObdobieDo')[0])));
				thisLR.find("[id^='Pri1r4Vyska']").val(getElementsValXml(r04.getElementsByTagName('narok')[0]));
				thisLR.find("[id^='Pri1r4Odp']").val(getElementsValXml(r04.getElementsByTagName('odpocitanaCast')[0]));
			var r05 = prilPar30cOdpocetVydavkovXML.getElementsByTagName('r05')[0];
				thisLR.find("[id^='Pri1r5DatumOd']").val(upravdatum(getElementsValXml(r05.getElementsByTagName('zdanObdobieOd')[0])));
				thisLR.find("[id^='Pri1r5DatumDo']").val(upravdatum(getElementsValXml(r05.getElementsByTagName('zdanObdobieDo')[0])));
				thisLR.find("[id^='Pri1r5Vyska']").val(getElementsValXml(r05.getElementsByTagName('narok')[0]));
				thisLR.find("[id^='Pri1r5Odp']").val(getElementsValXml(r05.getElementsByTagName('odpocitanaCast')[0]));
			thisLR.find("[id^='Pri1r6']").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('r06')[0]));
			thisLR.find("[id^='CieleProjektu']").val(htmlDecode(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('ciele')[0])));
			thisLR.find("#Pri1r7").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('r07')[0]));
			thisLR.find("[id^='Pri1r8']").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('r08')[0]));
			thisLR.find("[id^='Pri1r9']").val(getElementsValXml(prilPar30cOdpocetVydavkovXML.getElementsByTagName('r09')[0]));

			if ($('[id^=layoutRow27435]').length == prilPar30cOdpocetVydavkov.length)
			    $("#Pri1r7").change();
		}
		
		// Nastavenie obmedzeni datumov		
		var allLR = $("[id^='layoutRow27435']");
		
		allLR.each(function() {
			var lr = $(this);
			
			
    var date1 = lr.find("[id^='DatumProjektu']");
    var date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2000, 1 - 1, 1));
    date1.val(date1Val);

    var date1 = lr.find("[id^='Pri1r1DatumOd']");
    var date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r1DatumDo']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r2DatumOd']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r2DatumDo']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r3DatumOd']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r3DatumDo']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r4DatumOd']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r4DatumDo']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r5DatumOd']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);

    date1 = lr.find("[id^='Pri1r5DatumDo']");
    date1Val = date1.val();
    date1.datepicker("option", "minDate", new Date(2015, 1 - 1, 1));
    date1.datepicker("option", "maxDate", new Date(2017, 12 - 1, 31));
    date1.val(date1Val);
		});
	}else{
		$('#ProjektCislo').val(0);
		$('#PocetProjektov').val(0);
	}
	//end for
	
}


function upravdatum(datum)
{
	datum = datum.replace(/(\s*)/g, '');
	  
	if(datum.length>0) {
		var part = datum.replace(/\,/g,'.').replace(/\//g,'.').split('.');
		
		if (part.length > 2) {
			var dd = part[0];
			if(dd.length==1) {
				dd='0'+dd;
			}
			
			var mm = part[1];
			if(mm.length==1) {
				mm='0'+mm;
			}
			
			var yyyy = part[2];
			datum = dd+'.'+mm+'.'+yyyy;
		}
	}
	
	if (datum.match(new RegExp(/^$|^(((([0])?[1-9])|([1-2][0-9])|([3][0]))[.]((([0])?[13-9])|([1][0-2]))[.]([0-9][0-9][0-9][0-9]))$|^([3][1][.]((([0])?[13578])|([1][02]))[.]([0-9][0-9][0-9][0-9]))$|^(((([0])?[1-9])|([1][0-9])|([2][0-8]))[.]([0])?[2][.]([0-9][0-9][0-9][0-9]))$|^([2][9][.]([0])?[2])[.][0-9][0-9][13579][26]$|^([2][9][.]([0])?[2])[.][0-9][0-9][02468][048]$/)))
		return datum;
	
	return '';
}


function setPageValue1Xml(page, element, value) {
    if (page == 1) {
        $("#" + element).val(value);
    } else {
        var poradie = page - 1;
        $("#" + element + "_Repeating_" + poradie).val(value);
    }
}

function setPageValueCh1Xml(page, element, value) {
    if (page == 1) {
        document.getElementById(element).checked = (value == '1' ? true : false);
    } else {
        var poradie = page - 1;
        element = element + "_Repeating_" + poradie;
        document.getElementById(element).checked = (value == '1' ? true : false);
    }
}

function getNodeValue(node) {
    if (!node) return "";
    if (!node.firstChild) return "";

    return node.firstChild.nodeValue;
}

function createfdf(segment, index) {
    var result = null;

    if (segment == 0 && index == 0) {
        result = createMainFdf();
    }
    if (segment == 1) {
        var fdfs = createNfdf();
        if (index < fdfs.length) {
            result = fdfs[index];
        }
    }
    return result;
}

function createNfdf() {
    var fdfObsah = new Array();
    var pocetvsetkychsekcii = 1;
    var pocetvsetkychsekcii = $("[id^='layoutRow27435_']").length;
    var pocetsekciinastranu = 1;
    var pocetmaxstran = 10;
    var davka = 0;
    for (var t = 1; t <= pocetvsetkychsekcii; t += (pocetsekciinastranu * pocetmaxstran)) {
        davka = davka + 1;
        var r = 0;
        if ((pocetsekciinastranu * pocetmaxstran * davka) > pocetvsetkychsekcii) {
            r = pocetvsetkychsekcii;
        } else {
            r = pocetsekciinastranu * pocetmaxstran * davka;
        }
        fdfObsah[davka - 1] = createopakovaneNfdf(davka, t, r, pocetsekciinastranu, pocetmaxstran);
    }
    return fdfObsah;
}

function createMainFdf() {
    isFdfUpper = true;
    stringBuilder = new $.StringBuilder();
    stringBuilder.appendLine('%FDF-1.2');
    stringBuilder.appendLine('%âăĎÓ');
    stringBuilder.appendLine('1 0 obj');
    stringBuilder.appendLine('<< /FDF');
    stringBuilder.appendLine('<< /Fields');
    stringBuilder.appendLine('[');
    stringBuilder.appendLine('    << /V(' + prepisznakyFdf('Tlačivo vytlačené z Portálu FS', false) + ')/T (print)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbDic1').val()) + ')/T (dic)>>');
    if (!!$('#dtpDatumNarodenia2').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumNarodenia2').val().split(".")[0]) + ')/T (02a)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (02a)>>');
    }
    if (!!$('#dtpDatumNarodenia2').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumNarodenia2').val().split(".")[1]) + ')/T (02b)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (02b)>>');
    }
    if (!!$('#dtpDatumNarodenia2').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumNarodenia2').val().split(".")[2]) + ')/T (02c)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (02c)>>');
    }
    stringBuilder.appendLine('    << /V (' + ($('#rbDruhVykazuRiadny').is(':checked') ? 'X' : '') + ')/T (dp1)>>');
    stringBuilder.appendLine('    << /V (' + ($('#rbDruhVykazuOpravny').is(':checked') ? 'X' : '') + ')/T (dp2)>>');
    stringBuilder.appendLine('    << /V (' + ($('#rbDruhVykazuDodatocny').is(':checked') ? 'X' : '') + ')/T (dp3)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbRok').val().substr(2, 2)) + ')/T (rok)>>');
    if (!!$('#dtpDatumDDP').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDDP').val().split(".")[0]) + ')/T (dz1)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (dz1)>>');
    }
    if (!!$('#dtpDatumDDP').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDDP').val().split(".")[1]) + ')/T (dz2)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (dz2)>>');
    }
    if (!!$('#dtpDatumDDP').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDDP').val().split(".")[2].substr(2, 2)) + ')/T (dz3)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (dz3)>>');
    }
    /*stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val()) + ')/T (03a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val()) + ')/T (03b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val()) + ')/T (03c)>>');*/

    if (!!$('#cmbSKNACE3').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val().substr(0, 2)) + ')/T (03a)>>	');
    } else {
        stringBuilder.appendLine('    << /V ()/T (03a)>>	');
    }
    if (!!$('#cmbSKNACE3').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val().substr(2, 2)) + ')/T (03b)>>	');
    } else {
        stringBuilder.appendLine('    << /V ()/T (03b)>>	');
    }
    if (!!$('#cmbSKNACE3').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3').val().substr(4, 1)) + ')/T (03c)>>	');
    } else {
        stringBuilder.appendLine('    << /V ()/T (03c)>>	');
    }

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbSKNACE3 option:selected').text().substr(8).replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ')) + ')/T (hpc)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPriezvisko4').val()) + ')/T (04)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbMeno5').val()) + ')/T (05)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTitul6').val()) + ')/T (06a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTitul62').val()) + ')/T (06b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica7').val()) + ')/T (07)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbCisloDomu8').val()) + ')/T (08)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC9').val()) + ')/T (09)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec10').val()) + ')/T (10)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbStat11').val()) + ')/T (11)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbNerezident').is(':checked') ? 'X' : '') + ')/T (12)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPrepojenie').is(':checked') ? 'X' : '') + ')/T (13)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica14').val()) + ')/T (14)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbCisloDomu15').val()) + ')/T (15)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC16').val()) + ')/T (16)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec17').val()) + ')/T (17)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPriezvisko18').val()) + ')/T (18)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbMeno19').val()) + ')/T (19)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTitulPred20').val()) + ')/T (20a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTitulZa20').val()) + ')/T (20b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t21_1RC').val()) + ')/T (21a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t21_2RC').val()) + ')/T (21b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica22').val()) + ')/T (22)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbCislo23').val()) + ')/T (23)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC24').val()) + ')/T (24)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec25').val()) + ')/T (25)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbStat26').val()) + ')/T (26)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTelCislo27').val()) + ')/T (27)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbEmail28').val()) + ')/T (28)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbr29').is(':checked') ? 'X' : '') + ')/T (29)>>');
    if (!!$('#t30').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t30').val().split(".")[0]) + ')/T (30)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (30)>>');
    }
    if (!!$('#t30').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t30').val().split(".")[1]) + ')/T (30d)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (30d)>>');
    }
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r31_1').val()) + ')/T (31a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r31_2a').val()) + ')/T (31b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r31_2b').val()) + ')/T (31c)>>');
    stringBuilder.appendLine('    << /V (' + ($('#r32_1').is(':checked') ? 'X' : '') + ')/T (32a)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r32_2').val()) + ')/T (32b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r32_2').val(), 2) + ')/T (32c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r32_3').val()) + ')/T (32d)>>');
	stringBuilder.appendLine('    << /V (' + ($('#r33_1').is(':checked') ? 'X' : '') + ')/T (33a)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r33_2').val()) + ')/T (33b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r33_2').val(), 2) + ')/T (33c)>>');

	for (i = 0; i < 4; i++) {
		var suffix = i == 0 ? "" : "_Repeating_" + i;
		stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r34Priezvisko_1' + suffix).val()) + ')/T (34-' + (i + 1) +'a)>>');
		stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r34RodCislo_2a' + suffix).val()) + ')/T (34-' + (i + 1) +'b)>>');
		stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r34RodCislo_2b' + suffix).val()) + ')/T (34-' + (i + 1) +'c)>>');
		stringBuilder.appendLine('    << /V (' + ($('#r34Ks' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'d)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM00_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e00)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM01_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e01)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM02_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e02)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM03_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e03)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM04_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e04)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM05_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e05)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM06_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e06)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM07_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e07)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM08_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e08)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM09_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e09)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM10_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e10)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM11_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e11)>>');
		stringBuilder.appendLine('    << /V (' + ($('#cbM12_1' + suffix).is(':checked') ? 'X' : '') + ')/T (34-' + (i + 1) +'e12)>>');
	}
	
	stringBuilder.appendLine('    << /V (' + ($('#r35').is(':checked') ? 'X' : '') + ')/T (35)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r36').val()) + ')/T (36)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r36').val(), 2) + ')/T (36d)>>');
	//IV oddiel
	stringBuilder.appendLine('    << /V (' + ($('#r37_1').is(':checked') ? 'X' : '') + ')/T (37a)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r37_2').val()) + ')/T (37b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r37_2').val(), 2) + ')/T (37c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#r37_3').val()) + ')/T (37d)>>');
    //V oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#r38').val()) + ')/T (38)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r38').val(), 2) + ')/T (38d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r38a').val()) + ')/T (38a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r38a').val(), 2) + ')/T (38ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r39').val()) + ')/T (39)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r39').val(), 2) + ')/T (39d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#r40').val()) + ')/T (40)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#r40').val(), 2) + ')/T (40d)>>');
    //VI oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R1S1').val()) + ')/T (t111)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R1S1').val(), 2) + ')/T (t111d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R2S1').val()) + ')/T (t112)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R2S1').val(), 2) + ')/T (t112d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R3S1').val()) + ')/T (t113)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R3S1').val(), 2) + ')/T (t113d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R4S1').val()) + ')/T (t114)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R4S1').val(), 2) + ')/T (t114d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R5S1').val()) + ')/T (t115)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R5S1').val(), 2) + ')/T (t115d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R6S1').val()) + ')/T (t116)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R6S1').val(), 2) + ')/T (t116d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R7S1').val()) + ')/T (t117)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R7S1').val(), 2) + ')/T (t117d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R8S1').val()) + ')/T (t118)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R8S1').val(), 2) + ')/T (t118d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R9S1').val()) + ')/T (t119)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R9S1').val(), 2) + ')/T (t119d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R10S1').val()) + ')/T (t11a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R10S1').val(), 2) + ')/T (t11ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R11S1').val()) + ')/T (t11b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R11S1').val(), 2) + ')/T (t11bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R12S1').val()) + ')/T (t11c)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R12S1').val(), 2) + ')/T (t11cd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R13S1').val()) + ')/T (t11d)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R13S1').val(), 2) + ')/T (t11dd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R1S2').val()) + ')/T (t121)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R1S2').val(), 2) + ')/T (t121d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R2S2').val()) + ')/T (t122)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R2S2').val(), 2) + ')/T (t122d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R3S2').val()) + ')/T (t123)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R3S2').val(), 2) + ')/T (t123d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R4S2').val()) + ')/T (t124)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R4S2').val(), 2) + ')/T (t124d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R5S2').val()) + ')/T (t125)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R5S2').val(), 2) + ')/T (t125d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R6S2').val()) + ')/T (t126)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R6S2').val(), 2) + ')/T (t126d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R7S2').val()) + ')/T (t127)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R7S2').val(), 2) + ')/T (t127d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R8S2').val()) + ')/T (t128)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R8S2').val(), 2) + ')/T (t128d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R9S2').val()) + ')/T (t129)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R9S2').val(), 2) + ')/T (t129d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R10S2').val()) + ')/T (t12a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R10S2').val(), 2) + ')/T (t12ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R11S2').val()) + ')/T (t12b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R11S2').val(), 2) + ')/T (t12bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R12S2').val()) + ')/T (t12c)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R12S2').val(), 2) + ')/T (t12cd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1R13S2').val()) + ')/T (t12d)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1R13S2').val(), 2) + ')/T (t12dd)>>');
    //koniec tabulky
    //Uplatňujem preukázateľné výdavky z daňovej evidencie podľa § 6 ods. 11 zákona
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch11Ods6Zak1a2').is(':checked') ? 'X' : '') + ')/T (p6111)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch11Ods6Zak3').is(':checked') ? 'X' : '') + ')/T (p6113)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch11Ods6Zak4').is(':checked') ? 'X' : '') + ')/T (p6114)>>');
    //Uplatňujem výdavky percentom z príjmov podľa § 6 ods. 10 zákona
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch10Ods6Zak1a2').is(':checked') ? 'X' : '') + ')/T (p6101)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch10Ods6Zak4').is(':checked') ? 'X' : '') + ')/T (p6104)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#tbPrekazatenePoistne').val()) + ')/T (pzp)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPrekazatenePoistne').val(), 2) + ')/T (pzpd)>>');
    //2ch
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch17Ods6Zak1a2').is(':checked') ? 'X' : '') + ')/T (p6171z)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPriPrijmoch17Ods6Zak3a4').is(':checked') ? 'X' : '') + ')/T (p6173z)>>');
    //2ch
    stringBuilder.appendLine('    << /V (' + ($('#cbUkoncPriPrijmoch17Ods6Zak1a2').is(':checked') ? 'X' : '') + ')/T (p6171u)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbUkoncPriPrijmoch17Ods6Zak3a4').is(':checked') ? 'X' : '') + ')/T (p6173u)>>');
    //tabulka 1a
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR1S1').val()) + ')/T (t1a11)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR1S1').val(), 2) + ')/T (t1a11d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR2S1').val()) + ')/T (t1a12)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR2S1').val(), 2) + ')/T (t1a12d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR3S1').val()) + ')/T (t1a13)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR3S1').val(), 2) + ')/T (t1a13d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR4S1').val()) + ')/T (t1a14)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR4S1').val(), 2) + ')/T (t1a14d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR5S1').val()) + ')/T (t1a15)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR5S1').val(), 2) + ')/T (t1a15d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR1S2').val()) + ')/T (t1a21)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR1S2').val(), 2) + ')/T (t1a21d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR2S2').val()) + ')/T (t1a22)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR2S2').val(), 2) + ')/T (t1a22d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR3S2').val()) + ')/T (t1a23)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR3S2').val(), 2) + ')/T (t1a23d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR4S2').val()) + ')/T (t1a24)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR4S2').val(), 2) + ')/T (t1a24d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1aR5S2').val()) + ')/T (t1a25)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1aR5S2').val(), 2) + ')/T (t1a25d)>>');
    //tabulka 1b
    stringBuilder.appendLine('    << /V (' + celacast($('#t1bR1S1').val()) + ')/T (t1b11)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1bR1S1').val(), 2) + ')/T (t1b11d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1bR2S1').val()) + ')/T (t1b12)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1bR2S1').val(), 2) + ')/T (t1b12d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1bR1S2').val()) + ')/T (t1b21)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1bR1S2').val(), 2) + ')/T (t1b21d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t1bR2S2').val()) + ')/T (t1b22)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t1bR2S2').val(), 2) + ')/T (t1b22d)>>');
    //riadky
    stringBuilder.appendLine('    << /V (' + celacast($('#t41').val()) + ')/T (41)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t41').val(), 2) + ')/T (41d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t42').val()) + ')/T (42)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t42').val(), 2) + ')/T (42d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t43').val()) + ')/T (43)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t43').val(), 2) + ')/T (43d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t44').val()) + ')/T (44)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t44').val(), 2) + ')/T (44d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t45').val()) + ')/T (45)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t45').val(), 2) + ')/T (45d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t46').val()) + ')/T (46)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t46').val(), 2) + ')/T (46d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t47').val()) + ')/T (47)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t47').val(), 2) + ')/T (47d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t48').val()) + ')/T (48)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t48').val(), 2) + ')/T (48d)>>');
	
    stringBuilder.appendLine('    << /V (' + $('#tbR49rok').val() + ')/T (49r)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbR49strata').val()) + ')/T (49)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbR49strata').val(), 2) + ')/T (49d)>>');
    stringBuilder.appendLine('    << /V (' + $('#tbR50rok').val() + ')/T (50r)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbR50strata').val()) + ')/T (50)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbR50strata').val(), 2) + ')/T (50d)>>');
    stringBuilder.appendLine('    << /V (' + $('#tbR51rok').val() + ')/T (51r)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbR51strata').val()) + ')/T (51)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbR51strata').val(), 2) + ')/T (51d)>>');
    stringBuilder.appendLine('    << /V (' + $('#tbR52rok').val() + ')/T (52r)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbR52strata').val()) + ')/T (52)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbR52strata').val(), 2) + ')/T (52d)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#t53').val()) + ')/T (53)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t53').val(), 2) + ')/T (53d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t54').val()) + ')/T (54)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t54').val(), 2) + ')/T (54d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t55').val()) + ')/T (55)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t55').val(), 2) + ')/T (55d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t56').val()) + ')/T (56)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t56').val(), 2) + ')/T (56d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t57').val()) + ')/T (57)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t57').val(), 2) + ')/T (57d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t58').val()) + ')/T (58)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t58').val(), 2) + ')/T (58d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t59').val()) + ')/T (59)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t59').val(), 2) + ')/T (59d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t60').val()) + ')/T (60)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t60').val(), 2) + ')/T (60d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t61').val()) + ')/T (61)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t61').val(), 2) + ')/T (61d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t62').val()) + ')/T (62)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t62').val(), 2) + ')/T (62d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t63').val()) + ')/T (63)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t63').val(), 2) + ')/T (63d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t64').val()) + ')/T (64)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t64').val(), 2) + ')/T (64d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t65').val()) + ')/T (65)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t65').val(), 2) + ')/T (65d)>>');
    //VII oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R1S1').val()) + ')/T (t211)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R1S1').val(), 2) + ')/T (t211d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R2S1').val()) + ')/T (t212)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R2S1').val(), 2) + ')/T (t212d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R3S1').val()) + ')/T (t213)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R3S1').val(), 2) + ')/T (t213d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R4S1').val()) + ')/T (t214)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R4S1').val(), 2) + ')/T (t214d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R5S1').val()) + ')/T (t215)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R5S1').val(), 2) + ')/T (t215d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R6S1').val()) + ')/T (t216)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R6S1').val(), 2) + ')/T (t216d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R7S1').val()) + ')/T (t217)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R7S1').val(), 2) + ')/T (t217d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R8S1').val()) + ')/T (t218)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R8S1').val(), 2) + ')/T (t218d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R9S1').val()) + ')/T (t219)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R9S1').val(), 2) + ')/T (t219d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R10S1').val()) + ')/T (t21a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R10S1').val(), 2) + ')/T (t21ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R11S1').val()) + ')/T (t21b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R11S1').val(), 2) + ')/T (t21bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R12S1').val()) + ')/T (t21c)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R12S1').val(), 2) + ')/T (t21cd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R1S2').val()) + ')/T (t221)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R1S2').val(), 2) + ')/T (t221d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R2S2').val()) + ')/T (t222)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R2S2').val(), 2) + ')/T (t222d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R3S2').val()) + ')/T (t223)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R3S2').val(), 2) + ')/T (t223d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R4S2').val()) + ')/T (t224)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R4S2').val(), 2) + ')/T (t224d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R5S2').val()) + ')/T (t225)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R5S2').val(), 2) + ')/T (t225d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R6S2').val()) + ')/T (t226)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R6S2').val(), 2) + ')/T (t226d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R7S2').val()) + ')/T (t227)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R7S2').val(), 2) + ')/T (t227d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R8S2').val()) + ')/T (t228)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R8S2').val(), 2) + ')/T (t228d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R9S2').val()) + ')/T (t229)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R9S2').val(), 2) + ')/T (t229d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R10S2').val()) + ')/T (t22a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R10S2').val(), 2) + ')/T (t22ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t2R11S2').val()) + ')/T (t22b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t2R11S2').val(), 2) + ')/T (t22bd)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#t66').val()) + ')/T (66)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t66').val(), 2) + ')/T (66d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t67').val()) + ')/T (67)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t67').val(), 2) + ')/T (67d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t68').val()) + ')/T (68)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t68').val(), 2) + ')/T (68d)>>');
    // VIII oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R1S1').val()) + ')/T (t311)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R1S1').val(), 2) + ')/T (t311d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R2S1').val()) + ')/T (t312)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R2S1').val(), 2) + ')/T (t312d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R3S1').val()) + ')/T (t313)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R3S1').val(), 2) + ')/T (t313d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R4S1').val()) + ')/T (t314)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R4S1').val(), 2) + ')/T (t314d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R5S1').val()) + ')/T (t315)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R5S1').val(), 2) + ')/T (t315d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R6S1').val()) + ')/T (t316)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R6S1').val(), 2) + ')/T (t316d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R7S1').val()) + ')/T (t317)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R7S1').val(), 2) + ')/T (t317d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R8S1').val()) + ')/T (t318)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R8S1').val(), 2) + ')/T (t318d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R9S1').val()) + ')/T (t319)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R9S1').val(), 2) + ')/T (t319d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R10S1').val()) + ')/T (t31a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R10S1').val(), 2) + ')/T (t31ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R11S1').val()) + ')/T (t31b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R11S1').val(), 2) + ')/T (t31bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R12S1').val()) + ')/T (t31c)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R12S1').val(), 2) + ')/T (t31cd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R13S1').val()) + ')/T (t31d)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R13S1').val(), 2) + ')/T (t31dd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R14S1').val()) + ')/T (t31e)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R14S1').val(), 2) + ')/T (t31ed)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R15S1').val()) + ')/T (t31f)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R15S1').val(), 2) + ')/T (t31fd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R16S1').val()) + ')/T (t31g)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R16S1').val(), 2) + ')/T (t31gd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R17S1').val()) + ')/T (t31h)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R17S1').val(), 2) + ')/T (t31hd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R18S1').val()) + ')/T (t31i)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R18S1').val(), 2) + ')/T (t31id)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R19S1').val()) + ')/T (t31j)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R19S1').val(), 2) + ')/T (t31jd)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#t3R1S2').val()) + ')/T (t321)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R1S2').val(), 2) + ')/T (t321d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R2S2').val()) + ')/T (t322)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R2S2').val(), 2) + ')/T (t322d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R3S2').val()) + ')/T (t323)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R3S2').val(), 2) + ')/T (t323d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R4S2').val()) + ')/T (t324)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R4S2').val(), 2) + ')/T (t324d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R5S2').val()) + ')/T (t325)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R5S2').val(), 2) + ')/T (t325d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R6S2').val()) + ')/T (t326)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R6S2').val(), 2) + ')/T (t326d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R7S2').val()) + ')/T (t327)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R7S2').val(), 2) + ')/T (t327d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R8S2').val()) + ')/T (t328)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R8S2').val(), 2) + ')/T (t328d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R9S2').val()) + ')/T (t329)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R9S2').val(), 2) + ')/T (t329d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R10S2').val()) + ')/T (t32a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R10S2').val(), 2) + ')/T (t32ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R11S2').val()) + ')/T (t32b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R11S2').val(), 2) + ')/T (t32bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R12S2').val()) + ')/T (t32c)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R12S2').val(), 2) + ')/T (t32cd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R13S2').val()) + ')/T (t32d)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R13S2').val(), 2) + ')/T (t32dd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R14S2').val()) + ')/T (t32e)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R14S2').val(), 2) + ')/T (t32ed)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R15S2').val()) + ')/T (t32f)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R15S2').val(), 2) + ')/T (t32fd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R16S2').val()) + ')/T (t32g)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R16S2').val(), 2) + ')/T (t32gd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R17S2').val()) + ')/T (t32h)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R17S2').val(), 2) + ')/T (t32hd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t3R19S2').val()) + ')/T (t32j)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t3R19S2').val(), 2) + ')/T (t32jd)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#t69').val()) + ')/T (69)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t69').val(), 2) + ')/T (69d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t70').val()) + ')/T (70)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t70').val(), 2) + ')/T (70d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t71').val()) + ')/T (71)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t71').val(), 2) + ')/T (71d)>>');
    //IX. oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#t72').val()) + ')/T (72)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t72').val(), 2) + ')/T (72d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t73').val()) + ')/T (73)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t73').val(), 2) + ')/T (73d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t74').val()) + ')/T (74)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t74').val(), 2) + ')/T (74d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t75').val()) + ')/T (75)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t75').val(), 2) + ')/T (75d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t76').val()) + ')/T (76)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t76').val(), 2) + ')/T (76d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t76a').val()) + ')/T (76a)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t76a').val(), 2) + ')/T (76ad)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t76b').val()) + ')/T (76b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t76b').val(), 2) + ')/T (76bd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t77').val()) + ')/T (77)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t77').val(), 2) + ')/T (77d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t78').val()) + ')/T (78)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t78').val(), 2) + ')/T (78d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t79').val()) + ')/T (79)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t79').val(), 2) + ')/T (79d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t80').val()) + ')/T (80)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t80').val(), 2) + ')/T (80d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t81').val())) + ')/T (81z)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t81').val()) + ')/T (81)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t81').val(), 2) + ')/T (81d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t82').val()) + ')/T (82)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t82').val(), 2) + ')/T (82d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t83').val()) + ')/T (83)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t83').val(), 2) + ')/T (83d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t84').val()) + ')/T (84)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t84').val(), 2) + ')/T (84d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t85').val()) + ')/T (85)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t85').val(), 2) + ')/T (85d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t86').val()) + ')/T (86)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t86').val(), 2) + ')/T (86d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t87').val()) + ')/T (87)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t87').val(), 2) + ')/T (87d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t88').val()) + ')/T (88)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t88').val(), 2) + ')/T (88d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t89').val()) + ')/T (89)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t89').val(), 2) + ')/T (89d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t90').val()) + ')/T (90)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t90').val(), 2) + ')/T (90d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t91').val()) + ')/T (91)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t91').val(), 2) + ')/T (91d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t92').val())) + ')/T (92z)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t92').val()) + ')/T (92)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t92').val(), 2) + ')/T (92d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t93').val()) + ')/T (93)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t93').val(), 2) + ')/T (93d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t94').val()) + ')/T (94)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t94').val(), 2) + ')/T (94d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t95').val()) + ')/T (95)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t95').val(), 2) + ')/T (95d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t96').val()) + ')/T (96)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t96').val(), 2) + ')/T (96d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t97').val()) + ')/T (97)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t97').val(), 2) + ')/T (97d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t98').val()) + ')/T (98)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t98').val(), 2) + ')/T (98d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t99').val()) + ')/T (99)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t99').val(), 2) + ')/T (99d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t100').val()) + ')/T (100)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t100').val(), 2) + ')/T (100d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t101').val()) + ')/T (101)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t101').val(), 2) + ')/T (101d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t102').val()) + ')/T (102)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t102').val(), 2) + ')/T (102d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t103').val()) + ')/T (103)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t103').val(), 2) + ')/T (103d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t104').val()) + ')/T (104)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t104').val(), 2) + ')/T (104d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t105').val()) + ')/T (105)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t105').val(), 2) + ')/T (105d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t106').val()) + ')/T (106)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t106').val(), 2) + ')/T (106d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t107').val()) + ')/T (107)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t107').val(), 2) + ')/T (107d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t108').val()) + ')/T (108)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t108').val(), 2) + ')/T (108d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t109').val()) + ')/T (109)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t109').val(), 2) + ')/T (109d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t110').val()) + ')/T (110)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t110').val(), 2) + ')/T (110d)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t111').val()) + ')/T (111)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t111').val(), 2) + ')/T (111d)>>');


    stringBuilder.appendLine('    << /V (' + celacast($('#t112').val()) + ')/T (112)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t112').val(), 2) + ')/T (112d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t113').val()) + ')/T (113)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t113').val(), 2) + ')/T (113d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t114').val()) + ')/T (114)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t114').val(), 2) + ')/T (114d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t115').val()) + ')/T (115)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t115').val(), 2) + ')/T (115d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t116').val()) + ')/T (116)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t116').val(), 2) + ')/T (116d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t117').val()) + ')/T (117)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t117').val(), 2) + ')/T (117d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t118').val()) + ')/T (118)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t118').val(), 2) + ')/T (118d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t119').val()) + ')/T (119)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t119').val(), 2) + ')/T (119d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t120').val()) + ')/T (120)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t120').val(), 2) + ')/T (120d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t121').val()) + ')/T (121)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t121').val(), 2) + ')/T (121d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t122').val()) + ')/T (122)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t122').val(), 2) + ')/T (122d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t123').val()) + ')/T (123)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t123').val(), 2) + ')/T (123d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t124').val()) + ')/T (124)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t124').val(), 2) + ')/T (124d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t125').val()) + ')/T (125)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t125').val(), 2) + ')/T (125d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t126').val()) + ')/T (126)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t126').val(), 2) + ')/T (126d)>>');

    //X. oddiel
    stringBuilder.appendLine('    << /V (' + celacast($('#t127').val()) + ')/T (127)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t127').val(), 2) + ')/T (127d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t128').val())) + ')/T (128z)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t128').val()) + ')/T (128)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t128').val(), 2) + ')/T (128d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t129').val())) + ')/T (129z)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t129').val()) + ')/T (129)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t129').val(), 2) + ')/T (129d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t130').val())) + ')/T (130z)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t130').val()) + ')/T (130)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t130').val(), 2) + ')/T (130d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t131').val()) + ')/T (131)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t131').val(), 2) + ')/T (131d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t132').val())) + ')/T (132z)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t132').val()) + ')/T (132)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t132').val(), 2) + ')/T (132d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t133').val()) + ')/T (133)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t133').val(), 2) + ')/T (133d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(znamienko($('#t134').val())) + ')/T (134z)>>');
    stringBuilder.appendLine('    << /V (' + celacastabs($('#t134').val()) + ')/T (134)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t134').val(), 2) + ')/T (134d)>>');

    //XI. oddiel
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t135').val()) + ')/T (135)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t136').val()) + ')/T (136)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t136').val(), 2) + ')/T (136d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t137').val()) + ')/T (137)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t137').val(), 2) + ')/T (137d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#t138').val()) + ')/T (138)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#t138').val(), 2) + ')/T (138d)>>');
    stringBuilder.appendLine('    << /V (' + ($('#t139').is(':checked') ? 'X' : '') + ')/T (139)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t140').val()) + ')/T (140)>>');

    //XII. oddiel
    stringBuilder.appendLine('    << /V (' + ($('#cbNeuplatnujem').is(':checked') ? 'X' : '') + ')/T (neuplatnit)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbSplnam3Per').is(':checked') ? 'X' : '') + ')/T (splnam)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPodiel141').val()) + ')/T (141)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPodiel141').val(), 2) + ')/T (141d)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbico142').val()) + ')/T (142a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#PravnaForma142').val()) + ')/T (142c)>>');
    var row = divideRows(2, 'tbObchMeno142');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(row[0]) + ')/T (142d)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf(row[1]) + ')/T (142e)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica142').val()) + ')/T (142f)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbCislo142').val()) + ')/T (142g)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC142').val()) + ')/T (142h)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec142').val()) + ')/T (142i)>>');
    stringBuilder.appendLine('    << /V (' + ($('#chbSuhlas').is(':checked') ? 'X' : '') + ')/T (suhlasim)>>');

    //XIII oddiel
    stringBuilder.appendLine('    << /V (' + ($('#cbUvadza').is(':checked') ? 'X' : '') + ')/T (zaznam1)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod').val().substr(0, 3)) + ')/T (XIII1a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par').val()) + ')/T (XIII1b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods').val()) + ')/T (XIII1c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism').val()) + ')/T (XIII1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy').val()) + ')/T (XIII1p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy').val(), 2) + ')/T (XIII1pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky').val()) + ')/T (XIII1v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky').val(), 2) + ')/T (XIII1vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho').val()) + ')/T (XIII1z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho').val(), 2) + ')/T (XIII1zd)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod_Repeating_1').val().substr(0, 3)) + ')/T (XIII2a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par_Repeating_1').val()) + ')/T (XIII2b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods_Repeating_1').val()) + ')/T (XIII2c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism_Repeating_1').val()) + ')/T (XIII2d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy_Repeating_1').val()) + ')/T (XIII2p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy_Repeating_1').val(), 2) + ')/T (XIII2pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky_Repeating_1').val()) + ')/T (XIII2v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky_Repeating_1').val(), 2) + ')/T (XIII2vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho_Repeating_1').val()) + ')/T (XIII2z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho_Repeating_1').val(), 2) + ')/T (XIII2zd)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod_Repeating_2').val().substr(0, 3)) + ')/T (XIII3a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par_Repeating_2').val()) + ')/T (XIII3b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods_Repeating_2').val()) + ')/T (XIII3c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism_Repeating_2').val()) + ')/T (XIII3d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy_Repeating_2').val()) + ')/T (XIII3p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy_Repeating_2').val(), 2) + ')/T (XIII3pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky_Repeating_2').val()) + ')/T (XIII3v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky_Repeating_2').val(), 2) + ')/T (XIII3vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho_Repeating_2').val()) + ')/T (XIII3z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho_Repeating_2').val(), 2) + ')/T (XIII3zd)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod_Repeating_3').val().substr(0, 3)) + ')/T (XIII4a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par_Repeating_3').val()) + ')/T (XIII4b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods_Repeating_3').val()) + ')/T (XIII4c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism_Repeating_3').val()) + ')/T (XIII4d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy_Repeating_3').val()) + ')/T (XIII4p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy_Repeating_3').val(), 2) + ')/T (XIII4pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky_Repeating_3').val()) + ')/T (XIII4v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky_Repeating_3').val(), 2) + ')/T (XIII4vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho_Repeating_3').val()) + ')/T (XIII4z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho_Repeating_3').val(), 2) + ')/T (XIII4zd)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod_Repeating_4').val().substr(0, 3)) + ')/T (XIII5a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par_Repeating_4').val()) + ')/T (XIII5b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods_Repeating_4').val()) + ')/T (XIII5c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism_Repeating_4').val()) + ')/T (XIII5d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy_Repeating_4').val()) + ')/T (XIII5p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy_Repeating_4').val(), 2) + ')/T (XIII5pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky_Repeating_4').val()) + ')/T (XIII5v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky_Repeating_4').val(), 2) + ')/T (XIII5vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho_Repeating_4').val()) + ')/T (XIII5z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho_Repeating_4').val(), 2) + ')/T (XIII5zd)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13kod_Repeating_5').val().substr(0, 3)) + ')/T (XIII6a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Par_Repeating_5').val()) + ')/T (XIII6b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Ods_Repeating_5').val()) + ')/T (XIII6c)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#odd13Pism_Repeating_5').val()) + ')/T (XIII6d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Prijmy_Repeating_5').val()) + ')/T (XIII6p)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Prijmy_Repeating_5').val(), 2) + ')/T (XIII6pd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13Vydavky_Repeating_5').val()) + ')/T (XIII6v)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13Vydavky_Repeating_5').val(), 2) + ')/T (XIII6vd)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#odd13zToho_Repeating_5').val()) + ')/T (XIII6z)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#odd13zToho_Repeating_5').val(), 2) + ')/T (XIII6zd)>>');

    stringBuilder.appendLine('    << /V (' + ($('#chbRekreacia').is(':checked') ? 'X' : '') + ')/T (XIII19a)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#valRekreacia').val()) + ')/T (XIII19b)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#valRekreacia').val(), 2) + ')/T (XIII19bd)>>');

    stringBuilder.appendLine('    << /V (');
    var polesekcii1 = $("[id^='layoutRow27323']");
    if (polesekcii1.length > 6) {
        stringBuilder.appendLine(prepisznakyFdf('Ďalšie záznamy:'));
        for (var i = 6; i < polesekcii1.length; i++) {
            stringBuilder.appendLine(prepisznakyFdf(
			'Kód štátu: ' + $('#odd13kod_Repeating_' + i).val().substr(0, 3) +
			'\t§ ' + $('#odd13Par_Repeating_' + i).val() + ' ods. ' + $('#odd13Ods_Repeating_' + i).val() + ' písm. ' + $('#odd13Pism_Repeating_' + i).val() +
			'\tPríjmy: ' + celacast($('#odd13Prijmy_Repeating_' + i).val()) + ',' + desatinnacast($('#odd13Prijmy_Repeating_' + i).val(), 2) +
			'\tVýdavky: ' + celacast($('#odd13Vydavky_Repeating_' + i).val()) + ',' + desatinnacast($('#odd13Vydavky_Repeating_' + i).val(), 2) +
			'\tz toho výdavky: ' + celacast($('#odd13zToho_Repeating_' + i).val()) + ',' + desatinnacast($('#odd13zToho_Repeating_' + i).val(), 2)));
        }
    }


    var polesekcii2 = $("[id^='layoutRow27421']");
    if (polesekcii2.length > 4) {
        stringBuilder.appendLine(prepisznakyFdf('\nĎalšie vyživované deti:'));
        for(var i = 4; i < polesekcii2.length; i++)
{
			var line = prepisznakyFdf('Priezvisko a meno: ' + $('#r34Priezvisko_1_Repeating_'+i).val() + ', Rodné číslo: '+ $('#r34RodCislo_2a_Repeating_'+i).val() + ' / '+
			$('#r34RodCislo_2b_Repeating_'+i).val() + ', Kúpeľná starostlivosť: ' + ($('#r34Ks_Repeating_'+i).is(':checked') ? 'áno' : 'nie') +
			', Mesiace: '+
			($('#cbM00_1_Repeating_'+i).is(':checked') ? '1 - 12, ' : '') +
			($('#cbM01_1_Repeating_'+i).is(':checked') ? '1, ' : '') +
			($('#cbM02_1_Repeating_'+i).is(':checked') ? '2, ' : '') +
			($('#cbM03_1_Repeating_'+i).is(':checked') ? '3, ' : '') +
			($('#cbM04_1_Repeating_'+i).is(':checked') ? '4, ' : '') +
			($('#cbM05_1_Repeating_'+i).is(':checked') ? '5, ' : '') +
			($('#cbM06_1_Repeating_'+i).is(':checked') ? '6, ' : '') +
			($('#cbM07_1_Repeating_'+i).is(':checked') ? '7, ' : '') +
			($('#cbM08_1_Repeating_'+i).is(':checked') ? '8, ' : '') +
			($('#cbM09_1_Repeating_'+i).is(':checked') ? '9, ' : '') +
			($('#cbM10_1_Repeating_'+i).is(':checked') ? '10, ' : '') +
			($('#cbM11_1_Repeating_'+i).is(':checked') ? '11, ' : '') +
			($('#cbM12_1_Repeating_'+i).is(':checked') ? '12' : ''));
			line = line.replace(/\s+$/g, '');
			stringBuilder.appendLine(line[line.length - 1] == ',' ? line.substring(0, line.length - 1) : line);
		}
    }

    if (polesekcii2.length > 4 || polesekcii1.length > 6)
        stringBuilder.appendLine('\r' + prepisznakyFdf($('#taZaznamy').val()) + ')/T (zaznam2)>>');
    else
        stringBuilder.appendLine(prepisznakyFdf($('#taZaznamy').val()) + ')/T (zaznam2)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t143').val()) + ')/T (143)>>');


    if (!!$('#dtpDatumSpravneUplne').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSpravneUplne').val().split(".")[0]) + ')/T (XIIIdatum1)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIIIdatum1)>>');
    }
    if (!!$('#dtpDatumSpravneUplne').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSpravneUplne').val().split(".")[1]) + ')/T (XIIIdatum2)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIIIdatum2)>>');
    }
    if (!!$('#dtpDatumSpravneUplne').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSpravneUplne').val().split(".")[2].substr(2, 2)) + ')/T (XIIIdatum3)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIIIdatum3)>>');
    }

    //XIV oddiel
    stringBuilder.appendLine('    << /V (' + ($('#cbVyplatit').is(':checked') ? 'X' : '') + ')/T (XIVa)>>');
    stringBuilder.appendLine('    << /V (' + ($('#chBonus').is(':checked') ? 'X' : '') + ')/T (XIVb)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbVratenie').is(':checked') ? 'X' : '') + ')/T (XIVc)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPoukazkaDB').is(':checked') ? 'X' : '') + ')/T (XIVd)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbUcetDB').is(':checked') ? 'X' : '') + ')/T (XIVe)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbUcetZah').is(':checked') ? 'X' : '') + ')/T (XIVf)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbIBAN').val()) + ')/T (XIVg)>>');

    if (!!$('#dtpDatumDB').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDB').val().split(".")[0]) + ')/T (XIVdatum1)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIVdatum1)>>');
    }
    if (!!$('#dtpDatumDB').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDB').val().split(".")[1]) + ')/T (XIVdatum2)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIVdatum2)>>');
    }
    if (!!$('#dtpDatumDB').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumDB').val().split(".")[2].substr(2, 2)) + ')/T (XIVdatum3)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (XIVdatum3)>>');
    }

    var lr = $("[id^='layoutRow27435']");
    var pocetFdfStran = lr.length;
    var lrAkt = $("#layoutRow27435");
    var isProjectEmpty = emptyProject(lrAkt);

    if (isProjectEmpty)
        stringBuilder.appendLine('    << /V (0)/T (PocetProjektov)>>');
    else
        stringBuilder.appendLine('    << /V (' + pocetFdfStran + ')/T (PocetProjektov)>>');

    // Priloha 1

    if (isProjectEmpty)
        stringBuilder.appendLine('    << /V (0)/T (0.ProjektCislo)>>');
    else
        stringBuilder.appendLine('    << /V (1)/T (0.ProjektCislo)>>');

    

    var datumVal = lrAkt.find("[id='DatumProjektu']");
    vratFDFDatum(datumVal, "0.da", "0.db", "0.dc", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r1DatumOd']");
    vratFDFDatum(datumVal, "0.t11a", "0.t11b", "0.t11c", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r1DatumDo']");
    vratFDFDatum(datumVal, "0.t11d", "0.t11e", "0.t11f", stringBuilder);

    var pole1 = lrAkt.find("[id='Pri1r1Vyska']").val();
    var pole2 = lrAkt.find("[id='Pri1r1Odp']").val();

    stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (0.t21)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (0.t21d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (0.t31)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (0.t31d)>> ');

    var datumVal = lrAkt.find("[id='Pri1r2DatumOd']");
    vratFDFDatum(datumVal, "0.t12a", "0.t12b", "0.t12c", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r2DatumDo']");
    vratFDFDatum(datumVal, "0.t12d", "0.t12e", "0.t12f", stringBuilder);

    var pole1 = lrAkt.find("[id='Pri1r2Vyska']").val();
    var pole2 = lrAkt.find("[id='Pri1r2Odp']").val();

    stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (0.t22)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (0.t22d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (0.t32)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (0.t32d)>> ');

    var datumVal = lrAkt.find("[id='Pri1r3DatumOd']");
    vratFDFDatum(datumVal, "0.t13a", "0.t13b", "0.t13c", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r3DatumDo']");
    vratFDFDatum(datumVal, "0.t13d", "0.t13e", "0.t13f", stringBuilder);

    var pole1 = lrAkt.find("[id='Pri1r3Vyska']").val();
    var pole2 = lrAkt.find("[id='Pri1r3Odp']").val();

    stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (0.t23)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (0.t23d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (0.t33)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (0.t33d)>> ');

    var datumVal = lrAkt.find("[id='Pri1r4DatumOd']");
    vratFDFDatum(datumVal, "0.t14a", "0.t14b", "0.t14c", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r4DatumDo']");
    vratFDFDatum(datumVal, "0.t14d", "0.t14e", "0.t14f", stringBuilder);

    var pole1 = lrAkt.find("[id='Pri1r4Vyska']").val();
    var pole2 = lrAkt.find("[id='Pri1r4Odp']").val();

    stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (0.t24)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (0.t24d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (0.t34)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (0.t34d)>> ');

    var datumVal = lrAkt.find("[id='Pri1r5DatumOd']");
    vratFDFDatum(datumVal, "0.t15a", "0.t15b", "0.t15c", stringBuilder);

    var datumVal = lrAkt.find("[id='Pri1r5DatumDo']");
    vratFDFDatum(datumVal, "0.t15d", "0.t15e", "0.t15f", stringBuilder);

    var pole1 = lrAkt.find("[id='Pri1r5Vyska']").val();
    var pole2 = lrAkt.find("[id='Pri1r5Odp']").val();

    stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (0.t25)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (0.t25d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (0.t35)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (0.t35d)>> ');

    var pole6 = lrAkt.find("[id='Pri1r6']").val();
    stringBuilder.appendLine('      << /V (' + celacast(pole6) + ')/T (0.t36)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole6) + ')/T (0.t36d)>> ');

    stringBuilder.appendLine('      << /V (' + prepisznakyFdf(lrAkt.find("[id^='CieleProjektu']").val()) + ')/T (0.ciele)>> ');

    var pole7 = lrAkt.find("[id='Pri1r7']").val();
    var pole8 = lrAkt.find("[id='Pri1r8']").val();
    var pole9 = lrAkt.find("[id='Pri1r9']").val();
    stringBuilder.appendLine('      << /V (' + celacast(pole7) + ')/T (0.t37)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole7) + ')/T (0.t37d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole8) + ')/T (0.t38)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole8) + ')/T (0.t38d)>> ');
    stringBuilder.appendLine('      << /V (' + celacast(pole9) + ')/T (0.t39)>> ');
    stringBuilder.appendLine('      << /V (' + desatinnacast(pole9) + ')/T (0.t39d)>> ');

	// Priloha 2
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_01').val()) + ')/T (ozd01-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_01').val(), 2) + ')/T (ozd01-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_02').val()) + ')/T (ozd02-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_02').val(), 2) + ')/T (ozd02-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_03').val()) + ')/T (ozd03-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_03').val(), 2) + ')/T (ozd03-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_04').val()) + ')/T (ozd04-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_04').val(), 2) + ')/T (ozd04-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_05').val()) + ')/T (ozd05-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_05').val(), 2) + ')/T (ozd05-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_06').val()) + ')/T (ozd06-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_06').val(), 2) + ')/T (ozd06-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_04').val()) + ')/T (ozd04-2)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_04').val(), 2) + ')/T (ozd04-2d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_05').val()) + ')/T (ozd05-2)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_05').val(), 2) + ')/T (ozd05-2d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_06').val()) + ')/T (ozd06-2)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_06').val(), 2) + ')/T (ozd06-2d)>>');

	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_07').val()) + ')/T (ozd07)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_07').val(), 2) + ')/T (ozd07d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_09').val()) + ')/T (ozd09)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_09').val(), 2) + ')/T (ozd09d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_10').val()) + ')/T (ozd10)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_10').val(), 2) + ')/T (ozd10d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_11').val()) + ')/T (ozd11)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_11').val(), 2) + ')/T (ozd11d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_12').val()) + ')/T (ozd12)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_12').val(), 2) + ')/T (ozd12d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_13').val()) + ')/T (ozd13)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_13').val(), 2) + ')/T (ozd13d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_14').val()) + ')/T (ozd14)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_14').val(), 2) + ')/T (ozd14d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_15').val()) + ')/T (ozd15)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_15').val(), 2) + ')/T (ozd15d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_16').val()) + ')/T (ozd16)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_16').val(), 2) + ')/T (ozd16d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_17').val()) + ')/T (ozd17)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_17').val(), 2) + ')/T (ozd17d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_18').val()) + ')/T (ozd18)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_18').val(), 2) + ')/T (ozd18d)>>');

	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_19').val()) + ')/T (ozd191)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_19').val(), 2) + ')/T (ozd191d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_20').val()) + ')/T (ozd201)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_20').val(), 2) + ')/T (ozd201d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_21').val()) + ')/T (ozd211)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_21').val(), 2) + ')/T (ozd211d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_22').val()) + ')/T (ozd221)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_22').val(), 2) + ')/T (ozd221d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_23').val()) + ')/T (ozd231)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_23').val(), 2) + ')/T (ozd231d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S1_24').val()) + ')/T (ozd241)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S1_24').val(), 2) + ')/T (ozd241d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_22').val()) + ')/T (ozd222)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_22').val(), 2) + ')/T (ozd222d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_23').val()) + ')/T (ozd232)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_23').val(), 2) + ')/T (ozd232d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2S2_24').val()) + ')/T (ozd242)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2S2_24').val(), 2) + ')/T (ozd242d)>>');

	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_25').val()) + ')/T (ozd25)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_25').val(), 2) + ')/T (ozd25d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_27').val()) + ')/T (ozd27)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_27').val(), 2) + ')/T (ozd27d)>>');
	stringBuilder.appendLine('    << /V (' + celacast($('#tbPr2_28').val()) + ')/T (ozd28)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr2_28').val(), 2) + ')/T (ozd28d)>>');



    // Priloha 3
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3S1').val()) + ')/T (szp01-1)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3S1').val(), 2) + ')/T (szp01-1d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3S2').val()) + ')/T (szp01-2)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3S2').val(), 2) + ')/T (szp01-2d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_02').val()) + ')/T (szp02)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_02').val(), 2) + ')/T (szp02d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_03').val()) + ')/T (szp03)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_03').val(), 2) + ')/T (szp03d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_04').val()) + ')/T (szp04)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_04').val(), 2) + ')/T (szp04d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_05').val()) + ')/T (szp05)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_05').val(), 2) + ')/T (szp05d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_06').val()) + ')/T (szp06)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_06').val(), 2) + ')/T (szp06d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_07').val()) + ')/T (szp07)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_07').val(), 2) + ')/T (szp07d)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_08').val()) + ')/T (szp08)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_08').val(), 2) + ')/T (szp08d)>>');

    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_09').val()) + ')/T (szp09)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_09').val(), 2) + ')/T (szp09d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_10').val()) + ')/T (szp10)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_10').val(), 2) + ')/T (szp10d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_11').val()) + ')/T (szp11)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_11').val(), 2) + ')/T (szp11d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_12').val()) + ')/T (szp12)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_12').val(), 2) + ')/T (szp12d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_13').val()) + ')/T (szp13)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_13').val(), 2) + ')/T (szp13d)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_14').val()) + ')/T (szp14)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_14').val(), 2) + ')/T (szp14d)>>');
    stringBuilder.appendLine('    << /V (' + ($('#chPriPrijmoch').is(':checked') ? 'X' : '') + ')/T (szppu)>>');
    stringBuilder.appendLine('    << /V (' + celacast($('#tbPr3_15').val()) + ')/T (szp15)>>');
    stringBuilder.appendLine('    << /V (' + desatinnacast($('#tbPr3_15').val(), 2) + ')/T (szp15d)>>');


    if (!!$('#dtpDatumSoc').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSoc').val().split(".")[0]) + ')/T (szpdatum1)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (szpdatum1)>>');
    }
    if (!!$('#dtpDatumSoc').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSoc').val().split(".")[1]) + ')/T (szpdatum2)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (szpdatum2)>>');
    }
    if (!!$('#dtpDatumSoc').val()) {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#dtpDatumSoc').val().split(".")[2].substr(2, 2)) + ')/T (szpdatum3)>>');
    } else {
        stringBuilder.appendLine('    << /V ()/T (szpdatum3)>>');
    }

    stringBuilder.appendLine(' ]');
    stringBuilder.appendLine(' /F (form.451.DPFOB-19-print-save.pdf)');
    stringBuilder.appendLine(' /ID [ <f09672f5777c7363de522b1b240fe891><e243d0a3dc18e99c15162168ae4276d6>]');
    stringBuilder.appendLine(' >>');
    stringBuilder.appendLine('>>');
    stringBuilder.appendLine('endobj');
    stringBuilder.appendLine('trailer');
    stringBuilder.appendLine('<< /Root 1 0 R >>');
    stringBuilder.appendLine('%%EOF');
    return stringBuilder.string();
}

function createpotvrdenie() {
    isFdfUpper = false;
    stringBuilder = new $.StringBuilder();
    stringBuilder.appendLine('%FDF-1.2');
    stringBuilder.appendLine('%âăĎÓ');
    stringBuilder.appendLine('1 0 obj');
    stringBuilder.appendLine('<< /FDF');
    stringBuilder.appendLine('<< /Fields');
    stringBuilder.appendLine('[');
    stringBuilder.appendLine('    << /V(' + prepisznakyFdf('Tlačivo vytlačené z Portálu FS') + ')/T (print)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbRok').val()) + ')/T (rok)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPriezvisko4').val()) + ')/T (Priezvisko)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbMeno5').val()) + ')/T (Meno)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#cmbDic1').val()) + ')/T (DIC)>>');

    if ($('#tbUlica7').val() != '' || $('#tbCisloDomu8').val() != '' || $('#tbPSC9').val() != '' || $('#tbObec10').val() != '' || $('#tbStat11').val() != '') {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica7').val() + ' ' + $('#tbCisloDomu8').val()) + ')/T (Ulica)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC9').val()) + ')/T (PSC)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec10').val()) + ')/T (Obec)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbStat11').val()) + ')/T (Stat)>>');
    }
    else {
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlica14').val() + ' ' + $('#tbCisloDomu15').val()) + ')/T (Ulica)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSC16').val()) + ')/T (PSC)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObec17').val()) + ')/T (Obec)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf('SK') + ')/T (Stat)>>');
    }

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t68').val()) + ')/T (r68)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t80').val()) + ')/T (r80)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf((Number($('#tbPr2_07').val())+Number($('#tbPr2_25').val())).toString()) + ')/T (r07)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t105').val()) + ')/T (r105)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t125').val()) + ')/T (r125)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#t126').val()) + ')/T (r126)>>');
    stringBuilder.appendLine(' ]');
    stringBuilder.appendLine(' /F (form.451.DPFOB-19-potvrdenie-print-save.pdf)');
    stringBuilder.appendLine(' /ID [ <b310ccfdb26d1b632b562cd598a3cb97><50178e60984b848bcecd3e9e265bf14a>]');
    stringBuilder.appendLine(' >>');
    stringBuilder.appendLine('>>');
    stringBuilder.appendLine('endobj');
    stringBuilder.appendLine('trailer');
    stringBuilder.appendLine('<< /Root 1 0 R >>');
    stringBuilder.appendLine('%%EOF');
    return stringBuilder.string();
}

function createopakovaneNfdf(davka, zaciatoksekcii, koniecsekcii, pocetsekciinastranu, pocetmaxstran) {
    isFdfUpper = true;
    stringBuilder = new $.StringBuilder();
    stringBuilder.appendLine('%FDF-1.2');
    stringBuilder.appendLine('%âăĎÓ');
    stringBuilder.appendLine('1 0 obj');
    stringBuilder.appendLine('<< /FDF');
    stringBuilder.appendLine('  << /Fields');
    stringBuilder.appendLine('    [');
    stringBuilder.appendLine('    << /V(' + prepisznakyFdf('Tlačivo vytlačené z Portálu FS', false) + ')/T (print)>>');

    var lr = $("[id^='layoutRow27435_']");
    var pocetFdfStran = lr.length + 1;
    var boolJePlne = false;

    if (pocetFdfStran == 1 && davka == 1) {
        var pomSekciaNaKOntrolu = $("[id='layoutRow27435_Repeating_1']");
        var arrayPoli = new Array();

        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r1DatumOd']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r1DatumDo']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r1Vyska']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r1Odp']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r2DatumOd']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r2DatumDo']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r2Vyska']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r2Odp']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r3DatumOd']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r3DatumDo']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r3Vyska']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r3Odp']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r4DatumOd']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r4DatumDo']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r4Vyska']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r4Odp']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r5DatumOd']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r5DatumDo']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r5Vyska']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r5Odp']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r6']").val());
        arrayPoli.push(pomSekciaNaKOntrolu.find("[id^='Pri1r6']").val());

        for (var uh = 0; uh < arrayPoli.length; uh++) {
            if (arrayPoli[uh] != "") {
                boolJePlne = true;
                break;
            }
        }
    }
    else {
        boolJePlne = true;
    }
    stringBuilder.appendLine('      << /V (' + $("#cmbDic1").val() + ')/T (dic)>> ');

    if (boolJePlne) {
        stringBuilder.appendLine('      << /V (' + pocetFdfStran + ')/T (PocetProjektov)>> ');
    }
    else {
        stringBuilder.appendLine('      << /V ()/T (PocetProjektov)>> ');
    }

    stringBuilder.appendLine('      << /V (1)/T (akt)>>');
    stringBuilder.appendLine('      << /V (' + ((koniecsekcii - zaciatoksekcii) + 1) + ')/T (pocet)>>');

    for (var h = zaciatoksekcii; h <= koniecsekcii; h++) {
        stringBuilder.appendLine('      << /T (' + (h - zaciatoksekcii + 1) + ')/Kids');
        stringBuilder.appendLine('        [');

        var lrAkt = lr.eq(h - 1);

        if (boolJePlne) {
            stringBuilder.appendLine('      << /V (' + lrAkt.find("[id^='ProjektCislo']").val() + ')/T (ProjektCislo)>>');
        }
        else {
            stringBuilder.appendLine('      << /V ()/T (ProjektCislo)>>');
        }

        var datumVal = lrAkt.find("[id^='DatumProjektu']");
        vratFDFDatum(datumVal, "da", "db", "dc", stringBuilder);

        var datumVal = lrAkt.find("[id^='Pri1r1DatumOd']");
        vratFDFDatum(datumVal, "t11a", "t11b", "t11c", stringBuilder);
        var datumVal = lrAkt.find("[id^='Pri1r1DatumDo']");
        vratFDFDatum(datumVal, "t11d", "t11e", "t11f", stringBuilder);
        var pole1 = lrAkt.find("[id^='Pri1r1Vyska']").val();
        var pole2 = lrAkt.find("[id^='Pri1r1Odp']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t21)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t21d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (t31)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (t31d)>> ');

        var datumVal = lrAkt.find("[id^='Pri1r2DatumOd']");
        vratFDFDatum(datumVal, "t12a", "t12b", "t12c", stringBuilder);
        var datumVal = lrAkt.find("[id^='Pri1r2DatumDo']");
        vratFDFDatum(datumVal, "t12d", "t12e", "t12f", stringBuilder);
        var pole1 = lrAkt.find("[id^='Pri1r2Vyska']").val();
        var pole2 = lrAkt.find("[id^='Pri1r2Odp']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t22)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t22d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (t32)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (t32d)>> ');

        var datumVal = lrAkt.find("[id^='Pri1r3DatumOd']");
        vratFDFDatum(datumVal, "t13a", "t13b", "t13c", stringBuilder);
        var datumVal = lrAkt.find("[id^='Pri1r3DatumDo']");
        vratFDFDatum(datumVal, "t13d", "t13e", "t13f", stringBuilder);
        var pole1 = lrAkt.find("[id^='Pri1r3Vyska']").val();
        var pole2 = lrAkt.find("[id^='Pri1r3Odp']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t23)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t23d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (t33)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (t33d)>> ');

        var datumVal = lrAkt.find("[id^='Pri1r4DatumOd']");
        vratFDFDatum(datumVal, "t14a", "t14b", "t14c", stringBuilder);
        var datumVal = lrAkt.find("[id^='Pri1r4DatumDo']");
        vratFDFDatum(datumVal, "t14d", "t14e", "t14f", stringBuilder);
        var pole1 = lrAkt.find("[id^='Pri1r4Vyska']").val();
        var pole2 = lrAkt.find("[id^='Pri1r4Odp']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t24)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t24d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (t34)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (t34d)>> ');

        var datumVal = lrAkt.find("[id^='Pri1r5DatumOd']");
        vratFDFDatum(datumVal, "t15a", "t15b", "t15c", stringBuilder);
        var datumVal = lrAkt.find("[id^='Pri1r5DatumDo']");
        vratFDFDatum(datumVal, "t15d", "t15e", "t15f", stringBuilder);
        var pole1 = lrAkt.find("[id^='Pri1r5Vyska']").val();
        var pole2 = lrAkt.find("[id^='Pri1r5Odp']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t25)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t25d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole2) + ')/T (t35)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole2) + ')/T (t35d)>> ');

        var pole1 = lrAkt.find("[id^='Pri1r6']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole1) + ')/T (t36)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole1) + ')/T (t36d)>> ');

        stringBuilder.appendLine('      << /V (' + prepisznakyFdf(lrAkt.find("[id^='CieleProjektu']").val()) + ')/T (ciele)>> ');

        var pole7 = lrAkt.find("[id^='Pri1r7']").val();
        var pole8 = lrAkt.find("[id^='Pri1r8']").val();
        var pole9 = lrAkt.find("[id^='Pri1r9']").val();
        stringBuilder.appendLine('      << /V (' + celacast(pole7) + ')/T (t37)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole7) + ')/T (t37d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole8) + ')/T (t38)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole8) + ')/T (t38d)>> ');
        stringBuilder.appendLine('      << /V (' + celacast(pole9) + ')/T (t39)>> ');
        stringBuilder.appendLine('      << /V (' + desatinnacast(pole9) + ')/T (t39d)>> ');
        stringBuilder.appendLine('        ]>>');
    }

    stringBuilder.appendLine('    ]');
    stringBuilder.appendLine('    /F (form.451.DPFOB-19-priloha10-print-save.pdf)');
    stringBuilder.appendLine('    /ID [ <ddc3355b1fd2420733ea3739a242e02a><25cb8633995744a5a35366d96be3d877>]');
    stringBuilder.appendLine('  >> ');
    stringBuilder.appendLine('>> ');
    stringBuilder.appendLine('endobj');
    stringBuilder.appendLine('trailer');
    stringBuilder.appendLine('<< /Root 1 0 R >>');
    stringBuilder.appendLine('%%EOF');
    var sdfs = stringBuilder.string();
    return stringBuilder.string();
}

function vratFDFDatum(pole, d1, d2, d3, sB) {
    var textFDF = "";
    var datumVal = pole.val();

    if (!!datumVal) {
        sB.appendLine('    << /V (' + prepisznakyFdf(datumVal.split(".")[0]) + ')/T (' + d1 + ')>>');
    }
    else {
        sB.appendLine('    << /V ()/T (' + d1 + ')>>');
    }
    if (!!datumVal) {
        sB.appendLine('    << /V (' + prepisznakyFdf(datumVal.split(".")[1]) + ')/T (' + d2 + ')>>');
    }
    else {
        sB.appendLine('    << /V ()/T (' + d2 + ')>>');
    }
    if (!!datumVal) {
        sB.appendLine('    << /V (' + prepisznakyFdf(datumVal.split(".")[2].substr(2, 2)) + ')/T (' + d3 + ')>>');
    }
    else {
        sB.appendLine('    << /V ()/T (' + d3 + ')>>');
    }
}

function removeSections(layoutrowid) {
    var poma = $("div[id^='" + layoutrowid + "']").length - 1
    if (poma > 1) {
        for (var pomb = poma; pomb > 3; pomb--) {
            var sender = layoutrowid;
            var removeButton = $('div[id^=' + sender + ']').last().find('#removeSection' + sender);
            removeSection(1, removeButton);
        }
    }
}

function emptyProject(layoutRow) {
    var allInputs = $(layoutRow).find(':input');
    var isEmptyProject = true;

    allInputs.each(function () {
        if (this.name != 'ProjektCislo' && this.name != 'PocetProjektov')
            if (this.value != '') {
                isEmptyProject = false;

                return false;
            }

    });

    return isEmptyProject;
}