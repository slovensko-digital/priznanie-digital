var useAttachs = false;
var attachmentsDataArray = new Object();
var fillerUri = "http://1MNQ2X1/eGO.Filler.WS/FillerService.svc/rest/";

$(document).ready(function () {
    //istvan
    if (!window.addEventListener) {
        window.attachEvent("onmessage", eform.receiveMessage);
    }
    else {
        window.addEventListener("message", eform.receiveMessage, false);
    }

    //defend form submit on enter
    $('form').bind("keypress", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            //ak je text area, tak enter mozeme povolit
            if (e.target.type != 'textarea') {
                e.preventDefault();
                return false;
            }
        }
    });

});

function ClearForm(loadxml) {
    var element = 'form';
    //$(element).ResetRepetitionSection();
    $(element).find(':input').each(function () {
        //ak je to disabled (napr.: kod statu), to treba nechat
        if ($(this).attr('disabled')) {
            return true;
        }
        switch (this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });

    $('.pageableSection', element)
        .each(function (_, section) {
            var pageableSection = $(section).pageableSection();
            if (pageableSection) {
                pageableSection.resetSection();
            }
        });
    window.validatorObject.resetForm()


    // Pri clearForm odstranit opakovacie sekcie
    var layoutRow = $('div[id$=_Repeating_1]');

    for (var i = 0; i < layoutRow.length; i++) {
        removeRepeatSections(GetValueWithoutIncremental(layoutRow[i].id));
    }

    // Load defaultXml
    if(!loadxml)
        LoadDefaultXml();



    //treba oznacit prvy radiobutton, ak je to radiobuttonlist
    //var previousName = '';
    //$(element).find(':input:radio').each(function() {
    //	if (previousName !== this.name){
    //		this.checked = true;
    //		previousName = this.name;
    //	}
    //});
}

//istvan
var ResourceType = {
    XSLT_NATIVE_TO_EDOC: 1,
    XSLT_EDOC_TO_NATIVE: 2,
    XSD_EDOC_SIGN: 3,
    XSLT_EDOC_TXT_SIGN: 4,
    XSLT_NATIVE_TO_FDF: 5,
    PDF: 6,
    XSLT_EDOC_HTML_SIGN: 7,
    JS: 8,
    CSS: 9,
    FDF: 10,
    HELP: 11,
    XSLT_FO: 12
};

(function (eform, undefined) {
    //eform.fdfDoc = '';

    var xmlDoc;

    eform.Typ = '';

    //public funkcia
    eform.receiveMessage = function (event) {

        var eventName = event.data.split('::::')[0];
        var eventData = event.data.split('::::')[1];

        switch (eventName) {
            case 'Sign':
                var ok = eform.validate();
                var transformed = eform.getfinalxml();
                var xsd;
                var xslt;
                var jsonObj;
                if (ok < 5) {
                    jsonObj = getFilesForSign(transformed);
                }
                else {
                    jsonObj = {
                        xmldata: transformed
                    }
                }

                event.source.postMessage(eventName + '::::' + (ok) + "¶¶¶¶" + eform.Typ + "¶¶¶¶" + JSON.stringify(jsonObj) + "¶¶¶¶" + eform.getDefaultData(), event.origin);
                break;
            case 'validate':
                var ok = eform.validate();
                var transformed = eform.getfinalxml();
                event.source.postMessage(eventName + '::::' + (ok) + "¶¶¶¶" + eform.Typ + "¶¶¶¶" + transformed, event.origin);
                break;
        	case 'print':
				//kvoli formularom, ktore nepodporuju tlac
        		if ($.isFunction(window.allowformprint)) {
        			var res = allowformprint();
        			if (res != null && res != undefined && res != true) {
        				event.source.postMessage('ShowMessage' + '::::' + res.replace('\n', '<br/>'), event.origin);
        				break;
        			}
        		}
                var transformed = {
                    FDF2Print: [],
                    PDF2Print: []
                }
                var ok = eform.validate();
                if (ok < 5) {
                    //kvoli nekonecnemu cyklu
                    var numberOfSections = 0;
                    if ($('form')) {
                        var sections = $('.pageableSection', $('form'));
                        numberOfSections = sections.length == 0 ? 1 : sections.length;
                    }

                    if (!GetExternalResource(ResourceType.PDF, null)) {
                    	event.source.postMessage('ShowMessage' + '::::' + 'Formulár neobsahuje tlačenú PDF predlohu. Formulár bude vytlačený pomocou funkcie webového prehliadača na tlač HTML dokumentu.', event.origin);
                    	//fdf
                    	printRecursive(0, 0, transformed, numberOfSections);
                    	break;
                    }

                    //fdf
                    printRecursive(0, 0, transformed, numberOfSections);

                	//pdf
                    var pdfsTemp = GetExternalResourceIndex(ResourceType.PDF);
                    if (pdfsTemp) {
                    	var pdfs = pdfsTemp.split('|');
                    	if (pdfs) {
                    		var path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                    		for (var i = 0; i < pdfs.length; i++) {
                    			if (pdfs[i] != 'Potvrdenie') {
                    				var pdf = GetExternalResource(ResourceType.PDF, pdfs[i]);
                    				if (pdf) {
                    					transformed.PDF2Print.push(path + pdf);
                    				}
                    			}
                    		}
                    	}
                    }
                }
                event.source.postMessage(eventName + '::::' + (ok) + "¶¶¶¶" + JSON.stringify(transformed), event.origin);
                break;
            case 'Save2File':
            case 'Save2PFS':
                var ok = eform.validate();
                var transformed = eform.getfinalxml();
                event.source.postMessage(eventName + '::::' + (ok) + "¶¶¶¶" + eform.Typ + "¶¶¶¶" + transformed + "¶¶¶¶" + eform.getDefaultData(), event.origin);
                break;
            case 'LoadFromFile':
                var result = eform.setfinalxml(eventData);
                if (result && result != 'success') {
                	event.source.postMessage(eventName + '::::' + result + "¶¶¶¶" + existsPotvrdenie() + '¶¶¶¶' + gettyppodania(), event.origin);
                }
                else {
                	event.source.postMessage(eventName + '::::' + result + "¶¶¶¶" + existsPotvrdenie() + '¶¶¶¶' + gettyppodania(), event.origin);
                }
                break;
            case 'SetReadonly':
                eform.setReadonly(eventData);
                //event.source.postMessage(eventName, event.origin);
                break;
            case 'LoadDefault':
                if (eventData) {
                    eform.loadDefaultData(eventData);
                }
                event.source.postMessage(eventName + '::::' + gettyppodania() + "¶¶¶¶" + existsPotvrdenie(), event.origin);
                break;
            case 'Clear':
                window.ClearForm(false);
                if (eventData) {
                    eform.loadDefaultData(eventData);
                }
                break;
            case 'Help':
                var fileName = GetExternalResource(ResourceType.HELP, null);
                if (fileName) {
                	var path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                	window.open(path + fileName, '_blank');
                }
                else {
                	event.source.postMessage('ShowMessage' + '::::' + 'Poučenie k tomuto formuláru nie je dostupné.', event.origin);
                }
                break;
        	case 'Confirmation':
        		var transformed;
        		var ok = eform.validate();
        		if (ok < 5) {
        			transformed = eform.createConfirmation();
        		}
        		event.source.postMessage(eventName + '::::' + (ok) + "¶¶¶¶" + JSON.stringify(transformed), event.origin);
        		break;
        	case 'Type':
        		event.source.postMessage(eventName + '::::' + gettyppodania(), event.origin);
        		break;
            default:
                break;
        }
    }

    var existsPotvrdenie = function () {
    	if (GetExternalResource(ResourceType.PDF, 'Potvrdenie')) {
    		return '1';
    	}
    	else {
    		return '0';
    	}
    }

    //private funkcie
    var getFilesForSign = function (data) {
        var jsonObj;
        var xsdfile = window.location.href.replace('.html', '.sk.xsd');
        var xslfile = window.location.href.replace('.html', '.sb.xslt');
        if ($.isFunction(window.GetExternalResource)) {
            if (GetExternalResource(ResourceType.XSD_EDOC_SIGN, 0)) {
                xsdfile = GetExternalResource(ResourceType.XSD_EDOC_SIGN, 0);
            }
            if (GetExternalResource(ResourceType.XSLT_EDOC_TXT_SIGN, 0)) {
                xslfile = GetExternalResource(ResourceType.XSLT_EDOC_TXT_SIGN, 0);
            }
        }
        var xsd = importFile(xsdfile, 'xml');
        var xslt = importFile(xslfile, 'xml');

        if (!(xsd && xslt)) {
            alert('Nepodarilo sa nájsť príslušné xsd/xslt.');
            return;
        }

        jsonObj = {
            xmldata: data,
            xsddata: xsd,
            xsltdata: xslt
        };

        return jsonObj;
    }

    //eform.print2fileEdane = function (segment, index) {
    //	window.neprepisovatZnakyFdf = true;
    //	return eform.print2file (segment, index);
    //}

    var getFileNameFor = function (extension, id, segment) {
        var path = window.location.pathname,
			filename = path.substr(path.lastIndexOf('/') + 1).replace('.html', '');

        if (extension) {
            filename += (id !== undefined ? '_' + id : '') + (segment !== undefined ? segment : '') + '.' + extension;
        }

        return filename;
    }

    var printRecursive = function (fdfId, segmentId, resultArray, maximum) {
        var result = eform.print2file(fdfId, segmentId);
        if (result) {
            resultArray.FDF2Print[resultArray.FDF2Print.length] = { filename: getFileNameFor('fdf', fdfId, segmentId), content: result }
            if (fdfId === 0) {
                printRecursive(1, 0, resultArray, maximum);
            } else {
                printRecursive(fdfId, ++segmentId, resultArray, maximum);
            }
        } else {
            if (fdfId > 0 && fdfId < maximum) {
                printRecursive(++fdfId, 0, resultArray, maximum);
            }
        }
    }

    eform.print2file = function (segment, index) {
        var result;
        var fdf_xsl = GetExternalResource(ResourceType.XSLT_NATIVE_TO_FDF, segment);
        if (fdf_xsl == null && !$.isFunction(window.createfdf)) {
        	if (segment > 0 || index > 0) return null;

            if (window.ActiveXObject || "ActiveXObject" in window) {
            	document.execCommand('print', false, null);
            }
            else {
            	window.print();
            }
            return null;
        }
        else if ($.isFunction(window.createfdf)) {
            //var fdf_fdf = GetExternalResource(ResourceType.FDF, id);
            //eform.fdfDoc = importFile(fdf_fdf, 'fdf');
            result = createfdf(segment, index);
        }
        else if (fdf_xsl != null) {
            if (segment > 0 || index > 0) return null;
            var native = GenerateNativeXml();
            result = transformWithXSLT(native, fdf_xsl);
        }
        return result;
    }

    eform.setfinalxml = function (data) {
        try {
            window.ClearForm(true);
            var final = data;
            //mazanie zbytocnych medzier pred <![CDATA[
            final = final.replace(/>(\s*)<!\[CDATA\[/g, "><![CDATA[");
            //mazanie zbytocnych medzier za ]]>
            final = final.replace(/\]\]>(\s*)<\//g, "]]></");
            final = final.replace(/>(\s*)</g, "><");
			final = final.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ');
            var f2n_xsl = GetExternalResource(ResourceType.XSLT_EDOC_TO_NATIVE, 0);
            if (f2n_xsl == null && !$.isFunction(window.loadxmlfinal)) {
                FillNativeXml(final);
            }
            else if ($.isFunction(window.loadxmlfinal)) {
                loadxmlfinal(final);
                // trim text fields
				$('form input[type="text"]').each(function(){
					$(this).val($(this).val().trim());
				});

            }
            else if (f2n_xsl != null) {
                var native = transformWithXSLT(final, f2n_xsl);
                FillNativeXml(native);
            }
            iterateAllPageableSections();
            return 'success';
        }
        catch (error) {
            window.ClearForm(true);
            return "Formát vstupného XML súboru nezodpovedá vybranému typu dokumentu.";
        }
    }

    eform.getfinalxml = function () {
        var result;
        var n2f_xsl = GetExternalResource(ResourceType.XSLT_NATIVE_TO_EDOC, 0);
        if (n2f_xsl == null && !$.isFunction(window.createxmlfinal)) {
            result = GenerateNativeXml();;
        }
        else if ($.isFunction(window.createxmlfinal)) {
            result = createxmlfinal();
        }
        else if (n2f_xsl != null) {
            result = transformWithXSLT(GenerateNativeXml(), n2f_xsl);
        }
        return result;
    }

    eform.validate = function (withQuestion) {
        if ($.isFunction(window.gettyppodania)) {
            eform.Typ = gettyppodania();
        }
        var validator = $('form').validate();
        validator.form();
        if (validator.numberOfErrors() > 0) {
            return 9;
        }
        if (validator.numberOfInvalids() > 0) {
            if (withQuestion && !confirm("Formulár obsahuje chyby. Naozaj chcete pokračovať?")) {
                return 8;
            }
            return 1;
        }
        return 0;
    }

    eform.setReadonly = function (readonly) {
        $(document.forms[0]).find(':input').each(function () {
            if ($(this).hasClass('datepicker') || $(this).hasClass('comboBox') || $(this).hasClass('checkBox') || $(this).hasClass('button') || $(this).attr('type') == 'radio') {
                if (readonly) {
                    $(this).attr('disabled', 'disabled');
                }
                else {
                    $(this).removeAttr('disabled');
                }
            }
            else {
                if (readonly) {
                    $(this).attr('readonly', 'readonly');
                }
                else {
                    $(this).removeAttr('readonly');
                }
            }
        })
    }

    eform.loadDefaultData = function (data) {
    	var splitted = data.split('¶');
        for (i = 0; i < splitted.length - 1; i += 2) {
            var kluc = splitted[i];
            var hodnota = splitted[i + 1];
            if (kluc.toLowerCase() == 'evidencnecislospd' || kluc.toLowerCase() == 'registracnecislospd') {
            	if (hodnota.split(',').length == 1) {
            		SetDefaultValue(kluc, hodnota);
            	}
            }
            else {
            	SetDefaultValue(kluc, hodnota);
            }
        }
    }

    eform.getDefaultData = function () {
        return GetDefaultValue();
    }

    eform.Sign = function () {
        var pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) {
                val = "0" + val;
            }
            return val;
        };
        var podpis; // = $.base64.encode('<xml></xml>');

        // kontrola vstupnych udajov
        var signObject = getFilesForSign(eform.getfinalxml());
        if (!signObject.xmldata) {
            alert("Neexistuje vstupné XML.");
            return;
        }

        // podpisovac
        var podpisovac = getDSigXades();
        if (podpisovac == undefined) {
            alert('Pre podpisovanie je potrebná inštalácia klientského podpisovača.');
            return;
        }

        // vytvorenie a pridanie objektu
        var object = addObject(podpisovac, signObject);
        if (object != 0) {
            alert("Nepodarilo sa pridať objekt do kolekcie");
            return;
        }

        // podpisanie
        var today = new Date();
        var signatureId = 'SignatureId' + (today.getYear() + 1900) + pad(today.getMonth() + 1) + pad(today.getDate()) + pad(today.getHours()) + pad(today.getMinutes()) + pad(today.getSeconds());
        var res = podpisovac.Sign(signatureId, 'sha256', 'urn:oid:1.3.158.36061701.0.0.1.10.4.0.12');
        if (res == 0) {
            podpis = podpisovac.SignedXMLWithEnvelope;

            alert('OK');
        }
        else {
            alert('Podpísanie skončilo chybou: ' + podpisovac.ErrorMessage); //chyba
        }
    }

    eform.createConfirmation = function () {
    	var transformed = {
    		FDF2Print: [],
    		PDF2Print: []
    	}
    	
    	//fdf
    	if ($.isFunction(window.createpotvrdenie)) {
    		transformed.FDF2Print[0] = { filename: getFileNameFor('fdf'), content: createpotvrdenie() };
    	}
    	else {
    		return;
    	}
    	//pdf
    	var path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    	var pdf = GetExternalResource(ResourceType.PDF, 'Potvrdenie');
    	if (pdf) {
    		transformed.PDF2Print.push(path + pdf);
    	}

    	return transformed;
    }

    var importFile = function (xmlfile, type) {
        var xmlloaded = false;
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", xmlfile, false);
        }
        catch (Exception) {
            var ie = (typeof window.ActiveXObject != 'undefined');
            try {
                if (ie) {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    while (xmlDoc.readyState != 4) { };
                    xmlDoc.load(xmlfile);
                    //readXML();
                    xmlloaded = true;
                }
                else {
                    xmlDoc = document.implementation.createDocument("", "", null);
                    xmlDoc.onload = readXML;
                    xmlDoc.load(xmlfile);
                    xmlloaded = true;
                }
                return xmlDoc.xml;
            }
            catch (exc) {
                //console.log('Nepodarilo sa nacitat subor: ' + xmlfile);
            }
        }

        if (!xmlloaded) {
        	xmlhttp.setRequestHeader('Accept', 'text/xml');
            try { xmlhttp.responseType = "msxml-document"; } catch (e) { };
            try {
                xmlhttp.send("");
            }
            catch (Exception) {
                alert('error');
            }
            if (type == 'xml') {
                //xmlDoc = xmlhttp.responseXML;
                xmlDoc = xmlhttp.responseText;
                xmlloaded = true;
            }
            else if (type == 'fdf') {
                xmlDoc = xmlhttp.responseText;
                xmlloaded = true;
            }
        }
        return xmlDoc;
    }

    var transformWithXSLT = function (xmlContent, xslUrl) {
        var xslContent = importFile(xslUrl, 'xml');
        var result;
        var myWindow;

        // code for IE
        if (window.ActiveXObject) {
            result = xmlContent.transformNode(xslContent);
            return result;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (typeof (XSLTProcessor) != "undefined") {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslContent);
            result = xsltProcessor.transformToFragment(xmlContent, window.document);
            return new XMLSerializer().serializeToString(result);
        }
    }

    ///vycita meno pouzivatela z podpisu
    var getUserNameFromSignature = function (signature) {
        var userStart = signature.indexOf('X509SubjectName>');
        var user = signature.substring(userStart, signature.indexOf('X509SubjectName>', userStart + 1));
        userStart = user.indexOf('CN=');
        var userEnd = user.indexOf(',', userStart + 1);
        if (userEnd == -1)
            userEnd = user.indexOf('<', userStart + 1);
        return user.substring(userStart + 3, userEnd);
    }

    var getDSigXades = function () {
        var DSigXades;

        // for IE
        if (!!window.ActiveXObject) {
            DSigXades = new ActiveXObject("DSig.XadesSigAtl");
        }
        // for non-IE
        else {
            try {
                if (!document.getElementById('dsigxadessig')) {
                    $(document.body).append('<object id="dsigxadessig" type="application/x-ditec.zep.dsigxadesfb" class="signer"></object>');
                }
                DSigXades = document.getElementById('dsigxadessig');
                if (DSigXades != undefined)
                    DSigXades.Initialize();
            }
            catch (exception) {
            }
        }

        return DSigXades;
    }

    var addObject = function (podpisovac, signObject) {
        var xmlObjectRet;

        // for IE
        if (!!window.ActiveXObject) {
            var xmlPlugin = new ActiveXObject("DSig.XmlPluginAtl");
            if (xmlPlugin == undefined) {
                alert('Pre správnu funkčnosť klientského podpisovača je potrebný xml plugin.');
                return;
            }
            var xmlns = '';
            var c_tnms = 'targetNamespace="';
            var l_tnms = c_tnms.length;
            var tnspos1 = signObject.xsddata.indexOf(c_tnms);
            if (tnspos1 > 5 && tnspos1 < 300) {
                var tnspos2 = signObject.xsddata.indexOf('"', tnspos1 + l_tnms);
                xmlns = signObject.xsddata.substring(tnspos1 + l_tnms, tnspos2);
            }
            {
                var obj = xmlPlugin.CreateObject(
					'Object' + 'testID',
					'testNazov',
					signObject.xmldata,
					signObject.xsddata,
					xmlns,
					'http://wwww.google.sk',
					signObject.xsltdata,
					'http://wwww.google.sk');
                // ak bola chyba
                if (xmlPlugin.ErrorMessage != null && xmlPlugin.ErrorMessage != '') {
                    alert(xmlPlugin.ErrorMessage);
                    return;
                }
                // pridanie objektu do kolekcie
                xmlObjectRet = podpisovac.AddObject(obj);
            }
        }
        // for non-IE
        else {
            {
                xmlObjectRet = podpisovac.AddXmlObject(
					'Object' + 'testID',
					'testNazov',
					signObject.xmldata,
					signObject.xsddata,
					xmlns,
					'http://wwww.google.sk',
					signObject.xsltdata,
					'http://wwww.google.sk');
            }
        }

        return xmlObjectRet;
    }


} (window.eform = window.eform || {}))