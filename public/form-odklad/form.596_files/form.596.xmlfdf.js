// Pre aliasy
var druhSubjektu = '';

var ident;
var stringBuilder;

function createxmlfinal() {
    stringBuilder = new $.StringBuilder();
    stringBuilder.appendLine('<?xml version="1.0" encoding="UTF-8"?>');
    stringBuilder.appendLine('<dokument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="ozn493_2022.xsd">');

    ident = 1;
    stringBuilder.appendLine(AddSectionIdent('<hlavicka>'));

    ident = 2;
    stringBuilder.append(getElement('dic', true, 'tbDic'));

    stringBuilder.append(getElement('zaRok', true, 'zaRok'));

    stringBuilder.append(GetSKDateElement('datumOd', true, 'dtpZdObdobieOd'));
    stringBuilder.append(GetSKDateElement('datumDo', true, 'dtpZdObdobieDo'));
    stringBuilder.append(getElement('dovodDoplnenia', true, 'cbDovod'));
    stringBuilder.append(GetSKDateElement('datumPovodne', true, 'dtpOznamDovodu'));

    stringBuilder.appendLine(AddSectionIdent('<fyzickaOsoba>'));
    ident = 3;
    stringBuilder.append(getElement('priezvisko', true, 'tbOdd1Priezvisko'));
    stringBuilder.append(getElement('meno', true, 'tbOdd1Meno'));
    stringBuilder.append(getElement('titulPred', true, 'tbOdd1TitulPred'));
    stringBuilder.append(getElement('titulZa', true, 'tbOdd1TitulZa'));
    stringBuilder.appendLine(AddSectionIdent('<rodneCislo>'));
    ident = 4;
    stringBuilder.append(getElement('rcPredLom', true, 'tbRodneCislo'));
    stringBuilder.append(getElement('rcZaLom', true, 'tbRodneCislo_2'));
    ident = 3;
    stringBuilder.appendLine(AddSectionIdent('</rodneCislo>'));
    stringBuilder.append(GetSKDateElement('datumNarodenia', true, 'dtpDatNarodenia'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</fyzickaOsoba>'));

    stringBuilder.appendLine(AddSectionIdent('<pravnickaOsoba>'));
    ident = 3;
    stringBuilder.appendLine(AddSectionIdent('<obchodneMeno>'));
    ident = 4;
    // Potrebne rozdelit na dva riadky max 37 znakov - Nazov06

    obchodneMeno = htmlEncode($('#taOdd1ObchMeno').val());

    if (obchodneMeno.includes('%0A')) {
        const riadky = obchodneMeno.split('%0A'); // Rozdelí text na základe '%0A'
        riadky.forEach(riadok => {
            stringBuilder.appendLine('\t\t\t\t<riadok>' + riadok + '</riadok>');
        });
    } else {
        stringBuilder.appendLine('\t\t\t\t<riadok>' + obchodneMeno + '</riadok>');
    }
    ident = 3;
    stringBuilder.appendLine(AddSectionIdent('</obchodneMeno>'));
    stringBuilder.append(getElement('ico', true, 'ico'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</pravnickaOsoba>'));

    stringBuilder.appendLine(AddSectionIdent('<sidlo>'));
    ident = 3;
    stringBuilder.append(getElement('ulica', true, 'tbTPUlica'));
    stringBuilder.append(getElement('supisneOrientacneCislo', true, 'tdTPCislo'));
    stringBuilder.append(getElement('psc', true, 'tbTPPSC'));
    stringBuilder.append(getElement('obec', true, 'tbTPObec'));
    stringBuilder.append(getElement('stat', true, 'tbTPStat'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</sidlo>'));
    stringBuilder.appendLine(AddSectionIdent('<adresaSr>'));
    ident = 3;
    stringBuilder.append(getElement('ulica', true, 'tbUlicaSK'));
    stringBuilder.append(getElement('supisneOrientacneCislo', true, 'tdCisloSK'));
    stringBuilder.append(getElement('psc', true, 'tbPSCSK'));
    stringBuilder.append(getElement('obec', true, 'tbObecSK'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</adresaSr>'));

    stringBuilder.appendLine(AddSectionIdent('<novaLehota>'));
    ident = 3;
    stringBuilder.append(getElement('predlzenie493a', true, 'cbPismA'));
    stringBuilder.append(getElement('predlzenie493b', true, 'cbPismB'));
    stringBuilder.append(GetSKDateElement('datumLehota', true, 'dtpLehota'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</novaLehota>'));


    stringBuilder.appendLine(AddSectionIdent('<vypracoval>'));
    ident = 3;
    stringBuilder.append(getElement('vypr', true, 'tbOdd3Vypracoval'));
    stringBuilder.append(GetSKDateElement('dna', true, 'tbOdd3Dna'));
    stringBuilder.append(getElement('telefon', true, 'tbOdd3Telefon'));
    ident = 2;
    stringBuilder.appendLine(AddSectionIdent('</vypracoval>'));
    //stringBuilder.append(getElement('podpis', true, 'ch_Vyhlasenie'));
	stringBuilder.append(AddIdent() + '<podpis>1</podpis>\r\n');

    ident = 1;
    stringBuilder.appendLine(AddSectionIdent('</hlavicka>'));

    stringBuilder.appendLine('</dokument>');

    return stringBuilder.string();
}

function GetSKDateElement(xmlId, generateEmptyElement, id) {
    generateEmptyElement = typeof generateEmptyElement !== 'undefined' ? generateEmptyElement : false;
    id = typeof id !== 'undefined' ? id : xmlId;
    var element = $('#' + id);
    var xmlElement = '';

    if (generateEmptyElement)
        xmlElement = AddIdent() + '<' + xmlId + '></' + xmlId + '>\r\n';

    if (element.val() != '')
        xmlElement = AddIdent() + '<' + xmlId + '>' + htmlEncode(element.val()) + '</' + xmlId + '>\r\n';

    return xmlElement;
}

function RemoveEmptySection(xml) {
    lines = xml.split('\r\n');
    var i = 0;

    while (i < lines.length - 1) {
        if (lines[i].substr(1, 1) != '/' && lines[i + 1].substr(1, 1) == '/') {
            if (lines[i].substr(1) == lines[i + 1].substr(2)) {
                lines.splice(i, 2);
                i = -1;
            }
        }

        i++;
    }

    newStringBuilder = new $.StringBuilder();

    for (i = 0; i < lines.length; i++) {
        newStringBuilder.appendLine(lines[i]);
    }

    return newStringBuilder.string();
}

function AddIdent() {
    var xmlIdent = '';

    if (!isNaN(ident)) {
        for (var i = 0; i < ident; i++) {
            xmlIdent += '\t';
        }
    }

    return xmlIdent;
}

function AddSectionIdent(sectionName) {
    return AddIdent() + sectionName;
}

function getTextElement(xmlId, generateEmptyElement, id) {
    var element = $('#' + id);
    var xmlElement = '';

    if (generateEmptyElement)
        xmlElement = AddIdent() + '<' + xmlId + '></' + xmlId + '>\r\n';

    if (element.val() != undefined && element.val() != '')
        xmlElement = AddIdent() + '<' + xmlId + '>' + htmlEncode(element.val()) + '</' + xmlId + '>\r\n';

    return xmlElement;
}

function getComboboxElement(xmlId, generateEmptyElement, id) {
    var cB = document.getElementById(id);
    var xmlElement = '';

    if (generateEmptyElement)
        xmlElement = AddIdent() + '<' + xmlId + '></' + xmlId + '>\r\n';
    //xmlElement = AddIdent() + '<' + xmlId + ' xsi:nil="true"></' + xmlId + '>\r\n';

    if (cB != undefined && cB.value != '')
        xmlElement = AddIdent() + '<' + xmlId + '>' + htmlEncode(cB.value) + '</' + xmlId + '>\r\n';

    return xmlElement;
}

function getRadioButtonElement(xmlId, generateEmptyElement, name) {
    var rB = $('input[name="' + name + '"]');
    var xmlElement = '';

    if (generateEmptyElement)
        xmlElement = AddIdent() + '<' + xmlId + '></' + xmlId + '>\r\n';

    if (rB != undefined) {
        var i = rB.length - 1;

        while (i > 0 && !rB.eq(i).attr("checked")) {
            i--;
        }

        if (rB.eq(i).attr("checked"))
            xmlElement = AddIdent() + '<' + xmlId + '>' + i + '</' + xmlId + '>\r\n';
    }

    return xmlElement;
}

function getCheckboxElement(xmlId, id) {
    var element = $('#' + id);
    var xmlElement = AddIdent() + '<' + xmlId + '>' + (element.attr("checked") ? 1 : 0) + '</' + xmlId + '>\r\n';

    return xmlElement;
}

function getDateElement(xmlId, generateEmptyElement, id) {
    var element = $('#' + id);
    var xmlElement = '';

    if (generateEmptyElement)
        xmlElement = AddIdent() + '<' + xmlId + '></' + xmlId + '>\r\n';

    if (element.val() != '')
        xmlElement = AddIdent() + '<' + xmlId + '>' + htmlEncode(xmlHelper.toXmlDate(element.val())) + '</' + xmlId + '>\r\n';

    return xmlElement;
}

function getElement(xmlId, generateEmptyElement, id) {
    generateEmptyElement = typeof generateEmptyElement !== 'undefined' ? generateEmptyElement : false;
    id = typeof id !== 'undefined' ? id : xmlId;

    var element = $('#' + id);
    var rB = $('input[name="' + id + '"]');

    if (rB.is(':radio')) {
        return getRadioButtonElement(xmlId, generateEmptyElement, id);
    }
    else if (element.is(':checkbox')) {
        return getCheckboxElement(xmlId, id);
    }
    else if (element.hasClass('comboBox')) {
        return getComboboxElement(xmlId, generateEmptyElement, id);
    }
    else if (element.hasClass('date')) {
        return getDateElement(xmlId, generateEmptyElement, id);
    }
    else {
        return getTextElement(xmlId, generateEmptyElement, id);
    }
}


//**************************************************


var xmlDoc;
var txt;

function loadxmlfinal(zxml) {
    txt = zxml;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }

    var dokument_xx = xmlDoc.getElementsByTagName('dokument')[0];
    if (dokument_xx) {

        var hlavicka = dokument_xx.getElementsByTagName('hlavicka')[0];
        if (hlavicka) {

            setElementVal(hlavicka, 'dic', 'tbDic');
            setElementVal(hlavicka, 'zaRok', 'zaRok');
            setElementVal(hlavicka, 'datumOd', 'dtpZdObdobieOd');
            setElementVal(hlavicka, 'datumDo', 'dtpZdObdobieDo');
            setElementVal(hlavicka, 'dovodDoplnenia', 'cbDovod');
            setElementVal(hlavicka, 'datumPovodne', 'dtpOznamDovodu');

            var fyzickaOsoba = hlavicka.getElementsByTagName('fyzickaOsoba')[0];
            if (fyzickaOsoba) {
                setElementVal(fyzickaOsoba, 'priezvisko', 'tbOdd1Priezvisko');
                setElementVal(fyzickaOsoba, 'meno', 'tbOdd1Meno');
                setElementVal(fyzickaOsoba, 'titulPred', 'tbOdd1TitulPred');
                setElementVal(fyzickaOsoba, 'titulZa', 'tbOdd1TitulZa');
                var rodneCislo = hlavicka.getElementsByTagName('rodneCislo')[0];
                if(rodneCislo){
                    setElementVal(rodneCislo, 'rcPredLom', 'tbRodneCislo');
                    setElementVal(rodneCislo, 'rcZaLom', 'tbRodneCislo_2');
                }
                setElementVal(fyzickaOsoba, 'datumNarodenia', 'dtpDatNarodenia');
            }

            var pravnickaOsoba = hlavicka.getElementsByTagName('pravnickaOsoba')[0];
            if (pravnickaOsoba) {

                var obchodneMeno = pravnickaOsoba.getElementsByTagName('obchodneMeno')[0];
                if (obchodneMeno) {
                    var riadok1 = obchodneMeno.getElementsByTagName('riadok')[0];
                    var riadok2 = obchodneMeno.getElementsByTagName('riadok')[1];
                    var riadok3 = obchodneMeno.getElementsByTagName('riadok')[2];
                    var obchodneMenoTextArea = $('#taOdd1ObchMeno');

                    if (obchodneMenoTextArea.length > 0) {
                        if (riadok1) {
                            var riadokVal = getElementsValXml(riadok1);

                            if (riadokVal != '')
                                obchodneMenoTextArea.val(riadokVal);
                        }

                        if (riadok2) {
                            var riadokVal = getElementsValXml(riadok2);

                            if (riadokVal != '')
                                obchodneMenoTextArea.val(obchodneMenoTextArea.val() + '\r\n' + riadokVal);
                        }

                        if (riadok3) {
                            var riadokVal = getElementsValXml(riadok3);

                            if (riadokVal != '')
                                obchodneMenoTextArea.val(obchodneMenoTextArea.val() + '\r\n' + riadokVal);
                        }
                    }
                }
                setElementVal(pravnickaOsoba, 'ico', 'ico');                
            }

            var sidlo = hlavicka.getElementsByTagName('sidlo')[0];
            if (sidlo) {
                setElementVal(sidlo, 'ulica', 'tbTPUlica');
                setElementVal(sidlo, 'supisneOrientacneCislo', 'tdTPCislo');
                setElementVal(sidlo, 'psc', 'tbTPPSC');
                setElementVal(sidlo, 'obec', 'tbTPObec');
                setElementVal(sidlo, 'stat', 'tbTPStat');
            }
            var adresaSR = hlavicka.getElementsByTagName('adresaSr')[0];
            if (adresaSR) {
                setElementVal(adresaSR, 'ulica', 'tbUlicaSK');
                setElementVal(adresaSR, 'supisneOrientacneCislo', 'tdCisloSK');
                setElementVal(adresaSR, 'psc', 'tbPSCSK');
                setElementVal(adresaSR, 'obec', 'tbObecSK');
            }

            var novaLehota = hlavicka.getElementsByTagName('novaLehota')[0];
            if (novaLehota) {
                setElementVal(novaLehota, 'predlzenie493a', 'cbPismA');
                setElementVal(novaLehota, 'predlzenie493b', 'cbPismB');
                setElementVal(novaLehota, 'datumLehota', 'dtpLehota');
            }

            var vypracoval = hlavicka.getElementsByTagName('vypracoval')[0];
            if (vypracoval) {
                setElementVal(vypracoval, 'vypr', 'tbOdd3Vypracoval');
                setElementVal(vypracoval, 'dna', 'tbOdd3Dna');
                setElementVal(vypracoval, 'telefon', 'tbOdd3Telefon');
            }

            //setElementVal(hlavicka, 'podpis', 'ch_Vyhlasenie');
        }

    }
}

function getElementsValXml(element) {
    return element.textContent || element.text || '';
}

function setElementVal(parent, xmlName, elementName) {
    elementName = typeof elementName !== 'undefined' ? elementName : xmlName;

    var element = $('#' + elementName);
    var rB = $('input[name="' + elementName + '"]');
    var xmlElement;

    if (rB && rB.is(':radio')) {
        xmlElement = parent.getElementsByTagName(xmlName)[0];

        if (xmlElement) {
            var rBVal = getElementsValXml(xmlElement);

            if (rBVal == '')
                rB.attr('checked', false).change();
            else
                rB.eq(rBVal).attr('checked', true).change();
        }
    }
    else if (element.is(':checkbox')) {
        xmlElement = parent.getElementsByTagName(xmlName)[0];

        if (xmlElement)
            element.attr('checked', getElementsValXml(xmlElement) == 1 ? true : false).change();
    }
    else if (element.hasClass('comboBox')) {
        xmlElement = parent.getElementsByTagName(xmlName)[0];

        if (xmlElement) {
            element.val(htmlDecode(getElementsValXml(xmlElement))).change();
        }
    }
    else if (element.hasClass('date')) {
        xmlElement = parent.getElementsByTagName(xmlName)[0];

        if (xmlElement)
            element.val(xmlHelper.fromXmlDate(htmlDecode(getElementsValXml(xmlElement)))).change();
    }
    else {
        xmlElement = parent.getElementsByTagName(xmlName)[0];

        if (xmlElement)
            element.val(htmlDecode(getElementsValXml(xmlElement))).change();
    }
}

function createfdf(segment, index) {
    isFdfUpper = true;

    var result = null;

    if (segment == 0 && index == 0) {
        result = createMainFdf();
    }

    return result;
}

function createMainFdf() {
    stringBuilder = new $.StringBuilder();
    stringBuilder.appendLine('%FDF-1.2');
    stringBuilder.appendLine('%âăĎÓ');
    stringBuilder.appendLine('1 0 obj');
    stringBuilder.appendLine('<< /FDF ');
    stringBuilder.appendLine('  << /Fields [ ');
    stringBuilder.appendLine('    << /V(' + prepisznakyFdf('Tlačivo vytlačené z internetu', false) + ')/T (print)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbDic').val()) + ')/T (dic)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#zaRok').val().substr(2)) + ')/T (zr)>>');

    var pood = $('#dtpZdObdobieOd').val();
    if (!!pood)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(pood.split(".")[0]) + ')/T (pood-den)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (pood-den)>>');

    if (!!pood)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(pood.split(".")[1]) + ')/T (pood-mes)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (pood-mes)>>');

    if (!!pood)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(pood.split(".")[2].substr(2)) + ')/T (pood-rok)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (pood-rok)>>');

    var podo = $('#dtpZdObdobieDo').val();
    if (!!podo)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(podo.split(".")[0]) + ')/T (podo-den)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (podo-den)>>');

    if (!!podo)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(podo.split(".")[1]) + ')/T (podo-mes)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (podo-mes)>>');

    if (!!podo)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(podo.split(".")[2].substr(2)) + ')/T (podo-rok)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (podo-rok)>>');

    stringBuilder.appendLine('    << /V (' + ($('#cbDovod').attr("checked") ? "X" : "") + ')/T (oprava)>>');

    var oprava = $('#dtpOznamDovodu').val();
    if (!!oprava)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(oprava.split(".")[0]) + ')/T (oprava-den)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (oprava-den)>>');

    if (!!oprava)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(oprava.split(".")[1]) + ')/T (oprava-mes)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (oprava-mes)>>');

    if (!!oprava)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(oprava.split(".")[2].substr(2)) + ')/T (oprava-rok)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (oprava-rok)>>');


    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd1Priezvisko').val()) + ')/T (02)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd1Meno').val()) + ')/T (03)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd1TitulPred').val()) + ')/T (04a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd1TitulZa').val()) + ')/T (04b)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbRodneCislo').val()) + ')/T (05a)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbRodneCislo_2').val()) + ')/T (05b)>>');

    var narodenieDate = $('#dtpDatNarodenia').val();
    if (!!narodenieDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(narodenieDate.split(".")[0]) + ')/T (06a)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (06a)>>');

    if (!!narodenieDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(narodenieDate.split(".")[1]) + ')/T (06b)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (06b)>>');

    if (!!narodenieDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(narodenieDate.split(".")[2]) + ')/T (06c)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (06c)>>');

    if (!!$('#taOdd1ObchMeno').val()) {
        var row = divideRows(3, 'taOdd1ObchMeno');

        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(row[0], false) + ')/T (07a)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(row[1], false) + ')/T (07b)>>');
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(row[2], false) + ')/T (07c)>>');
    }

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#ico').val()) + ')/T (08)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTPUlica').val()) + ')/T (09)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tdTPCislo').val()) + ')/T (10)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTPPSC').val()) + ')/T (11)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTPObec').val()) + ')/T (12)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbTPStat').val()) + ')/T (13)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbUlicaSK').val()) + ')/T (14)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tdCisloSK').val()) + ')/T (15)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbPSCSK').val()) + ')/T (16)>>');
    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbObecSK').val()) + ')/T (17)>>');

    stringBuilder.appendLine('    << /V (' + ($('#cbPismA').attr("checked") ? "X" : "") + ')/T (nl-493a)>>');
    stringBuilder.appendLine('    << /V (' + ($('#cbPismB').attr("checked") ? "X" : "") + ')/T (nl-493b)>>');

    var predlzenie = $('#dtpLehota').val();
    if (!!predlzenie)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(predlzenie.split(".")[0]) + ')/T (nl-den)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (nl-den)>>');

    if (!!predlzenie)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(predlzenie.split(".")[1]) + ')/T (nl-mes)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (nl-mes)>>');

    if (!!predlzenie)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(predlzenie.split(".")[2].substr(2)) + ')/T (nl-rok)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (nl-rok)>>');


    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd3Vypracoval').val()) + ')/T (vypracoval)>>');

    var vyprDate = $('#tbOdd3Dna').val();
    if (!!vyprDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(vyprDate.split(".")[0]) + ')/T (vypracoval-den)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (vypracoval-den)>>');

    if (!!vyprDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(vyprDate.split(".")[1]) + ')/T (vypracoval-mes)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (vypracoval-mes)>>');

    if (!!vyprDate)
        stringBuilder.appendLine('    << /V (' + prepisznakyFdf(vyprDate.split(".")[2].substr(2)) + ')/T (vypracoval-rok)>>');
    else
        stringBuilder.appendLine('    << /V ()/T (vypracoval-rok)>>');

    stringBuilder.appendLine('    << /V (' + prepisznakyFdf($('#tbOdd3Telefon').val()) + ')/T (vypracoval-tel)>>');

    stringBuilder.appendLine('    ] ');
    stringBuilder.appendLine('    /F (form.596.OZN493-24-print-save.pdf)');
    stringBuilder.appendLine('    /ID [ <0f1c0c5013770170f4042d0f9bbdc064><67bbe03ad822ab86734fd4c8c191afa2>]');
    stringBuilder.appendLine('  >> ');
    stringBuilder.appendLine('>> ');
    stringBuilder.appendLine('endobj');
    stringBuilder.appendLine('trailer');
    stringBuilder.appendLine('<</Root 1 0 R >>');
    stringBuilder.appendLine('%%EOF');

    return stringBuilder.string();
}


function DiwideRoWValue(rowCount, val) {
    var arrOfRowsResult = new Array();
    var arrOfRows = new Array();

    if (val.indexOf('\n') != -1) {
        arrOfRows = val.split('\n');

        for (var i = 0; i < rowCount; i++) {
            arrOfRowsResult[i] = "";
            //ak je riadkov viac spoji do jedneho, posledny
            if (i == rowCount - 1 && arrOfRows.length > rowCount) {
                arrOfRowsResult[i] = arrOfRows.slice(i).join(' ').replace(/\t/g, " ");
                break; //koniec
            } //riadok ma dlzku mensiu ako 37

            if (!!arrOfRows[i] && arrOfRows[i].replace(/\t/g, " ").length <= 37) {
                arrOfRowsResult[i] = arrOfRows[i].replace(/\t/g, " ");
            } //riadok je dlhsi ako 37

            if (!!arrOfRows[i] && arrOfRows[i].replace(/\t/g, " ").length > 37) {
                if (i == rowCount - 1) {
                    arrOfRowsResult[i] = arrOfRows[i].replace(/\t/g, " ");
                }
                else {
                    arrOfRowsResult[i] = arrOfRows[i].replace(/\t/g, " ").substr(0, 37)
                }
                arrOfRows[i + 1] = arrOfRows[i].replace(/\t/g, " ").substr(37) + ' ' + ((!!arrOfRows[i + 1]) ? arrOfRows[i + 1] : '');
            }
        }
    }
    else {
        for (var i = 0; i < rowCount; i++) {
            if (i == rowCount - 1) {
                arrOfRowsResult[i] = val.replace(/\t/g, " ").substr(i * 37);
            }
            else {
                arrOfRowsResult[i] = val.replace(/\t/g, " ").substr(i * 37, 37);
            }
        }
    }

    return arrOfRowsResult;
}