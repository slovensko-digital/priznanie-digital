/// <reference path="jquery-1.4.1-vsdoc.js" />
(function ($, eform, undefined) {

    $(function () {

        if (typeof String.prototype.trim !== 'function')
        {
            String.prototype.trim = function ()
            {
                return this.replace(/^\s+|\s+$/g, '');
            }
        }

        InitPopUpDialog();
        InitDatePickerValues();

        InitDatePickerDateFormat();
        InitDatePickerDateFormat2();
        /*$('.datepicker:not(.hasDatepicker)').live('focus', function () {
        $(this).datepicker().focus();
        return false;
        });*/

        InitDateTimePicker();
        InitTimePickerValues();
        InitSectionAccordion();
        InitDataTablePlugIn();
        InitConditionalRules();
        if (typeof InitRadio == 'function') {
            InitRadio();
        }
        InitButtons();
        InitValidation();
        LocalizeErrorMessages();
        InitExistingForm();
        InitDebugCode();

        InitOdobratBtn();
        ResizeTextareaField();

        // init all pageable section
        $('.section.pageableSection', 'form').pageableSection({
            validator: window.validatorObject
        });

        // hide bottom menu if form is inside iframe.
        if (window.self === window.top) {
            var originPFS;
            if (!window.location.origin) {
                originPFS = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            } else {
                originPFS = window.location.origin;
            }
            $('#buttonsPlaceholder').formButtons({
                onLoad: eform.setfinalxml || window.FillNativeXml,
                onSave: eform.getfinalxml || window.GenerateNativeXml,
                onPrint: eform.print2file || $.noop,
                onSign: eform.Sign || $.noop,
                onValidate: eform.validate || $.noop,
                onReset: window.ClearForm || $.noop,
                onConfirm: eform.createConfirmation || $.noop,
                asyncSaveUrl: originPFS + '/FileHandler/Save2File',
                asyncLoadUrl: originPFS + '/FileHandler/LoadFromFile',
                asyncZipUrl: originPFS + '/FileHandler/PrintToZip',
                form: $('form')
            });
        } else {
            $('#buttonsPlaceholder').remove();
        }
    });
} (jQuery, window.eform = window.eform || {}));

function InitOdobratBtn() {
    var layoutRow = $('span[id^=removeSection]').closest('div[id^=layoutRow]');
    var sectionsCount = layoutRow.siblings('div[id^=layoutRow]').length;
    if (sectionsCount == 0) {
        $('span[id^=removeSection]').hide();
    }
}

function ResizeTextareaField() {  // readOnly mode
    $("textarea[disabled='disabled']").each(function () {
        $(this)[0].style.height = "100%";
        $(this)[0].rows = ($(this)[0].scrollHeight / 15);
    });
}

function InitDebugCode() {
    var ignoreClientErrors = $.GetUrlParam("ignoreClientErrors");

    if (ignoreClientErrors != 0)
        validatorObject.settings.ignoreClientErrors = true;
}

function InitExistingForm() {
    $("form :radio:checked").click();
}

function InitDatePickerValues() {
    $.datepicker.regional['sk'] = {
        closeText: 'Zavrieť',
        prevText: '&#x3c;Predchádzajúci',
        nextText: 'Nasledujúci&#x3e;',
        currentText: 'Dnes',
        monthNames: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
		'Júl', 'August', 'September', 'Október', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún',
		'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        dayNames: ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],
        dayNamesShort: ['Ned', 'Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob'],
        dayNamesMin: ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pia', 'So'],
        weekHeader: 'Ty',
        //dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['sk']);
}


function InitTimePickerValues() {
    $(".timepicker").timepicker({
        timeOnlyTitle: 'Vyberte čas',
        timeText: 'Čas',
        hourText: 'Hodina',
        minuteText: 'Мinúta',
        secondText: 'Sekunda',
        currentText: 'Aktuálny',
        closeText: 'Vybrať'
    });
}

function LocalizeErrorMessages() {
    jQuery.extend(jQuery.validator.messages, {
        date: "Zadajte platný dátum.",
        dateISO: "Zadajte platný dátum (ISO)."
    });
}

function InitDatePickerDateFormat() {
    $(".datepicker").datepicker({ dateFormat: 'dd.mm.yy' });
}

function InitDatePickerDateFormat2() {
    $(".datepicker2").datepicker({ dateFormat: 'yy-mm-dd' });
}

function InitDateTimePicker() {
    $(".datetimepicker").datetimepicker({
        dateFormat: 'dd.mm.yy',
        timeOnlyTitle: 'Vyber dátum',
        timeText: 'Čas',
        hourText: 'Hodina',
        minuteText: 'Мinúta',
        secondText: 'Sekunda',
        currentText: 'Aktuálny',
        closeText: 'Vybrať'
    });
}

function InitSectionAccordion() {
    $("form").InitSectionAccordion();
}

function InitButtons() {
    $(".button").button();
    $("#cancelForm").click(TryRedirectToReturnUrl);
}

function InitPopUpDialog() {
    $("form").InitPopUpDialog();
}

var oTable;

function fnGetSelected(oTableLocal) {
    var aReturn = new Array();
    var aTrs = oTableLocal.fnGetNodes();

    for (var i = 0; i < aTrs.length; i++) {
        if ($(aTrs[i]).hasClass('row_selected')) {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}

function InitDataTablePlugIn() {
    jQuery.fn.dataTableExt.oApi.fnFilterOnReturn = function (oSettings) {
        var _that = this;

        this.each(function (i) {
            $.fn.dataTableExt.iApiIndex = i;
            var $this = this;
            var anControl = $('input', _that.fnSettings().aanFeatures.f);
            anControl.unbind('keyup').bind('keypress', function (e) {
                if (e.which == 13) {
                    $.fn.dataTableExt.iApiIndex = i;
                    _that.fnFilter(anControl.val());
                }
            });
            return this;
        });
        return this;
    };
}

function initRepetitionSection(minRepetition, maxRepetition, sender) {
    if (minRepetition == 1) {
        var repetitiveCommands = $('div[id^=' + sender + ']').children('div[id^=repetitionCommands]');
        repetitiveCommands.children('span[id^=removeSection]').hide();
    }
    if (minRepetition > 1) {
        for (var i = 1; i < minRepetition; i++) {
            var addButton = $('div[id^=' + sender + ']').last().find('#addSection' + sender);
            addSection(minRepetition, maxRepetition, addButton);
        }
    }
    else if (minRepetition == 0) {
        var removeButton = $('div[id^=' + sender + ']').last().find('#removeSection' + sender);
        removeSection(minRepetition, removeButton);
    }
}

function parseId(sender, replaceText) {
    var id = sender.id;
    if (id == null) {
        id = sender[0].id;
    }
    return id.replace(replaceText, '');
}

function countSection(sender, replaceText) {
    return $(sender).parent().parent().parent().children().filter('div[id^=' + parseId(sender, replaceText) + ']').length;
}

function addSection(minRepetition, maxRepetition, sender) {
    var layoutRow = $(sender).closest('div[id^=layoutRow]');
    var baseId = GetValueWithoutIncremental(layoutRow.attr('id'));
    var layoutRows = layoutRow.siblings('div[id^=' + baseId + ']');
    var sectionsCount = layoutRows.length + 1;
    var layoutRow1 = layoutRow;
    if (sectionsCount > 1)
        layoutRow1 = layoutRow.siblings('div[id=' + baseId + ']');
    /*
    var layoutRow = $(sender).closest('div[id^=layoutRow]');
    var sectionsCount = layoutRow.siblings('div[id^=layoutRow]').length + 1;
    */
    addSectionIntern(maxRepetition, layoutRow1, layoutRow, sectionsCount, minRepetition);
}
function addSectionIntern(maxRepetition, layoutRow1, layoutRow, sectionsCount, minRepetition) {
    var layoutRowID = layoutRow1.attr('id');
    var layoutRowCopy = layoutRow1.clone();
    var isSectionListEmpty = layoutRow.attr('isEmpty');

    if (sectionsCount == 1 && isSectionListEmpty == 'true')
        sectionsCount = 0;

    if (sectionsCount >= maxRepetition)
        return alert('Dosiahli ste maximálny počet opakovania zvolenej sekcie.');

    if (sectionsCount == 0) {
        layoutRow.children('div[id^=layoutRowContent]').show().hide().show().ToggleValidators(false); //bug by "style" atribute
        layoutRow.children('div[id^=repetitionCommands]').children('span[id^=removeSection]').show().hide().show(); //IE bug by "Odobrať" button 
        layoutRow.attr("isEmpty", "false");
    }
    else {
        layoutRowCopy.ClearFormElements()
            .IncrementFieldIds(sectionsCount)
            .ResetRepetitionSection()
            .InitSectionAccordion()
            .RemoveDatePickerClass()
            .InitDateTimeControl()
            .InitPopUpDialog()
            .ReinitializeConditionalRules(sectionsCount)     ////////////////////////////////////////////////////////////////////////// GV
            .IncrementSectionIds(sectionsCount);
        //.InitSections();

        layoutRow.after(layoutRowCopy);
        //layoutRowCopy.ReinitializeConditionalRules(sectionsCount);      ////////////////////////////////////////////////////////////////////////// GV

        layoutRowCopy.find('div[id^=repetitionCommands]').show();
    }

    InitDatePickerDateFormat();
    InitDatePickerDateFormat2();



    //Ak pridavana sekcia je poslena mozna (maxrepetition) skryjem je button Pridaj
    var repetitiveCommands = layoutRowCopy.children('div[id^=repetitionCommands]');
    var addButton = repetitiveCommands.children('span[id^=addSection]');
    var removeButton = repetitiveCommands.children('span[id^=removeSection]');
    if ((sectionsCount + 1) == maxRepetition) {
        if (minRepetition == 0 && maxRepetition == 1) {
            layoutRow.children('div[id^=repetitionCommands]').children('span[id^=addSection]').hide();
        } else {
            addButton.hide();
        }
    }

    if (sectionsCount > 0) {
        //Na pridanej sekcii zobrazim button Odober

        removeButton.show();
        //Na predchadzajucej sekcii skryjem command bar
        layoutRow.children('div[id^=repetitionCommands]').hide();
    }

    if ((sectionsCount + 1) == minRepetition)
        removeButton.hide();

    //InitConditionalRules(layoutRowCopy);
    layoutRowCopy.ReinitRadioDefaultCheck();
}

function removeSection(minRepetition, sender) {
    var layoutRow = $(sender).closest('div[id^=layoutRow]');
    var layoutRowPrevious = layoutRow.prev('div[id^=layoutRow]');
    var sectionsCount = countSection(sender, 'removeSection');

    if (sectionsCount == minRepetition)
        return alert('Sekciu nie je možné odobrať.');
    var children = layoutRowPrevious.children('div[id^=repetitionCommands]');
    if (sectionsCount == minRepetition && sectionsCount > 1)
        children.children('span[id^=removeSection]').hide();

    if (sectionsCount == 1) {
        layoutRow.attr("isEmpty", "true");
        layoutRow.children('div[id^=layoutRowContent]').hide().ToggleValidators(true);
        layoutRow.ReinitializeConditionalRules();

        var repetitionCommands = layoutRow.children('div[id^=repetitionCommands]');
        repetitionCommands.children('span[id^=addSection]').show();
        return repetitionCommands.children('span[id^=removeSection]').hide();
    }

    children.show();
    layoutRow.remove();
    layoutRowPrevious.ReinitializeConditionalRules();

    if ((sectionsCount - 1) == minRepetition) {
        children.children('span[id^=removeSection]').hide();
    }
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

$.fn.NewGuid = function () {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

function SwitchSections(switchesToSections, context, isCheckBoxList) {

    if (typeof context === "undefined")
        context = $("form");

    if (isCheckBoxList == true)
        context.HideSwitchSections(switchesToSections);

    context.SwitchSections(switchesToSections, isCheckBoxList);
}

var xmlHelper = (function (helper) {
    var toDateRegex = /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,4})$/g,
	    fromDateRegex = /^([0-9]{1,4})\-([0-9]{1,2})\-([0-9]{1,2})$/g;

    helper.toXmlDate = function (value) {
        if (value) {
            toDateRegex.lastIndex = 0;
            var matches = toDateRegex.exec($.trim(value));
            if (matches && matches.length === 4) {
                value = matches[3] + '-' + matches[2] + '-' + matches[1];
            }
        }

        return value || '';
    };

    helper.fromXmlDate = function (value) {
        if (value) {
            fromDateRegex.lastIndex = 0;
            var matches = fromDateRegex.exec($.trim(value));
            if (matches && matches.length === 4) {
                value = matches[3] + '.' + matches[2] + '.' + matches[1];
            }
        }

        return value || '';
    };

    return helper;
} ({}));

//function for sett form from native xml
function FillNativeXml(input) {
    //var path = input.value;
    //var xmlhttp = new XMLHttpRequest();
    //xmlhttp.open("GET", path, false);
    //xmlhttp.send();
    var xmlDoc = textToXML(input).documentElement.childNodes;
    processXml(xmlDoc, '');
}

function processXml(xmlNodes, postfix) {
    var lasti = 0;
    var currpost = '';
    var firstsec = null;
    var lastsec = null;
    var parentsec = null;
    var secispaging = false;
    for (var i = 0; i < xmlNodes.length; i++) {
        var aNode = xmlNodes[i];
        var n = aNode.nodeName;
        var cn = aNode.childNodes;
        if (n != xmlNodes[lasti].nodeName) {
            lasti = i;
            currpost = '';
        } else if (lasti < i) { // opakovana sekcia
            currpost = repeatingPostfix + (i - lasti);
            //document.getElementById('tbXML2').value = document.getElementById('tbXML2').value + ' ' + n + ' o:' + currpost + ',';
        }
        var el = document.getElementById(n + postfix + currpost);
        if (el == null)
            el = document.getElementById(disableValidatorPrefix + n + postfix + currpost);
        if (el !== null && el !== undefined) { // input
            if (parentsec == null)
                parentsec = $(el).closest('div[id^=layoutRow]').parent(); // layoutRowContent -> layoutRow
            //document.getElementById('tbXML2').value = document.getElementById('tbXML2').value + ' ' + n + ' p:' + parentsec + ',';
            if (cn.length > 0) {
                var v = cn[0].nodeName;
                if (v == "#text") {
                    if ($(el).is('[class*=date]') && cn[0].nodeValue) {
                        el.value = xmlHelper.fromXmlDate(cn[0].nodeValue);
                    } else if ($(el).attr("class").indexOf("checkBox") != -1) {
                        el.checked = cn[0].nodeValue == 1;
                    }
                    else
                        el.value = htmlDecode(cn[0].nodeValue);
                }
                else {
                    el.value = "";
                }
                //document.getElementById('tbXML2').value = document.getElementById('tbXML2').value + ' \r\n| ' + i + n + ' ' + el + ' ' + cn[0].nodeValue;
            } else
                el.value = "";

            $(el).change(); ////////////////////////////// Doplnene pre vykonanie eventu na funkciu change, pri priradeni priamo z JS

        } else { // sekcia
            if (cn.length > 0) {
                var parentSection = $('input[type="hidden"]', 'form')
					.filter(function (_, input) {
					    return input.name === aNode.nodeName;
					})
					.closest('.pageableSection');

                if (parentSection.length) {
                    parentSection.pageableSection().loadXml(aNode.parentNode, aNode.nodeName);

                    continue;
                }

                //document.getElementById('tbXML2').value = document.getElementById('tbXML2').value + ' ' + n + ' l:' + lastsec + ',';
                var sec = null; // sekcia
                if (lasti == i) { // prva sekcia
                    sec = processXml(cn, postfix);
                    if (sec == null) {  // radiobutton
                        var inputs = $('input[name="' + n + '"]');
                        if (inputs == null || inputs.length == 0)
                            inputs = $('input[name="' + disableValidatorPrefix + n + '"]');
                        var idx = cn[0].nodeValue;
                        if (idx >= 0) {
                            $(inputs[idx]).attr('checked', 'checked').trigger('change');
                        }
                    }
                } else { // opakovana sekcia
                    if (!secispaging) {
                        if (lastsec.next() == null || lastsec.next().id != firstsec.id + currpost)
                            addSectionIntern(999999, firstsec, lastsec, (i - lasti), 0);
                        sec = processXml(cn, postfix + currpost);
                        //for (var ii = 0; ii < 10000; ii++) {
                        //	lastsec = sec;
                        //	addSectionIntern(999999, firstsec, lastsec, (ii + i - lasti));
                        //}
                    }
                }
                lastsec = sec;
                if (lasti == i)
                    firstsec = sec;
                if (parentsec == null)
                    parentsec = $(sec).closest('div[id^=layoutRow]');
            }
        }
    }
    return parentsec;
}

function textToXML(text) {
    //	return $(text);
    try {
        var xml = null;
        text = text.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ');

        if (window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(text, "text/xml");
            var found = xml.getElementsByTagName("parsererror");
            if (!found || !found.length || !found[0].childNodes.length) {
                return xml;
            }
            return null;
        } else {
            xml = new CreateMSXMLDocumentObject();
            xml.async = false;
            xml.loadXML(text);
            return xml;
        }
    } catch (e) {
        // suppress
    }
}

function XMLtoText(elem) {

    var serialized;

    try {
        // XMLSerializer exists in current Mozilla browsers
        serializer = new XMLSerializer();
        serialized = serializer.serializeToString(elem);
    }
    catch (e) {
        // Internet Explorer has a different approach to serializing XML
        serialized = elem.xml;
    }

    return serialized;
}
//prototype function for generating xml
function GenerateNativeXml() {
    return GenerateNativeXmlIntern($('#main'), $('form').attr('ID'), true);
}

function GenerateNativeXmlIntern(section, root, withValues) {
    var stringBuilder = new $.StringBuilder();
    stringBuilder.append('<' + root + ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'); // pridanie do root elementu

    function processHtml() {
        var self = $(this);
        if (self.hasClass('hiddenSection') || (self.attr('isempty') !== undefined && self.attr('isempty') == "true"))
            return;

        if (self.attr('type') == "hidden")
            return;

        if (self.hasClass('layoutRow')) {
            if (self.hasClass('pageableSection')) {

                var pageableSection = self.pageableSection(),
                    name = pageableSection.getSectionXmlNodeName(),
                    pages = pageableSection.pages;

                pageableSection.saveCurrentPage();

                if (pages && pages.length) {
                    for (var i = 0; i < pages.length; i++) {
                        var page = pages[i];
                        pageableSection.writeXml(stringBuilder, page);
                    }
                } else {
                    stringBuilder.append('<' + name + ' />');
                }

                return;
            }
            stringBuilder.append('<' + self.children("input:first").attr('name') + '>');
        }

        if (self.is(':input')) {
            var inputName = self.attr('name');
            if (inputName) {
                if (self.is(':radio')) {
                    if (self.is(':checked')) {
                        // radioIndex = $(this).parents('div').find(":radio").index(this);
                        //xml += '<' + $(this).attr('name') + '>' + $(this).val() + '</' + $(this).attr('name') + '>';
                        var cleanName = GetValueWithoutIncremental(inputName);
                        var inputs = $('input[name="' + inputName + '"]');

                        stringBuilder.append('<' + cleanName + '>' + (withValues ? inputs.index(self) : '') + '</' + cleanName + '>');
                    }
                } else if (self.is(':checkbox')) {
                    if (self.is(':checked') && withValues) {
                        stringBuilder.append('<' + inputName + '>' + 1 + '</' + inputName + '>');
                    } else {
                        stringBuilder.append('<' + inputName + '>' + 0 + '</' + inputName + '>');
                    }
                } else if (self.is(':button') || self.is(':submit')) {
                    // do nothing for buttons
                } else if (self.attr("class").indexOf("date") != -1 && self.val() != "" && self.val() != "undefined") {
                    var parts = self.val().split('.');
                    var pomSelf = parts[2] + '-' + parts[1] + '-' + parts[0];

                    stringBuilder.append('<' + inputName + '>' + (withValues ? htmlEncode(pomSelf) : '') + '</' + inputName + '>');
                    ////////// pre fungovanie comboboxu v Chrome a Opere pre schovane vybery v comboboxoch ///////////				
                } else if (self.attr("class").indexOf("comboBox") != -1 && self.val() != "undefined") {
                    var pomId = self.attr("id");
                    //var pomComboboxVal = $("[id='" + pomId + "'] :selected").val();
                    var e = document.getElementById(pomId);
                    var pomComboboxVal = e.value;

                    if (pomComboboxVal == '') // A je prazdna hodnota, pridaj xsi:nil="true", pretoze nemozno podpisat form s nevyplnenymi comboboxami cize, jedine nepovinny moze mat ''
                        stringBuilder.append('<' + inputName + ' xsi:nil="true">' + (withValues ? htmlEncode(pomComboboxVal) : '') + '</' + inputName + '>');
                    else
                        stringBuilder.append('<' + inputName + '>' + (withValues ? htmlEncode(pomComboboxVal) : '') + '</' + inputName + '>');

                } else {
                    if (self.val() == null || self.val().length == 0 || !withValues) {
                        //uprava kvoli zlym XSD schemam
                        var zapisat = 0;
                        var formid = GetExternalResourceIndex(3);

                        if (formid == 'form.89.sk.xsd' && inputName == 'r26') { zapisat = 1; }
                        if (formid == 'form.89.sk.xsd' && inputName == 'r27') { zapisat = 1; }
                        if (formid == 'form.89.sk.xsd' && inputName == 'r28') { zapisat = 1; }

                        if (formid == 'form.99.sk.xsd' && inputName == 'r24') { zapisat = 1; }
                        if (formid == 'form.99.sk.xsd' && inputName == 'r25') { zapisat = 1; }
                        if (formid == 'form.99.sk.xsd' && inputName == 'r26') { zapisat = 1; }

                        if (formid == 'form.103.sk.xsd' && inputName == 'r39') { zapisat = 1; }
                        if (formid == 'form.103.sk.xsd' && inputName == 'r41') { zapisat = 1; }
                        if (formid == 'form.103.sk.xsd' && inputName == 'r42') { zapisat = 1; }

                        if (formid == 'form.185.sk.xsd' && inputName == 'vyslednaDan') { zapisat = 1; }
                        if (formid == 'form.185.sk.xsd' && inputName == 'slovom') { zapisat = 1; }

                        if (formid == 'form.187.sk.xsd' && inputName == 's1VyslednaDan') { zapisat = 1; }
                        if (formid == 'form.187.sk.xsd' && inputName == 'slovomNa2strane') { zapisat = 1; }

                        if (formid == 'form.203.sk.xsd' && inputName == 'vyslednaDan') { zapisat = 1; }
                        if (formid == 'form.203.sk.xsd' && inputName == 'sumaslovom') { zapisat = 1; }

                        if (zapisat == 1) { stringBuilder.append('<' + inputName + '></' + inputName + '>'); }

                    } else {
                        stringBuilder.append('<' + inputName + '>' + (withValues ? htmlEncode(self.val()) : '') + '</' + inputName + '>');
                    }
                }
            }
        }

        if (!self.hasClass('hiddenSection') && (self.attr('isempty') === undefined || self.attr('isempty') == "false"))
            self.children().each(processHtml);

        if (self.hasClass('layoutRow')) {
            stringBuilder.append('</' + self.children("input:first").attr('name') + '>');
        }
    }

    section.children('div').each(processHtml);

    stringBuilder.append('</' + root + '>');

    return stringBuilder.string();
}

function GetValueWithoutIncremental(value) {
    var regEx = new RegExp(repeatingPostfix + "\\d+$");
    return cleanVal = value.replace(regEx, '');
}

// WCF  Validation Service
function CallServerValidateService() {
    //TO DO: Vygenerovat formData do HTML formulara a pre-poslat web service
    var formData = "<formData><XmlData></XmlData><DictionaryData></DictionaryData><ContextData></ContextData></formData>";
    var sessionID = $.GetUrlParam("SessionID");
    var Url = $.GetUrlParam("SubmitUrl");
    Url = unescape(Url);
    var Data = '{"formDocument": "' + GenerateNativeXml() + '", "formData": "' + formData + '", "sessionID": "' + sessionID + '"}';
    var ContentType = "application/json";

    statusDialog.setTitle("Ukladanie formulára");
    statusDialog.setMessage("Prebieha ukladanie formulára");
    statusDialog.showProgress();
    statusDialog.showDialog();

    $.ajax({
        type: 'POST',
        url: Url,
        data: Data,
        contentType: ContentType,
        success: ServerValidateServiceSucceeded,
        error: ServerValidateServiceFailed
    });
}

function ServerValidateServiceFailed(result) {
    statusDialog.hideProgress();
    statusDialog.setTitle("Chyba");
    statusDialog.setMessage("Pri ukladaní formulára sa vyskytla chyba. [" + result.statusText + ' : ' + result.status + ']');
    statusDialog.setOptions({ "buttons": { "Ok": function () { statusDialog.hideDialog(); } } });
}

function ServerValidateServiceSucceeded(result) {
    resultObject = result.SaveFormResult;
    resultXML = $.parseXML(resultObject),
    resultXMLTraversable = $(resultXML);
    responseCode = resultXMLTraversable.find("response > code").text();
    responseErrors = resultXMLTraversable.find("response > errors > error");

    if (responseCode == "ok" && responseErrors.length == 0) {
        statusDialog.hideProgress();
        statusDialog.setMessage("Uloženie bolo úspešné.");
        statusDialog.setOptions({ "buttons": { "Ok": function () { TryRedirectToReturnUrl(); } } });
    }

    var valMsg = new Object;
    responseErrors.each(function myfunction(index, item) {
        AddValidationMessage(index, item, valMsg);
    });
    if (responseCode != "ok" || responseErrors.length != 0) {
        validatorObject.settings.onfocusout = false;
        validatorObject.showErrors(valMsg);
        statusDialog.hideProgress();
        statusDialog.setMessage("Uloženie nebolo úspešné.");
        statusDialog.setOptions({ "buttons": { "Ok": function () { $(this).dialog("close"); validatorObject.focusInvalid(); } } });
    }
}

function AddValidationMessage(index, item, valMsg) {
    valMsg[$(item).attr("key")] = $(item).text();
}

function TryRedirectToReturnUrl() {
    var returnUrl = $.GetUrlParam("ReturnUrl");

    if (returnUrl != 0)
        self.location.href = unescape(returnUrl);
}

function htmlEncode(value) {
    if (value) {
        value = value.replace(/\n/gi, "%0A");
        value = value.replace(/\\/gi, "%0B");
        value = value.replace(/"/gi, "%0C");
        value = value.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ');
        return $('<div/>').text(value).html();
    }
    return value;
}

function htmlDecode(value) {
    if (value) {
        value = value.replace(/%0A/gi, '\n');
        value = value.replace(/%0B/gi, '\\');
        value = value.replace(/%0C/gi, '"');
    }
    return value;
}

$(window).ready(function () { $('div[id^=repetitionCommandslayoutRow]').each(cleanButton); });

function cleanButton() {
    var repetitionSection = $(this);
    var id = repetitionSection.parent()[0].id;
    var addButton = $('#addSection' + id);
    if (addButton.length > 0) {
        var removeButton = $('#removeSection' + id);
        var strng = addButton.attr('onclick').toString();
        var array = strng.substring(strng.lastIndexOf("(") + 1, strng.lastIndexOf(", this")).split(',');
        var minRepetition = array[0];
        var maxRepetition = array[1];

        var sectionsCount = countSection(addButton, 'addSection');
        if (sectionsCount == maxRepetition) {
            addButton.hide();
            removeButton.show();
        }

        if (sectionsCount == minRepetition) {
            addButton.show();
            removeButton.hide();
        }

        if (sectionsCount > 0 && minRepetition == 0) {
            removeButton.show();
        }
    }
}

////////////////////////////////////////////////////////////////////////// zaciatok sekcie ktora ma byt v cepGV.js
var layArrXml = new Object();  // pole xmlnodelistov
var layArrAkt = new Object();    // pole aktualnych pozicii
var layArrCnt = new Object();   // pole poctov
var layoutSecDiv = null;  // aktualne zvolena sekcia = html div tag
var layoutSecName = null;  // nazov aktualnej sekcie
var layoutStrana = null;
var layoutPocet = null;
var layoutNodes = null;  // NodeList
var layoutTag = null;

function checkKontrol(layoutsection, elementid, elementindex, rulename, errorTyp, result) {
    var section = $('#' + layoutSection).pageableSection();
    if (section) {
        section.validateElementOnPage(elementid, elementindex, rulename);
    }
}

function HodnotaTypPola(element, nazov) {
    var value = 0;

    var elements;

    if (!element) {
        elements = $('#' + nazov);
        if (!elements || elements.length == 0)
            elements = $("[name='" + nazov + "']");
        element = elements[0];
    }

    if (element.type == 'select-one') {
        value = document.getElementById(nazov).selectedIndex;
    }
    else if (element.type == 'radio') {
        //je radiobutton		
        //je radiobuttonlist
        //kod je univerzalny, zafunguje aj aj
        value = 0;
        for (i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                value = i + 1; //vrat index oznaceneho pola od 1 - n
                break;
            }
        }
    }
    else if (element.type == 'checkbox') {
        //je checkbox
        if (element.checked) {
            value = 1;
        }
        else {
            value = 0;
        }
    }
    else {
        value = element.value;
    }

    return value;
}

function hodnota(element, nazov, opak_typ, sid, layoutNazov, dataType) { // sid je indexovany od 0..
    var tstr;

    ////////////////////////////////////////////////////////////////////////// zaciatok opakovana
    if (opak_typ == 'o') {
        if (element == null) {
            if (sid == 0)
                tstr = HodnotaTypPola(null, nazov);  //document.getElementById(nazov).value;
            else
                tstr = HodnotaTypPola(null, GetIncrementalValue(nazov, sid)); //document.getElementById(GetIncrementalValue(nazov, sid)).value;
        } else {
            tstr = HodnotaTypPola(element, nazov);
        }
    } else
    ////////////////////////////////////////////////////////////////////////// koniec opakovana
    ////////////////////////////////////////////////////////////////////////// zaciatok strankovana
        if (opak_typ == 's' || opak_typ == 'p') {
            var section = $('#' + layoutNazov).pageableSection();
            if (section && section.currentPage != sid + 1) {
                var temp = section.getValueFor(nazov, sid + 1);
                if (typeof temp === 'boolean') {
                    tstr = temp ? 1 : 0;
                } else {
                    tstr = temp;
                }
            } else {
                tstr = HodnotaTypPola(element, nazov);
            }
        } else
        ////////////////////////////////////////////////////////////////////////// koniec strankovana
        ////////////////////////////////////////////////////////////////////////// zaciatok normalna
            if (opak_typ == 'n') {
                tstr = HodnotaTypPola(element, nazov);
            }
    ////////////////////////////////////////////////////////////////////////// koniec opakovania
    if (tstr == null && dataType == 'x')
        return '';
    if (tstr != null && dataType == 'x')
        return tstr.toString();
    if (tstr == null || tstr === undefined || tstr == '')
        return 0;
    //tstr = 0;

    //ak je datovy typ string, vrat dlzku retazca
    if (dataType == 's') {
        /*
        if (tstr == 0) {
        return 0;
        }
        */
        if (tstr.length) {
            return tstr.length;
        }
    }
    return parseFloat(tstr);
}

////////////////////////////////////////////////////////////////////////// koniec sekcie ktora ma byt v cepGV.js


function CreateMSXMLDocumentObject() {
    if (typeof (ActiveXObject) != "undefined") {
        var progIDs = [
                        "Msxml2.DOMDocument.6.0",
                        "Msxml2.DOMDocument.5.0",
                        "Msxml2.DOMDocument.4.0",
                        "Msxml2.DOMDocument.3.0",
                        "MSXML2.DOMDocument",
                        "MSXML.DOMDocument"
		];
        for (var i = 0; i < progIDs.length; i++) {
            try {
                return new ActiveXObject(progIDs[i]);
            } catch (e) { };
        }
    }
    return null;
}

if (!Number.prototype.toCents) {
    Number.prototype.toCents = function () {
        var that = this,
            value = that.valueOf();

        if (value === 0) {
            return 0;
        }

        var stringValue = value + '',
            length = stringValue.length,
            index = stringValue.indexOf('.'),
            sufix = '00',
            sufixLength = sufix.length;

        if (index === -1) {
            return (stringValue + sufix) * 1;
        }

        if (length - 1 > index + sufixLength) {
            index = index + sufixLength;
            stringValue = stringValue.replace('.', '');
            stringValue = stringValue.substr(0, index) + '.' + stringValue.substr(index, length);
        } else if (index === length - 1 - sufixLength) {
            stringValue = stringValue.replace('.', '');
        } else {
            var zeros = sufixLength - (length - 1 - index);
            stringValue = stringValue.replace('.', '');

            while (zeros-- > 0) {
                stringValue += '0';
            }
        }

        return stringValue * 1;
    };
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var s = this,
            i = arguments.length;

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return s;
    };
}

(function ($, undefined) {
    'use strict';

    function PageableSection() {

        if (!(this instanceof PageableSection)) {
            return new PageableSection();
        }

        this.section = null;
        this.pager = null;
        this.currentPageLabel = null;
        this.totalPagesLabel = null;
        this.prevPageButton = null;
        this.nextPageButton = null;
        this.addPageButton = null;
        this.removePageButton = null;

        this.currentPage = 1;
        this.totalPages = 1;

        this.pages = [];
        this.defaultValues = {};

        this.options = {
            namespace: '.pageable-section',
            validator: null,
            sectionName: '',
            xmlNodeName: '',
            min: 1,
            max: 5
        };
    }

    $.extend(PageableSection.prototype, {
        init: function (target, userOptions) {
            $.extend(true, this.options, userOptions);

            var self = this,
			    options = self.options,
			    namespace = options.namespace;

            // section
            this.section = $(target);

            if (!options.sectionName) {
                options.sectionName = this.section[0].id;
            }

            if (!options.xmlNodeName) {
                options.xmlNodeName = $('input:hidden', this.section)[0].name;
            }

            // min, max
            var min = this.section.data('section-min') * 1,
			    max = this.section.data('section-max') * 1;

            if (!isNaN(min)) {
                options.min = min;
            }
            if (!isNaN(max)) {
                options.max = max;
            }

            // pager
            this.pager = $('.sectionPager', this.section);
            this.currentPageLabel = $('.currentPage', this.pager);
            this.totalPagesLabel = $('.totalPage', this.pager);
            this.prevPageButton = $('.prevPageButton', this.pager);
            this.nextPageButton = $('.nextPageButton', this.pager);
            this.addPageButton = $('.addPageButton', this.pager);
            this.gotoPageButton = $('.gotoPageButton', this.pager);
            this.removePageButton = $('.removePageButton', this.pager);

            this.prevPageButton
				.unbind(namespace)
				.bind('click' + namespace, $.proxy(function (e) {
				    e.preventDefault();
				    this.previousPage();
				}, this));

            this.nextPageButton
				.unbind(namespace)
				.bind('click' + namespace, $.proxy(function (e) {
				    e.preventDefault();
				    this.nextPage();
				}, this));

            this.addPageButton
				.unbind(namespace)
				.bind('click' + namespace, $.proxy(function (e) {
				    e.preventDefault();
				    this.addPage();
				}, this));

            this.removePageButton
				.unbind(namespace)
				.bind('click' + namespace, $.proxy(function (e) {
				    e.preventDefault();
				    this.removePage();
				}, this));

            this.gotoPageButton
				.unbind(namespace)
				.bind('click' + namespace, $.proxy(function (e) {
				    e.preventDefault();
				    var currentInput = $(e.currentTarget).next();
				    if (isNaN(parseInt(currentInput.val()))) {
				        var strana = this.currentPage;
				        currentInput.val("");
				    } else {
				        var strana = parseInt(currentInput.val());
				        currentInput.val("");
				    }
				    this.goToPage(strana);
				}, this));

            this.currentPageLabel.text(this.currentPage);
            this.totalPagesLabel.text(this.totalPages);

            this.updateButtons();
            this.saveCurrentPage();
            this.saveDefaultValues();
        },

        previousPage: function () {
            if (this.currentPage <= 1) {
                return;
            }

            if (this.currentPage <= this.totalPages)
                this.saveCurrentPage();
            this.currentPage--;
            this.currentPageLabel.text(this.currentPage);

            this.resetLayout();

            this.loadCurrentPage();
        },

        nextPage: function () {
            if (this.currentPage >= this.totalPages) {
                return;
            }

            this.saveCurrentPage();

            this.currentPage++;
            this.currentPageLabel.text(this.currentPage);

            this.resetLayout();
            this.loadCurrentPage();
        },

        addPage: function () {
            if (this.totalPages >= this.options.max) {
                return;
            }

            this.totalPages++;
            this.totalPagesLabel.text(this.totalPages);
            this.updateButtons();

            this.saveCurrentPage();
            this.currentPage = this.totalPages;
            this.currentPageLabel.text(this.currentPage);

            this.resetLayout();
            this.saveCurrentPage();
        },

        removePage: function () {
            if (this.totalPages <= this.options.min) {
                return;
            }

            this.totalPages--;
            this.totalPagesLabel.text(this.totalPages);
            this.updateButtons();

            this.removeCurrentPage();
            this.resetLayout();
            if (this.currentPage > this.totalPages) {
                this.previousPage();
            } else {
                this.loadCurrentPage();
            }
        },

        updateButtons: function () {
            this.addPageButton.toggle(this.totalPages < this.options.max);
            this.removePageButton.toggle(this.totalPages > this.options.min);
        },

        resetLayout: function () {
            $(':text, :password, :file, select, textarea', this.section).each($.proxy(function (_, input) {
                if (input.id) {
                    $(input).val(this.defaultValues[input.id] || '');
                } else {
                    $(input).val('');
                }
            }, this));

            $(':radio, :checkbox', this.section).each($.proxy(function (_, input) {
                if (input.id) {
                    input.checked = this.defaultValues[input.id] || false;
                } else {
                    input.checked = false;
                }
            }, this));

            var validator = this.options.validator;
            if (validator && validator.settings) {
                var error = validator.settings.errorClass,
				    warning = validator.settings.warningClass;

                $('.' + error + ', .' + warning, this.section).removeClass(error + ' ' + warning);
            }
        },

        saveDefaultValues: function () {
            var inputs = $(':text, :password, :file, select, textarea', this.section);

            var defaults = {};
            $.each(inputs, function (_, input) {
                if (input.id) {
                    defaults[input.id] = input.value;
                }
            });

            var checkable = $(':radio, :checkbox', this.section);
            $.each(checkable, function (_, input) {
                if (input.id) {
                    defaults[input.id] = input.checked;
                }
            });

            this.defaultValues = defaults;
        },

        saveCurrentPage: function () {
            var radioButtonLists = [];

            var getErrorType = $.proxy(function ($element) {
                var validator = this.options.validator;
                if (validator && validator.settings) {
                    if ($element.hasClass(validator.settings.errorClass)) {
                        return 'e';
                    } else if ($element.hasClass(validator.settings.warningClass)) {
                        return 'w';
                    }
                }
            }, this);

            var values = $.map($(':input', this.section), $.proxy(function (input) {
                if (input.id) {
                    var $input = $(input),
					    result = { key: input.id, value: $input.val() };
                    if ($input.is(':radio')) {
                        var list = $input.closest('.radioButtonList');
                        if (list.length) {
                            var radioButtonListName = input.name;
                            if ($.inArray(radioButtonListName, radioButtonLists) >= 0) {
                                return;
                            }

                            var inputs = list.find(':radio');
                            var checked = inputs.filter(':checked');
                            var value = checked.val();
                            radioButtonLists.push(radioButtonListName);
                            result.value = value || '';
                            result.key = radioButtonListName;
                            result.rb = {
                                list: list,
                                name: radioButtonListName,
                                checked: checked
                            };

                            var errorTypes = [];
                            $.each(inputs, $.proxy(function (_, radio) {
                                var et = getErrorType($(radio));
                                if (et) {
                                    errorTypes.push(et);
                                }
                            }, this));

                            result.rb.errorTypes = errorTypes;
                        } else {
                            result.value = $input.is(':checked');
                        }
                    } else if ($input.is(':checkbox')) {
                        result.value = input.checked;
                    }

                    var errorType = getErrorType($input);
                    if (errorType) {
                        result.errorType = errorType;
                    }

                    return result;
                }
            }, this));

            if (this.pages.length) {
                var current = this.pages[this.currentPage - 1];
                if (current) {
                    current.values = values;
                    return;
                }
            }

            this.pages.splice(this.currentPage - 1, 0, { values: values });
        },

        removeCurrentPage: function () {
            if (this.pages.length && this.pages.length >= this.currentPage) {
                this.pages.splice(this.currentPage - 1, 1);
            }

            if (this.options.validator) {
                this.options.validator.removeAllSectionErrors(this.getSectionName(), this.currentPage);
            }
        },

        _loadRadioButtonList: function (value) {
            var list = value.rb.list;
            list.find(':radio').each(function (_, radio) {
                radio.checked = radio.value === value.value;
            });
        },

        loadCurrentPage: function () {
            if (this.pages.length && this.pages.length >= this.currentPage) {
                var current = this.pages[this.currentPage - 1];
                if (current && current.values) {
                    for (var j = 0; j < current.values.length; j++) {
                        var value = current.values[j],
						    rb = value.rb;

                        if (rb) {
                            this._loadRadioButtonList(value);
                            continue;
                        }

                        var $input = $('#' + value.key, this.section);
                        if (!$input || $input.length === 0) { //radio v strankovacich sekciach
                            if (value.value !== '0') {
                                $input = $('input[name="' + value.key + '"]', this.section);
                                $input[value.value - 1].checked = true;
                            }
                        }
                        else {
                            if ($input.is(':radio') || $input.is(':checkbox')) {
                                $input[0].checked = (value.value === true || value.value == '1');
                                continue;
                            }
                            $input.val(value.value);

                            if (value.errorType) {
                                var validator = this.options.validator;
                                if (validator && validator.settings) {
                                    if (value.errorType === 'e') {
                                        $input.addClass(validator.settings.errorClass);
                                    } else if (value.errorType === 'w') {
                                        $input.addClass(validator.settings.warningClass);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        goToPage: function (page) {
            if (page > this.totalPages) {
                page = this.totalPages;
            }

            if (page < 1) {
                page = 1;
            }

            this.saveCurrentPage();
            this.currentPage = page;
            this.currentPageLabel.text(this.currentPage);
            this.resetLayout();
            this.loadCurrentPage();
        },

        getSectionName: function () {
            return this.options.sectionName || '';
        },

        getSectionXmlNodeName: function () {
            return this.options.xmlNodeName || '';
        },

        getCurrentPage: function () {
            return this.currentPage;
        },

        focusin: function (elementId) {
            if (elementId) {
                $('#' + elementId, this.section).focus();
            }
        },

        getValueFor: function (elementId, page) {
            if (this.totalPages > 0 && page === this.currentPage) {
                this.saveCurrentPage();
            }

            if (this.pages.length) {
                page = page || 1;
                if (page > this.pages.length) {
                    return '';
                }

                var pageValues = this.pages[page - 1];

                for (var i = 0; i < pageValues.values.length; i++) {
                    var value = pageValues.values[i];
                    if (value.key === elementId) {
                        return value.value || '';
                    }
                }
            }

            return '';
        },

        getValuesFor: function (elementId) {
            var result = [];

            if (this.totalPages > 0) {
                this.saveCurrentPage();
            }

            for (var i = 0; i < this.pages.length; i++) {
                var pageValues = this.pages[i];

                for (var j = 0; j < pageValues.values.length; j++) {
                    var value = pageValues.values[j];
                    if (value.key === elementId) {
                        result.push(value.value || '');
                    }
                }
            }

            return result;
        },

        validatePage: function (page) {
            if (this.totalPages < page) {
                return;
            }

            var pageValues = this.pages[page - 1].values;

            var validator = this.options.validator;
            if (!validator) {
                return;
            }

            validator.sectionScope = {
                name: this.getSectionName(),
                page: page,
                values: pageValues
            };

            for (var i = 0; i < pageValues.length; i++) {
                var pageValue = pageValues[i];
                var elem = $('#' + pageValue.key, this.section)
                if (!elem || elem.length === 0) {
                    elem = $('input[name="' + pageValue.key + '"]', this.section)[0];
                }
                validator.check(elem);
            }

            delete validator.sectionScope;
        },

        validate: function () {
            if (this.totalPages > 0) {
                this.saveCurrentPage();
            }

            for (var i = 1; i <= this.totalPages; i++) {
                this.validatePage(i);
            }
        },

        validateElementOnPage: function (elementId, page, ruleName) {
            if (this.totalPages < page) {
                return;
            }

            if (this.totalPages > 0) {
                this.saveCurrentPage();
            }

            var pageValues = this.pages[page - 1].values;
            var validator = this.options.validator;
            if (!validator) {
                return;
            }

            validator.sectionScope = {
                name: this.getSectionName(),
                page: page,
                values: pageValues,
                ruleName: ruleName
            };

            validator.element($('#' + elementId, this.section));
            delete validator.sectionScope;
        },

        resetSection: function () {
            this.pages = [];

            this.totalPages = 1;
            this.totalPagesLabel.text(this.totalPages);

            this.currentPage = 1;
            this.currentPageLabel.text(this.currentPage);

            this.updateButtons();

            this.resetLayout();
        },

        structure: null,

        buildUpStructure: function () {
            var section = this.section;
            var rows = $('.layoutRow', section)
				.filter(function (_, row) {
				    return $(row).attr('isempty') !== 'true';
				}).map(function (_, row) {
				    var $row = $(row);
				    return { id: row.id, node: $row.children('input:hidden').attr('name'), parent: $row.parent().closest('.layoutRow')[0], element: row };
				});

            var sectionElement = section[0];

            this.structure = {
                id: sectionElement.id,
                node: section.children('input:hidden').attr('name'),
                parent: null,
                element: sectionElement
            };

            var buildRowsRecursive = function (parent) {
                parent.children = $.grep(rows, function (row) {
                    return row.parent === parent.element;
                });

                if (parent.children && parent.children.length) {
                    $.each(parent.children, function (_, child) {
                        buildRowsRecursive(child);
                    });
                }
            };

            if (rows.length) {
                buildRowsRecursive(this.structure);
            }

            var elements = $(':input:not(:hidden)', section).map(function (_, element) {
                var $element = $(element);
                return { id: element.id, name: element.name, element: element, parent: $element.closest('.layoutRow')[0] };
            });

            var buildElementsRecursive = function (parent) {
                parent.elements = $.grep(elements, function (element) {
                    return element.parent === parent.element;
                });

                if (parent.children && parent.children.length) {
                    $.each(parent.children, function (_, child) {
                        buildElementsRecursive(child);
                    });
                }
            };

            if (elements.length) {
                buildElementsRecursive(this.structure);
            }
        },

        writeXml: function (sb, page) {
            if (!this.structure) {
                this.buildUpStructure();
            }

            if (!sb) {
                sb = new $.StringBuilder();
            }

            var writeRecursive = function (parent) {

                sb.append('<' + parent.node + '>');

                var index = 0;
                var lastRadio = '$$$';
                var lastRadioEmpty = true;
                $.each(parent.elements, function (_, element) {
                    index++;
                    var pair = $.grep(page.values, function (value) {
                        return value.key === element.id;
                    })[0];
                    element = element.element;
                    if ($(element).is(':radio')) {
                        if (lastRadio != element.name) {
                            if (lastRadioEmpty && lastRadio != '$$$') {
                                sb.append('<' + lastRadio + '>' + 0 + '</' + lastRadio + '>');
                            }
                            lastRadio = element.name;
                            lastRadioEmpty = true;
                        }
                        if (pair && pair.value === true) {
                            sb.append('<' + element.name + '>' + index + '</' + element.name + '>');
                            lastRadioEmpty = false;
                        }
                    } else if ($(element).is(':checkbox')) {
                        sb.append('<' + pair.key + '>' + (pair.value !== undefined && (pair.value === true || pair.value == '1') ? 1 : 0) + '</' + pair.key + '>');
                    } else {
                        if (pair) {
                            if (pair.value && pair.value.length > 0) {
                                if ($(element).attr('isempty') == undefined || $(element).attr('isempty') == "false") {
                                    if ($(element).attr("class") && $(element).attr("class").indexOf("date") != -1) {
                                        var value = pair.value;
                                        if ($(element).is('[class*=date]')) {
                                            value = xmlHelper.toXmlDate(value);
                                        }
                                        sb.append('<' + pair.key + '>' + value + '</' + pair.key + '>');
                                    } else {
                                        sb.append('<' + pair.key + '>' + pair.value + '</' + pair.key + '>');
                                    }
                                }
                            } else {
                                //sb.append('<' + pair.key + ' />');
                            }
                        } else {
                            //sb.append('<' + element + ' />');
                        }
                    }
                });
                if (lastRadioEmpty && lastRadio != '$$$') {
                    sb.append('<' + lastRadio + '>' + 0 + '</' + lastRadio + '>');
                }

                if (parent.children) {
                    $.each(parent.children, function (_, child) {
                        writeRecursive(child);
                    });
                }

                sb.append('</' + parent.node + '>');

            };

            writeRecursive(this.structure);
        },

        loadXml: function (xmlNode, nodeName) {
            if (!xmlNode || !xmlNode.childNodes) {
                return;
            }

            this.resetSection();

            if (!this.structure) {
                this.buildUpStructure();
            }

            var loadXmlRecursive = function (structureNode, sectionNode, values) {
                if (!sectionNode || !sectionNode.childNodes) {
                    return;
                }
                for (var j = 0; j < sectionNode.childNodes.length; j++) {
                    var sectionChildNode = sectionNode.childNodes[j];

                    var possibleSections = $.grep(structureNode.children, function (child) {
                        return child.node === sectionChildNode.nodeName;
                    });

                    if (possibleSections.length) {
                        loadXmlRecursive(possibleSections[0], sectionChildNode, values);
                    }

                    var possibleElements = $.grep(structureNode.elements, function (element) {
                        if ($(element.element).is(':radio')) {
                            return element.name === sectionChildNode.nodeName;
                        }
                        else {
                            return element.id === sectionChildNode.nodeName;
                        }
                    });

                    if (possibleElements.length) {
                        var value = sectionChildNode.firstChild.nodeValue;
                        var element = possibleElements[0];
                        if ($(element.element).is('[class*=date]')) {
                            value = xmlHelper.fromXmlDate(value);
                        }
                        if ($(element.element).is(':checkbox'/*, :radio'*/)) {
                            value = value === '1';
                        }
                        values.push({ key: sectionChildNode.nodeName, value: value });
                    }
                }
            };

            for (var i = 0; i < xmlNode.childNodes.length; i++) {
                var childNode = xmlNode.childNodes[i];

                if (childNode.nodeName !== nodeName) {
                    continue;
                }

                var values = [];
                loadXmlRecursive(this.structure, childNode, values);
                this.pages.push({ values: values });
            }

            this.totalPages = this.pages.length || 1;
            this.totalPagesLabel.text(this.totalPages);

            this.loadCurrentPage();
        }
    });

    $.fn.pageableSection = function (options) {
        var self = this;

        if (!options) {
            return self.data('pageable-section');
        } else {
            return $.each(self, function (_, element) {
                var section = new PageableSection();
                section.init(element, options);

                $(element).data('pageable-section', section);
            });
        }
    };
})(jQuery);

(function ($, undefined) {
    'use strict';

    $.StringBuilder = function () {

        /// <summary>
        ///     var sb = new $.StringBuilder();
        ///     sb.append('1');
        ///     sb.append('2');
        ///     sb.append('3').append('4').append('5');
        ///     sb.appendLine('6');
        ///     sb.appendIf(true, '7');
        ///     sb.appendIf(false, '7');
        ///     sb.appendLineIf(true, '8');
        ///     sb.appendLineIf(false, '8');
        ///     sb.appendFormat('{0},{1}', '9', 10);
        /// 
        ///     var xml = sb.string();
        /// 
        ///     output: 123456
        ///     78
        ///     9,10
        /// </summary>

        if (!(this instanceof $.StringBuilder)) {
            return new $.StringBuilder();
        }

        var buffer = [];

        this.append = function (s) {
            buffer.push(s);
            return this;
        };

        this.appendLine = function (s) {
            return this.append(s + '\r\n');
        };

        this.appendIf = function (condition, s) {
            if (condition) {
                return this.append(s);
            }

            return this;
        };

        this.appendLineIf = function (condition, s) {
            if (condition) {
                return this.appendLine(s);
            }

            return this;
        };

        this.appendFormat = function (s) {
            return this.append(String.prototype.format.apply(s, Array.prototype.slice.call(arguments, 1)));
        };

        this.string = function () {
            return buffer.join('');
        };
    };
} (jQuery));

(function ($, undefined) {
    'use strict';

    function FormButtons() {

        if (!(this instanceof FormButtons)) {
            return new FormButtons();
        }

        this.placeholder = null;
        this.namespace = '.form-buttons',
		this.lastDownloadId = 1,
		this.buttons = {
		    save: null,
		    load: null,
		    print: null,
		    sign: null,
		    validate: null,
		    reset: null,
		    help: null,
		    confirm: null
		};
        this.options = {
            saveDialog: {
                modal: true,
                resizable: false,
                width: 800,
                rows: 20,
                title: 'Ulož',
                message: 'Súbor nie je možné uložiť priamo na disk pretože používate zastaralý prehliadač. Uloženie obsahu formulára možete vykonať skopírovaním nasledovného textu do nového xml súboru.'
            },
            loadDialog: {
                modal: true,
                resizable: false,
                width: 800,
                rows: 20,
                title: 'Načítaj',
                message: 'Vyberte súbor.' //'Súbor nie je možné načítať priamo z disku pretože používate zastaralý prehliadač. Načítanie obsahu formulára možete vykonať skopírovaním obsahu xml súboru do nasledujúceho poľa.'
            },
            fileReaderDialog: {
                modal: true,
                resizable: false,
                width: 800,
                title: 'Načítaj',
                message: 'Vyberte súbor.'
            },
            onSave: $.noop,
            onLoad: $.noop,
            onPrint: $.noop,
            onSign: $.noop,
            onValidate: $.noop,
            onReset: $.noop,
            onConfirm: $.noop,
            asyncSaveUrl: null,
            asyncLoadUrl: null,
            asyncZipUrl: null,
            form: null
        };
    }

    $.extend(FormButtons.prototype, {
        create: function (target, userOptions) {
            this.options = $.extend({}, this.options, userOptions);

            this.placeholder = $(target);
            this.placeholder.empty();

            this.buttons = {
                save: $('<input type="submit" id="form-button-save" class="button" value="Ulož" />').appendTo(this.placeholder).button(),
                load: $('<input type="submit" id="form-button-load" class="button" value="Načítaj" />').appendTo(this.placeholder).button(),
                print: $('<input type="submit" id="form-button-print" class="button" value="Vytlač" />').appendTo(this.placeholder).button(),
                validate: $('<input type="submit" id="form-button-validate" class="button" value="Skontroluj" />').appendTo(this.placeholder).button(),
                reset: $('<input type="submit" id="form-button-reset" class="button" value="Vyčisti" />').appendTo(this.placeholder).button(),
                sign: $('<input type="hidden" id="form-button-sign" class="button" value="Podpíš (test)" />').appendTo(this.placeholder).button(),
                help: $('<input type="submit" id="form-button-help" class="button" value="Poučenie" />').appendTo(this.placeholder).button(),
                confirm: $('<input type="submit" id="form-button-confirm" class="button" value="Potvrdenie" />').appendTo(this.placeholder).button()
            };

            this.buttons.save
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._save, this));

            this.buttons.load
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._load, this));

            this.buttons.print
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._print, this));

            this.buttons.sign
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._sign, this));

            this.buttons.validate
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._validate, this));

            this.buttons.reset
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._reset, this));

            this.buttons.help
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._help, this));

            this.buttons.confirm
				.unbind(this.namespace)
				.bind('click' + this.namespace, $.proxy(this._confirm, this));

            hideHelpBtn();
            hideConfButton();
        },

        _supportsBlobs: function () {
            return typeof window.Blob !== 'undefined';
        },

        _supportsFileReader: function () {
            return typeof window.FileReader !== 'undefined';
        },

        _getFileNameFor: function (extension) {
            var path = window.location.pathname,
			    filename = path.substr(path.lastIndexOf('/') + 1).replace('.html', '');

            if (extension) {
                filename += '.' + extension;
            }

            return filename;
        },

        _save: function (e) {
            e.preventDefault();

            var xml = this.options.onSave();

            if (this._supportsBlobs()) {
                this._saveToFile(xml, 'text/xml', this._getFileNameFor('xml'));
            } else {
                //this._cleanSaveDialog();
                //this._showSaveDialog(xml, this.options.saveDialog);
                this._saveToFileAsync(xml, this._getFileNameFor('xml'));
            }
        },

        _cleanSaveDialog: function () {
            $('#form-buttons-save-dialog').dialog('destroy').remove();
        },

        _showSaveDialog: function (xml, options) {
            var self = this;
            var defaults = {
                close: function () {
                    self._cleanSaveDialog();
                }
            };

            options = $.extend({}, defaults, options);
            var textarea = $('<textarea class="columns" />').attr('rows', options.rows).text(xml);
            var text = $('<p></p>').text(options.message);
            var content = $('<div id="form-buttons-save-dialog" />').attr('title', options.title).append(text).append(textarea);

            $(self.placeholder).append(content);

            content.dialog('destroy').dialog(options);
        },

        _load: function (e) {
            e.preventDefault();

            if (this._supportsFileReader() && this._supportsBlobs()) {
                this._cleanLoadDialog();
                this._showFileReaderDialog(this.options.fileReaderDialog);
            } else {
                this._cleanLoadDialog();
                this._showLoadDialog(this.options.loadDialog);
            }
        },

        _cleanLoadDialog: function () {
            $('#form-buttons-load-dialog').dialog('destroy').remove();
        },

        _showLoadDialog: function (options) {
            var self = this;
            var defaults = {
                close: function () {
                    self._cleanLoadDialog();
                },
                buttons: [
					{
					    id: 'form-buttons-load-dialog-confirm',
					    text: 'Načítaj',
					    disabled: true,
					    click: function (e) {
					        e.preventDefault();
					        var fileInput = $('input', $('#form-buttons-load-dialog')),
							    name = fileInput.val();
					        if (!name) {
					            return;
					        }

					        fileInput.asyncUpload().submit();
					    }
					},
					{
					    id: 'form-buttons-load-dialog-cancel',
					    text: 'Zruš',
					    click: function (e) {
					        e.preventDefault();
					        self._cleanLoadDialog();
					    }
					}
				]
            };

            options = $.extend({}, defaults, options);
            var input = $('<input type="file" name="file" />');
            var text = $('<p></p>').text(options.message);
            var content = $('<div id="form-buttons-load-dialog" />').attr('title', options.title).append(text).append(input);

            input
				.unbind(self.namespace)
				.bind('change' + self.namespace, function (e) {
				    if ($(e.target).val()) {
				        $('#form-buttons-load-dialog-confirm').button('enable');
				    } else {
				        $('#form-buttons-load-dialog-confirm').button('disable');
				    }
				})
				.asyncUpload({
				    url: self.options.asyncLoadUrl,
				    autoUpload: false,
				    selected: function (file) {
				        if (file.size > 15 * 1024) {
				            alert('Súbor nesmie byť väčší ako 15MB.');
				            input.val('');
				            return false;
				        }
				        if (!file.name.match(/^.*\.xml$/i)) {
				            alert('Nesprávny formát súboru.');
				            input.val('');
				            return false;
				        }
				        return true;
				    },
				    complete: function (response) {
				        if (response.success) {
				            var message = self.options.onLoad(response.file);
				            if (message) {
				                if (message == 'success') {
				                    alert('Naplnenie formulára prebehlo úspešne');
				                }
				                else {
				                    alert(message);
				                }
				            }
				        } else {
				            alert('Nastala chyba: ' + response.message);
				        }
				        self._cleanLoadDialog();
				    }
				});

            $(self.placeholder).append(content);

            content.dialog('destroy').dialog(options);
        },

        _showFileReaderDialog: function (options) {
            var self = this;
            var defaults = {
                close: function () {
                    self._cleanLoadDialog();
                },
                buttons: [
					{
					    id: 'form-buttons-load-dialog-confirm',
					    text: 'Načítaj',
					    disabled: true,
					    click: function (e) {
					        e.preventDefault();
					        var dialog = $('#form-buttons-load-dialog');
					        var input = $('input:file', dialog)[0];
					        var currentFile = input.files[0];
					        if (currentFile) {
					            if (!currentFile.name.match(/^.*\.xml$/i)) {
					                alert('Nesprávny formát súboru.');
					                return;
					            }

					            if (!currentFile.size > 15 * 1024 * 1024) {
					                alert('Súbor nesmie byť väčší ako 15MB.');
					                return;
					            }
					        }

					        self._loadFromInput(currentFile, self.options);
					        self._cleanLoadDialog();
					    }
					},
					{
					    id: 'form-buttons-load-dialog-cancel',
					    text: 'Zruš',
					    click: function (e) {
					        e.preventDefault();
					        self._cleanLoadDialog();
					    }
					}
				]
            };

            options = $.extend({}, defaults, options);
            var file = $('<input type="file" />');
            var text = $('<p></p>').text(options.message);
            var content = $('<div id="form-buttons-load-dialog" />').attr('title', options.title).append(text).append(file);

            file
				.unbind(self.namespace)
				.bind('change' + self.namespace, function (e) {
				    if (e.target.files[0]) {
				        $('#form-buttons-load-dialog-confirm').button('enable');
				    } else {
				        $('#form-buttons-load-dialog-confirm').button('disable');
				    }
				});

            $(self.placeholder).append(content);

            content.dialog('destroy').dialog(options);
        },

        _loadFromInput: function (file, options) {
            var reader = new FileReader();
            var readerHelp = new FileReader();
            reader.onload = function (e) {
                var message = options.onLoad(e.target.result);
                if (message) {
                    if (message == 'success') {
                        alert('Naplnenie formulára prebehlo úspešne');
                    }
                    else {
                        alert(message);
                    }
                }
            };

            reader.onerror = function () {
                alert('Nepodarilo sa prečítať súbor.');
            };

            readerHelp.onload = function (e) {
                if (e.target.result.search("encoding=\"ISO-8859-2\"") > 0 || e.target.result.search("encoding=\"iso-8859-2\"") > 0 || e.target.result.search("encoding=\"Iso-8859-2\"") > 0) {
                    reader.readAsText(file, 'ISO-8859-2');
                }
                else if (e.target.result.search("encoding=\"WINDOWS-1250\"") > 0 || e.target.result.search("encoding=\"Windows-1250\"") > 0 || e.target.result.search("encoding=\"windows-1250\"") > 0) {
                    reader.readAsText(file, 'Windows-1250');
                }
                else {
                    reader.readAsText(file);
                }
            };

            readerHelp.onerror = function () {
                alert('Nepodarilo sa prečítať súbor.');
            };

            readerHelp.readAsText(file);
        },

        _getFileNameForFDF: function (extension, id, segment) {
            var path = window.location.pathname,
				filename = path.substr(path.lastIndexOf('/') + 1).replace('.html', '');

            if (extension) {
                filename += (id !== undefined ? '_' + id : '') + (segment !== undefined ? segment : '') + '.' + extension;
            }

            return filename;
        },

        _print: function (e) {
            e.preventDefault();

            var self = this;

            if (self.options.onValidate(true) < 5) {
                var numberOfSections = 0;
                if (self.options.form) {
                    var sections = $('.pageableSection', self.options.form);
                    numberOfSections = sections.length == 0 ? 1 : sections.length;
                }

                var transformed = {
                    FDF2Print: [],
                    PDF2Print: []
                }

                if (!GetExternalResource(ResourceType.PDF, null)) {
                    alert("Formulár neobsahuje tlačenú PDF predlohu. Formulár bude vytlačený pomocou funkcie webového prehliadača na tlač HTML dokumentu.");
                }

                //fdf
                self._printRecursive(0, 0, transformed, numberOfSections);
                if (transformed.FDF2Print.length > 1) {
                    alert('Na základe Vašej požiadavky o vytlačenie obsahu formulára bol vytvorený balíček obsahujúci PDF súbory vyplnené Vami zadanými údajmi. V prípade opakujúcich sa strán môže byť týchto PDF súborov viac a spolu tvoria úplný obsah vyplneného tlačiva.');
                }

                //pdf
                var pdfsTemp = GetExternalResourceIndex(ResourceType.PDF);
                if (pdfsTemp) {
                    var pdfs = pdfsTemp.split('|');
                    if (pdfs) {
                        var path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                        for (var i = 0; i < pdfs.length; i++) {
                            var pdf = null;
                            if (pdfs[i] != 'Potvrdenie')
                                pdf = GetExternalResource(ResourceType.PDF, pdfs[i]);
                            if (pdf) {
                                transformed.PDF2Print.push(path + pdf);
                            }
                        }
                    }
                }

                //send to server
                self._save2Zip(transformed);

            } else {
                alert('Formulár nie je validný.');
            }
        },

        _printRecursive: function (fdfId, segmentId, resultArray, maximum) {
            var self = this,
			    options = self.options;

            var result = options.onPrint(fdfId, segmentId);
            if (result) {
                resultArray.FDF2Print[resultArray.FDF2Print.length] = { filename: self._getFileNameForFDF('fdf', fdfId, segmentId), content: result }
                if (fdfId === 0) {
                    self._printRecursive(1, 0, resultArray, maximum);
                } else {
                    self._printRecursive(fdfId, ++segmentId, resultArray, maximum);
                }
                //var goNext = function () {
                //	if (fdfId === 0) {
                //		self._printRecursive(1, 0);
                //	} else {
                //		self._printRecursive(fdfId, ++segmentId);
                //	}
                //};

                //if (self._supportsBlobs()) {
                //	self._saveToFile(result, 'application/vnd.fdf', this._getFileNameFor('fdf'));
                //	goNext();
                //} else {
                //	self._saveToFileAsync(result, this._getFileNameFor('fdf'), goNext);
                //}

            } else {
                if (fdfId > 0 && fdfId < maximum) {
                    self._printRecursive(++fdfId, 0, resultArray, maximum);
                }
            }
        },

        _help: function (e) {
            e.preventDefault();

            var self = this;

            var fileName = GetExternalResource(ResourceType.HELP, null);
            if (fileName) {
                var path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                window.open(path + fileName, '_blank');
            }
        },

        _confirm: function (e) {
            e.preventDefault();
            var self = this;

            if (self.options.onValidate(true) < 5) {
                var transformed = self.options.onConfirm();
                if (transformed) {
                    //send to server
                    self._save2Zip(transformed);
                    //alert('Pre vytlačenie si rozbalte obsah ZIP súboru na lokálny disk a otvorte si FDF súbor cez PDF prehliadač (napr. Acrobat Reader). \r\nPriložený PDF súbor sa naplní údajmi a môžete si ho uložiť alebo vytlačiť.');
                }
            } else {
                alert('Formulár nie je validný.');
            }
        },

        _saveToFile: function (content, type, filename) {
            var blob = new Blob([content], { type: type });
            $.saveAs(blob, filename);
        },

        _getDownloadId: function () {
            return this.lastDownloadId++;
        },

        _saveToFileAsync: function (content, filename, callback) {
            var id = this._getDownloadId();
            var iframe = $('<iframe style="display: none;" id="async-download-' + id + '" />').appendTo(document.body);
            var form = $('<form method="POST" action="' + this.options.asyncSaveUrl + '" target=async-download-"' + id + '" style="display:none;" />').appendTo(document.body);
            $('<textarea name="content" />').val(content).appendTo(form);
            $('<input type="text" name="filename" />').val(filename).appendTo(form);

            if (callback && $.isFunction(callback)) {
                iframe.bind('load' + this.namespace, function () {
                    callback();
                });
            }

            form.submit();
        },

        _save2Zip: function (printobject) {
            var id = this._getDownloadId();
            var iframe = $('<iframe style="display: none;" id="async-download-' + id + '" name="async-download-' + id + '" />').appendTo(document.body);
            var form = $('<form id="myForm' + id + '" method="POST" action="' + this.options.asyncZipUrl + '" style="display:none;" enctype="multipart/form-data" />').appendTo(document.body);
            $('<input type="hidden" name="object2print" />').val(JSON.stringify(printobject)).appendTo(form);
            form.attr('target', 'async-download-' + id);
            form.submit();
        },

        _validate: function (e) {
            e.preventDefault();

            var self = this,
			    options = self.options;

            var res = options.onValidate(false);
            if (res < 5) {
                if (res === 1) {
                    alert('Formulár obsahuje logické chyby, ktoré je možné upraviť.\nLogické chyby nebránia vytlačeniu formulára.');
                }
                else {
                    alert('Kontrola formulára prebehla úspešne.');
                }
            }
            else {
                alert('Formulár obsahuje validačné chyby.');
            }
        },

        _reset: function (e) {
            e.preventDefault();

            var self = this,
			    options = self.options;

            if (options.onReset()) {
                alert('Formulár bol vyčistený.');
            }
        }
    });

    $.fn.formButtons = function (userOptions) {
        return $.each(this, function (_, target) {
            var self = $(target);
            if (self.data('form-buttons')) {
                return;
            }

            var buttons = new FormButtons();
            buttons.create(target, userOptions);
            self.data('form-buttons', buttons);
        });
    };
} (jQuery));

function replacefdf(fieldName, value) {
    var x = ")/T (" + fieldName + ")";
    var y = specialfdf(value) + ")/T (" + fieldName + ")";
    eform.fdfDoc = eform.fdfDoc.replace(x, y);
}

var neprepisovatZnakyFdf = false;
var isFdfUpper;
function prepisznakyFdf(str, isupper) {
    if (neprepisovatZnakyFdf)
        return str;
    if (!str)
        return '';
    if (typeof isFdfUpper !== 'undefined') {
        if (isFdfUpper != false) {
            if (((isupper && isFdfUpper) || (typeof isupper === 'undefined')))
                str = str.toUpperCase();
        }
    }

    //nahrádzanie nešpecifických znakov pre správne vyobrazenie v PDFku
    str = str.replace(/\(/g, "\\(");
    str = str.replace(/\)/g, "\\)");
    str = str.replace(/\\/, "\\");
    str = str.replace(/</g, "\\210");
    str = str.replace(/>/g, "\\211");
    str = str.replace(/‰/g, "\\213");
    str = str.replace(/€/g, "\\240");
    str = str.replace(/Á/g, "\\301");
    str = str.replace(/á/g, "\\341");
    str = str.replace(/Ä/g, "\\304");
    str = str.replace(/ä/g, "\\344");
    str = str.replace(/Č/g, "\\225");
    str = str.replace(/č/g, "\\226");
    str = str.replace(/Ď/g, "\\230");
    str = str.replace(/ď/g, "\\232");
    str = str.replace(/É/g, "\\311");
    str = str.replace(/é/g, "\\351");
    str = str.replace(/Ě/g, "\\233");
    str = str.replace(/ě/g, "\\234");
    str = str.replace(/Ë/g, "\\313");
    str = str.replace(/ë/g, "\\353");
    str = str.replace(/Í/g, "\\315");
    str = str.replace(/í/g, "\\355");
    str = str.replace(/Ĺ/g, "\\241");
    str = str.replace(/ĺ/g, "\\242");
    str = str.replace(/Ľ/g, "\\245");
    str = str.replace(/ľ/g, "\\251");
    str = str.replace(/Ň/g, "\\252");
    str = str.replace(/ň/g, "\\254");
    str = str.replace(/Ó/g, "\\323");
    str = str.replace(/ó/g, "\\363");
    str = str.replace(/Ô/g, "\\324");
    str = str.replace(/ô/g, "\\364");
    str = str.replace(/Ö/g, "\\326");
    str = str.replace(/ö/g, "\\366");
    str = str.replace(/Ő/g, "\\266");
    str = str.replace(/ő/g, "\\271");
    str = str.replace(/Ŕ/g, "\\203");
    str = str.replace(/ŕ/g, "\\261");
    str = str.replace(/Ř/g, "\\277");
    str = str.replace(/ř/g, "\\272");
    str = str.replace(/ß/g, "\\337");
    str = str.replace(/Š/g, "\\227");
    str = str.replace(/š/g, "\\235");
    str = str.replace(/Ť/g, "\\222");
    str = str.replace(/ť/g, "\\243");
    str = str.replace(/Ú/g, "\\332");
    str = str.replace(/ú/g, "\\372");
    str = str.replace(/Ü/g, "\\334");
    str = str.replace(/ü/g, "\\374");
    str = str.replace(/Ů/g, "\\262");
    str = str.replace(/ů/g, "\\263");
    str = str.replace(/Ű/g, "\\201");
    str = str.replace(/ű/g, "\\202");
    str = str.replace(/Ý/g, "\\335");
    str = str.replace(/ý/g, "\\375");
    str = str.replace(/Ž/g, "\\231");
    str = str.replace(/ž/g, "\\236");
    str = str.replace(/¦/g, "\\246");
    str = str.replace(/§/g, "\\247");
    str = str.replace(/«/g, "\\253");
    str = str.replace(/»/g, "\\273");
    str = str.replace(/µ/g, "\\265");
    str = str.replace(/-/g, "\\205");
    str = str.replace(/\–/g, "\\205");
    str = str.replace(/—/g, "\\204");
    str = str.replace(/\?/g, "\\217");
    str = str.replace(/:/g, "\\246");
    str = str.replace(/\xA0/g, " ");
    str = str.replace(/„/g, "\\214");
    str = str.replace(/“/g, "\\215");
    str = str.replace(/”/g, "\\216");
    str = str.replace(/‘/g, "\\217");
    str = str.replace(/’/g, "\\220");
    str = str.replace(/‚/g, "\\221");
    str = str.replace(/˝/g, "\\250");
    return str;
}

/* FileSaver.js
* A saveAs() FileSaver implementation.
* 2013-10-21
*
* By Eli Grey, http://eligrey.com
* License: X11/MIT
*   See LICENSE.md
*/

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
(function ($, undefined) {
    $.saveAs = $.saveAs
	  || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
		  || (function (view) {
		      "use strict";
		      var 
				  doc = view.document
		      // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
					  , get_URL = function () {
					      return view.URL || view.webkitURL || view;
					  }
				, URL = view.URL || view.webkitURL || view
				, save_link = /* CUSTOM CODE START */doc.createElementNS && /* CUSTOM CODE END */doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
				, can_use_save_link = /* CUSTOM CODE START */save_link && /* CUSTOM CODE END */!view.externalHost && "download" in save_link
					  , click = function (node) {
					      var event = doc.createEvent("MouseEvents");
					      event.initMouseEvent(
							"click", true, false, view, 0, 0, 0, 0, 0
							, false, false, false, false, 0, null
						);
					      node.dispatchEvent(event);
					  }
				, webkit_req_fs = view.webkitRequestFileSystem
				, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
				, throw_outside = function (ex) {
				    (view.setImmediate || view.setTimeout)(function () {
				        throw ex;
				    }, 0);
				}
				, force_saveable_type = "application/octet-stream"
				, fs_min_size = 0
				, deletion_queue = []
					  , process_deletion_queue = function () {
					      var i = deletion_queue.length;
					      while (i--) {
					          var file = deletion_queue[i];
					          if (typeof file === "string") { // file is an object URL
					              URL.revokeObjectURL(file);
					          } else { // file is a File
					              file.remove();
					          }
					      }
					      deletion_queue.length = 0; // clear queue
					  }
					  , dispatch = function (filesaver, event_types, event) {
					      event_types = [].concat(event_types);
					      var i = event_types.length;
					      while (i--) {
					          var listener = filesaver["on" + event_types[i]];
					          if (typeof listener === "function") {
					              try {
					                  listener.call(filesaver, event || filesaver);
					              } catch (ex) {
					                  throw_outside(ex);
					              }
					          }
					      }
					  }
					  , FileSaver = function (blob, name) {
					      // First try a.download, then web filesystem, then object URLs
					      var 
							  filesaver = this
							, type = blob.type
							, blob_changed = false
							, object_url
							, target_view
								  , get_object_url = function () {
								      var object_url = get_URL().createObjectURL(blob);
								      deletion_queue.push(object_url);
								      return object_url;
								  }
								  , dispatch_all = function () {
								      dispatch(filesaver, "writestart progress write writeend".split(" "));
								  }
					      // on any filesys errors revert to saving with object URLs
								  , fs_error = function () {
								      // don't create more object URLs than needed
								      if (blob_changed || !object_url) {
								          object_url = get_object_url(blob);
								      }
								      if (target_view) {
								          target_view.location.href = object_url;
								      } else {
								          window.open(object_url, "_blank");
								      }
								      filesaver.readyState = filesaver.DONE;
								      dispatch_all();
								  }
								  , abortable = function (func) {
								      return function () {
								          if (filesaver.readyState !== filesaver.DONE) {
								              return func.apply(this, arguments);
								          }
								      };
								  }
								  , create_if_not_found = { create: true, exclusive: false }
							, slice
					  	;
					      filesaver.readyState = filesaver.INIT;
					      if (!name) {
					          name = "download";
					      }
					      if (can_use_save_link) {
					          object_url = get_object_url(blob);
					          // FF for Android has a nasty garbage collection mechanism
					          // that turns all objects that are not pure javascript into 'deadObject'
					          // this means `doc` and `save_link` are unusable and need to be recreated
					          // `view` is usable though:
					          doc = view.document;
					          save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
					          save_link.href = object_url;
					          save_link.download = name;
					          var event = doc.createEvent("MouseEvents");
					          event.initMouseEvent(
								"click", true, false, view, 0, 0, 0, 0, 0
								, false, false, false, false, 0, null
							);
					          save_link.dispatchEvent(event);
					          filesaver.readyState = filesaver.DONE;
					          dispatch_all();
					          return;
					      }
					      // Object and web filesystem URLs have a problem saving in Google Chrome when
					      // viewed in a tab, so I force save with application/octet-stream
					      // http://code.google.com/p/chromium/issues/detail?id=91158
					      if (view.chrome && type && type !== force_saveable_type) {
					          slice = blob.slice || blob.webkitSlice;
					          blob = slice.call(blob, 0, blob.size, force_saveable_type);
					          blob_changed = true;
					      }
					      // Since I can't be sure that the guessed media type will trigger a download
					      // in WebKit, I append .download to the filename.
					      // https://bugs.webkit.org/show_bug.cgi?id=65440
					      if (webkit_req_fs && name !== "download") {
					          name += ".download";
					      }
					      if (type === force_saveable_type || webkit_req_fs) {
					          target_view = view;
					      }
					      if (!req_fs) {
					          fs_error();
					          return;
					      }
					      fs_min_size += blob.size;
					      req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
					          fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
					              var save = function () {
					                  dir.getFile(name, create_if_not_found, abortable(function (file) {
					                      file.createWriter(abortable(function (writer) {
					                          writer.onwriteend = function (event) {
					                              target_view.location.href = file.toURL();
					                              deletion_queue.push(file);
					                              filesaver.readyState = filesaver.DONE;
					                              dispatch(filesaver, "writeend", event);
					                          };
					                          writer.onerror = function () {
					                              var error = writer.error;
					                              if (error.code !== error.ABORT_ERR) {
					                                  fs_error();
					                              }
					                          };
					                          "writestart progress write abort".split(" ").forEach(function (event) {
					                              writer["on" + event] = filesaver["on" + event];
					                          });
					                          writer.write(blob);
					                          filesaver.abort = function () {
					                              writer.abort();
					                              filesaver.readyState = filesaver.DONE;
					                          };
					                          filesaver.readyState = filesaver.WRITING;
					                      }), fs_error);
					                  }), fs_error);
					              };
					              dir.getFile(name, { create: false }, abortable(function (file) {
					                  // delete file if it already exists
					                  file.remove();
					                  save();
					              }), abortable(function (ex) {
					                  if (ex.code === ex.NOT_FOUND_ERR) {
					                      save();
					                  } else {
					                      fs_error();
					                  }
					              }));
					          }), fs_error);
					      }), fs_error);
					  }
				, FS_proto = FileSaver.prototype
					  , saveAs = function (blob, name) {
					      return new FileSaver(blob, name);
					  }
		  	;
		      FS_proto.abort = function () {
		          var filesaver = this;
		          filesaver.readyState = filesaver.DONE;
		          dispatch(filesaver, "abort");
		      };
		      FS_proto.readyState = FS_proto.INIT = 0;
		      FS_proto.WRITING = 1;
		      FS_proto.DONE = 2;

		      FS_proto.error =
			FS_proto.onwritestart =
			FS_proto.onprogress =
			FS_proto.onwrite =
			FS_proto.onabort =
			FS_proto.onerror =
			FS_proto.onwriteend =
				null;
		      /* CUSTOM CODE REPLACE START */
		      if (view.addEventListener) {
		          view.addEventListener("unload", process_deletion_queue, false);
		      } else {
		          view.attachEvent("unload", process_deletion_queue);
		      }
		      // view.addEventListener("unload", process_deletion_queue, false);
		      /* CUSTOM CODE REPLACE END */
		      return saveAs;
		  } (this.self || this.window || this.content));
    // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window
} (jQuery));

if (typeof module !== 'undefined') module.exports = saveAs;

///<reference path="../_references.js"/>

(function ($, undefined) {
    'use strict';

    var AsyncUpload = function () {

        if (!(this instanceof AsyncUpload)) {
            return new AsyncUpload();
        }

        this.input = null;
        this.options = {
            logger: null,
            selected: null,
            complete: null,
            name: null,
            url: null,
            data: null,
            autoUpload: true
        };

        var iframeId = 1,
		    iframe = null,
		    form = null;

        this.log = function (message) {
            if (window.console && window.console.debug) {
                window.console.debug(message);
            }

            if (this.options.logger) {
                this.options.logger(message);
            }
        };

        this.cleanup = function () {
            if (iframe) {
                iframe.remove();
            }
            if (form) {
                form.remove();
            }
            this.log('Cleanup.');
        };

        this.onComplete = function () {

            if (this.options.cancelButton) {
                this.options.cancelButton.hide();
            }

            this.log('Completed.');
            var response = iframe.contents().text();

            this.log('Response: ' + response);
            var json = $.parseJSON(response);
            if (this.options.complete) {
                this.options.complete(json);
            }

            this.cleanup();
        };

        this.submit = function () {
            var input = this.input,
			    data = this.options.data,
			    name = this.options.name || input.attr('name'),
			    id = 'iframe-for-' + name + '-' + iframeId++;

            iframe = $('<iframe name="' + id + '" id="' + id + '" style="display: none;"/>');
            form = $('<form enctype="multipart/form-data" method="POST" action="' + this.options.url + '" target="' + id + '" style="display: none;" />');

            input.clone().val('').asyncUpload(this.options).insertAfter(input);

            form.append(input);
            iframe.appendTo(document.body);
            form.appendTo(document.body);

            if (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        $('<input type="hidden" name="' + key + '" value="' + data[key] + '" />').appendTo(form);
                    }
                }
            }

            iframe.one('load.async-upload', $.proxy(this.onComplete, this));
            form[0].submit();
            this.log('Submitted.');
        };

        this.onChange = function (e) {
            var fileInput = $(e.target)[0],
			    file;
            if (fileInput.files) {
                file = fileInput.files[0];
            } else {
                var fullPath = $(fileInput).val(),
				    index = fullPath.lastIndexOf("\\"),
				    filename = (index != -1) ? fullPath.substr(index + 1) : fullPath;

                file = {
                    name: filename,
                    size: null
                };
            }

            this.log('File: ' + file.name);
            this.log('Size: ' + file.size);

            if (this.options.selected && !this.options.selected(file)) {
                this.log('Aborted.');
                e.preventDefault();
                return false;
            }

            if (this.options.autoUpload) {
                this.submit();
            }

            return true;
        };

        this.init = function (target, userOptions) {
            this.input = $(target);
            this.options = $.extend(true, this.options, userOptions);

            if (!this.options.url) {
                throw 'Invalid URL.';
            }

            this.input.bind('change.async-upload', $.proxy(this.onChange, this));
        };
    };

    $.fn.asyncUpload = function (options) {

        if (!options) {
            return $(this).data('async-upload');
        }

        return $.each(this, function (_, input) {
            var self = $(input),
			    upload = new AsyncUpload();

            upload.init(self, options);
            self.data('async-upload', upload);
        });
    };
} (jQuery));

function hideHelpBtn() {
    var fileName = GetExternalResource(ResourceType.HELP, null);
    if (!fileName)
        $("#form-button-help").hide();
}

function hideConfButton() {
    var fileName = GetExternalResource(ResourceType.PDF, 'Potvrdenie');
    if (!fileName)
        $("#form-button-confirm").hide();
}


//************************zaokruhlovanie***************************************//

function zaokruhli_dole(cislo, poc_desatin) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.floor(poma + 0.00000001) / pomb;
    return vrat.toFixed(poc_desatin);
}

function zaokruhli_dolemj(poc_desatin, cislo) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.floor(poma + 0.00000001) / pomb;
    return vrat.toFixed(poc_desatin);
}

function zaokruhli_hore(cislo, poc_desatin) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.ceil(poma) / pomb;
    return vrat.toFixed(poc_desatin);
}

function zaokruhli_horemj(poc_desatin, cislo) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.ceil(poma) / pomb;
    return vrat.toFixed(poc_desatin);
}


function zaokruhli_mate(cislo, poc_desatin) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.round(poma) / pomb;
    return vrat.toFixed(poc_desatin);
}

function zaokruhli_matmj(poc_desatin, cislo) {
    vrat = cislo;
    pomb = Math.pow(10, poc_desatin);
    poma = cislo * pomb;
    vrat = Math.round(poma) / pomb;
    return vrat.toFixed(poc_desatin);
}

function cislo_znamienko(cislo) {
    vrat = cislo;
    if (cislo > 0) { vrat = '+' + vrat; }
    return vrat;
}

function predvolbaSnulou(input) {
    var vrat = input;
    if (input.substr(0, 1) != '0') {
        vrat = '0' + input;
    }
    return vrat;
}

function predvolbaBezNuly(input) {
    var vrat = input;
    if (input.substr(0, 1) == '0') {
        vrat = input.substr(1);
    }
    return vrat;
}


function removeRepeatSections(layoutrowid) {

    var layoutRow = $('#' + layoutrowid).closest('div[id^=layoutRow]');
    var poma = $("div[id^='" + layoutrowid + "']").length;
    var firstSubstring = $('#' + layoutrowid).find('[id=addSection' + layoutrowid + ']').attr("onclick").toString().split('addSection(');
    var minRepetition;

    if (firstSubstring[1]) {
        minRepetition = firstSubstring[1].split(',')[0];

        if (isNaN(minRepetition))
            return;

        if (poma > Number(minRepetition)) {
            for (var pomb = poma; pomb > Number(minRepetition) ; pomb--) {
                var sender = layoutrowid;
                var removeButton = $('div[id^=' + sender + ']').last().find('#removeSection' + sender);
                removeSection(1, removeButton);
            }
        }
    }
}

function removeEmptySections(layoutrowid) {
    var layoutRow = $('#' + layoutrowid).closest('div[id^=layoutRow]');
    var poma = $("div[id^='" + layoutrowid + "']").length - 1;
    if (poma > 1) {
        for (var pomb = poma; pomb > 0; pomb--) {
            var remove = true;
            $('#' + layoutrowid + '_Repeating_' + pomb).find('input').each(function () {
                if (this.value != '') {
                    remove = false;
                }
            });
            if (!remove)
                break;
            var sender = layoutrowid;
            var removeButton = $('div[id^=' + sender + ']').last().find('#removeSection' + sender);
            removeSection(1, removeButton);
        }
    }
}


function removeEmptyPageSections(layoutrowid) {
    //odstranenie prazdnych s ohladom na default podla value textu
    var polesekcii = $('#' + layoutrowid).pageableSection();
    var dlzka_celkom = 0;
    var val1 = "";
    var val2 = "";
    var pocet_premennych = polesekcii.pages[0].values.length;
    var pocet_sekcii = polesekcii.totalPages - 1;
    if (pocet_sekcii > 0) {
        for (var i = pocet_sekcii; i > 0; i--) {
            for (var pr = 0; pr < pocet_premennych; pr++) {
                var val_value = polesekcii.pages[i].values[pr].value;
                var val_key = polesekcii.pages[i].values[pr].key;
                var val_default = polesekcii.defaultValues[val_key];
                val1 = val1 + val_value;
                val2 = val2 + val_default;
            }
            //alert(i + " : " + dlzka_celkom);          
            if (val1 == val2) {
                $('#' + layoutrowid).pageableSection().removePage();
            }
            val1 = "";
            val2 = "";
        }
    }
}

function removeEmptyPageSectionsWithoutDefaults(layoutrowid) {
    //odstranenie prazdnych
    var polesekcii = $('#' + layoutrowid).pageableSection();
    var pocet_sekcii = polesekcii.totalPages - 1;
    if (pocet_sekcii > 0) {
        var dlzka_celkom = 0;
        var pocet_premennych = polesekcii.pages[0].values.length;
        for (var i = pocet_sekcii; i > 0; i--) {
            if (dlzka_celkom > -1) {
                for (var pr = 0; pr < pocet_premennych; pr++) {
                    var akt_dlzka = polesekcii.pages[i].values[pr].value.length;
                    dlzka_celkom = dlzka_celkom + akt_dlzka;
                }
                //alert(i + " : " + dlzka_celkom);          
                if (dlzka_celkom == 0) {
                    $('#' + layoutrowid).pageableSection().removePage();
                } else {
                    dlzka_celkom = -1;
                }
            }
        }
    }
}


/*******************************metody pre fdf*******************************/
function znamienko(cislo) {
    var result = '';
    if (!!cislo) {
        if (Number(cislo) > 0) { result = '+'; }
        if (Number(cislo) < 0) { result = '-'; }
    }
    return result;
}

function celacast(cislo) {
    var result = '';

    if (!!cislo) {
        var parts = cislo.split('.');
        result = parts[0];
    }
    if (isNaN(result)) { result = ''; }
    return result;
}

function celacastabs(cislo) {
    var result = '';

    if (!!cislo) {
        var parts = cislo.split('.');
        result = Math.abs(Number(parts[0]));
    }
    if (isNaN(result)) { result = ''; }
    return result.toString();
}

function desatinnacast(cislo, dlzka) {
    var result = '';

    if (!!cislo) {
        var parts = cislo.split('.');
        if (dlzka == 0) {
            if (parts.length == 2) { result = parts[1] } else
                if (parts.length == 1 && parts[0].length > 0) { result = '0'; }
        } else {
            if (parts.length == 2) { result = doplnzprava(parts[1], '0', dlzka); } else
                if (parts.length == 1 && parts[0].length > 0) { result = repeatchar('0', dlzka); }
        }
    }
    if (isNaN(result)) { result = ''; }
    return result;
}

function doplnzprava(dopnane, pattern, count) {
    var result = '';
    result = (dopnane.toString() + repeatchar('0', count - dopnane.toString().length)).substr(0, count)
    return result;
}

function doplnzlava(dopnane, pattern, count) {
    var result = '';
    result = (repeatchar('0', count - dopnane.toString().length)).substr(0, count) + dopnane.toString()
    return result;
}

function repeatchar(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 0) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result;
}

function getPageValue1Fdf(page, element) {
    var vrat = '';
    if (page == 0) {
        vrat = $("#" + element).val();
    } else {
        if (!!$("#" + element + "_Repeating_" + page).val())
            vrat = $("#" + element + "_Repeating_" + page).val();
    }
    return vrat;
}

function getPageValue2Fdf(pageValues, elementId) {
    if (!!pageValues) {
        for (var i = 0; i < pageValues.values.length; i++) {
            var value = pageValues.values[i];
            if (value.key === elementId) {
                return value.value || '';
            }
        }
    }
    else return '';
}

function getPageValueCh1Fdf(page, element) {
    if (page == 1) {
        return $("#" + element).is(':checked') ? 'X' : '';
    } else {
        return $("#" + element + "_Repeating_" + page).is(':checked') ? 'X' : '';
    }
}

function getPageValueCh2Fdf(pageValues, elementId) {
    var vrat = '';
    if (!!pageValues) {
        for (var i = 0; i < pageValues.values.length; i++) {
            var value = pageValues.values[i];
            if (value.key === elementId) {
                if (value.value == true) {
                    vrat = 'X';
                }
            }
        }
    }
    return vrat;
}

function getPageValueRbList2Fdf(pageValues, elementId) {
    var vrat = '';
    if (!!pageValues) {
        for (var i = 0; i < pageValues.values.length; i++) {
            var value = pageValues.values[i];
            if (value.key === elementId) {
                vrat = value.value;
            }
        }
    }
    return vrat;
}

function vypocetpoctustranFdf(pocetsekcii, sekciinastranu) {
    var pocetstran = Math.floor(pocetsekcii / sekciinastranu);
    if ((pocetsekcii % sekciinastranu) > 0) {
        pocetstran = pocetstran + 1;
    }
    return pocetstran
}

function pocetstran1fdf(layoutRow, sekciinastranu) {
    var result = 0;
    var polesekcii = $('#' + layoutRow);
    var pocetsekcii = polesekcii.siblings('div[id^=' + layoutRow + repeatingPostfix + ']');
    result = vypocetpoctustranFdf(pocetsekcii, sekciinastranu);
    return result;
}

function pocetstran2fdf(layoutRow, sekciinastranu) {
    var result = 0;
    var polesekcii = $('#' + layoutRow).pageableSection();
    var pocetsekcii = polesekcii.totalPages;
    result = vypocetpoctustranFdf(pocetsekcii, sekciinastranu);
    return result;
}

function bezZnamienka(value) {
    var vrat = value;
    if (!!value && (value.substr(0, 1) == '+' || value.substr(0, 1) == '-')) {
        vrat = value.substr(1);
    }
    return vrat;
}

function divideRows(rowCount, elementId) {
    var arrOfRowsResult = new Array();
    var arrOfRows = new Array();
    if ($('#' + elementId).val().indexOf('\n') != -1) {
        arrOfRows = $('#' + elementId).val().split('\n');
        for (var i = 0; i < rowCount; i++) {
            arrOfRowsResult[i] = "";
            //ak je riadkov viac spoji do jedneho,posledny
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
                arrOfRowsResult[i] = $('#' + elementId).val().replace(/\t/g, " ").substr(i * 37);
            }
            else {
                arrOfRowsResult[i] = $('#' + elementId).val().replace(/\t/g, " ").substr(i * 37, 37);
            }
        }
    }
    return arrOfRowsResult;
}

//pomocna metoda na nastavenie hodnot do comboboxu
function nastavCombo(elementid, text) {
    var nastavIndex = 0;
    var element = document.getElementById(elementid);
    for (i = 0; i < element.length; i++) {
        if (text.replace(/\s/g, '').toUpperCase() == element[i].value.replace(/\s/g, '').toUpperCase()) {
            nastavIndex = i;
            break;
        }
    }
    $('#' + elementid).val(element[nastavIndex].value);
}

//doplni datum do tvaru dd.mm.yyyy
function upravdatum(datum) {
    if (datum.length > 0) {
        var datum1 = datum;
        var part = datum.replace(/\,/g, '.').replace(/\//g, '.').split('.');
        var dd = part[0];
        if (dd.length == 1) { dd = '0' + dd; }
        var mm = part[1];;
        if (mm.length == 1) { mm = '0' + mm; }
        var yyyy = part[2];
        var datum2 = dd + '.' + mm + '.' + yyyy;
        if (datum2.indexOf('undefined') == -1) {
            return datum2;


        } else {
            return datum1;
        }
    } else {
        return datum;
    }
}


function iterateAllPageableSections() {

    $('.pageableSection').each(function (i, obj) {
        var pageable = $(this).pageableSection();

        for (var i = 0; i < pageable.totalPages; i++) {
            if (pageable.currentPage >= pageable.totalPages) {
                $(this).find("input[ID], select, textarea").each(function () {
                    $(this).change();
                });
                pageable.updateButtons();
                return;
            }

            pageable.saveCurrentPage();
            pageable.currentPage++;
            pageable.currentPageLabel.text(pageable.currentPage);
            pageable.resetLayout();
            pageable.loadCurrentPage();
        }
    });
}