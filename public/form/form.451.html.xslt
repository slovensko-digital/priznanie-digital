<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="xhtml" xpath-default-namespace="http://www.w3.org/1999/xhtml" indent="yes" omit-xml-declaration="yes"/>
<xsl:template match="/">
<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</xsl:text>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title>DPFOBv19 - Daňové priznanie k dani z príjmov fyzickej osoby (typ B) za zdaňovacie obdobie 2019 (platné od 1.1.2020)</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="language" content="sk-SK" />
<style type="text/css">
body { 
	font-family: 'Open Sans', 'Segoe UI', 'Trebuchet MS', 'Geneva CE', lucida, sans-serif;
	background-color:transparent;
	color: #646464;
}
.ui-tabs {
	padding: .2em;
	position: relative;
	zoom: 1;
}
.ui-widget-content {
	background: #f9f9f9;
	border: 2px solid #d4d4d4;
	color: #3e3e3e;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	-ms-border-radius: 5px;
	-o-border-radius: 5px;
	border-radius: 5px
}
.ui-widget-header {					 
	font-weight: 400;	
	border: 1px solid #5f5247;
	background-color: #5f5247;
	color: #fff;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	-ms-border-radius: 5px;
	-o-border-radius: 5px;
	border-radius: 5px
}								
.clear { clear: both; }
.layoutMain {
	margin: 0px auto;
	padding: 5px 5px 5px 5px;	
}				
.layoutRow { margin-bottom: 5px; }				
.caption { /*width: 100%; border-bottom: solid 1px black;*/ }
.nocaption > .caption { border: 0px !important; }
.nocaption > .caption span {
	background: none !important;
	display: none;
} 
.caption .title { padding-left: 5px; }
.headercorrection {	
	margin: 0px;
}				
.labelVis {
	float: left;
	font-weight: bold;
	font-family: 'Open Sans', 'Segoe UI', 'Trebuchet MS', 'Geneva CE', lucida, sans-serif;
	line-height: 25px;
	margin: 0px 18px 0px 0px;
	padding: 0;
	width: 190px;
}
.contentVis {    	     
	float: left;	
	line-height: 25px;
	margin: 0px;
	padding: 0px;
	vertical-align: top;			
}
.wordwrap { 
   white-space: pre-wrap;      
   white-space: -moz-pre-wrap; 
   white-space: -pre-wrap;     
   white-space: -o-pre-wrap;   
   word-wrap: break-word;      
}				
</style>
</head>
<body>
<div id="main" class="layoutMain">
<xsl:for-each select="/DPFOB2017">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">DPFOB2017</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Nazov/text()"><div><label class="labelVis">DPFOB_Nazov: </label><span class="contentVis wordwrap"><xsl:value-of select="./DPFOB_Nazov"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_DruhSuhrVykazu">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Druh daňového priznania </div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_DruhSuhrVykazu/druh_priznania/text()"><div><label class="labelVis">druh_priznania: </label><span class="contentVis wordwrap"><xsl:value-of select="./druh_priznania"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_DIC">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">DIC</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_DIC/cmbDic1/text()"><div><label class="labelVis">DIČ: </label><span class="contentVis wordwrap"><xsl:value-of select="./cmbDic1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_DIC/dtpDatumNarodenia2/text()"><div><label class="labelVis">02 - Dátum narodenia: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./dtpDatumNarodenia2" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_zaRok">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Za Rok</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_zaRok/cmbRok/text()"><div><label class="labelVis">Rok: </label><span class="contentVis wordwrap"><xsl:value-of select="./cmbRok"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_zaRok/dtpDatumDDP/text()"><div><label class="labelVis">Dátum zistenia skutočnosti na podanie dodatočného daňového priznania: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./dtpDatumDDP" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_NACE">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">NACE</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_NACE/cmbSKNACE3/text()"><div><label class="labelVis">03 - SK NACE - Hlavná, prevažná činnosť: </label><span class="contentVis wordwrap"><xsl:value-of select="./cmbSKNACE3"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_NACE/txaHlavnaPrevaznaCinnost/text()"><div><label class="labelVis">Hlavná, prevažná činnosť: </label><span class="contentVis wordwrap"><xsl:value-of select="./txaHlavnaPrevaznaCinnost"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">I. ODDIEL - ÚDAJE O DAŇOVNÍKOVI</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Priezvisko, meno, titul</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul/Odd1_Meno">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Meno</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul/Odd1_Meno/tbPriezvisko4/text()"><div><label class="labelVis">04 - Priezvisko: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPriezvisko4"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul/Odd1_Meno/tbMeno5/text()"><div><label class="labelVis">05 - Meno: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbMeno5"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul/Odd1_Meno/tbTitul6/text()"><div><label class="labelVis">06 - Titul pred menom: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbTitul6"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_PriezviskoMenoTitul/Odd1_Meno/tbTitul62/text()"><div><label class="labelVis">06 - Titul za priezviskom: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbTitul62"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Adresa trvalého pobytu v deň podania daňového priznania na území Slovenskej republiky alebo v zahraničí</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Ulica7Cislo8">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">adresa1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Ulica7Cislo8/tbUlica7/text()"><div><label class="labelVis">07 - Ulica: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbUlica7"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Ulica7Cislo8/tbCisloDomu8/text()"><div><label class="labelVis">08 - Súpisné/orientačné číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbCisloDomu8"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Obec10Stat11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">adresa2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Obec10Stat11/tbPSC9/text()"><div><label class="labelVis">09 - PSČ: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPSC9"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Obec10Stat11/tbObec10/text()"><div><label class="labelVis">10 - Obec: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbObec10"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaTrvaly/Odd1_Obec10Stat11/tbStat11/text()"><div><label class="labelVis">11 - Štát: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbStat11"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_Obmedzenie12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12 - Daňovník s obmedzenou daňovou povinnosťou (nerezident)</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_Obmedzenie12/cbNerezident/text()"><div><label class="labelVis">áno: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbNerezident"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_Prepojenie13">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">13 - Ekonomické, personálne alebo iné prepojenie</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_Prepojenie13/cbPrepojenie/text()"><div><label class="labelVis">áno: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPrepojenie"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Adresa bydliska alebo adresa pobytu na území Slovenskej republiky, kde sa daňovník zdržiaval v zdaňovacom období 4)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_Ulica14Cislo15">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">adresa1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_Ulica14Cislo15/tbUlica14/text()"><div><label class="labelVis">14 - Ulica: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbUlica14"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_Ulica14Cislo15/tbCisloDomu15/text()"><div><label class="labelVis">15 - Súpisné/orientačné číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbCisloDomu15"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_PSC16Obec17">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">adresa2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_PSC16Obec17/tbPSC16/text()"><div><label class="labelVis">16 - PSČ: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPSC16"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_1oddiel/Odd1_AdresaPobyt/Odd1_PSC16Obec17/tbObec17/text()"><div><label class="labelVis">17 - Obec: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbObec17"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">II. ODDIEL - ÚDAJE O ZÁKONNOM ZÁSTUPCOVI ALEBO DEDIČOVI ALEBO ZÁSTUPCOVI ALEBO SPRÁVCOVI V KONKURZNOM KONANÍ, KTORÝ PODÁVA DAŇOVÉ PRIZNANIE (ďalej len &quot;zástupca&quot;)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Sekcia vrchna zakonny zastupca</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaMeno">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Zákonný zástupca - meno 18 - 20</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaMeno/tbPriezvisko18/text()"><div><label class="labelVis">18 - Priezvisko: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPriezvisko18"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaMeno/tbMeno19/text()"><div><label class="labelVis">19 - Meno: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbMeno19"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaMeno/tbTitulPred20/text()"><div><label class="labelVis">Titul pred menom: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbTitulPred20"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaMeno/tbTitulZa20/text()"><div><label class="labelVis">Titul za menom: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbTitulZa20"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Zákonný zástupca - 21 - 26</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">ZZ adresa 21-23</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr1/t21_1RC/text()"><div><label class="labelVis">21 - Rodné číslo - prvá časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./t21_1RC"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr1/t21_2RC/text()"><div><label class="labelVis">21 - Rodné číslo - druhá časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./t21_2RC"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr1/tbUlica22/text()"><div><label class="labelVis">22 - Ulica: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbUlica22"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr1/tbCislo23/text()"><div><label class="labelVis">23 - Súpisné/orientačné číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbCislo23"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">ZZ adresa 24 - 26</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr2/tbPSC24/text()"><div><label class="labelVis">24 - PSČ: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPSC24"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr2/tbObec25/text()"><div><label class="labelVis">25 - Obec: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbObec25"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZakonnyZastupca/Odd2_ZakonnyZastupcaAdresa/Odd2_ZakonnyZastupcaAdr2/tbStat26/text()"><div><label class="labelVis">26 - Štát: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbStat26"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_lblZastupcaKU/text()"><div><label class="labelVis">Odd2_lblZastupcaKU: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd2_lblZastupcaKU"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_2oddiel/Odd2_ZastupcaKU">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Telefon, Email</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZastupcaKU/tbTelCislo27/text()"><div><label class="labelVis">27 - Telefónne číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbTelCislo27"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_2oddiel/Odd2_ZastupcaKU/tbEmail28/text()"><div><label class="labelVis">28 - Emailová adresa: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbEmail28"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">III. ODDIEL - ÚDAJE NA UPLATNENIE ZNÍŽENIA ZÁKLADU DANE (§ 11 zákona) A DAŇOVÉHO BONUSU (§ 33 zákona)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeDochodku">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Údaje o poberaní dôchodkov uvedených v § 11 ods. 6 zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeDochodku/Odd3_UdajeDochodku29">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">29</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeDochodku/Odd3_UdajeDochodku29/cbr29/text()"><div><label class="labelVis">áno: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbr29"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeDochodku/Odd3_UdajeDochodku_suma30">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">30</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeDochodku/Odd3_UdajeDochodku_suma30/t30/text()"><div><label class="labelVis">riadok 30: </label><span class="contentVis wordwrap"><xsl:value-of select="./t30"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Údaje o manželke (manželovi), ktorá (ý) žije s daňovníkom v domácnosti7) na uplatnenie nezdaniteľných častí základu dane</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/SecRiadok31">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 31</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/SecRiadok31/r31_1/text()"><div><label class="labelVis">Priezvisko a meno: </label><span class="contentVis wordwrap"><xsl:value-of select="./r31_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/SecRiadok31/Odd3_UdajeManzelky_rodneCislo">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Rodné číslo</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/SecRiadok31/Odd3_UdajeManzelky_rodneCislo/r31_2a/text()"><div><label class="labelVis">Rodné číslo 1.časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./r31_2a"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/SecRiadok31/Odd3_UdajeManzelky_rodneCislo/r31_2b/text()"><div><label class="labelVis">Rodné číslo 2.časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./r31_2b"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok32">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 32</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok32/r32_1/text()"><div><label class="labelVis">uplatňujem nezdaniteľnú časť základu dane na manželku (manžela)&#160;&#160; &#160;&#160;&#160; &#160;podľa § 11 ods. 3 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./r32_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok32/r32_2/text()"><div><label class="labelVis">Vlastné príjmy: </label><span class="contentVis wordwrap"><xsl:value-of select="./r32_2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok32/r32_3/text()"><div><label class="labelVis">32 - Počet mesiacov: </label><span class="contentVis wordwrap"><xsl:value-of select="./r32_3"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok33">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 33</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok33/r33_1/text()"><div><label class="labelVis">uplatňujem nezdaniteľnú časť základu dane na kúpeľnú starostlivosť za manželku&#160;&#160; &#160;&#160;&#160; &#160;(manžela) podľa § 11 ods. 14 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./r33_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd3_UdajeManzelky/secRiadok33/r33_2/text()"><div><label class="labelVis">Preukázateľne zaplatené úhrady (najviac 50 eur): </label><span class="contentVis wordwrap"><xsl:value-of select="./r33_2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Údaje o vyživovaných deťoch žijúcich s daňovníkom v domácnosti na uplatnenie nezdaniteľnej časti základu dane na kúpeľnú starostlivosť  (§ 11 ods. 14 zákona) a daňového zvýhodnenia na vyživované dieťa podľa § 33 zákona (ďalej len &quot;daňový bonus podľa § 33 zákona&quot;)9)</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/secDeti/text()"><div><label class="labelVis">secDeti: </label><span class="contentVis wordwrap"><xsl:value-of select="./secDeti"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 34</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/r34Priezvisko_1/text()"><div><label class="labelVis">Priezvisko a meno: </label><span class="contentVis wordwrap"><xsl:value-of select="./r34Priezvisko_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/r34RodCislo_2a/text()"><div><label class="labelVis">Rodné číslo 1. časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./r34RodCislo_2a"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/r34RodCislo_2b/text()"><div><label class="labelVis">Rodné číslo 2. časť: </label><span class="contentVis wordwrap"><xsl:value-of select="./r34RodCislo_2b"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/r34Ks/text()"><div><label class="labelVis">KS: </label><span class="contentVis wordwrap"><xsl:value-of select="./r34Ks"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM00_1/text()"><div><label class="labelVis">1-12: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM00_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM01_1/text()"><div><label class="labelVis">1: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM01_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM02_1/text()"><div><label class="labelVis">2: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM02_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM03_1/text()"><div><label class="labelVis">3: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM03_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM04_1/text()"><div><label class="labelVis">4: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM04_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM05_1/text()"><div><label class="labelVis">5: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM05_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM06_1/text()"><div><label class="labelVis">6: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM06_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM07_1/text()"><div><label class="labelVis">7: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM07_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM08_1/text()"><div><label class="labelVis">8: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM08_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM09_1/text()"><div><label class="labelVis">9: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM09_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM10_1/text()"><div><label class="labelVis">10: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM10_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM11_1/text()"><div><label class="labelVis">11: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM11_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/Odd4_VyzivovaneDeti/cbM12_1/text()"><div><label class="labelVis">12: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbM12_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/sec_riadok35">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 35</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/sec_riadok35/r35/text()"><div><label class="labelVis">Údaje o ďalších vyživovaných deťoch uvádzam v XIII. oddiele v členení podľa r. 34: </label><span class="contentVis wordwrap"><xsl:value-of select="./r35"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/sec_riadok36">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 36</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_3oddiel/Odd4_lblVyzivovaneDeti/sec_riadok36/r36/text()"><div><label class="labelVis">Preukázateľne zaplatené úhrady na kúpelnú starostlivosť za vyživované dieťa (deti) v úhrne najviac do výšky 50 eur za rok za každé z týchto detí: </label><span class="contentVis wordwrap"><xsl:value-of select="./r36"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_4oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">IV. ODDIEL - ÚDAJE NA UPLATNENIE DAŇOVÉHO BONUSU  NA ZAPLATENÉ ÚROKY (§ 33a zákona)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_4oddiel/secRiadok37">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 37</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_4oddiel/secRiadok37/r37_1/text()"><div><label class="labelVis">uplatňujem daňový bonus na zaplatené úroky&#160;&#160; &#160;&#160;&#160; &#160;podľa  § 33a zákona 10): </label><span class="contentVis wordwrap"><xsl:value-of select="./r37_1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_4oddiel/secRiadok37/r37_2/text()"><div><label class="labelVis">37 - Zaplatené úroky: </label><span class="contentVis wordwrap"><xsl:value-of select="./r37_2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_4oddiel/secRiadok37/r37_3/text()"><div><label class="labelVis">37- Počet mesiacov: </label><span class="contentVis wordwrap"><xsl:value-of select="./r37_3"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">V. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV ZO ZÁVISLEJ ČINNOSTI (§ 5 zákona) - v eurách</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel/secRiadok38">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 38</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_5oddiel/secRiadok38/r38/text()"><div><label class="labelVis">riadok 38: </label><span class="contentVis wordwrap"><xsl:value-of select="./r38"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel/Odd5_ZToho">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">z toho</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel/Odd5_ZToho/secRiadok38a">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 38a</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_5oddiel/Odd5_ZToho/secRiadok38a/r38a/text()"><div><label class="labelVis">riadok 38a: </label><span class="contentVis wordwrap"><xsl:value-of select="./r38a"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel/secRiadok39">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 39</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_5oddiel/secRiadok39/r39/text()"><div><label class="labelVis">riadok 39: </label><span class="contentVis wordwrap"><xsl:value-of select="./r39"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_5oddiel/SecRiadok40">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 40</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_5oddiel/SecRiadok40/r40/text()"><div><label class="labelVis">riadok 40: </label><span class="contentVis wordwrap"><xsl:value-of select="./r40"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">VI. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z PRÍJMOV Z PODNIKANIA, Z INEJ SAMOSTATNEJ ZÁROBKOVEJ ČINNOSTI, Z PRENÁJMU A Z POUŽITIA DIELA A UMELECKÉHO VÝKONU (§ 6 zákona) - v eurách</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Tabuľka č. 1 - prehľad príjmov a výdavkov podľa § 6 zákona (vypĺňa len ak daňovník účtuje v sústave jednoduchého účtovníctva alebo uplatňuje výdavky percentom z príjmov, alebo vedie evidenciu podľa § 6 ods. 11 zákona)</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_R/text()"><div><label class="labelVis">Odd6_Tab1_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd6_Tab1_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1. z poľnohospodárskej výroby, lesného a vodného hospodárstva</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_1/t1R1S1/text()"><div><label class="labelVis">riadok 1 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R1S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_1/t1R1S2/text()"><div><label class="labelVis">riadok 1 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R1S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2. zo živnosti</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_2/t1R2S1/text()"><div><label class="labelVis">riadok 2 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R2S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_2/t1R2S2/text()"><div><label class="labelVis">riadok 2 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R2S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">3. z podnikania vykonávaného podľa osobitných predpisov</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_3/t1R3S1/text()"><div><label class="labelVis">riadok 3 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R3S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_3/t1R3S2/text()"><div><label class="labelVis">riadok 3 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R3S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_4">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">4. spoločníkov v. o. s. a komplementárov kom. spol.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_4/t1R4S1/text()"><div><label class="labelVis">riadok 4 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R4S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_4/t1R4S2/text()"><div><label class="labelVis">riadok 4 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R4S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_5">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">5. z vytvorenia diela a umeleckého výkonu a z použitia alebo poskytnutia práv z priemyselného alebo iného duševného vlastníctva</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_5/t1R5S1/text()"><div><label class="labelVis">riadok 5 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R5S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_5/t1R5S2/text()"><div><label class="labelVis">riadok 5 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R5S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_6">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">6. z činností, ktoré nie sú živnosťou ani podnikaním</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_6/t1R6S1/text()"><div><label class="labelVis">riadok 6 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R6S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_6/t1R6S2/text()"><div><label class="labelVis">riadok 6 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R6S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_7">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">7. znalcov a tlmočníkov za činnosť podľa osobitného predpisu</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_7/t1R7S1/text()"><div><label class="labelVis">riadok 7 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R7S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_7/t1R7S2/text()"><div><label class="labelVis">riadok 7 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R7S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_8">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">8.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_8/t1R8S1/text()"><div><label class="labelVis">riadok 8 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R8S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_8/t1R8S2/text()"><div><label class="labelVis">riadok 8 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R8S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_9">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">9.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_9/t1R9S1/text()"><div><label class="labelVis">riadok 9 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R9S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_9/t1R9S2/text()"><div><label class="labelVis">riadok 9 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R9S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">10.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_10/t1R10S1/text()"><div><label class="labelVis">riadok 10 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R10S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_10/t1R10S2/text()"><div><label class="labelVis">riadok 10 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R10S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">11.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_11/t1R11S1/text()"><div><label class="labelVis">riadok 11 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R11S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_11/t1R11S2/text()"><div><label class="labelVis">riadok 11 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R11S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_12/t1R12S1/text()"><div><label class="labelVis">riadok 12 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R12S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_12/t1R12S2/text()"><div><label class="labelVis">riadok 12 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R12S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_13">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">13.</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_13/t1R13S1/text()"><div><label class="labelVis">riadok 13 (tabuľka 1/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R13S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_Tab1_13/t1R13S2/text()"><div><label class="labelVis">riadok 13 (tabuľka 1/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1R13S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Uplatňujem preukázateľné výdavky z daňovej evidencie podľa § 6 ods. 11 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak11/cbPriPrijmoch11Ods6Zak1a2/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 1 a 2 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch11Ods6Zak1a2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak11/cbPriPrijmoch11Ods6Zak3/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 3 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch11Ods6Zak3"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak11/cbPriPrijmoch11Ods6Zak4/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 4 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch11Ods6Zak4"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Uplatňujem výdavky percentom z príjmov podľa § 6 ods. 10 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak10/cbPriPrijmoch10Ods6Zak1a2/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 1 a 2 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch10Ods6Zak1a2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_ods6zak10/cbPriPrijmoch10Ods6Zak4/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 4 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch10Ods6Zak4"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_PreukazatelneOds6Zak1a2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Preukázateľne zaplatené poistné z príjmov podľa § 6 ods. 1 a 2 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_PreukazatelneOds6Zak1a2/tbPrekazatenePoistne/text()"><div><label class="labelVis">Preukázateľne zaplatené poistné z príjmov: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPrekazatenePoistne"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_UplatnenieOds17Zak17">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Uplatňujem osobitný spôsob zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_UplatnenieOds17Zak17/cbPriPrijmoch17Ods6Zak1a2/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 1 a 2 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch17Ods6Zak1a2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Odd6_UplatnenieOds17Zak17/cbPriPrijmoch17Ods6Zak3a4/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 3 a 4 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbPriPrijmoch17Ods6Zak3a4"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Sek_uplatnu1717_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Ukončujem uplatňovanie osobitného spôsobu zahrnovania kurzových rozdielov do základu dane podľa § 17 ods. 17 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Sek_uplatnu1717_2/cbUkoncPriPrijmoch17Ods6Zak1a2/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 1 a 2 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbUkoncPriPrijmoch17Ods6Zak1a2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1/Sek_uplatnu1717_2/cbUkoncPriPrijmoch17Ods6Zak3a4/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 3 a 4 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbUkoncPriPrijmoch17Ods6Zak3a4"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Tabuľka č. 1a - Údaje daňovníka s príjmami z podnikania, z inej samostatnej zárobkovej činnosti, z prenájmu a z použitia diela a umeleckého výkonu z daňovej evidencie podľa § 6 ods. 11 zákona a daňovníka s príjmami z prenájmu a z použitia diela a umeleckého výkonu z účtovníctva podľa § 6 ods. 13 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_R/text()"><div><label class="labelVis">Odd6_Tab1a_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd6_Tab1a_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_1/t1aR1S1/text()"><div><label class="labelVis">riadok 1 (tabuľka 1a/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR1S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_1/t1aR1S2/text()"><div><label class="labelVis">riadok 1 (tabuľka 1a/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR1S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_2/t1aR2S1/text()"><div><label class="labelVis">riadok 2 (tabuľka 1a/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR2S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_2/t1aR2S2/text()"><div><label class="labelVis">riadok 2 (tabuľka 1a/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR2S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">3</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_3/t1aR3S1/text()"><div><label class="labelVis">riadok 3 (tabuľka 1a/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR3S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_3/t1aR3S2/text()"><div><label class="labelVis">riadok 3 (tabuľka 1a/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR3S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_4">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">4</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_4/t1aR4S1/text()"><div><label class="labelVis">riadok 4 (tabuľka 1a/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR4S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_4/t1aR4S2/text()"><div><label class="labelVis">riadok 4 (tabuľka 1a/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR4S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_5">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">5</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_5/t1aR5S1/text()"><div><label class="labelVis">riadok 5 (tabuľka 1a/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR5S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1a/Odd6_Tab1a_5/t1aR5S2/text()"><div><label class="labelVis">riadok 5 (tabuľka 1a/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1aR5S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Tabuľka č. 1b - Údaje daňovníka s príjmami z podnikania, z inej samostatnej zárobkovej činnosti, z použitia diela a umeleckého výkonu z evidencie, ktorú vedie podľa § 6 ods. 10 zákona, ak uplatňuje výdavky percentom z príjmov</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_R/text()"><div><label class="labelVis">Odd6_Tab1b_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd6_Tab1b_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_1/t1bR1S1/text()"><div><label class="labelVis">riadok 1 (tabuľka 1b/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1bR1S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_1/t1bR1S2/text()"><div><label class="labelVis">riadok 1 (tabuľka 1b/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1bR1S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_2/t1bR2S1/text()"><div><label class="labelVis">riadok 2 (tabuľka 1b/začiatok z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1bR2S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Tab1b/Odd6_Tab1b_2/t1bR2S2/text()"><div><label class="labelVis">riadok 2 (tabuľka 1b/koniec z.o.): </label><span class="contentVis wordwrap"><xsl:value-of select="./t1bR2S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Commenty/text()"><div><label class="labelVis">Odd6_Commenty: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd6_Commenty"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrijmyTb1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 41</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrijmyTb1/t41/text()"><div><label class="labelVis">riadok 41: </label><span class="contentVis wordwrap"><xsl:value-of select="./t41"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_VydavkyTb1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 42</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_VydavkyTb1/t42/text()"><div><label class="labelVis">riadok 42: </label><span class="contentVis wordwrap"><xsl:value-of select="./t42"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_ZiskZD">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 43</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_ZiskZD/t43/text()"><div><label class="labelVis">riadok 43: </label><span class="contentVis wordwrap"><xsl:value-of select="./t43"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_Strata">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 44</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_Strata/t44/text()"><div><label class="labelVis">riadok 44: </label><span class="contentVis wordwrap"><xsl:value-of select="./t44"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_ZvysenieZD">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 45</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_ZvysenieZD/t45/text()"><div><label class="labelVis">riadok 45: </label><span class="contentVis wordwrap"><xsl:value-of select="./t45"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_ZnizenieZD">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 46</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_ZnizenieZD/t46/text()"><div><label class="labelVis">riadok 46: </label><span class="contentVis wordwrap"><xsl:value-of select="./t46"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_ZakladDane">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 47</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_ZakladDane/t47/text()"><div><label class="labelVis">riadok 47: </label><span class="contentVis wordwrap"><xsl:value-of select="./t47"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_DanovaStrata">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 48</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_DanovaStrata/t48/text()"><div><label class="labelVis">riadok 48: </label><span class="contentVis wordwrap"><xsl:value-of select="./t48"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Prehľad o vzniku daňových strát podľa § 30 zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Straty 30 zakon - 49-52</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_StratyPredchZdanObdPopis/text()"><div><label class="labelVis">Odd6_StratyPredchZdanObdPopis: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd6_StratyPredchZdanObdPopis"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_49">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 49</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_49/tbR49rok/text()"><div><label class="labelVis">riadok 49 rok: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR49rok"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_49/tbR49strata/text()"><div><label class="labelVis">riadok 49 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR49strata"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_50">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 50</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_50/tbR50rok/text()"><div><label class="labelVis">riadok 50 rok: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR50rok"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_50/tbR50strata/text()"><div><label class="labelVis">riadok 50 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR50strata"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_51">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 51</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_51/tbR51rok/text()"><div><label class="labelVis">riadok 51 rok: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR51rok"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_51/tbR51strata/text()"><div><label class="labelVis">riadok 51 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR51strata"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_52">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 52</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_52/tbR52rok/text()"><div><label class="labelVis">riadok 52 rok: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR52rok"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_StratyPredchZdanObdobia/Odd6_52/tbR52strata/text()"><div><label class="labelVis">riadok 52 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbR52strata"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_53">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 53</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_53/t53/text()"><div><label class="labelVis">riadok 53 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./t53"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_54">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 54</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_PrehladDanStrat/Odd6_54/t54/text()"><div><label class="labelVis">riadok 54 strata: </label><span class="contentVis wordwrap"><xsl:value-of select="./t54"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatnenieStraty">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Uplatnenie daňovej straty z predch&#225;dzaj&#250;cich zdaňovac&#237;ch obdob&#237;</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatnenieStraty/Odd6_55">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 55</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatnenieStraty/Odd6_55/t55/text()"><div><label class="labelVis">riadok 55: </label><span class="contentVis wordwrap"><xsl:value-of select="./t55"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatenieVydavkov">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Uplatnenie odpočtu výdavkov (nákladov) na výskum a vývoj podľa § 30c zákona (vypĺňa sa aj príloha č. 1)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatenieVydavkov/Odd6_56">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 56</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatenieVydavkov/Odd6_56/t56/text()"><div><label class="labelVis">riadok 56: </label><span class="contentVis wordwrap"><xsl:value-of select="./t56"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatenieVydavkov/Odd6_57">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok57</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_UplatenieVydavkov/Odd6_57/t57/text()"><div><label class="labelVis">riadok 57: </label><span class="contentVis wordwrap"><xsl:value-of select="./t57"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_58">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 58</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_58/t58/text()"><div><label class="labelVis">riadok 58: </label><span class="contentVis wordwrap"><xsl:value-of select="./t58"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_59">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 59</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_59/t59/text()"><div><label class="labelVis">riadok 59: </label><span class="contentVis wordwrap"><xsl:value-of select="./t59"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_60">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 60</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_60/t60/text()"><div><label class="labelVis">riadok 60: </label><span class="contentVis wordwrap"><xsl:value-of select="./t60"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_61">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 61</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_61/t61/text()"><div><label class="labelVis">riadok 61: </label><span class="contentVis wordwrap"><xsl:value-of select="./t61"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_62">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 62</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_62/t62/text()"><div><label class="labelVis">riadok 62: </label><span class="contentVis wordwrap"><xsl:value-of select="./t62"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_63">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 63</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_63/t63/text()"><div><label class="labelVis">riadok 63: </label><span class="contentVis wordwrap"><xsl:value-of select="./t63"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_64">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 64</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_64/t64/text()"><div><label class="labelVis">riadok 64: </label><span class="contentVis wordwrap"><xsl:value-of select="./t64"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_6oddiel/Odd6_65">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 65</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_6oddiel/Odd6_65/t65/text()"><div><label class="labelVis">riadok 65: </label><span class="contentVis wordwrap"><xsl:value-of select="./t65"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">VII. ODDIEL - VÝPOČET OSOBITNÉHO ZÁKLADU DANE Z PRÍJMOV Z KAPITÁLOVÉHO MAJETKU (§ 7 zákona) - v eurách</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Tabuľka č. 2 - prehľad príjmov a výdavkov podľa § 7 zákona15)</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_R/text()"><div><label class="labelVis">Odd7_Tab2_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd7_Tab2_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_1/t2R1S1/text()"><div><label class="labelVis">riadok 1 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R1S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_1/t2R1S2/text()"><div><label class="labelVis">riadok 1 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R1S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_2/t2R2S1/text()"><div><label class="labelVis">riadok 2 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R2S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_2/t2R2S2/text()"><div><label class="labelVis">riadok 2 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R2S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">3</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_3/t2R3S1/text()"><div><label class="labelVis">riadok 3 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R3S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_3/t2R3S2/text()"><div><label class="labelVis">riadok 3 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R3S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_4">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">4</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_4/t2R4S1/text()"><div><label class="labelVis">riadok 4 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R4S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_4/t2R4S2/text()"><div><label class="labelVis">riadok 4 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R4S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_5">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">5</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_5/t2R5S1/text()"><div><label class="labelVis">riadok 5 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R5S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_5/t2R5S2/text()"><div><label class="labelVis">riadok 5 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R5S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_6">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">6</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_6/t2R6S1/text()"><div><label class="labelVis">riadok 6 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R6S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_6/t2R6S2/text()"><div><label class="labelVis">riadok 6 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R6S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_7">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">7</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_7/t2R7S1/text()"><div><label class="labelVis">riadok 7 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R7S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_7/t2R7S2/text()"><div><label class="labelVis">riadok 7 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R7S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_8">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">8</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_8/t2R8S1/text()"><div><label class="labelVis">riadok 8 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R8S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_8/t2R8S2/text()"><div><label class="labelVis">riadok 8 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R8S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_9">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">9</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_9/t2R9S1/text()"><div><label class="labelVis">riadok 9 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R9S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_9/t2R9S2/text()"><div><label class="labelVis">riadok 9 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R9S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">10</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_10/t2R10S1/text()"><div><label class="labelVis">riadok 10 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R10S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_10/t2R10S2/text()"><div><label class="labelVis">riadok 10 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R10S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">11</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_11/t2R11S1/text()"><div><label class="labelVis">riadok 11 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R11S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_11/t2R11S2/text()"><div><label class="labelVis">riadok 11 (tabuľka 2/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R11S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_Tab2/Odd7_Tab2_12/t2R12S1/text()"><div><label class="labelVis">riadok 12 (tabuľka 2/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t2R12S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_66">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 66</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_66/t66/text()"><div><label class="labelVis">riadok 66: </label><span class="contentVis wordwrap"><xsl:value-of select="./t66"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_67">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 67</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_67/t67/text()"><div><label class="labelVis">riadok 67: </label><span class="contentVis wordwrap"><xsl:value-of select="./t67"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_7oddiel/Odd7_68">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 68</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_7oddiel/Odd7_68/t68/text()"><div><label class="labelVis">riadok 68: </label><span class="contentVis wordwrap"><xsl:value-of select="./t68"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">VIII. ODDIEL - VÝPOČET ZÁKLADU DANE (čiastkového základu dane) Z OSTATNÝCH PRÍJMOV (§ 8 zákona) - v eurách</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Tabuľka č. 3 - prehľad príjmov podľa § 8 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab1a_R/text()"><div><label class="labelVis">Odd8_Tab1a_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd8_Tab1a_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_1/t3R1S1/text()"><div><label class="labelVis">riadok 1 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R1S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_1/t3R1S2/text()"><div><label class="labelVis">riadok 1 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R1S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_2/t3R2S1/text()"><div><label class="labelVis">riadok 2 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R2S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_2/t3R2S2/text()"><div><label class="labelVis">riadok 2 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R2S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">3</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_3/t3R3S1/text()"><div><label class="labelVis">riadok 3 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R3S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_3/t3R3S2/text()"><div><label class="labelVis">riadok 3 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R3S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_4">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">4</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_4/t3R4S1/text()"><div><label class="labelVis">riadok 4 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R4S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_4/t3R4S2/text()"><div><label class="labelVis">riadok 4 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R4S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_5">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">5</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_5/t3R5S1/text()"><div><label class="labelVis">riadok 5 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R5S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_5/t3R5S2/text()"><div><label class="labelVis">riadok 5 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R5S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_6">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">6</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_6/t3R6S1/text()"><div><label class="labelVis">riadok 6 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R6S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_6/t3R6S2/text()"><div><label class="labelVis">riadok 6 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R6S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_7">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">7</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_7/t3R7S1/text()"><div><label class="labelVis">riadok 7 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R7S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_7/t3R7S2/text()"><div><label class="labelVis">riadok 7 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R7S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_8">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">8</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_8/t3R8S1/text()"><div><label class="labelVis">riadok 8 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R8S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_8/t3R8S2/text()"><div><label class="labelVis">riadok 8 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R8S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_9">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">9</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_9/t3R9S1/text()"><div><label class="labelVis">riadok 9 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R9S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_9/t3R9S2/text()"><div><label class="labelVis">riadok 9 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R9S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">10</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_10/t3R10S1/text()"><div><label class="labelVis">riadok 10 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R10S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_10/t3R10S2/text()"><div><label class="labelVis">riadok 10 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R10S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">11</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_11/t3R11S1/text()"><div><label class="labelVis">riadok 11 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R11S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_11/t3R11S2/text()"><div><label class="labelVis">riadok 11 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R11S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_12/t3R12S1/text()"><div><label class="labelVis">riadok 12 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R12S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_12/t3R12S2/text()"><div><label class="labelVis">riadok 12 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R12S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_13">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">13</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_13/t3R13S1/text()"><div><label class="labelVis">riadok 13 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R13S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_13/t3R13S2/text()"><div><label class="labelVis">riadok 13 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R13S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_14">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">14</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_14/t3R14S1/text()"><div><label class="labelVis">riadok 14 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R14S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_14/t3R14S2/text()"><div><label class="labelVis">riadok 14 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R14S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_15">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">15</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_15/t3R15S1/text()"><div><label class="labelVis">riadok 15 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R15S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_15/t3R15S2/text()"><div><label class="labelVis">riadok 15 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R15S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_16">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">16</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_16/t3R16S1/text()"><div><label class="labelVis">riadok 16 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R16S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_16/t3R16S2/text()"><div><label class="labelVis">riadok 16 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R16S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_17">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">17</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_17/t3R17S1/text()"><div><label class="labelVis">riadok 17 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R17S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_17/t3R17S2/text()"><div><label class="labelVis">riadok 17 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R17S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_18">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">18</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_18/t3R18S1/text()"><div><label class="labelVis">riadok 18 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R18S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_19">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">19</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_19/t3R19S1/text()"><div><label class="labelVis">riadok 19 (tabuľka 3/príjmy): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R19S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_Tab3/Odd8_Tab3_19/t3R19S2/text()"><div><label class="labelVis">riadok 19 (tabuľka 3/výdavky): </label><span class="contentVis wordwrap"><xsl:value-of select="./t3R19S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_69">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 69</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_69/t69/text()"><div><label class="labelVis">riadok 69: </label><span class="contentVis wordwrap"><xsl:value-of select="./t69"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_70">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 70</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_70/t70/text()"><div><label class="labelVis">riadok70: </label><span class="contentVis wordwrap"><xsl:value-of select="./t70"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_8oddiel/Odd8_71">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 71</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_8oddiel/Odd8_71/t71/text()"><div><label class="labelVis">riadok 71: </label><span class="contentVis wordwrap"><xsl:value-of select="./t71"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">IX. ODDIEL - VÝPOČET DANE podľa § 15 zákona - v eurách</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Zníženie základu dane o nezdaniteľné časti podľa § 11 zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_72">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">72 Zníženie základu dane o nezdaniteľné časti podľa § 11 zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_72/t72/text()"><div><label class="labelVis">riadok 72: </label><span class="contentVis wordwrap"><xsl:value-of select="./t72"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_73">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">73</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_73/t73/text()"><div><label class="labelVis">riadok 73: </label><span class="contentVis wordwrap"><xsl:value-of select="./t73"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_74">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">74</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_74/t74/text()"><div><label class="labelVis">riadok 74: </label><span class="contentVis wordwrap"><xsl:value-of select="./t74"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_75">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">75</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_75/t75/text()"><div><label class="labelVis">riadok 75: </label><span class="contentVis wordwrap"><xsl:value-of select="./t75"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_76">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 76</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_76/t76/text()"><div><label class="labelVis">riadok 76: </label><span class="contentVis wordwrap"><xsl:value-of select="./t76"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/secRiadky_76_76a_76b">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadky 76a, 76b</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/secRiadky_76_76a_76b/Odd9_76a">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 76a</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/secRiadky_76_76a_76b/Odd9_76a/t76a/text()"><div><label class="labelVis">riadok 76a: </label><span class="contentVis wordwrap"><xsl:value-of select="./t76a"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/secRiadky_76_76a_76b/Odd9_76b">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 76b</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/secRiadky_76_76a_76b/Odd9_76b/t76b/text()"><div><label class="labelVis">riadok 76b: </label><span class="contentVis wordwrap"><xsl:value-of select="./t76b"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_77">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 77</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_ZnizenieZakladu/Odd9_77/t77/text()"><div><label class="labelVis">riadok 77: </label><span class="contentVis wordwrap"><xsl:value-of select="./t77"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_78">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 78</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_78/t78/text()"><div><label class="labelVis">riadok 78: </label><span class="contentVis wordwrap"><xsl:value-of select="./t78"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_79">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 79</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_79/t79/text()"><div><label class="labelVis">riadok 79: </label><span class="contentVis wordwrap"><xsl:value-of select="./t79"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_80">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 80</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_80/t80/text()"><div><label class="labelVis">riadok 80: </label><span class="contentVis wordwrap"><xsl:value-of select="./t80"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_81">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 81</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_81/t81/text()"><div><label class="labelVis">riadok 81: </label><span class="contentVis wordwrap"><xsl:value-of select="./t81"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Zahr">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane zo základu dane zisteného podľa § 4 zákona po vyňatí príjmov zo zdrojov v zahraničí</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Zahr/Odd9_82">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 82</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Zahr/Odd9_82/t82/text()"><div><label class="labelVis">riadok 82: </label><span class="contentVis wordwrap"><xsl:value-of select="./t82"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Zahr/Odd9_83">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 83</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Zahr/Odd9_83/t83/text()"><div><label class="labelVis">riadok 83: </label><span class="contentVis wordwrap"><xsl:value-of select="./t83"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_84">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 84</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_84/t84/text()"><div><label class="labelVis">riadok 84: </label><span class="contentVis wordwrap"><xsl:value-of select="./t84"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane zo základu dane zisteného podľa § 4 zákona uznanej na zápočet na tuzemskú daňovú povinnosť zo zaplatenej dane v zahraničí podľa zmluvy o zamedzení dvojitého zdanenia (§ 45 ods. 1 zákona)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_85">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 85</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_85/t85/text()"><div><label class="labelVis">riadok 85: </label><span class="contentVis wordwrap"><xsl:value-of select="./t85"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_86">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 86</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_86/t86/text()"><div><label class="labelVis">riadok 86: </label><span class="contentVis wordwrap"><xsl:value-of select="./t86"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_87">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 87</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_87/t87/text()"><div><label class="labelVis">riadok 87: </label><span class="contentVis wordwrap"><xsl:value-of select="./t87"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_88">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 88</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_88/t88/text()"><div><label class="labelVis">riadok 88: </label><span class="contentVis wordwrap"><xsl:value-of select="./t88"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_89">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 89</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane4Tuzem/Odd9_89/t89/text()"><div><label class="labelVis">riadok 89: </label><span class="contentVis wordwrap"><xsl:value-of select="./t89"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_90">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 90</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_90/t90/text()"><div><label class="labelVis">riadok 90: </label><span class="contentVis wordwrap"><xsl:value-of select="./t90"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_91">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 91</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_91/t91/text()"><div><label class="labelVis">riadok 91: </label><span class="contentVis wordwrap"><xsl:value-of select="./t91"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Zahr">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane z osobitného základu dane podľa § 7 zákona po vyňatí príjmov zo zdrojov v zahraničí</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Zahr/Odd9_92">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 92</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Zahr/Odd9_92/t92/text()"><div><label class="labelVis">riadok 92: </label><span class="contentVis wordwrap"><xsl:value-of select="./t92"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Zahr/Odd9_93">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 93</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Zahr/Odd9_93/t93/text()"><div><label class="labelVis">riadok 93: </label><span class="contentVis wordwrap"><xsl:value-of select="./t93"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_94">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 94</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_94/t94/text()"><div><label class="labelVis">riadok 94: </label><span class="contentVis wordwrap"><xsl:value-of select="./t94"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane z osobitného základu dane podľa § 7 zákona uznanej na zápočet na tuzemskú daňovú povinnosť zo zaplatenej dane v zahraničí podľa zmluvy o zamedzení dvojitého zdanenia (§ 45 ods. 1 zákona)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_95">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 95</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_95/t95/text()"><div><label class="labelVis">riadok 95: </label><span class="contentVis wordwrap"><xsl:value-of select="./t95"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_96">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 96</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_96/t96/text()"><div><label class="labelVis">riadok 96: </label><span class="contentVis wordwrap"><xsl:value-of select="./t96"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_97">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 97</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_97/t97/text()"><div><label class="labelVis">riadok 97: </label><span class="contentVis wordwrap"><xsl:value-of select="./t97"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_98">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 98</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_98/t98/text()"><div><label class="labelVis">riadok 98: </label><span class="contentVis wordwrap"><xsl:value-of select="./t98"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_99">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 99</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_VypocetDane7Tuzem/Odd9_99/t99/text()"><div><label class="labelVis">riadok 99: </label><span class="contentVis wordwrap"><xsl:value-of select="./t99"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_100">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 100</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_100/t100/text()"><div><label class="labelVis">riadok 100: </label><span class="contentVis wordwrap"><xsl:value-of select="./t100"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane uznanej na zápočet podľa Smernice Rady č. 2003/48/ES z 3. 6.2003 (ďalej len „smernica“) podľa § 45 ods. 4 zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_101">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 101</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_101/t101/text()"><div><label class="labelVis">riadok 101: </label><span class="contentVis wordwrap"><xsl:value-of select="./t101"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_102">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 102</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_102/t102/text()"><div><label class="labelVis">riadok 102: </label><span class="contentVis wordwrap"><xsl:value-of select="./t102"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_103">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 103</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_DanePodlaSmernice/Odd9_103/t103/text()"><div><label class="labelVis">riadok 103: </label><span class="contentVis wordwrap"><xsl:value-of select="./t103"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_104">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 104</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_104/t104/text()"><div><label class="labelVis">riadok 104: </label><span class="contentVis wordwrap"><xsl:value-of select="./t104"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_105">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 105</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_105/t105/text()"><div><label class="labelVis">riadok 105: </label><span class="contentVis wordwrap"><xsl:value-of select="./t105"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_106">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 106</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_106/t106/text()"><div><label class="labelVis">riadok 106: </label><span class="contentVis wordwrap"><xsl:value-of select="./t106"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_107">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 107</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_107/t107/text()"><div><label class="labelVis">riadok 107: </label><span class="contentVis wordwrap"><xsl:value-of select="./t107"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_108">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 108</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_108/t108/text()"><div><label class="labelVis">riadok 108: </label><span class="contentVis wordwrap"><xsl:value-of select="./t108"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_109">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 109</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_109/t109/text()"><div><label class="labelVis">riadok 109: </label><span class="contentVis wordwrap"><xsl:value-of select="./t109"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_110">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 110</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_110/t110/text()"><div><label class="labelVis">riadok 110: </label><span class="contentVis wordwrap"><xsl:value-of select="./t110"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_111">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 111</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_111/t111/text()"><div><label class="labelVis">riadok 111: </label><span class="contentVis wordwrap"><xsl:value-of select="./t111"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_112">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 112</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_112/t112/text()"><div><label class="labelVis">riadok 112: </label><span class="contentVis wordwrap"><xsl:value-of select="./t112"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_113">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 113</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_113/t113/text()"><div><label class="labelVis">riadok 113: </label><span class="contentVis wordwrap"><xsl:value-of select="./t113"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_114">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 114</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_114/t114/text()"><div><label class="labelVis">riadok 114: </label><span class="contentVis wordwrap"><xsl:value-of select="./t114"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_115">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 115</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_115/t115/text()"><div><label class="labelVis">riadok 115: </label><span class="contentVis wordwrap"><xsl:value-of select="./t115"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_116">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 116</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_116/t116/text()"><div><label class="labelVis">riadok 116: </label><span class="contentVis wordwrap"><xsl:value-of select="./t116"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_117">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 117</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_117/t117/text()"><div><label class="labelVis">riadok 117: </label><span class="contentVis wordwrap"><xsl:value-of select="./t117"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_118">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 118</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_118/t118/text()"><div><label class="labelVis">riadok 118: </label><span class="contentVis wordwrap"><xsl:value-of select="./t118"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_119">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 119</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_119/t119/text()"><div><label class="labelVis">riadok 119: </label><span class="contentVis wordwrap"><xsl:value-of select="./t119"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_PreddavokNaDan">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Zrazený preddavok na daň</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_PreddavokNaDan/Odd9_120">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 120</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_PreddavokNaDan/Odd9_120/t120/text()"><div><label class="labelVis">riadok 120: </label><span class="contentVis wordwrap"><xsl:value-of select="./t120"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_PreddavokNaDan/Odd9_121">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 121</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_PreddavokNaDan/Odd9_121/t121/text()"><div><label class="labelVis">riadok 121: </label><span class="contentVis wordwrap"><xsl:value-of select="./t121"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_122">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 122</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_122/t122/text()"><div><label class="labelVis">riadok 122: </label><span class="contentVis wordwrap"><xsl:value-of select="./t122"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_123">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 123</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_123/t123/text()"><div><label class="labelVis">riadok 123: </label><span class="contentVis wordwrap"><xsl:value-of select="./t123"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_124">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 124</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_124/t124/text()"><div><label class="labelVis">riadok 124: </label><span class="contentVis wordwrap"><xsl:value-of select="./t124"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_125">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 125</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_125/t125/text()"><div><label class="labelVis">riadok 125: </label><span class="contentVis wordwrap"><xsl:value-of select="./t125"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_9oddiel/Odd9_126">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 126</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_9oddiel/Odd9_126/t126/text()"><div><label class="labelVis">riadok 126: </label><span class="contentVis wordwrap"><xsl:value-of select="./t126"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">X. ODDIEL - ROZDIELY Z DODATOČN&#201;HO DAŇOV&#201;HO PRIZNANIA - v eur&#225;ch</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_127">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 127</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_127/t127/text()"><div><label class="labelVis">riadok 127: </label><span class="contentVis wordwrap"><xsl:value-of select="./t127"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_128">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 128</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_128/t128/text()"><div><label class="labelVis">riadok 128: </label><span class="contentVis wordwrap"><xsl:value-of select="./t128"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_129">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 129</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_129/t129/text()"><div><label class="labelVis">riadok 129: </label><span class="contentVis wordwrap"><xsl:value-of select="./t129"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_130">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 130</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_130/t130/text()"><div><label class="labelVis">riadok 130: </label><span class="contentVis wordwrap"><xsl:value-of select="./t130"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_131">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 131</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_131/t131/text()"><div><label class="labelVis">riadok 131: </label><span class="contentVis wordwrap"><xsl:value-of select="./t131"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_132">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 132</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_132/t132/text()"><div><label class="labelVis">riadok 132: </label><span class="contentVis wordwrap"><xsl:value-of select="./t132"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_133">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 133</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_133/t133/text()"><div><label class="labelVis">riadok 133: </label><span class="contentVis wordwrap"><xsl:value-of select="./t133"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_10oddiel/Odd10_134">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 134</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_10oddiel/Odd10_134/t134/text()"><div><label class="labelVis">riadok 134: </label><span class="contentVis wordwrap"><xsl:value-of select="./t134"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">XI. ODDIEL - ÚDAJE O DAŇOVNÍKOVI S OBMEDZENOU DAŇOVOU POVINNOSŤOU (nerezidentovi)</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel/Odd11_135x">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 135</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_135x/t135/text()"><div><label class="labelVis">riadok 135: </label><span class="contentVis wordwrap"><xsl:value-of select="./t135"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel/Odd11_136x">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 136</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_136x/t136/text()"><div><label class="labelVis">riadok 136: </label><span class="contentVis wordwrap"><xsl:value-of select="./t136"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel/Odd11_137">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok 137</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_137/t137/text()"><div><label class="labelVis">riadok 137: </label><span class="contentVis wordwrap"><xsl:value-of select="./t137"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel/Odd11_138">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Riadok138</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_138/t138/text()"><div><label class="labelVis">riadok 138: </label><span class="contentVis wordwrap"><xsl:value-of select="./t138"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_11oddiel/Odd11_139">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">139-140</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_139/t139/text()"><div><label class="labelVis">áno: </label><span class="contentVis wordwrap"><xsl:value-of select="./t139"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_11oddiel/Odd11_139/t140/text()"><div><label class="labelVis">riadok 140: </label><span class="contentVis wordwrap"><xsl:value-of select="./t140"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">XII. ODDIEL - VYHLÁSENIE o poukázaní podielu zaplatenej dane z príjmov fyzickej osoby podľa § 50 zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_Neuplatnujem">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Neuplatnujem skryta</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Neuplatnujem/cbNeuplatnujem/text()"><div><label class="labelVis">neuplatňujem postup podľa § 50 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbNeuplatnujem"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Neuplatnujem/cbSplnam3Per/text()"><div><label class="labelVis">spĺňam podmienky na poukázanie 3 % z dane 37): </label><span class="contentVis wordwrap"><xsl:value-of select="./cbSplnam3Per"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Neuplatnujem/tbPodiel141/text()"><div><label class="labelVis">141: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPodiel141"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">142 - ÚDAJE O PRIJÍMATEĽOVI</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi/Odd12_135">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">142 - ÚDAJE O PRIJÍMATEĽOVI</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi/Odd12_135/tbico142/text()"><div><label class="labelVis">142 - IČO: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbico142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi/Odd12_135/PravnaForma142/text()"><div><label class="labelVis">Právna forma: </label><span class="contentVis wordwrap"><xsl:value-of select="./PravnaForma142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi/Odd12_ObchodneMeno">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Obchodné meno</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_UdajeOPrijimatelovi/Odd12_ObchodneMeno/tbObchMeno142/text()"><div><label class="labelVis">Obchodné meno (názov): </label><span class="contentVis wordwrap"><xsl:value-of select="./tbObchMeno142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Sídlo</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_UlicaCislo">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Ulica a číslo</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_UlicaCislo/tbUlica142/text()"><div><label class="labelVis">Ulica: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbUlica142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_UlicaCislo/tbCislo142/text()"><div><label class="labelVis">Súpisné / orientačné číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbCislo142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_PSCObec">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">PSČ a Obec</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_PSCObec/tbPSC142/text()"><div><label class="labelVis">PSČ: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPSC142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/Odd12_Sidlo/Odd12_PSCObec/tbObec142/text()"><div><label class="labelVis">Obec: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbObec142"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_12oddiel/chbSuhlas/text()"><div><label class="labelVis">súhlasím so zaslaním údajov (meno, priezvisko a trvalý  pobyt) mnou určenému prijímateľovi podielu zaplatenej dane uvedenému v r.142 podľa § 50 ods. 8 zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./chbSuhlas"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">XIII. ODDIEL - MIESTO NA OSOBITNÉ ZÁZNAMY DAŇOVNÍKA</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Osobitné záznamy</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/cbUvadza/text()"><div><label class="labelVis">Uvádzam osobitné záznamy: </label><span class="contentVis wordwrap"><xsl:value-of select="./cbUvadza"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Udaje o prijmoch</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_HlavickaTabulky">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">hlavička tabulky</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_HlavickaTabulky/Odd13_HlavickaTabulkyprijem/text()"><div><label class="labelVis">Odd13_HlavickaTabulkyprijem: </label><span class="contentVis wordwrap"><xsl:value-of select="./Odd13_HlavickaTabulkyprijem"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">tabulka</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13kod/text()"><div><label class="labelVis">XIII.odiel-kod štátu: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13kod"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13Par/text()"><div><label class="labelVis">XIII.odiel-§: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13Par"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13Ods/text()"><div><label class="labelVis">XIII.odiel-odsek: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13Ods"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13Pism/text()"><div><label class="labelVis">XIII.odiel-pismeno: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13Pism"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13Prijmy/text()"><div><label class="labelVis">XIII.odiel-príjmy: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13Prijmy"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13Vydavky/text()"><div><label class="labelVis">XIII.odiel-výdavky: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13Vydavky"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/Odd13_tabulka/odd13zToho/text()"><div><label class="labelVis">XIII.odiel-z toho výdavky: </label><span class="contentVis wordwrap"><xsl:value-of select="./odd13zToho"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/secRekreacia">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Príspevok na rekreaciu</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/secRekreacia/chbRekreacia/text()"><div><label class="labelVis">Uplatňujem príspevok na rekreáciu podľa § 19 ods. 2 písm. w) zákona: </label><span class="contentVis wordwrap"><xsl:value-of select="./chbRekreacia"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/Odd13_udaje/secRekreacia/valRekreacia/text()"><div><label class="labelVis">Výška príspevku na rekreáciu: </label><span class="contentVis wordwrap"><xsl:value-of select="./valRekreacia"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_OsobitneZaznamy/taZaznamy/text()"><div><label class="labelVis">Zaznamy: </label><span class="contentVis wordwrap"><xsl:value-of select="./taZaznamy"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_Vyhlasenie">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Vyhlásenie</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_13oddiel/Odd13_Vyhlasenie/Odd13_Prilohy">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Prílohy</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_Vyhlasenie/Odd13_Prilohy/t143/text()"><div><label class="labelVis">riadok 143: </label><span class="contentVis wordwrap"><xsl:value-of select="./t143"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_13oddiel/Odd13_Vyhlasenie/dtpDatumSpravneUplne/text()"><div><label class="labelVis">Dátum: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./dtpDatumSpravneUplne" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_14oddiel">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">XIV. ODDIEL - ŽIADOSŤ O VRÁTENIE DAŇOVÉHO PREPLATKU ALEBO O VYPLATENIE DAŇOVÉHO BONUSU</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_14oddiel/Odd14_Ziadam">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Žiadam</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_Ziadam/cbVyplatit/text()"><div><label class="labelVis">Žiadam o vyplatenie daňového bonusu alebo rozdielu daňového bonusu podľa § 33 zákona (r. 110 alebo rozdiel z r. 132, ak je kladný): </label><span class="contentVis wordwrap"><xsl:value-of select="./cbVyplatit"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_Ziadam/chBonus/text()"><div><label class="labelVis">Žiadam o vyplatenie daňového bonusu na zaplatené úroky alebo rozdielu daňového bonusu na zaplatené úroky podľa § 33a zákona (r. 116 alebo rozdiel z r. 134, ak je kladný): </label><span class="contentVis wordwrap"><xsl:value-of select="./chBonus"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_Ziadam/cbVratenie/text()"><div><label class="labelVis">Žiadam o vrátenie daňového preplatku podľa § 79 zákona č. 563/2009 Z.z. o správe daní (daňový poriadok) a o zmene a doplnení niektorých zákonov v znení neskorších predpisov (z r. 126 alebo rozdiel z r. 130, ak je záporný): </label><span class="contentVis wordwrap"><xsl:value-of select="./cbVratenie"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_Ziadam/sekcia15g1/text()"><div><label class="labelVis">sekcia15g1: </label><span class="contentVis wordwrap"><xsl:value-of select="./sekcia15g1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_14oddiel/Odd14_IBAN">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">IBAN</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_IBAN/tbIBAN/text()"><div><label class="labelVis">IBAN: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbIBAN"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_14oddiel/Odd14_datum">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Dátum</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_14oddiel/Odd14_datum/dtpDatumDB/text()"><div><label class="labelVis">Dátum: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./dtpDatumDB" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">PRÍLOHA č. 1 - Odpočet výdavkov (nákladov) na výskum a vývoj a údaje o projektoch výskumu a vývoja podľa § 30c zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Projekt">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Projekt</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Projekt/ProjektCislo/text()"><div><label class="labelVis">Projekt číslo: </label><span class="contentVis wordwrap"><xsl:value-of select="./ProjektCislo"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Projekt/PocetProjektov/text()"><div><label class="labelVis">Počet projektov: </label><span class="contentVis wordwrap"><xsl:value-of select="./PocetProjektov"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Projekt/DatumProjektu/text()"><div><label class="labelVis">Dátum začiatku realizácie projektu: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./DatumProjektu" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_R/text()"><div><label class="labelVis">Pril1_Tab_R: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pril1_Tab_R"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">1</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_1/Pri1r1DatumOd/text()"><div><label class="labelVis">Príloha 1 - riadok 1, stlpec 1_od: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r1DatumOd" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_1/Pri1r1DatumDo/text()"><div><label class="labelVis">Príloha 1 - riadok 1, stlpec 1_do: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r1DatumDo" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_1/Pri1r1Vyska/text()"><div><label class="labelVis">Príloha 1 - riadok 1, stĺpec 2: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r1Vyska"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_1/Pri1r1Odp/text()"><div><label class="labelVis">Príloha 1 - riadok 1, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r1Odp"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">2</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_2/Pri1r2DatumOd/text()"><div><label class="labelVis">Príloha 1 - riadok 2, stlpec 1_od: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r2DatumOd" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_2/Pri1r2DatumDo/text()"><div><label class="labelVis">Príloha 1 - riadok 2, stlpec 1_do: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r2DatumDo" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_2/Pri1r2Vyska/text()"><div><label class="labelVis">Príloha 1 - riadok 2, stĺpec 2: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r2Vyska"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_2/Pri1r2Odp/text()"><div><label class="labelVis">Príloha 1 - riadok 2, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r2Odp"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">3</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_3/Pri1r3DatumOd/text()"><div><label class="labelVis">Príloha 1 - riadok 3, stlpec 1_od: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r3DatumOd" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_3/Pri1r3DatumDo/text()"><div><label class="labelVis">Príloha 1 - riadok 3, stlpec 1_do: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r3DatumDo" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_3/Pri1r3Vyska/text()"><div><label class="labelVis">Príloha 1 - riadok 3, stĺpec 2: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r3Vyska"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_3/Pri1r3Odp/text()"><div><label class="labelVis">Príloha 1 - riadok 3, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r3Odp"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_4">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">4</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_4/Pri1r4DatumOd/text()"><div><label class="labelVis">Príloha 1 - riadok 4, stlpec 1_od: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r4DatumOd" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_4/Pri1r4DatumDo/text()"><div><label class="labelVis">Príloha 1 - riadok 4, stlpec 1_do: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r4DatumDo" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_4/Pri1r4Vyska/text()"><div><label class="labelVis">Príloha 1 - riadok 4, stĺpec 2: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r4Vyska"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_4/Pri1r4Odp/text()"><div><label class="labelVis">Príloha 1 - riadok 4, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r4Odp"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_5">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">5</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_5/Pri1r5DatumOd/text()"><div><label class="labelVis">Príloha 1 - riadok 5, stlpec 1_od: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r5DatumOd" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_5/Pri1r5DatumDo/text()"><div><label class="labelVis">Príloha 1 - riadok 5, stlpec 1_do: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./Pri1r5DatumDo" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_5/Pri1r5Vyska/text()"><div><label class="labelVis">Príloha 1 - riadok 5, stĺpec 2: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r5Vyska"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_5/Pri1r5Odp/text()"><div><label class="labelVis">Príloha 1 - riadok 5, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r5Odp"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_6">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">6</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_6/Pri1r6/text()"><div><label class="labelVis">Príloha 1 - riadok 6, stĺpec 3: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r6"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/CieleProjektu/text()"><div><label class="labelVis">Ciele projektu, ktoré sú dosiahnuteľné podľa doby jeho realizácie a merateľné po jeho ukončení: </label><span class="contentVis wordwrap"><xsl:value-of select="./CieleProjektu"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_7">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">7</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_7/Pri1r7/text()"><div><label class="labelVis">Príloha 1 - riadok 7: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r7"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_8">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">8</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_8/Pri1r8/text()"><div><label class="labelVis">Príloha 1 - riadok 8: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r8"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_9">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">9</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha1/Pril1_Tab_9/Pri1r9/text()"><div><label class="labelVis">Príloha 1 - riadok 9: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pri1r9"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">PRÍLOHA č. 2 - Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona, ak sú vyplácané od právnickej osoby, ktorá je daňovníkom štátu, s ktorým má Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia a od právnickej osoby, ktorá je daňovníkom štátu, s ktorým nemá Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia, pričom nejde o nezmluvný štát podľa § 2 písm. x) zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab1_Hlavicka/text()"><div><label class="labelVis">Pril2_Tab1_Hlavicka: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pril2_Tab1_Hlavicka"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_01">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">01</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_01/tbPr2S1_01/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 01: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_01"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_02">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">02</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_02/tbPr2S1_02/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 02: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_02"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_03">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">03</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_03/tbPr2S1_03/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 03: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_03"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_04">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">04</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_04/tbPr2S1_04/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 04: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_04"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_04/tbPr2S2_04/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 04: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_04"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_05">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">05</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_05/tbPr2S1_05/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 05: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_05"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_05/tbPr2S2_05/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 05: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_05"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_06">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">06</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_06/tbPr2S1_06/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 06: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_06"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab1/Pril2_Tab_06/tbPr2S2_06/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 06: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_06"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane z osobitného základu dane podľa § 51e zákona podielov na zisku (dividendy) a ostatných príjmov, ktoré sú súčasťou tohto osobitného základu dane, ktoré sú vyplácané od právnickej osoby, ktorá je daňovníkom štátu, s ktorým má Slovenská republika uzavretú zmluvu o zamedzení dvojitého zdanenia</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_07">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">07</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_07/tbPr2_07/text()"><div><label class="labelVis">Príloha 2 - riadok 07: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_07"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_08">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">08</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_08/tbPr2_08/text()"><div><label class="labelVis">Príloha 2 - riadok 08: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_08"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_09">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">09</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_07_09/Pril2_09/tbPr2_09/text()"><div><label class="labelVis">Príloha 2 - riadok 09: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_09"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane po vyňatí podielov na zisku (dividend) a ostatných príjmov zo zdrojov v zahraničí, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">10</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_10/tbPr2_10/text()"><div><label class="labelVis">Príloha 2 - riadok 10: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_10"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">11</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_11/tbPr2_11/text()"><div><label class="labelVis">Príloha 2 - riadok 11: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_11"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_10_12/Pril2_12/tbPr2_12/text()"><div><label class="labelVis">Príloha 2 - riadok 12: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_12"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane uznanej na zápočet na daňovú povinnosť v tuzemsku zo zaplatenej dane v zahraničí z podielov na zisku (dividend) a ostatných príjmov, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_13">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">13</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_13/tbPr2_13/text()"><div><label class="labelVis">Príloha 2 - riadok 13: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_13"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_14">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">14</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_14/tbPr2_14/text()"><div><label class="labelVis">Príloha 2 - riadok 14: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_14"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_15">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">15</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_15/tbPr2_15/text()"><div><label class="labelVis">Príloha 2 - riadok 15: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_15"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_16">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">16</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_16/tbPr2_16/text()"><div><label class="labelVis">Príloha 2 - riadok 16: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_16"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_17">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">17</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_17/tbPr2_17/text()"><div><label class="labelVis">Príloha 2 - riadok 17: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_17"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_18">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">18</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_13_17/Pril2_18/tbPr2_18/text()"><div><label class="labelVis">Príloha 2 - riadok 18: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_18"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Podiely na zisku (dividendy) a ostatné príjmy, ktoré sú súčasťou osobitného základu dane podľa § 51e zákona, ak sú vyplácané od právnickej osoby, ktorá je daňovníkom nezmluvného štátu podľa § 2 písm. x) zákona</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab2_Hlavicka/text()"><div><label class="labelVis">Pril2_Tab2_Hlavicka: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pril2_Tab2_Hlavicka"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_19">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">19</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_19/tbPr2S1_19/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 19: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_19"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_20">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">20</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_20/tbPr2S1_20/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 20: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_20"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_21">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">21</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_21/tbPr2S1_21/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 21: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_21"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_22">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">22</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_22/tbPr2S1_22/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 22: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_22"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_22/tbPr2S2_22/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 22: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_22"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_23">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">23</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_23/tbPr2S1_23/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 23: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_23"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_23/tbPr2S2_23/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 23: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_23"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_24">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">24</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_24/tbPr2S1_24/text()"><div><label class="labelVis">Príloha 2 - Suma príjmu 24: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S1_24"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_Tab2/Pril2_Tab_24/tbPr2S2_24/text()"><div><label class="labelVis">Príloha 2 - Suma výdavku 24: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2S2_24"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Výpočet dane z osobitného základu dane podľa § 51e zákona podielov na zisku (dividendy) a ostatných príjmov, ktoré sú súčasťou tohto osobitného základu dane, ktoré sú vyplácané od právnickej osoby, ktorá je daňovníkom nezmluvného štátu podľa § 2 písm. x) zákona</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_25">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">25</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_25/tbPr2_25/text()"><div><label class="labelVis">Príloha 2 - riadok 25: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_25"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_26">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">26</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_26/tbPr2_26/text()"><div><label class="labelVis">Príloha 2 - riadok 26: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_26"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_27">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">27</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_27/tbPr2_27/text()"><div><label class="labelVis">Príloha 2 - riadok 27: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_27"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_28">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">28</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha2/Pril2_25_27/Pril2_28/tbPr2_28/text()"><div><label class="labelVis">Príloha 2 - riadok 28: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr2_28"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">PRÍLOHA č. 3 - Údaje na účely sociálneho poistenia a zdravotného poistenia</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Na účely sociálneho poistenia a zdravotného poistenia</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_Hlavicka/text()"><div><label class="labelVis">Pril3_Tab_Hlavicka: </label><span class="contentVis wordwrap"><xsl:value-of select="./Pril3_Tab_Hlavicka"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_01">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">01</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_01/tbPr3S1/text()"><div><label class="labelVis">Príloha 3 - príjmy 01: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3S1"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_01/tbPr3S2/text()"><div><label class="labelVis">Príloha 3 - výdavky 01: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3S2"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_02">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">02</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_02/tbPr3_02/text()"><div><label class="labelVis">Príloha 3 - riadok 02: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_02"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_03">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">03</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_03/tbPr3_03/text()"><div><label class="labelVis">Príloha 3 - riadok 03: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_03"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_04">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">04</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_04/tbPr3_04/text()"><div><label class="labelVis">Príloha 3 - riadok 04: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_04"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_05">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">05</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_05/tbPr3_05/text()"><div><label class="labelVis">Príloha 3 - riadok 05: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_05"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_06">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">06</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_06/tbPr3_06/text()"><div><label class="labelVis">Príloha 3 - riadok 06: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_06"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_07">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">07</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Tab/Pril3_Tab_07/tbPr3_07/text()"><div><label class="labelVis">Príloha 3 - riadok 07: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_07"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Na účely sociálneho poistenia a zdravotného poistenia</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_08">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">08</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_08/tbPr3_08/text()"><div><label class="labelVis">Príloha 3 - riadok 08: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_08"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">z toho</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho/Pril3_09">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">09</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho/Pril3_09/tbPr3_09/text()"><div><label class="labelVis">Príloha 3 - riadok 09: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_09"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho/Pril3_10">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">10</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho/Pril3_10/tbPr3_10/text()"><div><label class="labelVis">Príloha 3 - riadok 10: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_10"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_11">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">11</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_11/tbPr3_11/text()"><div><label class="labelVis">Príloha 3 - riadok 11: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_11"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">z toho</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho12/Pril3_12">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">12</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho12/Pril3_12/tbPr3_12/text()"><div><label class="labelVis">Príloha 3 - riadok 12: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_12"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_13">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">13</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_13/tbPr3_13/text()"><div><label class="labelVis">Príloha 3 - riadok 13: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_13"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho14">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">z toho</div>
</div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho14/Pril3_14">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">14</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_SocZdravPoist/Pril3_zToho14/Pril3_14/tbPr3_14/text()"><div><label class="labelVis">Príloha 3 - riadok 14: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_14"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/chPriPrijmoch/text()"><div><label class="labelVis">Pri príjmoch podľa § 6 ods. 1 a 2 zákona vediem podvojné účtovníctvo: </label><span class="contentVis wordwrap"><xsl:value-of select="./chPriPrijmoch"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_15">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">15</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_15/tbPr3_15/text()"><div><label class="labelVis">Príloha 3 - riadok 15: </label><span class="contentVis wordwrap"><xsl:value-of select="./tbPr3_15"/></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
<xsl:for-each select="/DPFOB2017/DPFOB_Priloha3/Pril3_Datum">
<div id="" class="layoutRow ui-tabs ui-widget-content" title="" >
<div class="caption ui-widget-header">
<div class="headercorrection">Dátum</div>
</div>
<xsl:if test="/DPFOB2017/DPFOB_Priloha3/Pril3_Datum/dtpDatumSoc/text()"><div><label class="labelVis">Dátum: </label><span class="contentVis wordwrap"><xsl:call-template name="formatToSkDate"><xsl:with-param name="date" select="./dtpDatumSoc" /></xsl:call-template></span></div><div class="clear"></div></xsl:if>
<div class="clear"></div>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</xsl:for-each>
</div>
</body>
</html>
</xsl:template>
<xsl:template name="formatToSkDate">
<xsl:param name="date" />
<xsl:value-of select="concat(substring($date, 9, 2), '.', substring($date, 6, 2), '.', substring($date, 1, 4))" />
</xsl:template>
</xsl:stylesheet>

