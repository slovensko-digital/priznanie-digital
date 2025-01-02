/// <reference path="jquery-1.4.1-vsdoc.js" />
/// <reference path="~/Template/FormTemplates/Scripts/jquery.min.js" />
$(document).ready(function () {
	InitPopUpDialog();
	InitDatePickerValues();

	InitDatePickerDateFormat();
	InitDatePickerDateFormat2();
	$('.datepicker:not(.hasDatepicker)').live('focus', function () {
		$(this).datepicker().focus();
		return false;
	});

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

	$(".comboBox").change(function () {
		$(".textBox").focusout();
	});
	InitOdobratBtn();
	ResizeTextareaField();
	CleanRepetitionButtons();
	LayoutTempRepetitonSection();
    ReindexInputs();
});

function ReindexInputs() {
    var inputs = $(document).find('input');
    for (var i = 0; i < inputs.length; i++) {
        var id = inputs[i].id;
        if (id != "" & id.indexOf("-") == -1) {
            var match = $("[id = " + id + "]");
            if (match.length > 1) {
                var index = 0;
                match.each(function () {
                    if (index > 0) {
                        $(this)[0].id += "-" + index;
                    }
                    index++;
                });
            }
        }
    }
}

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

function CleanRepetitionButtons() {
	$('div[id^=repetitionCommandslayoutRow]').each(CleanButton);
}

function LayoutTempRepetitonSection() {
    $('div[adjustposition^=true]').each(Layout);
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
		timeOnlyTitle: 'Vyber čas',
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
		var that = this;

		this.each(function (i) {
			$.fn.dataTableExt.iApiIndex = i;
			var anControl = $('input', that.fnSettings().aanFeatures.f);
			anControl.unbind('keyup').bind('keypress', function (e) {
				if (e.which == 13) {
					$.fn.dataTableExt.iApiIndex = i;
					that.fnFilter(anControl.val());
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
	var layoutRowCopy = layoutRow.clone();
	var sectionsCount = countSection(sender, 'addSection');
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
	        .IncrementFieldIds()
	        .ResetRepetitionSection()
	        .InitSectionAccordion()
	        .RemoveDatePickerClass()
	        .InitDateTimeControl()
	        .InitPopUpDialog()
	        .IncrementSectionIds(sectionsCount);
		    //.InitSections();

		layoutRow.after(layoutRowCopy);
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
	layoutRowCopy.ReinitRadioDefaultCheck().ReinitializeConditionalRules();
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

//function for sett form from native xml
function FillNativeXml(input) {
	var path = input.value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", path, false);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML.documentElement.childNodes;
	var form = document.forms[0];
	//loop input elements
	$(form).find(':input').each(function () {
		var cleanName;
	    var xmlVal;
	    var object = $(this);
	    var name = 'name';
	    switch (this.type) {
	    case 'password':
	    case 'text':
	    case 'textarea':
	        {
	            var v = FindValueInXml(object.attr(name), xmlDoc);
	            object.val(v);
	            break;
	        }
	    case 'select-multiple':
	    case 'select-one':
	    case 'radio':
	        {
	            cleanName = GetValueWithoutIncremental(object.attr(name));
	            xmlVal = FindValueInXml(cleanName, xmlDoc);
	            var inputs = $('input[name="' + object.attr(name) + '"]');
	            var formVal = inputs.index(object);
	            if (xmlVal == formVal)
	                this.checked = true;
	            else
	                this.checked = false;
	            break;
	        }
	    case 'checkbox':
	        {
	            cleanName = GetValueWithoutIncremental(object.attr(name));
	            xmlVal = FindValueInXml(cleanName, xmlDoc);
	            if (xmlVal == '1')
	                this.checked = true;
	            else
	                this.checked = false;
	            break;
	        }
	    }
	});
}

function FindValueInXml(elementName, xmlDoc) {
	var $xml = $(xmlDoc);
	var $xmlValue = $xml.find(elementName);
	return $xmlValue.text();
}

//prototype function for generating xml
function GenerateNativeXml() {
	var xml = "<xml>";
	function processHtml() {
	    var input = $(this);
	    var isempty = 'isempty';
	    if (input.hasClass('hiddenSection') || (input.attr(isempty) !== undefined && input.attr(isempty) == "true"))
			return;

		if (input.attr('type') == "hidden")
			return;
		var name = 'name';
	    
	    if (input.hasClass('layoutRow')) {
			xml += '<' + input.children("input:first").attr(name) + '>';
		}

		if (input.is(':input')) {
			if (input.attr(name) !== undefined) {
				if (input.is(':radio')) {
					if (input.is(':checked')) {
						// radioIndex = $(this).parents('div').find(":radio").index(this);
						//xml += '<' + $(this).attr('name') + '>' + $(this).val() + '</' + $(this).attr('name') + '>';
						var cleanName = GetValueWithoutIncremental(input.attr(name));
						var inputs = $('input[name="' + input.attr(name) + '"]');

						xml += '<' + cleanName + '>' + inputs.index(input) + '</' + cleanName + '>';
					}
				}
				else if (input.is(':checkbox')) {
					if (input.is(':checked')) {
						xml += '<' + input.attr(name) + '>' + 1 + '</' + input.attr(name) + '>';
					}
					else {
						xml += '<' + input.attr(name) + '>' + 0 + '</' + input.attr(name) + '>';
					}
				}
				else if (input.is(':button') || input.is(':submit')) {
					// do nothing for buttons
				}
				else {
					xml += '<' + input.attr(name) + '>' + htmlEncode(input.val()) + '</' + input.attr(name) + '>';
				}
			}
		}

		if (!input.hasClass('hiddenSection') && (input.attr(isempty) === undefined || input.attr(isempty) == "false"))
			input.children().each(processHtml);

		if (input.hasClass('layoutRow')) {
			xml += '</' + input.children("input:first").attr(name) + '>';
		}
	}

	$('#main').children('div').each(processHtml);

	xml += "</xml>";

	return xml;
}

// WCF  Validation Service       
function CallServerValidateService() {
	//TO DO: Vygenerovat formData do HTML formulara a pre-poslat web service
	var formData = "<formData><XmlData></XmlData><DictionaryData></DictionaryData><ContextData></ContextData></formData>";
	var sessionID = $.GetUrlParam("SessionID");
	var url = $.GetUrlParam("SubmitUrl");
	url = unescape(url);
	var data = '{"formDocument": "' + GenerateNativeXml() + '", "formData": "' + formData + '", "sessionID": "' + sessionID + '"}';
	var contentType = "application/json";

	statusDialog.setTitle("Ukladanie formulára");
	statusDialog.setMessage("Prebieha ukladanie formulára");
	statusDialog.showProgress();
	statusDialog.showDialog();

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		contentType: contentType,
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
    var input = $(item);
    valMsg[input.attr("key")] = input.text();
}

function TryRedirectToReturnUrl() {
	var returnUrl = $.GetUrlParam("ReturnUrl");

	if (returnUrl != 0)
		self.location.href = unescape(returnUrl);
}

function htmlEncode(value) {
	value = value.replace(/\n/gi, "%0A");
	value = value.replace(/\\/gi, "%0B");
	value = value.replace(/"/gi, "%0C");
	return $('<div/>').text(value).html();
}

var baseMargin = 4;
function Layout() {
    var templateSection = $(this);
    var parentCellCount = templateSection.parents("div[class^='cell ']").length;
    var margin = (parentCellCount + 1) * baseMargin;
    if (margin > baseMargin && templateSection.children().children("div[class^='caption ']").css('border-left-width') == '1px') {
        margin -= baseMargin;
    }
    templateSection.css('margin-left', '-' + margin + 'px');
    templateSection.find('label').each(Move);
}

function Move() {
	var label = $(this);
	label.css('margin-left', "-" + parseInt(label.parents("div[adjustposition^='true']").css('margin-left').replace("-", "").replace("px", "") - baseMargin) + 'px');
	label.width(label.width() + 16);
}

function CleanButton() {
	var repetitionSection = $(this);
	var id = repetitionSection.parent()[0].id;
	var addButton = $('#addSection' + id);
	var removeButton = $('#removeSection' + id);
	if (addButton[0] != undefined) {
		var string = addButton.attr('onclick').toString();
		var array = string.substring(string.lastIndexOf("(") + 1, string.lastIndexOf(", this")).split(',');
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

function hodnota(element, nazov, opak_typ, sid, layoutNazov, dataType) {
	var tstr;

	////////////////////////////////////////////////////////////////////////// zaciatok opakovana
	if (opak_typ == 'o') {
		if (element == null) {
			if (sid == 0)
				tstr = document.getElementById(nazov).value;
			else
				tstr = document.getElementById(GetIncrementalValue(nazov, sid)).value;
		} else {
			tstr = element.value;
		}
	} else
	////////////////////////////////////////////////////////////////////////// koniec opakovana
	////////////////////////////////////////////////////////////////////////// zaciatok strankovana
		if (opak_typ == 's' || opak_typ == 'p') {
			if (sid == layArrAkt[layoutNazov]) {
				if (element == null) {
					tstr = document.getElementById(GetIncrementalValue(nazov, sid)).value;
				} else {
					tstr = element.value;
				}
			}
			if (sid != layArrAkt[layoutNazov]) {
				var lnode = layArrXml[layoutNazov].documentElement.childNodes.item(sid).getElementsByTagName(nazov)[0];
				if (lnode.childNodes.length == 0) {
					tstr = '0';
				} else {
					tstr = lnode.childNodes[0].nodeValue;
				}
			}
		} else
		////////////////////////////////////////////////////////////////////////// koniec strankovana
		////////////////////////////////////////////////////////////////////////// zaciatok normalna
			if (opak_typ == 'n') {
				//zistim si, aky to je typ
				var elements = document.getElementsByName(nazov);
				if (elements[0].type == 'radio') {
					//je radiobutton
					for (i = 0; i < elements.length; i++) {
						if (elements[i].checked) {
							tstr = i; //vrat index oznaceneho pola od 0 - n
							break;
						}
					}
				}
				else {
					//je checkbox
					if (elements[0].type == 'checkbox') {
						if (elements[0].checked) {
							tstr = 1;
						}
						else {
							tstr = 0;
						}
					} else {
						if (element == null) {
							tstr = document.getElementById(nazov).value;
						} else {
							tstr = element.value;
						}
					}
				}
			}
	////////////////////////////////////////////////////////////////////////// koniec opakovana
	if (tstr == null || tstr === undefined || tstr == '')
		tstr = 0;

	//ak je datovy typ string, vrat dlzku retazca
	if (dataType == 's') {
		return tstr.length;
	}
	return parseFloat(tstr);
}