var disableValidatorPostfix = "_SectionIncrement_";
var disableValidatorPrefix = "DoNotValidate_";
var repeatingPostfix = "_Repeating_";
var lookupUri = "http://localhost/ego.filler.ws/lookup.aspx";
var count = 0;
var fieldIndex = 0;

// init sections in repeated section
$.fn.InitSections = function () { // dorobiť
    var headerCorrection = this.find(".headercorrection");
    headerCorrection.parent(".caption").next(".columns").show(); //.removeAttr("style");        
    headerCorrection.next("span.ui-icon").removeClass("ui-icon-carat-1-s").addClass("ui-icon-carat-1-n");

    var layoutRowContent = this.children("div[id^='layoutRowContent']");
    layoutRowContent.find("div[id^='layoutRowContent'][style]").parent("div[id^='layoutRow']").attr("isempty", true);
    layoutRowContent.find("div[id^='layoutRowContent'][style^='display: block;']").hide().ToggleValidators(true);
    layoutRowContent.find("div[id^='layoutRowContent'][style^='DISPLAY: block']").hide().ToggleValidators(true); // if IE                
    layoutRowContent.find("div[id^='repetitionCommands']").children("span[id^='removeSection']").hide();

    return this;
};

$.fn.InitSectionAccordion = function () {
    this.find(".caption").click(function () {
        var layoutRowContent = $(this).next(".columns");
        //var layoutRow = layoutRowContent.parent();
        //var isEmpty = layoutRow.attr('isEmpty');

        //if (isEmpty == 'true'){             
        //    return;
        //}

        var arrowSpan = $(this).children("span.ui-icon");
        arrowSpan.toggleClass("ui-icon-carat-1-n").toggleClass("ui-icon-carat-1-s");
        //layoutRowContent.slideToggle(0);
        if (arrowSpan.hasClass("ui-icon-carat-1-n")) {
            layoutRowContent.show();
        } else if (arrowSpan.hasClass("ui-icon-carat-1-s")) {
            layoutRowContent.hide();
        }
    });

    return this;
};

$.fn.RemoveDatePickerClass = function () {
    this.find(".datepicker").removeClass("hasDatepicker");

    return this;
};

$.fn.InitDatePicker = function () {
    this.find(".datepicker").datepicker();

    return this;
};

$.fn.InitDateTimeControl = function () {
    this.find(".datetimepicker").datetimepicker();

    return this;
};

$.fn.InitPopUpDialog = function () {
    this.find("div[LookupDetail]").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    this.find("[LookupButton]").click(function () {
        var fieldId = $(this).attr('fieldID');
        fieldIndex = $("span.lookupbutton[fieldID='" + fieldId + "']").index(this);
        var nonPostfixFieldID = fieldId.split(disableValidatorPostfix)[0];
        var dialog = $("[LookupForm][fieldID='" + nonPostfixFieldID + "']").eq(0);
        dialog.attr("fieldID", fieldId);
        dialog.dialog("open");
    });

    this.find("[FieldInfo]").click(function () {
        var fieldId = $(this).attr('fieldID');
        var nonPostfixFieldID = fieldId.split(disableValidatorPostfix)[0];
        var fieldInfoIndex = $("[FieldInfo][fieldID='" + nonPostfixFieldID + "']").index(this);
        var infoText = $("input[LookupDetailInfo][fieldID='" + fieldId + "']").eq(fieldInfoIndex).val();
        $("div[LookupDetail][fieldID='" + nonPostfixFieldID + "']").text(infoText);
        $("div[LookupDetail][fieldID='" + nonPostfixFieldID + "']").eq(0).dialog("open");
    });

    this.find("[LookupForm]").dialog({
        autoOpen: false,
        height: 350,
        width: 420,
        modal: true,
        buttons: {
            "OK": SubmitLookup,
            "Zrušiť": function () {
                $(this).dialog("close");
            }
        },
        open: OpenLookup
    });

    return this;
};

function SubmitLookup() {
    var fieldId = $(this).attr('fieldID');
    var nonPostfixFieldId = fieldId.split(disableValidatorPostfix)[0];
    var anSelected = fnGetSelected(oTable);
    var field = $("[LookupField][fieldID='" + fieldId + "']");
    var turned = "turned";
    var lookupDetailInfo = $("input[LookupDetailInfo][fieldID='" + fieldId + "']");
    var lookupFieldValue = $("input[LookupFieldValue][fieldID='" + fieldId + "']");
    var aData;
    if (anSelected.length > 0) {
        aData = oTable.fnGetData(anSelected[0]);

        if (field.eq(fieldIndex).hasClass(turned))
            field.eq(fieldIndex).val(aData[1]);
        else
            field.eq(fieldIndex).val(aData[0]);

        lookupDetailInfo.eq(fieldIndex).val(aData[1]);
        lookupFieldValue.eq(fieldIndex).val(aData[1]);
        $(this).attr('fieldID', nonPostfixFieldId);
        field.eq(fieldIndex).focus();
    }
    else {
        aData = oTable.fnGetData(anSelected[0]);

        if (field.eq(fieldIndex).hasClass(turned))
            field.eq(fieldIndex).val(aData[0][1]);
        else
            field.eq(fieldIndex).val(aData[0][0]);

        lookupDetailInfo.eq(fieldIndex).val(aData[1]);
        $(this).attr('fieldID', nonPostfixFieldId);
        field.eq(fieldIndex).focus();
    }
    $(this).dialog("close");
}

function OpenLookup() {
    var lookupId = $(this).attr('lookupID');

    oTable = $(this).find("table[id^='LookupTable']").dataTable({
        "bAutoWidth": true,
        "bFilter": true,
        "bServerSide": true,
        "bJQueryUI": true,
        "bProcessing": true,
        "bLengthChange": false,
        "iDisplayLength": 10,
        "bPaginate": true,
        "bInfo": false,
        "bRetrieve": true,
        "sAjaxSource": lookupUri + '?id=' + lookupId + '&callback=?',
        "aoColumns": [{ "sName": "Kod" }, { "sName": "Hodnota" }]
    });

    oTable.fnFilterOnReturn();

    $(this).find("[id^='LookupTable'][id$='_filter']").hide();
    $(this).find("#FilterButton").button().click(function () {
        oTable.fnFilter($(this).prev().val());
    });

    $(this).find("table[id^='LookupTable'] tbody").click(function (event) {
        $(oTable.fnSettings().aoData).each(function () {
            $(this.nTr).removeClass('row_selected');
        });
        $(event.target.parentNode).addClass('row_selected');
    });
}

function jsonLookupCallback(json, fieldId) {
    var options = '';

    $.each(json, function (key, val) {
        options += '<option value="' + val.optionValue + '">' + val.optionDisplay + '</option>';
    });

    $("select#" + fieldId + "SelectLookup").html(options);
}

$.fn.ClearFormElements = function () {
    this.find(':input').each(function () {
        var element = $(this);
        switch (this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'select-multiple':
                element.val('');
                break;
            case 'checkbox':
                this.checked = false;
                break;
            case 'radio':
                this.checked = false;
                break;
        }
    });

    return this;
};

$.fn.ReinitRadioDefaultCheck = function () {
    this.find(':input').each(function () {
        switch (this.type) {
        case 'radio':
            var input = $(this);
            var defaultVal = input.attr('default');
            if (defaultVal == 'true') {
                this.checked = true;
                input.click();
            }
        }
    });

    return this;
};

$.fn.ResetRepetitionSection = function () {
    this.find('.layoutRow.repeatingSection').remove();
    this.find('.layoutRow.hiddenSection').toggleClass("hiddenSection");
    this.find('div#repetitionCommands').show();

    return this;
};

$.fn.IncrementSectionIds = function (sectionIncrement) {
    //Used in ASP.NET generation alternative
    this.attr("ID", GetIncrementalValue(this.attr("ID"), sectionIncrement));

    this.addClass("repeatingSection");

    this.find('[ID]:radio').each(function () {
        IncrementItemDelegate($(this), sectionIncrement);
    });
    
    return this;
};

$.fn.IncrementFieldIds = function () {
    this.find('[ID].datepicker').each(function () {
        var context = $(this);
        context.attr("ID", GetIncrementalValue2(context.attr("ID")));
    });
    this.find('[ID]:input').each(function () {
        var context = $(this);
        context.attr("ID", GetIncrementalValue2(context.attr("ID")));
    });
    this.find('label').each(function () {
        var context = $(this);
        context.attr("for", GetIncrementalValue2(context.attr("for")));
    });
    
    return this;
};

function GetIncrementalValue(value, sectionIncrement) {
    var regEx = new RegExp(repeatingPostfix + "\\d+$");
    var cleanVal = value.replace(regEx, '');

    return cleanVal + repeatingPostfix + sectionIncrement;
}

function GetIncrementalValue2(value) { // pre atributy ID a FOR
    var count = $(document).find("[id^='" + value + "']").length;
    var sign = "-";
    var index = value.indexOf(sign);
    if (index > 0) {
        value = value.substring(0, index);
        count = $(document).find("[id^='" + value +"']").length;
    }
    
    return value + sign + count;
}

function GetValueWithoutIncremental(value) {
    var regEx = new RegExp(repeatingPostfix + "\\d+$");
    return cleanVal = value.replace(regEx, '');
}

function IncrementItemDelegate(context, sectionIncrement) {
    context.attr("name", GetIncrementalValue(context.attr("name"), sectionIncrement));
}

$.fn.ToggleValidators = function (toggle) {
    if (toggle == false) {
        this.find('[ID]:input').each(function () {
            var input = $(this);
            input.attr("id", input.attr("id").replace(disableValidatorPrefix, ''));
            input.attr("name", input.attr("name").replace(disableValidatorPrefix, ''));
        });
        this.find('label').each(function () {
            var input = $(this);
            input.attr("for", input.attr("for").replace(disableValidatorPrefix, ''));
        });
        this.find("[id^='layoutRow'][isempty='true']").ToggleValidators(true);
        this.find("div.layoutRow.hiddenSection").ToggleValidators(true);
    } else {
        this.find('[ID]:input').each(function () {
            var input = $(this);
            if (input.attr("id").indexOf(disableValidatorPrefix) == -1)
                input.attr("id", disableValidatorPrefix + input.attr("id"));
            if (input.attr("name").indexOf(disableValidatorPrefix) == -1)
                input.attr("name", disableValidatorPrefix + input.attr("name"));
        });
        this.find('label').each(function () {
            var input = $(this);
            if (input.attr("for").indexOf(disableValidatorPrefix) == -1)
                input.attr("for", disableValidatorPrefix + input.attr("for"));
        });
    }
    return this;
};

$.fn.ToggleValidatorsStyle = function (toggle) {
    var disablevalidators = "disableValidators";
    var find = this.find('[ID]:input');
    if (toggle == false)
        find.each(function () {
            var input = $(this);
            input.removeClass(disablevalidators);
            input.focusout();
        });
    else
        find.each(function () {
            $(this).addClass(disablevalidators);
            $(this).focusout();
        });

    return this;
};

$.fn.HideSwitchSections = function (switchesToSections) {
    for (var oneSwitch in switchesToSections) {
        var trigger = $(oneSwitch);
        for (var i = 0; i < trigger.length; i++) {
            var currentTrigger = $(trigger[i]);
            if (!currentTrigger.is(":checked")) {
                var sectionsCollection = switchesToSections[oneSwitch];
                var context = GetContext(currentTrigger, sectionsCollection);
                for (section in sectionsCollection) {
                    var section = context.find(sectionsCollection[section]).eq(0);
                    var hiddensection = "hiddenSection";
                    if (section.hasClass('cell')) {
                        var sectionChild = section.children().first();
                        sectionChild.toggleClass(hiddensection, true);
                        sectionChild.ToggleValidators(true);
                    }
                    section.toggleClass(hiddensection, true);
                    section.ToggleValidators(true);
                }
            }
        }
    }

    return this;
};

$.fn.SwitchSections = function (switchesToSections, isCheckBoxList) {
    var context = $(this);

    for (var singleSwitch in switchesToSections) {
        var trigger = context.find(singleSwitch);

        if (trigger.length == 0)
            return;

        trigger.click(function myfunction() {
            if (isCheckBoxList == true)
                switchCheckboxClicked(switchesToSections, this);
            else
                switchRadioClicked(switchesToSections, this);
        });
    }

    return this;
};

$.fn.ReinitializeConditionalRules = function () {
    var context = $(this);

    InitConditionalRules(context);

    return this;
};

function GetContext(currentclick, target) {
    return recur($(currentclick), target[0]);
}

function findParent(element) {
    var patt = new RegExp("^layoutRow[0-9]+$");
    var patt2 = new RegExp("^layoutRow[0-9]+_Repeating_[0-9]+$");
    var id = element[0].id;
    if (patt.test(id) || patt2.test(id) || id == "main") {
        return element;
    } else {
        return findParent(element.parent());
    }
}

function recur(element, target) {
    var f;
    var children = element[0].children;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id == "main") {
            return $("form");
        }
        if (child.children.length > 0) {
            var a = $(child).find(target);
            if (a.length > 0) {
                f = findParent(a.parent());
            } 
        }
    }

    if (f == null) {
        return recur(element.parent(), target);
    } else {
        return f;
    }
}

function switchRadioClicked(switchesToSections, currentclick) {
    for (var oneSwitch in switchesToSections) {
        var target = switchesToSections[oneSwitch];
        var context = GetContext(currentclick, target);
        var sectionsCollection = target;
        oneSwitch = context.find(oneSwitch);

        for (var section in sectionsCollection) {
            section = context.find(sectionsCollection[section]);
            var sectionChild;
            var hiddensection = "hiddenSection";
            var cell = 'cell';
            if (oneSwitch[0] == currentclick) {
                if (section.hasClass(cell)) {
                    sectionChild = section.children().first();
                    sectionChild.toggleClass(hiddensection, false);
                    sectionChild.ToggleValidators(false);
                    sectionChild.ToggleValidatorsStyle(false);
                }
                section.toggleClass(hiddensection, false);
                section.ToggleValidators(false);
                section.ToggleValidatorsStyle(false);
            } else {
                if (section.hasClass(cell)) {
                    sectionChild = section.children().first();
                    sectionChild.toggleClass(hiddensection, true);
                    sectionChild.ToggleValidators(true);
                    sectionChild.ToggleValidatorsStyle(true);
                }
                section.ToggleValidatorsStyle(true);
                section.toggleClass(hiddensection, true);
                section.ToggleValidators(true);
            }
        }
    }
}

function switchCheckboxClicked(switchesToSections, currentclick) {
    var isCheckboxSelected = $(currentclick).is(':checked');
    var sectionsCollection = null;

    for (var sectionsKey in switchesToSections) {
        var target = switchesToSections[sectionsKey];
        var context = GetContext(currentclick, target);
        var oneSwitch = context.find(sectionsKey);
        if (oneSwitch[0] == currentclick) {
            sectionsCollection = target;
            break;
        }
    }

    if (sectionsCollection == null)
        return;

    for (var section in sectionsCollection) {
        section = context.find(sectionsCollection[section]).eq(0);
        var sectionChild;
        var hiddensection = "hiddenSection";
        var cell = 'cell';
        if (isCheckboxSelected) {
            if (section.hasClass(cell)) {
                sectionChild = section.children().first();
                sectionChild.toggleClass(hiddensection, false);
                sectionChild.ToggleValidators(false);
            }
            section.toggleClass(hiddensection, false);
            section.ToggleValidators(false);
        }
        else {
            if (section.hasClass(cell)) {
                sectionChild = section.children().first();
                sectionChild.toggleClass(hiddensection, true);
                sectionChild.ToggleValidators(true);
            }
            section.toggleClass(hiddensection, true);
            section.ToggleValidators(true);
        }
    }
}

$.GetUrlParam = function (name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results == null)
        return 0;

    return results[1] || 0;
}