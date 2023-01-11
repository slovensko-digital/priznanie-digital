function NumberToText(cislo) {
    if (cislo == '')
        return '';
    else if (cislo == '+')
        return 'plus'
    else if (cislo == '-')
        return 'mínus'
    else if (isNaN(cislo))
        return 'Nie je platné číslo'

    var cele1 = "";
    var cele2 = "";
    var cele3 = "";
    var cele4 = "";
    var cele5 = "";

    var rozdelene;
    var celeCislo;
    var desatineCislo;
    var znamienko = '';

    if (Number(cislo) < 0) {
        znamienko = 'mínus ';
    }

    if (cislo.indexOf(".") != -1) {
        rozdelene = cislo.split(".");
        celeCislo = rozdelene[0];
        desatineCislo = rozdelene[1];
    }
    else {
        celeCislo = cislo;
        desatineCislo = "";
    }

    celeCislo = SkontrolujCele(celeCislo);
    celeCislo = parseInt(celeCislo, 10);
    var sPomCislo2 = String(celeCislo);
    var j = sPomCislo2.length;
    var hPomCislo2 = sPomCislo2.substring((j - 3), ((j - 3) + 3))

    if (hPomCislo2 > 0) {
        cele1 = skonvertuj(hPomCislo2) + ""
    }

    var tPomCislo2 = sPomCislo2.substring((j - 6), (j - 6) + 3)
    if (tPomCislo2 > 0) {
        cele2 = skonvertuj(tPomCislo2) + "tisíc"

        //
        if (cele2.indexOf("jedentisíc") == 0) {
            cele2 = cele2.replace("jedentisíc", "tisíc");
        }
        else if (cele2.indexOf("dvatisíc") == 0) {
            cele2 = cele2.replace("dvatisíc", "dvetisíc");
        }
        //

    }

    var mPomCislo2 = sPomCislo2.substring((j - 9), (j - 9) + 3)
    if (mPomCislo2 > 0) {
        cele3 = skonvertuj(mPomCislo2) + "miliónov"

        //
        if (cele3.indexOf("jedenmiliónov") == 0) {
            cele3 = cele3.replace("jedenmiliónov", "milión");
        }
        else if (cele3.indexOf("dvamiliónov") == 0) {
            cele3 = cele3.replace("dvamiliónov", "dvamilióny");
        }
        else if (cele3.indexOf("trimiliónov") == 0) {
            cele3 = cele3.replace("trimiliónov", "trimilióny");
        }
        else if (cele3.indexOf("štyrimiliónov") == 0) {
            cele3 = cele3.replace("štyrimiliónov", "štyrimilióny");
        }
        //		
    }

    var bPomCislo2 = sPomCislo2.substring((j - 12), (j - 12) + 3)
    if (bPomCislo2 > 0) {
        cele4 = skonvertuj(bPomCislo2) + "miliárd"

        //
        if (cele4.indexOf("jedenmiliárd") == 0) {
            cele4 = cele4.replace("jedenmiliárd", "milarda");
        }
        else if (cele4.indexOf("dvamiliárd") == 0) {
            cele4 = cele4.replace("dvamiliárd", "dvemiliardy");
        }
        else if (cele4.indexOf("trimiliárd") == 0) {
            cele4 = cele4.replace("trimiliárd", "trimiliardy");
        }
        else if (cele4.indexOf("štyrimiliárd") == 0) {
            cele4 = cele4.replace("štyrimiliárd", "štyrimiliardy");
        }
        //	
    }

    var trPomCislo2 = sPomCislo2.substring((j - 15), (j - 15) + 3)
    if (trPomCislo2 > 0) {
        cele5 = skonvertuj(trPomCislo2) + "biliónov"

        //
        if (cele5.indexOf("jedenbiliónov") == 0) {
            cele5 = cele5.replace("jedenbiliónov", "bilión");
        }
        else if (cele5.indexOf("dvabiliónov") == 0) {
            cele5 = cele5.replace("dvabiliónov", "dvabilióny");
        }
        else if (cele5.indexOf("tribiliónov") == 0) {
            cele5 = cele5.replace("tribiliónov", "tribilióny");
        }
        else if (cele5.indexOf("štyribiliónov") == 0) {
            cele5 = cele5.replace("štyribiliónov", "štyribilióny");
        }
        //
    }

    if (celeCislo < 1) {
        cele1 = "nula"
    }

    if (j > 15) {
        cele5 = "Číslo má príliš dlhú celú časť";
        cele4 = "";
        cele3 = "";
        cele2 = "";
        cele1 = "";
    }

    var desatine1 = "";
    var desatine2 = "";
    var desatine3 = "";
    var desatine4 = "";
    var desatine5 = "";
    var zakoncenie = "";

    desatineCislo = SkontrolujDesatine(desatineCislo);
    var jz = desatineCislo.length
    desatineCislo = parseInt(desatineCislo, 10);

    if (desatineCislo == 1) {
        zakoncenie = ""
    }
    var dPomCislo2 = String(desatineCislo);

    var j = dPomCislo2.length
    var hPomCislo2 = dPomCislo2.substring((j - 3), ((j - 3) + 3))

    if (hPomCislo2 > 0) {
        desatine1 = skonvertuj(hPomCislo2) + ""
    }

    var tPomCislo2 = dPomCislo2.substring((j - 6), (j - 6) + 3)
    if (tPomCislo2 > 0) {
        desatine2 = skonvertuj(tPomCislo2) + "tisíc"
    }

    var mPomCislo2 = dPomCislo2.substring((j - 9), (j - 9) + 3)
    if (mPomCislo2 > 0) {
        desatine3 = skonvertuj(mPomCislo2) + "milión"
    }

    var bPomCislo2 = dPomCislo2.substring((j - 12), (j - 12) + 3)
    if (bPomCislo2 > 0) {
        desatine4 = skonvertuj(bPomCislo2) + "miliarda"
    }

    var trPomCislo2 = dPomCislo2.substring((j - 15), (j - 15) + 3)
    if (trPomCislo2 > 0) {
        desatine5 = skonvertuj(trPomCislo2) + "bilión"
    }

    if (desatineCislo < 1) {
        desatine1 = "nula"
    }

    if (jz > 14) {
        desatine5 = "Číslo má príliš dlhú desatinú časť";
        desatine4 = "";
        desatine3 = "";
        desatine2 = "";
        desatine1 = "";

    }
    var celeCislo = cele5 + cele4 + cele3 + cele2 + cele1;
    var desatineCislo = desatine5 + desatine4 + desatine3 + desatine2 + desatine1;

    if (celeCislo == "jeden") {
        celeCislo = "jedno" + " euro";
    }
    else if (celeCislo == "dva") {
        celeCislo = "dve" + " eurá";
    }
    else if (celeCislo == "tri") {
        celeCislo = "tri" + " eurá";
    }
    else if (celeCislo == "štyri") {
        celeCislo = "štyri" + " eurá";
    }
    else if (celeCislo == "Číslo má príliš dlhú celú časť") {
    }
    else {
        celeCislo = celeCislo + " eur";
    }


    if (desatineCislo == "jeden") {
        desatineCislo = "jeden" + " cent";
    }
    else if (desatineCislo == "dva") {
        desatineCislo = "dva" + " centy";
    }
    else if (desatineCislo == "tri") {
        desatineCislo = "tri" + " centy";
    }
    else if (desatineCislo == "štyri") {
        desatineCislo = "štyri" + " centy";
    }
    else if (desatineCislo == "Číslo má príliš dlhú desatinú časť") {
    }
    else {
        desatineCislo = desatineCislo + " centov";
    }


    if (desatineCislo == "Číslo má príliš dlhú desatinú časť" || celeCislo == "Číslo má príliš dlhú celú časť") {
        if (desatineCislo != "Číslo má príliš dlhú desatinú časť" && celeCislo == "Číslo má príliš dlhú celú časť") {
            return celeCislo
        }
        else if (desatineCislo == "Číslo má príliš dlhú desatinú časť" && celeCislo != "Číslo má príliš dlhú celú časť") {
            return desatineCislo
        }
        else {
            return celeCislo + " a príliš dlhú desatinú časť"
        }
    }
    else if (desatineCislo == " centov") {
        celeCislo = celeCislo.substring(0, 1).toUpperCase() + celeCislo.substring(1);

        return znamienko + celeCislo
    }
    else {
        celeCislo = celeCislo.substring(0, 1).toUpperCase() + celeCislo.substring(1);

        return znamienko + celeCislo + " a " + desatineCislo
    }
}




function SkontrolujCele(string) {
    for (var i = 0, output = '', valid = "0123456789."; i < string.length; i++)
        if (valid.indexOf(string.charAt(i)) != -1)
            output += string.charAt(i)
    return output;
}

function SkontrolujDesatine(string) {
    for (var i = 0, output = '', valid = "0123456789"; i < string.length; i++)
        if (valid.indexOf(string.charAt(i)) != -1)
            output += string.charAt(i)
    return output;
}

function skonvertuj(sCislo) {
    var sNum3 = ""
    var p1 = ""
    var p2 = ""
    var p3 = ""

    var hy = ""
    var n1 = new Array('', 'jeden', 'dva', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem', 'deväť', 'desať', 'jedenásť', 'dvanásť', 'trinásť', 'štrnásť', 'pätnásť', 'šestnásť', 'sedemnásť', 'osemnásť', 'devätnásť')

    var n2 = new Array('', '', 'dvadsať', 'tridsať', 'štyridsať', 'päťdesiat', 'šesťdesiat', 'sedemdesiat', 'osemdesiat', 'deväťdesiat')


    sNum3 = sCislo
    var j = sNum3.length
    var h3 = sNum3.substring((j - 3), (j - 3) + 1)
    if (h3 > 0) {
        p3 = n1[h3] + "sto"
    }
    else { p3 = "" }

    var t2 = parseInt(sNum3.substring((j - 2), (j - 2) + 1), 10)
    var u1 = parseInt(sNum3.substring((j - 1), (j - 1) + 1), 10)
    var tu21 = parseInt(sNum3.substring((j - 2), (j - 2) + 2), 10)

    if (tu21 == 0) {
        p1 = "";
        p2 = "";
    }

    else if ((t2 < 1) && (u1 > 0)) {
        p2 = "";
        p1 = n1[u1]
    }

    else if (tu21 < 20) {
        p2 = "";
        p1 = n1[tu21]
    }

    else if ((t2 > 1) && (u1 == 0)) {
        p2 = n2[t2]
        p1 = ""
    }

    else {
        p2 = n2[t2] + ""
        p1 = n1[u1]
    }

    sCislo = p3 + p2 + p1

    //

    if (sCislo.indexOf("jedensto") == 0) {
        sCislo = sCislo.replace("jedensto", "sto");
    }
    else if (sCislo.indexOf("dvasto") == 0) {
        sCislo = sCislo.replace("dvasto", "dvesto");
    }

    //

    return sCislo;
}


////////////// Pri vycisti nahrat naspat defaultne hodnoty

var defaultXml = '';
var isLoad = true;


function SaveDeafaultXml() {
    var native = GenerateNativeXml();
    var result;
    var n2f_xsl = GetExternalResource(ResourceType.XSLT_NATIVE_TO_EDOC, 0);
    if (n2f_xsl == null && !$.isFunction(window.createxmlfinal)) {
        result = native;
    }
    else if ($.isFunction(window.createxmlfinal)) {
        result = createxmlfinal();
    }
    else if (n2f_xsl != null) {
        result = transformWithXSLT(native, n2f_xsl);
    }
    return result;
}


function LoadDefaultXml() {
    try {
        var final = defaultXml;
        var f2n_xsl = GetExternalResource(ResourceType.XSLT_EDOC_TO_NATIVE, 0);
        if (f2n_xsl == null && !$.isFunction(window.loadxmlfinal)) {
            FillNativeXml(final);
        }
        else if ($.isFunction(window.loadxmlfinal)) {
            loadxmlfinal(final);
        }
        else if (f2n_xsl != null) {
            var native = transformWithXSLT(final, f2n_xsl);
            FillNativeXml(native);
        }
        return 'success';
    }
    catch (error) {

    }
}


// Ulozi dobre default xml, ktore bude uz nemenne

$('input').live('focus', function () {
    if (isLoad) {
        defaultXml = SaveDeafaultXml();
        isLoad = false;
    }
});

$('select').live('focus', function () {
    if (isLoad) {
        defaultXml = SaveDeafaultXml();
        isLoad = false;
    }
});

$('textarea').live('focus', function () {
    if (isLoad) {
        defaultXml = SaveDeafaultXml();
        isLoad = false;
    }
});

$('button').live('focus', function () {
    if (isLoad) {
        defaultXml = SaveDeafaultXml();
        isLoad = false;
    }
});

$(window).bind("load", function () {
    // Custom date validate
    (function ($) {
        if (!$.validator) {
            throw '$.validator is missing.';
        }

        $.validator.addMethod("date", function (value, element) {
            var check = true;
            
            if (value != '')
                check = false;

            if ($("#" + element.id).hasClass("datepicker")) {
                var re = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
                if (re.test(value)) {
                    var adata = value.split('.');
                    var day = parseInt(adata[0], 10);
                    var month = parseInt(adata[1], 10);
                    var year = parseInt(adata[2], 10);

                    check = isValidDate(day, month, year) && (/^$|^(([0][1-9])|([12][0-9])|(3[01])).([0][1-9]|[1][0-2]).\d{4}$/.test(value));
                }
            }
            else if ($("#" + element.id).hasClass("dateisopicker")) {
                var re = /^\d{4}-\d{1,2}-\d{1,2}$/;
                if (re.test(value)) {
                    var adata = value.split('-');
                    var day = parseInt(adata[2], 10);
                    var month = parseInt(adata[1], 10);
                    var year = parseInt(adata[0], 10);

                    check = isValidDate(day, month, year) && (/^$|^\d{4}-([0][1-9]|[1][0-2])-(([0][1-9])|([12][0-9])|(3[01]))$/.test(value));
                }
            }
            else if ($("#" + element.id).hasClass("datetimepicker")) {
                var re2 = /^\d{1,2}\.\d{1,2}\.\d{4}\s\d{1,2}:\d{1,2}$/;
                if (re2.test(value)) {
                    var adata = value.split(' ');
                    var dateParts = adata[0].split('.');

                    var day = parseInt(dateParts[0], 10);
                    var month = parseInt(dateParts[1], 10);
                    var year = parseInt(dateParts[2], 10);

                    var timeParts = adata[1].split(':');

                    var hours = parseInt(timeParts[0], 10);
                    var minutes = parseInt(timeParts[1], 10);

                    check = isValidDateTime(day, month, year, hours, minutes) && (/^$|^\d{1,2}\.\d{1,2}\.\d{4}\s\d{1,2}:\d{1,2}$/.test(value));
                }
            }
            else if ($("#" + element.id).hasClass("datetimeisopicker")) {
                var re2 = /^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$/;
                if (re2.test(value)) {
                    var adata = value.split(' ');
                    var dateParts = adata[0].split('-');

                    var day = parseInt(dateParts[2], 10);
                    var month = parseInt(dateParts[1], 10);
                    var year = parseInt(dateParts[1], 10);

                    var timeParts = adata[1].split(':');

                    var hours = parseInt(timeParts[0], 10);
                    var minutes = parseInt(timeParts[1], 10);

                    check = isValidDateTime(day, month, year, hours, minutes) && (/^$|^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}$/.test(value));
                }
            }
            else if ($("#" + element.id).hasClass("datetimeisowithsecondspicker")) {
                var re2 = /^-?\d{4}\-\d\d\-\d\d[tT|\s]\d\d:\d\d:\d\d(\.\d*)?([zZ]|([+\-])(\d\d):?(\d\d))?$/;

                if (re2.test(value)) {
                    if (value.indexOf('-') == 0)
                        value = value.substr(1);

                    if (value.indexOf('T') != -1)
                        value = value.replace('T', ' ');

                    value = value.substr(0, 19);

                    var adata = value.split(' ');
                    var dateParts = adata[0].split('-');

                    var day = parseInt(dateParts[2], 10);
                    var month = parseInt(dateParts[1], 10);
                    var year = parseInt(dateParts[0], 10);

                    var timeParts = adata[1].split(':');

                    var hours = parseInt(timeParts[0], 10);
                    var minutes = parseInt(timeParts[1], 10);
                    var seconds = parseInt(timeParts[2], 10);

                    check = isValidDateTimeWithSeconds(day, month, year, hours, minutes, seconds);
                }
            }
			
            if (validatorObject.settings.messages[GetValueWithoutIncremental(element.id)])
                validatorObject.settings.messages[GetValueWithoutIncremental(element.id)]['date'] = 'Zadajte platný dátum'

            return this.optional(element) || check;
        }, 'Zadajte platný dátum');
    }(jQuery));
});

function isValidDate(day, month, year) {
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false;
    }
    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            return false;
        }
    }
    return true;  // Date is valid
}

function isValidDateTime(day, month, year, hours, minutes) {
    if (!isValidDate(day, month, year)) {
        return false;
    }

    if (hours < 0 || hours > 23) {
        return false;
    }

    if (minutes < 0 || minutes > 59) {
        return false;
    }

    return true;  // DateTime is valid
}

function isValidDateTimeWithSeconds(day, month, year, hours, minutes, seconds) {
    if (!isValidDate(day, month, year)) {
        return false;
    }

    if (hours < 0 || hours > 23) {
        return false;
    }

    if (minutes < 0 || minutes > 59) {
        return false;
    }

    if (seconds < 0 || seconds > 59) {
        return false;
    }

    return true;  // DateTime is valid
}


// funkcie pre IBAN

function Country(name, code, bank_form, acc_form) {
    this.name = name;
    this.code = code;
    this.bank = Country_decode_format(bank_form);
    this.acc = Country_decode_format(acc_form);
    this.bank_lng = Country_calc_length(this.bank);
    this.acc_lng = Country_calc_length(this.acc);
    this.total_lng = 4 + this.bank_lng + this.acc_lng;
}

function Country_decode_format(form) {
    var form_list = new Array();
    var parts = form.split(" ");
    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        if (part != "") {
            var typ = part.charAt(part.length - 1);
            if (typ == "a" || typ == "n")
                part = part.substring(0, part.length - 1);
            else
                typ = "c";
            var lng = parseInt(part);
            form_list[form_list.length] = new Array(lng, typ);
        }
    }
    return form_list;
}

function Country_calc_length(form_list) {
    var sum = 0;
    for (var i = 0; i < form_list.length; ++i)
        sum += form_list[i][0];
    return sum;
}


var iban_data = new Array(
  new Country("Andorra", "AD", "0  4n 4n", "0  12   0 "),
  new Country("Albania", "AL", "0  8n 0 ", "0  16   0 "),
  new Country("Austria", "AT", "0  5n 0 ", "0  11n  0 "),
  new Country("Bosnia and Herzegovina",
                                "BA", "0  3n 3n", "0   8n  2n"),
  new Country("Belgium", "BE", "0  3n 0 ", "0   7n  2n"),
  new Country("Bulgaria", "BG", "0  4a 4n", "2n  8   0 "),
  new Country("Switzerland", "CH", "0  5n 0 ", "0  12   0 "),
  new Country("Cyprus", "CY", "0  3n 5n", "0  16   0 "),
  new Country("Czech Republic", "CZ", "0  4n 0 ", "0  16n  0 "),
  new Country("Germany", "DE", "0  8n 0 ", "0  10n  0 "),
  new Country("Denmark", "DK", "0  4n 0 ", "0   9n  1n"),
  new Country("Estonia", "EE", "0  2n 0 ", "2n 11n  1n"),
  new Country("Spain", "ES", "0  4n 4n", "2n 10n  0 "),
  new Country("Finland", "FI", "0  6n 0 ", "0   7n  1n"),
  new Country("Faroe Islands", "FO", "0  4n 0 ", "0   9n  1n"),
  new Country("France", "FR", "0  5n 5n", "0  11   2n"),
  new Country("United Kingdom", "GB", "0  4a 6n", "0   8n  0 "),
  new Country("Georgia", "GE", "0  2a 0 ", "0  16n  0 "),
  new Country("Gibraltar", "GI", "0  4a 0 ", "0  15   0 "),
  new Country("Greenland", "GL", "0  4n 0 ", "0   9n  1n"),
  new Country("Greece", "GR", "0  3n 4n", "0  16   0 "),
  new Country("Croatia", "HR", "0  7n 0 ", "0  10n  0 "),
  new Country("Hungary", "HU", "0  3n 4n", "1n 15n  1n"),
  new Country("Ireland", "IE", "0  4a 6n", "0   8n  0 "),
  new Country("Israel", "IL", "0  3n 3n", "0  13n  0 "),
  new Country("Iceland", "IS", "0  4n 0 ", "2n 16n  0 "),
  new Country("Italy", "IT", "1a 5n 5n", "0  12   0 "),
  new Country("Kuwait", "KW", "0  4a 0 ", "0  22   0 "),
  new Country("Kazakhstan", "KZ", "0  3n 0 ", "0  13   0 "),
  new Country("Lebanon", "LB", "0  4n 0 ", "0  20   0 "),
  new Country("Liechtenstein", "LI", "0  5n 0 ", "0  12   0 "),
  new Country("Lithuania", "LT", "0  5n 0 ", "0  11n  0 "),
  new Country("Luxembourg", "LU", "0  3n 0 ", "0  13   0 "),
  new Country("Latvia", "LV", "0  4a 0 ", "0  13   0 "),
  new Country("Monaco", "MC", "0  5n 5n", "0  11   2n"),
  new Country("Montenegro", "ME", "0  3n 0 ", "0  13n  2n"),
  new Country("Macedonia, Former Yugoslav Republic of",
                                "MK", "0  3n 0 ", "0  10   2n"),
  new Country("Mauritania", "MR", "0  5n 5n", "0  11n  2n"),
  new Country("Malta", "MT", "0  4a 5n", "0  18   0 "),
  new Country("Mauritius", "MU", "0  4a 4n", "0  15n  3a"),
  new Country("Netherlands", "NL", "0  4a 0 ", "0  10n  0 "),
  new Country("Norway", "NO", "0  4n 0 ", "0   6n  1n"),
  new Country("Poland", "PL", "0  8n 0 ", "0  16n  0 "),
  new Country("Portugal", "PT", "0  4n 4n", "0  11n  2n"),
  new Country("Romania", "RO", "0  4a 0 ", "0  16   0 "),
  new Country("Serbia", "RS", "0  3n 0 ", "0  13n  2n"),
  new Country("Saudi Arabia", "SA", "0  2n 0 ", "0  18   0 "),
  new Country("Sweden", "SE", "0  3n 0 ", "0  16n  1n"),
  new Country("Slovenia", "SI", "0  5n 0 ", "0   8n  2n"),
  new Country("Slovak Republic",
                                "SK", "0  4n 0 ", "0  16n  0 "),
  new Country("San Marino", "SM", "1a 5n 5n", "0  12   0 "),
  new Country("Tunisia", "TN", "0  2n 3n", "0  13n  2n"),
  new Country("Turkey", "TR", "0  5n 0 ", "1  16   0 "));

// Search the country code in the iban_data list.
function CountryData(code) {
    for (var i = 0; i < iban_data.length; ++i)
        if (iban_data[i].code == code)
            return iban_data[i];
    return null;
}

// Modulo 97 for huge numbers given as digit strings.
function mod97(digit_string) {
    var m = 0;
    for (var i = 0; i < digit_string.length; ++i)
        m = (m * 10 + parseInt(digit_string.charAt(i))) % 97;
    return m;
}

// Convert a capital letter into digits: A -> 10 ... Z -> 35 (ISO 13616).
function capital2digits(ch) {
    var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < capitals.length; ++i)
        if (ch == capitals.charAt(i))
            break;
    return i + 10;
}

// Fill the string with leading zeros until length is reached.
function fill0(s, l) {
    while (s.length < l)
        s = "0" + s;
    return s;
}

// Compare two strings respecting german umlauts.
function strcmp(s1, s2) {
    var chars = "AaÄäBbCcDdEeFfGgHhIiJjKkLlMmNnOoÖöPpQqRrSsßTtUuÜüVvWwXxYyZz";
    var lng = (s1.length < s2.length) ? s1.length : s2.length;
    for (var i = 0; i < lng; ++i) {
        var d = chars.indexOf(s1.charAt(i)) - chars.indexOf(s2.charAt(i));
        if (d != 0)
            return d;
    }
    return s1.length - s2.length;
}

// Create an index table of the iban_data list sorted by country names.
function CountryIndexTable() {
    var tab = new Array();
    var i, j, t;
    for (i = 0; i < iban_data.length; ++i)
        tab[i] = i;
    for (i = tab.length - 1; i > 0; --i)
        for (j = 0; j < i; ++j)
            if (strcmp(iban_data[tab[j]].name, iban_data[tab[j + 1]].name) > 0)
                t = tab[j], tab[j] = tab[j + 1], tab[j + 1] = t;
    return tab;
}

// Calculate 2-digit checksum of an IBAN.
function ChecksumIBAN(iban) {
    var code = iban.substring(0, 2);
    var checksum = iban.substring(2, 4);
    var bban = iban.substring(4);

    // Assemble digit string
    var digits = "";
    for (var i = 0; i < bban.length; ++i) {
        var ch = bban.charAt(i).toUpperCase();
        if ("0" <= ch && ch <= "9")
            digits += ch;
        else
            digits += capital2digits(ch);
    }
    for (var i = 0; i < code.length; ++i) {
        var ch = code.charAt(i);
        digits += capital2digits(ch);
    }
    digits += checksum;

    // Calculate checksum
    checksum = 98 - mod97(digits);
    return fill0("" + checksum, 2);
}

// Fill the account number part of IBAN with leading zeros.
function FillAccount(country, account) {
    return fill0(account, country.acc_lng);
}

function FillPrefix(prefix) {
    return fill0(prefix, 6);
}

function FillAccountIn(accountIn) {
    return fill0(accountIn, 10);
}

// Check if syntax of the part of IBAN is invalid.
function InvalidPart(form_list, iban_part) {
    for (var f = 0; f < form_list.length; ++f) {
        var lng = form_list[f][0], typ = form_list[f][1];
        if (lng > iban_part.length)
            lng = iban_part.length;
        for (var i = 0; i < lng; ++i) {
            var ch = iban_part.charAt(i);
            var a = ("A" <= ch && ch <= "Z");
            var n = ("0" <= ch && ch <= "9");
            var c = n || a || ("a" <= ch && ch <= "z");
            if ((!c && typ == "c") || (!a && typ == "a") || (!n && typ == "n"))
                return true;
        }
        iban_part = iban_part.substring(lng);
    }
    return false;
}

// Check if length of the bank/branch code part of IBAN is invalid.
function InvalidBankLength(country, bank) {
    return (bank.length != country.bank_lng);
}

// Check if syntax of the bank/branch code part of IBAN is invalid.
function InvalidBank(country, bank) {
    return (InvalidBankLength(country, bank) ||
          InvalidPart(country.bank, bank));
}

// Check if length of the account number part of IBAN is invalid.
function InvalidAccountLength(country, account) {
    return (account.length < 1 || account.length > country.acc_lng);
}

function InvalidPrefixLength(prefix) {
    return (prefix.length > 6);
}

function InvalidAccountInLength(accountIn) {
    return (accountIn.length < 1 || accountIn.length > 10);
}

// Check if syntax of the account number part of IBAN is invalid.
function InvalidAccount(country, account) {
    return (InvalidAccountLength(country, account) ||
          InvalidPart(country.acc, FillAccount(country, account)));
}

function InvalidPrefix(country, prefix) {
    return (InvalidPrefixLength(prefix) ||
          InvalidPart(country.acc, FillPrefix(prefix)));
}

function InvalidAccountIn(country, accountIn) {
    return (InvalidAccountInLength(accountIn) ||
          InvalidPart(country.acc, FillAccountIn(accountIn)));
}

// Check if length of IBAN is invalid.
function InvalidIBANlength(country, iban) {
    return (iban.length != country.total_lng);
}

function InvalidPrefixModulo(prefix) {
    var prefixTmp = FillPrefix(prefix);
    var number = prefixTmp.charAt(0) * 10 + prefixTmp.charAt(1) * 5 + prefixTmp.charAt(2) * 8 +
        prefixTmp.charAt(3) * 4 + prefixTmp.charAt(4) * 2 + prefixTmp.charAt(5) * 1;
    return !(number % 11 === 0);
}

function InvalidAccountInModulo(accountIn) {
    var accountInTmp = FillAccountIn(accountIn);
    var number = accountInTmp.charAt(0) * 6 + accountInTmp.charAt(1) * 3 + accountInTmp.charAt(2) * 7 +
        accountInTmp.charAt(3) * 9 + accountInTmp.charAt(4) * 10 + accountInTmp.charAt(5) * 5 +
        accountInTmp.charAt(6) * 8 + accountInTmp.charAt(7) * 4 + accountInTmp.charAt(8) * 2 + accountInTmp.charAt(9) * 1;
    return !(number % 11 === 0);
}

// Convert iban from intern value to string format (IBAN XXXX XXXX ...).
function extern(intern) {
    var s = "IBAN";
    for (var i = 0; i < intern.length; ++i) {
        if (i % 4 == 0)
            s += " ";
        s += intern.charAt(i);
    }
    return s;
}

// Convert iban from string format to intern value.
function intern(extern) {
    if (extern.substring(0, 4) == "IBAN")
        extern = extern.substring(4);
    var s = "";
    for (var i = 0; i < extern.length; ++i)
        if (extern.charAt(i) != " ")
            s += extern.charAt(i);
    return s;
}

// Calculate the checksum and assemble the IBAN.
function CalcIBAN(country, bank, account) {
    var fill_acc = FillAccount(country, account);
    var checksum = ChecksumIBAN(country.code + "00" + bank + fill_acc);
    return country.code + checksum + bank + fill_acc;
}

function CalcAltIBAN(country, bank, account) {
    var fill_acc = FillAccount(country, account);
    var checksum = ChecksumIBAN(country.code + "00" + bank + fill_acc);
    checksum = fill0("" + mod97(checksum), 2);
    return country.code + checksum + bank + fill_acc;
}

// Check the checksum of an IBAN.
function IBANokay(iban) {
    return ChecksumIBAN(iban) == "97";
}

// Check the input, calculate the checksum and assemble the IBAN.
function CreateIBAN(pCode, pBank, pPrefix, pAccountIn) {
    // var form = document.ibanform;
    var code = pCode; //form.country.options[form.country.selectedIndex].value;
    var bank = pBank;//.attr('code').val();//intern(form.bank.value);
    //bank = AdresaFiller.GetCodeValue("banky",null,GetOlineLookupUri(""),bank);
    var prefix = pPrefix;
    var accountIn = pAccountIn;
    var country = CountryData(code);

    var err = null, err_focus = null;
    /*
        if (country == null) {
            err = _("Neznámy kód krajiny: ") + code;
            err_focus = form.country;
        }
        else if (InvalidBankLength(country, bank)) {
            err = _("Bank/Branch Code length ") + bank.length +
              _(" is not correct for ") + country.name +
              " (" + country.bank_lng + ")";
            err_focus = form.bank;
        }
        else if (InvalidBank(country, bank)) {
            err = _("Bank/Branch Code ") + bank + _(" is not correct for ") +
              country.name;
            err_focus = form.bank;
        }
        else if (InvalidPrefixLength(prefix)) {
            err = _("Prefix Number length ") + prefix.length +
              _(" is not correct for ") + country.name +
              " (6)";
            err_focus = form.prefix;
        }
        else if (InvalidPrefix(country, prefix)) {
            err = _("Prefix Number ") + prefix + _(" is not correct for ") +
              country.name;
            err_focus = form.prefix;
        }
        else if (InvalidPrefixModulo(prefix)) {
            err = _("Prefix Number ") + prefix + _(" is not valid ") +
              country.name;
            err_focus = form.prefix;
        }
        else if (InvalidAccountInLength(accountIn)) {
            err = _("Account Number length ") + accountIn.length +
              _(" is not correct for ") + country.name +
              " (10)";
            err_focus = form.account;
        }
        else if (InvalidAccountIn(country, accountIn)) {
            err = _("Account Number ") + accountIn + _(" is not correct for ") +
              country.name;
            err_focus = form.account;
        }
        else if (InvalidAccountInModulo(accountIn)) {
            err = _("Account Number ") + accountIn + _(" is not valid ") +
              country.name;
            err_focus = form.account;
        }
    */
    if (err) {
        // Set error image on BBAN side
        //document.bban_img.src = error_img.src;
        //document.iban_img.src = blank_img.src;

        // Clear destination fields, set focus to wrong field
        form.iban.value = "";
        //form.alt_iban.value = "";
        err_focus.focus();

        // Show message box with error message
        alert(err);
    }
    else {
        // Set okay image on IBAN side
        //document.iban_img.src = okay_img.src;
        //document.bban_img.src = blank_img.src;
        /*
                // Calculate IBAN, write results in form fields
                form.bank.value = bank;
                form.prefix.value = FillPrefix(prefix);
                form.account.value = FillAccountIn(accountIn);
        */
        var account = prefix + accountIn;

        //extern(CalcIBAN(country, bank, account));

        // Calculate alternative IBAN, write warning if not the same
        /*form.alt_iban.value = extern(CalcAltIBAN(country, bank, account));
        if (form.alt_iban.value != form.iban.value)
            form.alt_iban.value += " (*)";
        else
            form.alt_iban.value = "";*/

        // Check for dispensable global variables in debug modus
        if (debug_output)
            debug_check_vars();

        return CalcIBAN(country, bank, account);
    }
}

// Check the syntax and the checksum of the IBAN.
function CheckIBAN(pIban) {
    //var form = document.ibanform;
    //var iban = intern(form.iban.value);
    var iban = intern(pIban);

    var code = iban.substring(0, 2);
    var checksum = iban.substring(2, 4);
    var bban = iban.substring(4);
    var country = CountryData(code);

    var err = null;
    if (country == null)
        err = _("Neznámy kód štátu: ") + code;//err = _("Unknown Country Code: ") + code;
    else if (InvalidIBANlength(country, iban))
        err = _("Dĺžka IBAN ") + iban.length + _(" nie je korektná pre ") + country.name + " (" + country.total_lng + ")";//err = _("IBAN length ") + iban.length + _(" is not correct for ") + country.name + " (" + country.total_lng + ")";
    else {
        var bank_lng = country.bank_lng;
        var bank = bban.substring(0, bank_lng);
        var account = bban.substring(bank_lng);

        if (code == 'SK') {
            var invalidKodBanky = InvalidKodBanky(bank);
            var invalidPredcislie = InvalidPredcislie(account);
            var invalidCislo = InvalidCislo(account);

            if (invalidKodBanky && invalidPredcislie && invalidCislo)
                err = _("Kód banky/pobočky ") + bank + _(", predčíslie účtu a číslo účtu ") + account + _(" nie su korektné pre ") + country.name;
            else if (invalidKodBanky && invalidPredcislie)
                err = _("Kód banky/pobočky ") + bank + _(" a predčíslie účtu ") + account + _(" nie su korektné pre ") + country.name;
            else if (invalidKodBanky && invalidCislo)
                err = _("Kód banky/pobočky ") + bank + _(" a číslo účtu ") + account + _(" nie su korektné pre ") + country.name;
            else if (invalidPredcislie && invalidCislo)
                err = _("Predčíslie účtu a číslo účtu ") + account + _(" nie su korektné pre ") + country.name;
            else if (invalidKodBanky)
                err = _("Kód banky/pobočky ") + bank + _(" nie je korektný pre ") + country.name;
            else if (invalidPredcislie)
                err = _("Predčíslie účtu ") + account + _(" nie je korektné pre ") + country.name;
            else if (invalidCislo)
                err = _("Číslo účtu ") + account + _(" nie je korektné pre ") + country.name;
            else if (!IBANokay(iban))
                err = _("Kontrolná suma pre IBAN nie je korektná");
        }
        else {
            if (InvalidBank(country, bank))
                err = _("Kód banky/pobočky ") + bank + _(" nie je korektný pre ") + country.name;//err = _("Bank/Branch Code ") + bank + _(" is not correct for ") + country.name;
            else if (InvalidAccount(country, account))
                err = _("Číslo účtu ") + account + _(" nie je korektné pre ") + country.name;//err = _("Account Number ") + account + _(" is not correct for ") + country.name;
            else if (!IBANokay(iban))
                err = _("Kontrolná suma pre IBAN nie je korektná");//err = _("Checksum of IBAN incorrect");
        }
    }

    if (err) {
        // Set error image on IBAN side
        //document.iban_img.src = error_img.src;
        //document.bban_img.src = blank_img.src;

        // Clear destination fields, set focus to wrong field
        //form.country.selectedIndex = 0;
        //form.bank.value = "";
        //form.account.value = "";
        //form.alt_iban.value = "";
        //form.iban.focus();

        // Show message box with error message
        //alert(err);

        return err;
    }
    //else {
    // Set okay image on BBAN side
    //document.bban_img.src = okay_img.src;
    //document.iban_img.src = blank_img.src;

    // Write results in form fields
    //form.iban.value = extern(iban);
    /*for (var i = form.country.options.length - 1; i > 0; --i)
        if (form.country.options[i].value == code)
            break;
    form.country.selectedIndex = i;*/
    //form.bank.value = bank;
    //form.account.value = account;

    // Calculate alternative IBAN, write warning if not the same
    /*form.alt_iban.value = extern(CalcAltIBAN(country, bank, account));
    if (form.alt_iban.value != form.iban.value)
        form.alt_iban.value += " (*)";
    else
        form.alt_iban.value = "";*/

    // Check for dispensable global variables in debug modus
    //if (debug_output)
    //debug_check_vars();
    //}

    return 1;
}

// Write the selection bar into the form.
function WriteCountrySelectionBar() {
    document.write('<select name="country" size="1">');
    document.write('<option value="??">&nbsp;</option>');
    var tab = CountryIndexTable();
    for (var i = 0; i < tab.length; ++i) {
        var country = iban_data[tab[i]];
        document.write('<option value="' + country.code + '">' +
                   country.name + ' (' + country.code + ')</option>');
    }
    document.write('</select>');
}

// Write a table with the country specific iban format.
function WriteCountryFormatTable() {
    document.write('<table bgcolor="#99FFCC" width="100%" border="4">' +
                 ' <tr>' +
                 '  <th rowspan="2">&nbsp;</th>' +
                 '  <th rowspan="2">' + _("Country") + '<BR />Code</th>' +
                 '  <th colspan="3">' + _("Bank/Branch Code") + '</th>' +
                 '  <th colspan="3">' + _("Account Number") + '</th>' +
                 ' </tr>' +
                 ' <tr>' +
                 '  <th>' + _("check1") + '</th><th>' + _("bank") + '</th>' +
                 '  <th>' + _("branch") + '</th><th>' + _("check2") + '</th>' +
                 '  <th>' + _("number") + '</th><th>' + _("check3") + '</th>' +
                 ' </tr>');
    var tab = CountryIndexTable();
    for (var i = 0; i < tab.length; ++i) {
        var country = iban_data[tab[i]];
        document.write(' <tr>' +
                   '  <td>' + country.name + '</td>' +
                   '  <td align="center">' + country.code + '</td>');
        for (var f = 0; f < country.bank.length; ++f) {
            var lng = country.bank[f][0], typ = country.bank[f][1];
            if (lng > 0)
                document.write('  <td align="center">' + lng + ' ' + typ + '</td>');
            else
                document.write('  <td align="center">-</td>');
        }
        for (var f = 0; f < country.acc.length; ++f) {
            var lng = country.acc[f][0], typ = country.acc[f][1];
            if (lng > 0)
                document.write('  <td align="center">' + lng + ' ' + typ + '</td>');
            else
                document.write('  <td align="center">-</td>');
        }
    }
    document.write(' <tr>' +
                 '  <td colspan="2">&nbsp;</td>' +
                 '  <td colspan="8" align="center">' +
                    _("a = A-Z, n = 0-9, c = A-Z/a-z/0-9") +
                 '  </td>' +
                 ' </tr>' +
                 '</table>');
}

// Write a table with iban test data.
function WriteTestTable(data) {
    document.write('<table bgcolor="#99FFCC" width="100%" border="4">' +
                 ' <tr>' +
                 '  <th>' + _('Country Code') + '</th>' +
                 '  <th>' + _('Bank/Branch Code') + '</th>' +
                 '  <th>' + _('Account Number') + '</th>' +
                 '  <th>&nbsp;</th>' +
                 '  <th>' + _('International Bank Account Number') + '</th>' +
                 '  <th>' + _('Checksum') + '</th>' +
                 ' </tr>');
    for (var i = 0; i < data.length; ++i) {
        var code = data[i][0];
        var bank = data[i][1];
        var account = data[i][2];
        var checksum = data[i][3];
        var country = CountryData(code);
        var iban = "", err = null;

        if (country == null)
            err = _("Unknown Country Code");
        else if (InvalidBank(country, bank))
            err = _("Incorrect Bank/Branch Code");
        else if (InvalidAccount(country, account))
            err = _("Incorrect Account Number");
        else {
            iban = CalcIBAN(country, bank, account);

            if (iban.substring(2, 4) != checksum) {
                var alt_iban = CalcAltIBAN(country, bank, account);
                if (alt_iban.substring(2, 4) == checksum)
                    iban = alt_iban;
            }

            if (iban.substring(0, 2) != code)
                err = _("Country code changed");
            else if (InvalidIBANlength(country, iban))
                err = _("Incorrect IBAN length: ") + iban.length +
              " (" + country.total_lng + ")";
            else {
                var bban = iban.substring(4);
                var bank_lng = country.bank_lng;

                if (bban.substring(0, bank_lng) != bank)
                    err = _("Bank/Branch Code changed");
                else if (bban.substring(bank_lng) != FillAccount(country, account))
                    err = _("Account Number changed");
                else if (!IBANokay(iban))
                    err = _("Incorrect checksum");
                else if (iban.substring(2, 4) != checksum)
                    err = _("Checksum changed");
            }
        }
        document.write(' <tr>' +
                   '  <td align="center">' + code + '</td>' +
                   '  <td align="center">' + bank + '</td>' +
                   '  <td align="center">' + account + '</td>');
        if (err)
            document.write('  <td colspan="3" align="center">' + err + '</td>');
        else
            document.write('  <td align="center">' +
                     '   <img src="' + arrow_img.src + '"' +
                     '        width="' + arrow_img.width + '"' +
                     '        height="' + arrow_img.height + '"' +
                     '        border="0" alt="<==>" />' +
                     '  </td>' +
                     '  <td align="center">' + extern(iban) + '</td>' +
                     '  <td align="center">' + checksum + '</td>');
        document.write(' </tr>');
    }
    document.write('</table>');
}

// Write a table with an example for each country.
function WriteExampleTestTable() {
    WriteTestTable(examples);

    // Write table with test data only in debug modus
    if (debug_output)
        WriteTestTable(test_data);
}

// Examples of IBANs for each country.
var examples = new Array(
  new Array("AD", "00012030", "200359100100", "12"),
  new Array("AL", "21211009", "0000000235698741", "47"),
  new Array("AT", "19043", "00234573201", "61"),
  new Array("BA", "129007", "9401028494", "39"),
  new Array("BE", "539", "007547034", "68"),
  new Array("BG", "BNBG9661", "1020345678", "80"),
  new Array("CH", "00762", "011623852957", "93"),
  new Array("CY", "00200128", "0000001200527600", "17"),
  new Array("CZ", "0800", "0000192000145399", "65"),
  new Array("DE", "37040044", "0532013000", "89"),
  new Array("DK", "0040", "0440116243", "50"),
  new Array("EE", "22", "00221020145685", "38"),
  new Array("ES", "21000418", "450200051332", "91"),
  new Array("FI", "123456", "00000785", "21"),
  new Array("FO", "6460", "0001631634", "62"),
  new Array("FR", "2004101005", "0500013M02606", "14"),
  new Array("GB", "NWBK601613", "31926819", "29"),
  new Array("GE", "NB", "0000000101904917", "29"),
  new Array("GI", "NWBK", "000000007099453", "75"),
  new Array("GL", "6471", "0001000206", "89"),
  new Array("GR", "0110125", "0000000012300695", "16"),
  new Array("HR", "1001005", "1863000160", "12"),
  new Array("HU", "1177301", "61111101800000000", "42"),
  new Array("IE", "AIBK931152", "12345678", "29"),
  new Array("IL", "010800", "0000099999999", "62"),
  new Array("IS", "0159", "260076545510730339", "14"),
  new Array("IT", "X0542811101", "000000123456", "60"),
  new Array("KW", "CBKU", "0000000000001234560101", "81"),
  new Array("KZ", "125", "KZT5004100100", "86"),
  new Array("LB", "0999", "00000001001901229114", "62"),
  new Array("LI", "08810", "0002324013AA", "21"),
  new Array("LT", "10000", "11101001000", "12"),
  new Array("LU", "001", "9400644750000", "28"),
  new Array("LV", "BANK", "0000435195001", "80"),
  new Array("MC", "1273900070", "0011111000h79", "11"),
  new Array("ME", "505", "000012345678951", "25"),
  new Array("MK", "250", "120000058984", "07"),
  new Array("MR", "0002000101", "0000123456753", "13"),
  new Array("MT", "MALT01100", "0012345MTLCAST001S", "84"),
  new Array("MU", "BOMM0101", "101030300200000MUR", "17"),
  new Array("NL", "ABNA", "0417164300", "91"),
  new Array("NO", "8601", "1117947", "93"),
  new Array("PL", "10901014", "0000071219812874", "61"),
  new Array("PT", "00020123", "1234567890154", "50"),
  new Array("RO", "AAAA", "1B31007593840000", "49"),
  new Array("RS", "260", "005601001611379", "35"),
  new Array("SA", "80", "000000608010167519", "03"),
  new Array("SE", "500", "00000058398257466", "45"),
  new Array("SI", "19100", "0000123438", "56"),
  new Array("SK", "1200", "0000198742637541", "31"),
  new Array("SM", "U0322509800", "000000270100", "86"),
  new Array("TN", "10006", "035183598478831", "59"),
  new Array("TR", "00061", "00519786457841326", "33"));

// Test data for each country.
var test_data = new Array(
  new Array("XY", "1", "2", "33"),
  new Array("AD", "11112222", "C3C3C3C3C3C3", "11"),
  new Array("AD", "1111222", "C3C3C3C3C3C3", "11"),
  new Array("AD", "X1112222", "C3C3C3C3C3C3", "11"),
  new Array("AD", "111@2222", "C3C3C3C3C3C3", "11"),
  new Array("AD", "1111X222", "C3C3C3C3C3C3", "11"),
  new Array("AD", "1111222@", "C3C3C3C3C3C3", "11"),
  new Array("AD", "11112222", "@3C3C3C3C3C3", "11"),
  new Array("AD", "11112222", "C3C3C3C3C3C@", "11"),
  new Array("AL", "11111111", "B2B2B2B2B2B2B2B2", "54"),
  new Array("AL", "1111111", "B2B2B2B2B2B2B2B2", "54"),
  new Array("AL", "X1111111", "B2B2B2B2B2B2B2B2", "54"),
  new Array("AL", "1111111@", "B2B2B2B2B2B2B2B2", "54"),
  new Array("AL", "11111111", "@2B2B2B2B2B2B2B2", "54"),
  new Array("AL", "11111111", "B2B2B2B2B2B2B2B@", "54"),
  new Array("AT", "11111", "22222222222", "17"),
  new Array("AT", "1111", "22222222222", "17"),
  new Array("AT", "X1111", "22222222222", "17"),
  new Array("AT", "1111@", "22222222222", "17"),
  new Array("AT", "11111", "X2222222222", "17"),
  new Array("AT", "11111", "2222222222@", "17"),
  new Array("BA", "111222", "3333333344", "79"),
  new Array("BA", "11122", "3333333344", "79"),
  new Array("BA", "X11222", "3333333344", "79"),
  new Array("BA", "11@222", "3333333344", "79"),
  new Array("BA", "111X22", "3333333344", "79"),
  new Array("BA", "11122@", "3333333344", "79"),
  new Array("BA", "111222", "X333333344", "79"),
  new Array("BA", "111222", "3333333@44", "79"),
  new Array("BA", "111222", "33333333X4", "79"),
  new Array("BA", "111222", "333333334@", "79"),
  new Array("BE", "111", "222222233", "93"),
  new Array("BE", "11", "222222233", "93"),
  new Array("BE", "X11", "222222233", "93"),
  new Array("BE", "11@", "222222233", "93"),
  new Array("BE", "111", "X22222233", "93"),
  new Array("BE", "111", "222222@33", "93"),
  new Array("BE", "111", "2222222X3", "93"),
  new Array("BE", "111", "22222223@", "93"),
  new Array("BG", "AAAA2222", "33D4D4D4D4", "20"),
  new Array("BG", "AAAA222", "33D4D4D4D4", "20"),
  new Array("BG", "8AAA2222", "33D4D4D4D4", "20"),
  new Array("BG", "AAA@2222", "33D4D4D4D4", "20"),
  new Array("BG", "AAAAX222", "33D4D4D4D4", "20"),
  new Array("BG", "AAAA222@", "33D4D4D4D4", "20"),
  new Array("BG", "AAAA2222", "X3D4D4D4D4", "20"),
  new Array("BG", "AAAA2222", "3@D4D4D4D4", "20"),
  new Array("BG", "AAAA2222", "33@4D4D4D4", "20"),
  new Array("BG", "AAAA2222", "33D4D4D4D@", "20"),
  new Array("CH", "11111", "B2B2B2B2B2B2", "60"),
  new Array("CH", "1111", "B2B2B2B2B2B2", "60"),
  new Array("CH", "X1111", "B2B2B2B2B2B2", "60"),
  new Array("CH", "1111@", "B2B2B2B2B2B2", "60"),
  new Array("CH", "11111", "@2B2B2B2B2B2", "60"),
  new Array("CH", "11111", "B2B2B2B2B2B@", "60"),
  new Array("CY", "11122222", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "1112222", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "X1122222", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "11@22222", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "111X2222", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "1112222@", "C3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "11122222", "@3C3C3C3C3C3C3C3", "29"),
  new Array("CY", "11122222", "C3C3C3C3C3C3C3C@", "29"),
  new Array("CZ", "1111", "2222222222222222", "68"),
  new Array("CZ", "111", "2222222222222222", "68"),
  new Array("CZ", "X111", "2222222222222222", "68"),
  new Array("CZ", "111@", "2222222222222222", "68"),
  new Array("CZ", "1111", "X222222222222222", "68"),
  new Array("CZ", "1111", "222222222222222@", "68"),
  new Array("DE", "11111111", "2222222222", "16"),
  new Array("DE", "1111111", "2222222222", "16"),
  new Array("DE", "X1111111", "2222222222", "16"),
  new Array("DE", "1111111@", "2222222222", "16"),
  new Array("DE", "11111111", "X222222222", "16"),
  new Array("DE", "11111111", "222222222@", "16"),
  new Array("DK", "1111", "2222222223", "79"),
  new Array("DK", "111", "2222222223", "79"),
  new Array("DK", "X111", "2222222223", "79"),
  new Array("DK", "111@", "2222222223", "79"),
  new Array("DK", "1111", "X222222223", "79"),
  new Array("DK", "1111", "22222222@3", "79"),
  new Array("DK", "1111", "222222222X", "79"),
  new Array("EE", "11", "22333333333334", "96"),
  new Array("EE", "1", "22333333333334", "96"),
  new Array("EE", "X1", "22333333333334", "96"),
  new Array("EE", "1@", "22333333333334", "96"),
  new Array("EE", "11", "X2333333333334", "96"),
  new Array("EE", "11", "2@333333333334", "96"),
  new Array("EE", "11", "22X33333333334", "96"),
  new Array("EE", "11", "223333333333@4", "96"),
  new Array("EE", "11", "2233333333333X", "96"),
  new Array("ES", "11112222", "334444444444", "71"),
  new Array("ES", "1111222", "334444444444", "71"),
  new Array("ES", "X1112222", "334444444444", "71"),
  new Array("ES", "111@2222", "334444444444", "71"),
  new Array("ES", "1111X222", "334444444444", "71"),
  new Array("ES", "1111222@", "334444444444", "71"),
  new Array("ES", "11112222", "X34444444444", "71"),
  new Array("ES", "11112222", "3@4444444444", "71"),
  new Array("ES", "11112222", "33X444444444", "71"),
  new Array("ES", "11112222", "33444444444@", "71"),
  new Array("FI", "111111", "22222223", "68"),
  new Array("FI", "11111", "22222223", "68"),
  new Array("FI", "X11111", "22222223", "68"),
  new Array("FI", "11111@", "22222223", "68"),
  new Array("FI", "111111", "X2222223", "68"),
  new Array("FI", "111111", "222222@3", "68"),
  new Array("FI", "111111", "2222222X", "68"),
  new Array("FO", "1111", "2222222223", "49"),
  new Array("FO", "111", "2222222223", "49"),
  new Array("FO", "X111", "2222222223", "49"),
  new Array("FO", "111@", "2222222223", "49"),
  new Array("FO", "1111", "X222222223", "49"),
  new Array("FO", "1111", "22222222@3", "49"),
  new Array("FO", "1111", "222222222X", "49"),
  new Array("FR", "1111122222", "C3C3C3C3C3C44", "44"),
  new Array("FR", "111112222", "C3C3C3C3C3C44", "44"),
  new Array("FR", "X111122222", "C3C3C3C3C3C44", "44"),
  new Array("FR", "1111@22222", "C3C3C3C3C3C44", "44"),
  new Array("FR", "11111X2222", "C3C3C3C3C3C44", "44"),
  new Array("FR", "111112222@", "C3C3C3C3C3C44", "44"),
  new Array("FR", "1111122222", "@3C3C3C3C3C44", "44"),
  new Array("FR", "1111122222", "C3C3C3C3C3@44", "44"),
  new Array("FR", "1111122222", "C3C3C3C3C3CX4", "44"),
  new Array("FR", "1111122222", "C3C3C3C3C3C4@", "44"),
  new Array("GB", "AAAA222222", "33333333", "45"),
  new Array("GB", "AAAA22222", "33333333", "45"),
  new Array("GB", "8AAA222222", "33333333", "45"),
  new Array("GB", "AAA@222222", "33333333", "45"),
  new Array("GB", "AAAAX22222", "33333333", "45"),
  new Array("GB", "AAAA22222@", "33333333", "45"),
  new Array("GB", "AAAA222222", "X3333333", "45"),
  new Array("GB", "AAAA222222", "3333333@", "45"),
  new Array("GE", "AA", "2222222222222222", "98"),
  new Array("GE", "A", "2222222222222222", "98"),
  new Array("GE", "8A", "2222222222222222", "98"),
  new Array("GE", "A@", "2222222222222222", "98"),
  new Array("GE", "AA", "X222222222222222", "98"),
  new Array("GE", "AA", "222222222222222@", "98"),
  new Array("GI", "AAAA", "B2B2B2B2B2B2B2B", "72"),
  new Array("GI", "AAA", "B2B2B2B2B2B2B2B", "72"),
  new Array("GI", "8AAA", "B2B2B2B2B2B2B2B", "72"),
  new Array("GI", "AAA@", "B2B2B2B2B2B2B2B", "72"),
  new Array("GI", "AAAA", "@2B2B2B2B2B2B2B", "72"),
  new Array("GI", "AAAA", "B2B2B2B2B2B2B2@", "72"),
  new Array("GL", "1111", "2222222223", "49"),
  new Array("GL", "111", "2222222223", "49"),
  new Array("GL", "X111", "2222222223", "49"),
  new Array("GL", "111@", "2222222223", "49"),
  new Array("GL", "1111", "X222222223", "49"),
  new Array("GL", "1111", "22222222@3", "49"),
  new Array("GL", "1111", "222222222X", "49"),
  new Array("GR", "1112222", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "111222", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "X112222", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "11@2222", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "111X222", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "111222@", "C3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "1112222", "@3C3C3C3C3C3C3C3", "61"),
  new Array("GR", "1112222", "C3C3C3C3C3C3C3C@", "61"),
  new Array("HR", "1111111", "2222222222", "94"),
  new Array("HR", "111111", "2222222222", "94"),
  new Array("HR", "X111111", "2222222222", "94"),
  new Array("HR", "111111@", "2222222222", "94"),
  new Array("HR", "1111111", "X222222222", "94"),
  new Array("HR", "1111111", "222222222@", "94"),
  new Array("HU", "1112222", "34444444444444445", "35"),
  new Array("HU", "111222", "34444444444444445", "35"),
  new Array("HU", "X112222", "34444444444444445", "35"),
  new Array("HU", "11@2222", "34444444444444445", "35"),
  new Array("HU", "111X222", "34444444444444445", "35"),
  new Array("HU", "111222@", "34444444444444445", "35"),
  new Array("HU", "1112222", "X4444444444444445", "35"),
  new Array("HU", "1112222", "3X444444444444445", "35"),
  new Array("HU", "1112222", "344444444444444@5", "35"),
  new Array("HU", "1112222", "3444444444444444X", "35"),
  new Array("IE", "AAAA222222", "33333333", "18"),
  new Array("IE", "AAAA22222", "33333333", "18"),
  new Array("IE", "8AAA222222", "33333333", "18"),
  new Array("IE", "AAA@222222", "33333333", "18"),
  new Array("IE", "AAAAX22222", "33333333", "18"),
  new Array("IE", "AAAA22222@", "33333333", "18"),
  new Array("IE", "AAAA222222", "X3333333", "18"),
  new Array("IE", "AAAA222222", "3333333@", "18"),
  new Array("IL", "111222", "3333333344", "64"),
  new Array("IL", "11122", "3333333344", "64"),
  new Array("IL", "X11222", "3333333344", "64"),
  new Array("IL", "11@222", "3333333344", "64"),
  new Array("IL", "111X22", "3333333344", "64"),
  new Array("IL", "11122@", "3333333344", "64"),
  new Array("IL", "111222", "X333333333333", "64"),
  new Array("IL", "111222", "333333333333@", "64"),
  new Array("IS", "1111", "223333333333333333", "12"),
  new Array("IS", "111", "223333333333333333", "12"),
  new Array("IS", "X111", "223333333333333333", "12"),
  new Array("IS", "111@", "223333333333333333", "12"),
  new Array("IS", "1111", "X23333333333333333", "12"),
  new Array("IS", "1111", "2@3333333333333333", "12"),
  new Array("IS", "1111", "22X333333333333333", "12"),
  new Array("IS", "1111", "22333333333333333@", "12"),
  new Array("IT", "A2222233333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "A222223333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "82222233333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "AX222233333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "A2222@33333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "A22222X3333", "D4D4D4D4D4D4", "43"),
  new Array("IT", "A222223333@", "D4D4D4D4D4D4", "43"),
  new Array("IT", "A2222233333", "@4D4D4D4D4D4", "43"),
  new Array("IT", "A2222233333", "D4D4D4D4D4D@", "43"),
  new Array("KW", "AAAA", "B2B2B2B2B2B2B2B2B2B2B2", "93"),
  new Array("KW", "AAA", "B2B2B2B2B2B2B2B2B2B2B2", "93"),
  new Array("KW", "8AAA", "B2B2B2B2B2B2B2B2B2B2B2", "93"),
  new Array("KW", "AAA@", "B2B2B2B2B2B2B2B2B2B2B2", "93"),
  new Array("KW", "AAAA", "@2B2B2B2B2B2B2B2B2B2B2", "93"),
  new Array("KW", "AAAA", "B2B2B2B2B2B2B2B2B2B2B@", "93"),
  new Array("KZ", "111", "B2B2B2B2B2B2B", "21"),
  new Array("KZ", "11", "B2B2B2B2B2B2B", "21"),
  new Array("KZ", "X11", "B2B2B2B2B2B2B", "21"),
  new Array("KZ", "11@", "B2B2B2B2B2B2B", "21"),
  new Array("KZ", "111", "@2B2B2B2B2B2B", "21"),
  new Array("KZ", "111", "B2B2B2B2B2B2@", "21"),
  new Array("LB", "1111", "B2B2B2B2B2B2B2B2B2B2", "88"),
  new Array("LB", "111", "B2B2B2B2B2B2B2B2B2B2", "88"),
  new Array("LB", "X111", "B2B2B2B2B2B2B2B2B2B2", "88"),
  new Array("LB", "111@", "B2B2B2B2B2B2B2B2B2B2", "88"),
  new Array("LB", "1111", "@2B2B2B2B2B2B2B2B2B2", "88"),
  new Array("LB", "1111", "B2B2B2B2B2B2B2B2B2B@", "88"),
  new Array("LI", "11111", "B2B2B2B2B2B2", "73"),
  new Array("LI", "1111", "B2B2B2B2B2B2", "73"),
  new Array("LI", "X1111", "B2B2B2B2B2B2", "73"),
  new Array("LI", "1111@", "B2B2B2B2B2B2", "73"),
  new Array("LI", "11111", "@2B2B2B2B2B2", "73"),
  new Array("LI", "11111", "B2B2B2B2B2B@", "73"),
  new Array("LT", "11111", "22222222222", "15"),
  new Array("LT", "1111", "22222222222", "15"),
  new Array("LT", "X1111", "22222222222", "15"),
  new Array("LT", "1111@", "22222222222", "15"),
  new Array("LT", "11111", "X2222222222", "15"),
  new Array("LT", "11111", "2222222222@", "15"),
  new Array("LU", "111", "B2B2B2B2B2B2B", "27"),
  new Array("LU", "11", "B2B2B2B2B2B2B", "27"),
  new Array("LU", "X11", "B2B2B2B2B2B2B", "27"),
  new Array("LU", "11@", "B2B2B2B2B2B2B", "27"),
  new Array("LU", "111", "@2B2B2B2B2B2B", "27"),
  new Array("LU", "111", "B2B2B2B2B2B2@", "27"),
  new Array("LV", "AAAA", "B2B2B2B2B2B2B", "86"),
  new Array("LV", "AAA", "B2B2B2B2B2B2B", "86"),
  new Array("LV", "8AAA", "B2B2B2B2B2B2B", "86"),
  new Array("LV", "AAA@", "B2B2B2B2B2B2B", "86"),
  new Array("LV", "AAAA", "@2B2B2B2B2B2B", "86"),
  new Array("LV", "AAAA", "B2B2B2B2B2B2@", "86"),
  new Array("MC", "1111122222", "C3C3C3C3C3C44", "26"),
  new Array("MC", "111112222", "C3C3C3C3C3C44", "26"),
  new Array("MC", "X111122222", "C3C3C3C3C3C44", "26"),
  new Array("MC", "1111@22222", "C3C3C3C3C3C44", "26"),
  new Array("MC", "11111X2222", "C3C3C3C3C3C44", "26"),
  new Array("MC", "111112222@", "C3C3C3C3C3C44", "26"),
  new Array("MC", "1111122222", "@3C3C3C3C3C44", "26"),
  new Array("MC", "1111122222", "C3C3C3C3C3@44", "26"),
  new Array("MC", "1111122222", "C3C3C3C3C3CX4", "26"),
  new Array("MC", "1111122222", "C3C3C3C3C3C4@", "26"),
  new Array("ME", "111", "222222222222233", "38"),
  new Array("ME", "11", "222222222222233", "38"),
  new Array("ME", "X11", "222222222222233", "38"),
  new Array("ME", "11@", "222222222222233", "38"),
  new Array("ME", "111", "X22222222222233", "38"),
  new Array("ME", "111", "222222222222@33", "38"),
  new Array("ME", "111", "2222222222222X3", "38"),
  new Array("ME", "111", "22222222222223@", "38"),
  new Array("MK", "111", "B2B2B2B2B233", "41"),
  new Array("MK", "11", "B2B2B2B2B233", "41"),
  new Array("MK", "X11", "B2B2B2B2B233", "41"),
  new Array("MK", "11@", "B2B2B2B2B233", "41"),
  new Array("MK", "111", "@2B2B2B2B233", "41"),
  new Array("MK", "111", "B2B2B2B2B@33", "41"),
  new Array("MK", "111", "B2B2B2B2B2X3", "41"),
  new Array("MK", "111", "B2B2B2B2B23@", "41"),
  new Array("MR", "1111122222", "3333333333344", "21"),
  new Array("MR", "111112222", "3333333333344", "21"),
  new Array("MR", "X111122222", "3333333333344", "21"),
  new Array("MR", "1111@22222", "3333333333344", "21"),
  new Array("MR", "11111X2222", "3333333333344", "21"),
  new Array("MR", "111112222@", "3333333333344", "21"),
  new Array("MR", "1111122222", "X333333333344", "21"),
  new Array("MR", "1111122222", "3333333333@44", "21"),
  new Array("MR", "1111122222", "33333333333X4", "21"),
  new Array("MR", "1111122222", "333333333334@", "21"),
  new Array("MT", "AAAA22222", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAAA2222", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "8AAA22222", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAA@22222", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAAAX2222", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAAA2222@", "C3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAAA22222", "@3C3C3C3C3C3C3C3C3", "39"),
  new Array("MT", "AAAA22222", "C3C3C3C3C3C3C3C3C@", "39"),
  new Array("MU", "AAAA2222", "333333333333333DDD", "37"),
  new Array("MU", "AAAA222", "333333333333333DDD", "37"),
  new Array("MU", "8AAA2222", "333333333333333DDD", "37"),
  new Array("MU", "AAA@2222", "333333333333333DDD", "37"),
  new Array("MU", "AAAAX222", "333333333333333DDD", "37"),
  new Array("MU", "AAAA222@", "333333333333333DDD", "37"),
  new Array("MU", "AAAA2222", "X33333333333333DDD", "37"),
  new Array("MU", "AAAA2222", "33333333333333@DDD", "37"),
  new Array("MU", "AAAA2222", "3333333333333338DD", "37"),
  new Array("MU", "AAAA2222", "333333333333333DD@", "37"),
  new Array("NL", "AAAA", "2222222222", "57"),
  new Array("NL", "AAA", "2222222222", "57"),
  new Array("NL", "8AAA", "2222222222", "57"),
  new Array("NL", "AAA@", "2222222222", "57"),
  new Array("NL", "AAAA", "X222222222", "57"),
  new Array("NL", "AAAA", "222222222@", "57"),
  new Array("NO", "1111", "2222223", "40"),
  new Array("NO", "111", "2222223", "40"),
  new Array("NO", "X111", "2222223", "40"),
  new Array("NO", "111@", "2222223", "40"),
  new Array("NO", "1111", "X222223", "40"),
  new Array("NO", "1111", "22222@3", "40"),
  new Array("NO", "1111", "222222X", "40"),
  new Array("PL", "11111111", "2222222222222222", "84"),
  new Array("PL", "1111111", "2222222222222222", "84"),
  new Array("PL", "X1111111", "2222222222222222", "84"),
  new Array("PL", "1111111@", "2222222222222222", "84"),
  new Array("PL", "11111111", "X222222222222222", "84"),
  new Array("PL", "11111111", "222222222222222@", "84"),
  new Array("PT", "11112222", "3333333333344", "59"),
  new Array("PT", "1111222", "3333333333344", "59"),
  new Array("PT", "X1112222", "3333333333344", "59"),
  new Array("PT", "111@2222", "3333333333344", "59"),
  new Array("PT", "1111X222", "3333333333344", "59"),
  new Array("PT", "1111222@", "3333333333344", "59"),
  new Array("PT", "11112222", "X333333333344", "59"),
  new Array("PT", "11112222", "3333333333@44", "59"),
  new Array("PT", "11112222", "33333333333X4", "59"),
  new Array("PT", "11112222", "333333333334@", "59"),
  new Array("RO", "AAAA", "B2B2B2B2B2B2B2B2", "91"),
  new Array("RO", "AAA", "B2B2B2B2B2B2B2B2", "91"),
  new Array("RO", "8AAA", "B2B2B2B2B2B2B2B2", "91"),
  new Array("RO", "AAA@", "B2B2B2B2B2B2B2B2", "91"),
  new Array("RO", "AAAA", "@2B2B2B2B2B2B2B2", "91"),
  new Array("RO", "AAAA", "B2B2B2B2B2B2B2B@", "91"),
  new Array("RS", "111", "222222222222233", "48"),
  new Array("RS", "11", "222222222222233", "48"),
  new Array("RS", "X11", "222222222222233", "48"),
  new Array("RS", "11@", "222222222222233", "48"),
  new Array("RS", "111", "X22222222222233", "48"),
  new Array("RS", "111", "222222222222@33", "48"),
  new Array("RS", "111", "2222222222222X3", "48"),
  new Array("RS", "111", "22222222222223@", "48"),
  new Array("SA", "11", "B2B2B2B2B2B2B2B2B2", "46"),
  new Array("SA", "1", "B2B2B2B2B2B2B2B2B2", "46"),
  new Array("SA", "X1", "B2B2B2B2B2B2B2B2B2", "46"),
  new Array("SA", "1@", "B2B2B2B2B2B2B2B2B2", "46"),
  new Array("SA", "11", "@2B2B2B2B2B2B2B2B2", "46"),
  new Array("SA", "11", "B2B2B2B2B2B2B2B2B@", "46"),
  new Array("SE", "111", "22222222222222223", "32"),
  new Array("SE", "11", "22222222222222223", "32"),
  new Array("SE", "X11", "22222222222222223", "32"),
  new Array("SE", "11@", "22222222222222223", "32"),
  new Array("SE", "111", "X2222222222222223", "32"),
  new Array("SE", "111", "222222222222222@3", "32"),
  new Array("SE", "111", "2222222222222222X", "32"),
  new Array("SI", "11111", "2222222233", "92"),
  new Array("SI", "1111", "2222222233", "92"),
  new Array("SI", "X1111", "2222222233", "92"),
  new Array("SI", "1111@", "2222222233", "92"),
  new Array("SI", "11111", "X222222233", "92"),
  new Array("SI", "11111", "2222222@33", "92"),
  new Array("SI", "11111", "22222222X3", "92"),
  new Array("SI", "11111", "222222223@", "92"),
  new Array("SK", "1111", "2222222222222222", "66"),
  new Array("SK", "111", "2222222222222222", "66"),
  new Array("SK", "X111", "2222222222222222", "66"),
  new Array("SK", "111@", "2222222222222222", "66"),
  new Array("SK", "1111", "X222222222222222", "66"),
  new Array("SK", "1111", "222222222222222@", "66"),
  new Array("SM", "A2222233333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "A222223333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "82222233333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "AX222233333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "A2222@33333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "A22222X3333", "D4D4D4D4D4D4", "71"),
  new Array("SM", "A222223333@", "D4D4D4D4D4D4", "71"),
  new Array("SM", "A2222233333", "@4D4D4D4D4D4", "71"),
  new Array("SM", "A2222233333", "D4D4D4D4D4D@", "71"),
  new Array("TN", "11222", "333333333333344", "23"),
  new Array("TN", "1122", "333333333333344", "23"),
  new Array("TN", "X1222", "333333333333344", "23"),
  new Array("TN", "1@222", "333333333333344", "23"),
  new Array("TN", "11X22", "333333333333344", "23"),
  new Array("TN", "1122@", "333333333333344", "23"),
  new Array("TN", "11222", "X33333333333344", "23"),
  new Array("TN", "11222", "333333333333@44", "23"),
  new Array("TN", "11222", "3333333333333X4", "23"),
  new Array("TN", "11222", "33333333333334@", "23"),
  new Array("TR", "11111", "BC3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "1111", "BC3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "X1111", "BC3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "1111@", "BC3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "11111", "@C3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "11111", "B@3C3C3C3C3C3C3C3", "95"),
  new Array("TR", "11111", "BC3C3C3C3C3C3C3C@", "95"),
  new Array("DE", "12345678", "5", "06"),
  new Array("DE", "12345678", "16", "97"),
  new Array("DE", "12345678", "16", "00"),
  new Array("DE", "12345678", "95", "98"),
  new Array("DE", "12345678", "95", "01"));


// Translation table and translation function for localized versions
var trans_tab = new Array();

function _(s) {
    var t = trans_tab[s];
    if (t)
        s = t;
    return s;
}

// Fill the translation table
function fill_trans_tab(trans_data) {
    for (var i = 0; i < trans_data.length / 2; ++i)
        trans_tab[trans_data[2 * i]] = trans_data[2 * i + 1];

    // Translate the country names in the iban_data list
    for (var i = 0; i < iban_data.length; ++i)
        iban_data[i].name = _(iban_data[i].name);
}


// Set debug_output = true if location ends with a hash or a quotation mark
var debug_output = (location.href.charAt(location.href.length - 1) == "#") ||
                   (location.href.charAt(location.href.length - 1) == "?");

if (debug_output)
    debug_iban_data();

function debug_iban_data() {
    var s = "";
    for (var i = 0; i < iban_data.length; ++i) {
        var country = iban_data[i];
        s += country.name + " / " + country.code + " / ";
        for (var f = 0; f < country.bank.length; ++f)
            s += country.bank[f][0] + country.bank[f][1];
        s += " = " + country.bank_lng + " / ";
        for (var f = 0; f < country.acc.length; ++f)
            s += country.acc[f][0] + country.acc[f][1];
        s += " = " + country.acc_lng + " / " + country.total_lng + "\n";
    }
    alert(s);
}

function debug_check_vars() {
    var o = false;
    var s = "";
    for (var v in window) {
        if (o)
            s += "" + v + "=" + window[v] + "\n";
        if (v == "debug_check_vars")
            o = true;
    }
    if (s != "")
        alert("vars:\n" + s);
    else
        alert("no vars");
}


// dolnok pre SK IBAN

// Kontrola kodu banky
function InvalidKodBanky(kodBanky) {
    if (kodBanky == '0200') return false;
    if (kodBanky == '0900') return false;
    if (kodBanky == '0720') return false;
    if (kodBanky == '1100') return false;
    if (kodBanky == '1111') return false;
    if (kodBanky == '3000') return false;
    if (kodBanky == '3100') return false;
    if (kodBanky == '5200') return false;
    if (kodBanky == '5600') return false;
    if (kodBanky == '5900') return false;
    if (kodBanky == '6500') return false;
    if (kodBanky == '7300') return false;
    if (kodBanky == '7500') return false;
    if (kodBanky == '7930') return false;
    if (kodBanky == '8050') return false;
    if (kodBanky == '8100') return false;
    if (kodBanky == '8120') return false;
    if (kodBanky == '8130') return false;
    if (kodBanky == '8170') return false;
    if (kodBanky == '8160') return false;
    if (kodBanky == '8180') return false;
    if (kodBanky == '8191') return false;
    if (kodBanky == '8400') return false;
    if (kodBanky == '8320') return false;
    if (kodBanky == '8330') return false;
    if (kodBanky == '8350') return false;
    if (kodBanky == '8360') return false;
    if (kodBanky == '8370') return false;
    if (kodBanky == '8390') return false;
    if (kodBanky == '8410') return false;
    if (kodBanky == '8420') return false;
    if (kodBanky == '8430') return false;
    if (kodBanky == '1030') return false;
    if (kodBanky == '9950') return false;
    if (kodBanky == '9951') return false;
    if (kodBanky == '9952') return false;
    if (kodBanky == '2010') return false;

    return true;
}


// Kontrola predcislia
function InvalidPredcislie(ibanPart) {
    var predcislie = ibanPart.substring(0, 6);
    var jePredcislie = false;
    var pSucet;

    if (predcislie.charAt(5))
        pSucet = Number(predcislie.charAt(5)); // cislo * 1
    if (predcislie.charAt(4))
        pSucet = pSucet + predcislie.charAt(4) * 2;
    if (predcislie.charAt(3))
        pSucet = pSucet + predcislie.charAt(3) * 4;
    if (predcislie.charAt(2))
        pSucet = pSucet + predcislie.charAt(2) * 8;
    if (predcislie.charAt(1))
        pSucet = pSucet + predcislie.charAt(1) * 5;
    if (predcislie.charAt(0))
        pSucet = pSucet + predcislie.charAt(0) * 10;

    if (pSucet % 11 == 0)
        jePredcislie = true;

    return !jePredcislie;
}

// Kontrola cisla
function InvalidCislo(ibanPart) {
    var cislo = ibanPart.substring(6);
    var jeCislo = false;
    var cSucet;

    if (cislo.charAt(9))
        cSucet = Number(cislo.charAt(9)); // cislo * 1
    if (cislo.charAt(8))
        cSucet = cSucet + cislo.charAt(8) * 2;
    if (cislo.charAt(7))
        cSucet = cSucet + cislo.charAt(7) * 4;
    if (cislo.charAt(6))
        cSucet = cSucet + cislo.charAt(6) * 8;
    if (cislo.charAt(5))
        cSucet = cSucet + cislo.charAt(5) * 5;
    if (cislo.charAt(4))
        cSucet = cSucet + cislo.charAt(4) * 10;
    if (cislo.charAt(3))
        cSucet = cSucet + cislo.charAt(3) * 9;
    if (cislo.charAt(2))
        cSucet = cSucet + cislo.charAt(2) * 7;
    if (cislo.charAt(1))
        cSucet = cSucet + cislo.charAt(1) * 3;
    if (cislo.charAt(0))
        cSucet = cSucet + cislo.charAt(0) * 6;

    if (cSucet % 11 == 0)
        jeCislo = true;

    return !jeCislo;
}


// funkcie pre IBAN

function IbanExamples() {
    var ibans = '';

    for (i = 0; i < examples.length; i++) {
        ibans += examples[i][0] + examples[i][3] + examples[i][1] + examples[i][2] + '\r\n';
    }

    return ibans;
}

function CheckIbanExamples() {
    var checkResult = '';
    var iban = '';
    var result = '';

    for (i = 0; i < examples.length; i++) {
        iban = examples[i][0] + examples[i][3] + examples[i][1] + examples[i][2];
        result = CheckIBAN(iban);

        if (result == 1)
            checkResult += 'IBAN ' + iban + ' je OK\r\n';
        else
            checkResult += 'IBAN ' + iban + ' ' + result + '\r\n';
    }

    return checkResult;
}

function CheckTheseIbans(stringIbans) {
    var ibans = stringIbans.split(',');
    var checkResult = '';
    var iban = '';
    var result = '';

    for (i = 0; i < ibans.length; i++) {
        iban = ibans[i];
        result = CheckIBAN(iban);

        if (result == 1)
            checkResult += 'IBAN ' + iban + ' je OK\r\n';
        else
            checkResult += 'IBAN ' + iban + ' ' + result + '\r\n';
    }

    return checkResult;
}