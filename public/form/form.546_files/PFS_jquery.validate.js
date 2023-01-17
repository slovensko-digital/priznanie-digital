/*
* jQuery validation plug-in pre-1.5.2
*
* http://bassistance.de/jquery-plugins/jquery-plugin-validation/
* http://docs.jquery.com/Plugins/Validation
*
* Copyright (c) 2006 - 2008 Jörn Zaefferer
*
* $Id: jquery.validate.js 6243 2009-02-19 11:40:49Z joern.zaefferer $
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function ($) {

	$.extend($.fn, {
		// http://docs.jquery.com/Plugins/Validation/validate
		validate: function (options) {

			// if nothing is selected, return nothing; can't chain anyway
			if (!this.length) {
				options && options.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
				return;
			}

			// check if a validator for this form was already created
			var validator = $.data(this[0], 'validator');
			if (validator) {
				return validator;
			}

			validator = new $.validator(options, this[0]);
			$.data(this[0], 'validator', validator);

			if (validator.settings.onsubmit) {

				// allow suppresing validation by adding a cancel class to the submit button
				this.find("input, button").filter(".cancel").click(function () {
					validator.cancelSubmit = true;
				});

				// validate the form on submit
				this.submit(function (event) {
					if (validator.settings.debug)
						// prevent form submit to be able to see console output
						event.preventDefault();

					function handle() {
						if (validator.settings.submitHandler) {
							validator.settings.submitHandler.call(validator, validator.currentForm);
							return false;
						}
						return true;
					}

					// prevent submit for invalid forms or custom submit handlers
					if (validator.cancelSubmit) {
						validator.cancelSubmit = false;
						return handle();
					}
					if (validator.form()) {
						if (validator.pendingRequest) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}

			return validator;
		},
		// http://docs.jquery.com/Plugins/Validation/valid
		valid: function () {
			if ($(this[0]).is('form')) {
				return this.validate().form();
			} else {
				var valid = false;
				var validator = $(this[0].form).validate();
				this.each(function () {
					valid |= validator.element(this);
				});
				return valid;
			}
		},
		// attributes: space seperated list of attributes to retrieve and remove
		removeAttrs: function (attributes) {
			var result = {},
                $element = this;
			$.each(attributes.split(/\s/), function (index, value) {
				result[value] = $element.attr(value);
				$element.removeAttr(value);
			});
			return result;
		},
		// http://docs.jquery.com/Plugins/Validation/rules
		rules: function (command, argument) {
			var element = this[0];

			if (command) {
				var settings = $.data(element.form, 'validator').settings;
				var staticRules = settings.rules;
				var existingRules = $.validator.staticRules(element);
				switch (command) {
					case "add":
						$.extend(existingRules, $.validator.normalizeRule(argument));
						staticRules[element.name] = existingRules;
						if (argument.messages)
							settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
						break;
					case "remove":
						if (!argument) {
							delete staticRules[element.name];
							return existingRules;
						}
						var filtered = {};
						$.each(argument.split(/\s/), function (index, method) {
							filtered[method] = existingRules[method];
							delete existingRules[method];
						});
						return filtered;
				}
			}

			var data = $.validator.normalizeRules(
                $.extend(
                    {},
                    $.validator.metadataRules(element),
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.staticRules(element)
                ), element);

			// make sure required is at front
			if (data.required) {
				var param = data.required;
				delete data.required;
				data = $.extend({ required: param }, data);
			}

			return data;
		}
	});

	// Custom selectors
	$.extend($.expr[":"], {
		// http://docs.jquery.com/Plugins/Validation/blank
		blank: function (a) { return !$.trim(a.value); },
		// http://docs.jquery.com/Plugins/Validation/filled
		filled: function (a) { return !!$.trim(a.value); },
		// http://docs.jquery.com/Plugins/Validation/unchecked
		unchecked: function (a) { return !a.checked; }
	});


	$.format = function (source, params) {
		if (arguments.length == 1)
			return function () {
				var args = $.makeArray(arguments);
				args.unshift(source);
				return $.format.apply(this, args);
			};
		if (arguments.length > 2 && params.constructor != Array) {
			params = $.makeArray(arguments).slice(1);
		}
		if (params.constructor != Array) {
			params = [params];
		}
		$.each(params, function (i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
		});
		return source;
	};

	// constructor for validator
	$.validator = function (options, form) {
		this.settings = $.extend({}, $.validator.defaults, options);
		this.currentForm = form;
		this.init();
	};

	$.extend($.validator, {
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			/* CUSTOM CODE START */
			warningClass: "warning",
			/* CUSTOM CODE END */
			errorElement: "label",
			focusInvalid: true,
			errorContainer: $([]),
			errorLabelContainer: $([]),
			onsubmit: true,
			ignore: [],
			ignoreClientErrors: false,
			ignoreTitle: false,
			onvalfocusin: function (element) {
				this.lastActive = element;

				// hide error label and remove error class on focus if enabled
				if (this.settings.focusCleanup && !this.blockFocusCleanup) {
					/* CUSTOM CODE START */
					// this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass);
					this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass + ' ' + this.settings.warningClass);
					/* CUSTOM CODE END */
					this.errorsFor(element.id).hide(); ////////////////////////////////////////////////////////////////////////// 
				}
			},
			onvalfocusout: function (element) {
				if (!this.checkable(element) && (/*element.id in this.submitted*/true || !this.optional(element))) { //////////////////////////////////////////////////////////////////////////
					/* CUSTOM CODE START */
					window.errorValidateFocusOut = true;
					/* CUSTOM CODE END */
					this.element(element);
				}
			},
			onvalkeyup: function (element) {
				if (/*element.id in this.submitted*/true || element == this.lastElement) { //////////////////////////////////////////////////////////////////////////
					/* CUSTOM CODE START */
					window.errorValidateFocusOut = true;
					/* CUSTOM CODE END */
					this.element(element);
				}
			},
			onvalclick: function (element) {
				if (/*element.id in this.submitted*/true) {   //////////////////////////////////////////////////////////////////////////
					/* CUSTOM CODE START */
					window.errorValidateFocusOut = true;
					/* CUSTOM CODE END */
					this.element(element);
				}
			},
			highlight: function (element, errorClass, elementid, sectionName, sectionPage) {
				if (sectionName) {
					var section = $('#' + sectionName).pageableSection();
					if (section && section.currentPage !== sectionPage) {
						return;
					}
				}

				var $element = $(element);
				if ($element.is(':radio') && element.name) {
					var elements = document.getElementsByName(element.name);
					$(elements).addClass(errorClass);
					return;
				}

				if (element.id == elementid) {
					$element.addClass(errorClass);
				}
			},
			unhighlight: function (element, errorClass, elementid, sectionName, sectionPage) {
				if (sectionName) {
					var section = $('#' + sectionName).pageableSection();
					if (section && section.currentPage !== sectionPage) {
						return;
					}
				}

				var $element = $(element);
				if ($element.is(':radio') && element.name) {
					var elements = document.getElementsByName(element.name);
					$(elements).removeClass(errorClass);
					return;
				}

				if (elementid == undefined || element.id == elementid) {
					$(element).removeClass(errorClass);
				}
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
		setDefaults: function (settings) {
			$.extend($.validator.defaults, settings);
		},

		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date (ISO).",
			dateDE: "Bitte geben Sie ein gültiges Datum ein.",
			number: "Please enter a valid number.",
			numberDE: "Bitte geben Sie eine Nummer ein.",
			digits: "Please enter only digits",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			accept: "Please enter a value with a valid extension.",
			maxlength: $.format("Please enter no more than {0} characters."),
			minlength: $.format("Please enter at least {0} characters."),
			rangelength: $.format("Please enter a value between {0} and {1} characters long."),
			range: $.format("Please enter a value between {0} and {1}."),
			max: $.format("Please enter a value less than or equal to {0}."),
			min: $.format("Please enter a value greater than or equal to {0}.")
		},

		autoCreateRanges: false,

		prototype: {
			init: function () {
				this.labelContainer = $(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
				this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
				this.errorTypes = {}; //////////////////////////////////////////////////////////////////////////
				/* CUSTOM CODE START */
				window.errorValidateFocusOut = true; // ci sa vykonava validacia pre konkretne pole (nie pre naviazane alebo pre vsetky)
				/* CUSTOM CODE END */

				var groups = (this.groups = {});
				$.each(this.settings.groups, function (key, value) {
					$.each(value.split(/\s/), function (index, name) {
						groups[name] = key;
					});
				});

				/* CUSTOM CODE START */
				var rulesToCheck = this.settings.rules,
                    rules = {};
				$.each(rulesToCheck, $.proxy(function (key, value) {
					if (rulesToCheck.hasOwnProperty(key) && this.objectLength(value)) {
						rules[key] = $.validator.normalizeRule(value);
					}
				}, this));

				this.settings.rules = rules;

				// var rules = this.settings.rules;
				// $.each(rules, function(key, value) {
				//         rules[key] = $.validator.normalizeRule(value);
				// });
				/* CUSTOM CODE END */

				function delegate(event) {
					var validator = $.data(this[0].form, "validator");
					validator.settings["onval" + event.type] && validator.settings["onval" + event.type].call(validator, this[0]);
				}

				$(this.currentForm)
					.delegate("click", ":radio, :checkbox", delegate)
                    .delegate("focusin focusout", ":text, :password, :file, select, textarea", delegate);


				if (this.settings.invalidHandler)
					$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/form
			form: function () {
				this.checkForm();
				$.extend(this.submitted, this.errorMap);
				this.invalid = $.extend({}, this.errorMap);
				if (!this.valid())
					$(this.currentForm).triggerHandler("invalid-form", [this]);

				if (this.settings.ignoreClientErrors)
					return true;

				this.showErrors();
				return this.valid();
			},

			checkForm: function () {
				this.prepareForm();
				/* CUSTOM CODE START */
				window.errorValidateFocusOut = false;
				/* CUSTOM CODE START */

				for (var i = 0, elements = (this.currentElements = this.elements()) ; elements[i]; i++) {
					var element = elements[i],
                        section = $(element).closest('.pageableSection');
					if (section.length) {
						continue;
					} else {
						this.check(elements[i]);
					}
				}

				$.each($('.pageableSection', this.currentForm), function (_, section) {
					$(section).pageableSection().validate();
				});

				return this.valid();
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/element
			element: function (element) {
				element = this.clean(element);
				this.lastElement = element;
				this.prepareElement(element);
				this.currentElements = $(element);
				/* CUSTOM CODE START */
				//window.errorValidateFocusOut = true;  nemoze byt kvoli recykleniu
				/* CUSTOM CODE END */
				var result = this.check(element);
				if (result) {
					delete this.invalid[element.id];
					delete this.errorTypes[element.id];
				} else {
					this.invalid[element.id] = true;
				}
				if (!this.numberOfInvalids()) {
					// Hide error containers on last error
					this.toHide = this.toHide.add(this.containers);
				}
				/* CUSTOM CODE START */
				// this.resetForm();
				// this.form();
				/* CUSTOM CODE END */
				this.showErrors();
				return result;
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
			showErrors: function (errors) {
				if (errors) {
					// add items to error list and map
					$.extend(this.errorMap, errors);
					this.errorList = [];
					for (var name in errors) {
						var elementIndex = 0;
						var elementInfo = name.split(":");
						var elementName = elementInfo[0];

						if (elementInfo.length > 1)
							elementIndex = elementInfo[1] * 1;

						this.errorList.push({
							message: errors[name],
							element: this.findByName(elementName)[elementIndex],
							elementid: null  //////////////////////////////////////////////////////////////////////////
						});
						this.errorTypes[element.id] = errortype; //////////////////////////////////////////////////////////////////////////
					}
					// remove items from success list
					this.successList = $.grep(this.successList, function (element) {
						return !(element.id in errors); //////////////////////////////////////////////////////////////////////////
					});
				}
				this.settings.showErrors
                    ? this.settings.showErrors.call(this, this.errorMap, this.errorList)
                    : this.defaultShowErrors();
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
			resetForm: function () {
				if ($.fn.resetForm)
					$(this.currentForm).resetForm();
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();

				/* CUSTOM CODE START */
				this.elements().removeClass(this.settings.errorClass + ' ' + this.settings.warningClass);
				// this.elements().removeClass(this.settings.errorClass);
				// this.elements().removeClass(this.settings.warningClass);
				/* CUSTOM CODE END */
			},

			numberOfInvalids: function () {
				return this.objectLength(this.invalid);
			},

			numberOfErrorTypes: function (errorType) {
				var c = 0;
				for (var prop in this.errorTypes) {
					if (this.errorTypes.hasOwnProperty(prop) && this.errorTypes[prop] === errorType) {
						c++;
					}
				}

				return c;
			},

			numberOfErrors: function () {
				return this.numberOfErrorTypes('e');
			},

			numberOfWarnings: function () {
				return this.numberOfErrorTypes('w');
			},

			objectLength: function (obj) {
				var count = 0;
				for (var i in obj)
					count++;
				return count;
			},

			hideErrors: function () {
				this.addWrapper(this.toHide).hide();
			},

			valid: function () {
				return this.size() == 0;
			},

			size: function () {
				return this.errorList.length;
			},

			focusInvalid: function () {
				if (this.settings.focusInvalid) {
					try {
						$(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus();
					} catch (e) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive: function () {
				var lastActive = this.lastActive;
				return lastActive && $.grep(this.errorList, function (n) {
					return n.element.name == lastActive.name;
				}).length == 1 && lastActive;
			},

			elements: function () {
				var validator = this,
                    rulesCache = {};

				// select all valid inputs inside the form (no submit or reset buttons)
				// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
				return $([]).add(this.currentForm.elements)
                    .filter(":input")
                    .not(":submit, :reset, :image, [disabled]")
                    .not(this.settings.ignore)
                    .filter(function () {
                    	validator.settings.debug && window.console && console.error("%o has no name assigned", this);

                    	// select only the first element for each name, and only those with rules specified
                    	/* CUSTOM CODE START */
                    	//if (!validator.objectLength($(this).rules()))
                    	var name = validator.idOrName(this);
                    	var currentRules = validator.settings.rules[name];
                    	if (!currentRules || !validator.objectLength(currentRules)) {
                    		/* CUSTOM CODE END */
                    		return false;
                    	}

                    	rulesCache[name] = true;
                    	return true;
                    });
			},

			clean: function (selector) {
				return $(selector)[0];
			},

			errors: function () {
				return $(this.settings.errorElement + "." + this.settings.errorClass + ", " + this.settings.errorElement + "." + this.settings.warningClass, this.errorContext); ////////////////////////////////////////////////////////////////////////// 
			},

			reset: function (resetSectionErrors) {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.errorTypes = {};
				this.toShow = $([]);
				this.toHide = $([]);
				this.formSubmitted = false;
				this.currentElements = $([]);

				if (resetSectionErrors) {
					$('.section-error', this.errorContext).remove();
				}
			},

			prepareForm: function () {
				this.reset(true);
				this.toHide = this.errors().add(this.containers);
			},

			prepareElement: function (element) {
				this.reset();
				this.toHide = this.errorsFor(element.id); ////////////////////////////////////////////////////////////////////////// 
			},

			check: function (element) {
				element = this.clean(element);
				/* CUSTOM CODE START */
				if ($(element).hasClass('disableValidators')) {
					return true;
				}
				/* CUSTOM CODE END */

				// if radio/checkbox, validate first element in group instead
				/*if (this.checkable(element)) {
					element = this.findByName(element.name)[0];
				}*/

				var rules = $(element).rules();
				var dependencyMismatch = false;
				var method; //////////////////////////////////////////////////////////////////////////  bugfix - pomiesa sa to pri rekurzivnom volani
				for (method in rules) {
					var rule = { method: method, parameters: rules[method] };
					try {
						var value = element.value;
						if (this.sectionScope) {
							if (this.sectionScope.ruleName && this.sectionScope.ruleName !== rule.method) {
								continue;
							}

							for (var i = 0; i < this.sectionScope.values.length; i++) {
								var sectionValue = this.sectionScope.values[i];
								if (sectionValue.key === element.id) {
									value = sectionValue.value;
								}
							}
						}

						var result = $.validator.methods[method].call(this, value === false || value === true ? "" : value.replace(/\r/g, ""), element, rule.parameters);
						// in case of recursive call the  currentElements is overwritten
						if (window.errorValidateFocusOut == true) {
							this.currentElements = $(element);
						}

						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if (result == "dependency-mismatch") {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if (result == "pending") {
							this.toHide = this.toHide.not(this.errorsFor(element.id)); ////////////////////////////////////////////////////////////////////////// 
							return;
						}

						var section = $(element).closest('.pageableSection'),
                            sectionName = '',
                            sectionPage = 0;

						if (section.length) {
							var scope = this.sectionScope;
							if (scope) {
								sectionName = scope.name;
								sectionPage = scope.page;
							} else {
								var temp = section.pageableSection();
								sectionName = temp.getSectionName();
								sectionPage = temp.getCurrentPage();
							}
						}

						if (result !== undefined && !result) {
							var errorType = 'e';
							if (method === 'customW') {
								errorType = 'w'
							}
							if (this.sectionScope){
								//nastavime hned errorType aj pre pole
								var pole = $.grep(this.sectionScope.values, function (e) { return e.key == element.name; })[0];
								if (pole) {
									pole.errorType = errorType;
								}
							}

							this.formatAndAdd(element, rule, errorType, sectionName, sectionPage);
							return false;
						} else {
							this.removeSectionError(element, rule, errorType, sectionName, sectionPage);
						}
					} catch (e) {
						this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
                            + ", check the '" + rule.method + "' method");
						throw e;
					}
				}
				if (dependencyMismatch)
					return;
				if (this.objectLength(rules))
					this.successList.push(element);
				return true;
			},

			// return the custom message for the given element and validation method
			// specified in the element's "messages" metadata
			customMetaMessage: function (element, method) {
				if (!$.metadata)
					return;

				var meta = this.settings.meta
                    ? $(element).metadata()[this.settings.meta]
                    : $(element).metadata();

				return meta && meta.messages && meta.messages[method];
			},

			// return the custom message for the given element name and validation method
			customMessage: function (name, method) {
				var m = this.settings.messages[name];
				return m && (m.constructor == String
                    ? m
                    : m[method]);
			},

			// return the first defined argument, allowing empty strings
			findDefined: function () {
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] !== undefined)
						return arguments[i];
				}
				return undefined;
			},

			defaultMessage: function (element, method) {
				return this.findDefined(
                    this.customMessage(this.idOrName(element), method),
                    this.customMetaMessage(element, method),
				// title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + (this.idOrName(element)) + "</strong>"
                );
			},

			formatAndAdd: function (element, rule, errortype, sectionName, sectionPage) {
				var message = this.defaultMessage(element, rule.method);
				if (typeof message == "function")
					message = message.call(this, rule.parameters, element);
				this.errorList.push({
					message: message,
					element: element,
					sectionName: sectionName,
					sectionPage: sectionPage,
					elementid: element.id  ////////////////////////////////////////////////////////////////////////// 
				});
				this.errorMap[element.id] = message; //////////////////////////////////////////////////////////////////////////
				this.submitted[element.id] = message; //////////////////////////////////////////////////////////////////////////
				this.errorTypes[element.id] = errortype; //////////////////////////////////////////////////////////////////////////
			},

			removeSectionError: function (element, rule, errortype, sectionName, sectionPage) {
				var label = this.errorsFor(element.id, sectionName, sectionPage);
				if (label.length) {
					label.remove();
				}
			},

			removeAllSectionErrors: function (sectionName, sectionPage) {
				var labels = $('.section-error', this.errorContext);
				$.each(labels, function (_, label) {
					var self = $(label),
                        section = self.data('section');
					if (section) {
						if (section.name === sectionName) {
							if (section.page === sectionPage) {
								self.remove();
							} else {
								if (section.page > sectionPage) {
									section.page = section.page - 1;
									self.text(self.text().replace(/^\((\d+)\)/, '(' + section.page + ')'));
								}
							}
						}
					}

				});
			},

			addWrapper: function (toToggle) {
				if (this.settings.wrapper)
					toToggle = toToggle.add(toToggle.parents(this.settings.wrapper));
				return toToggle;
			},

			defaultShowErrors: function () {
				for (var i = 0; this.errorList[i]; i++) {
					var error = this.errorList[i];
					this.settings.highlight && this.settings.highlight.call(this, error.element, this.errorTypes[error.elementid] === 'w' ? this.settings.warningClass : this.settings.errorClass, error.elementid, error.sectionName, error.sectionPage);
					this.showLabel(error.element, error.message, error.elementid, error.sectionName, error.sectionPage); //////////////////////////////////////////////////////////////////////////
				}
				if (this.errorList.length) {
					this.toShow = this.toShow.add(this.containers);
				}
				if (this.settings.success) {
					for (var i = 0; this.successList[i]; i++) {
						this.showLabel(this.successList[i]);
					}
				}
				if (this.settings.unhighlight) {
					for (var i = 0, elements = this.validElements() ; elements[i]; i++) {
						/* CUSTOM CODE START */
						// this.settings.unhighlight.call(this, elements[i], this.settings.errorClass);
						this.settings.unhighlight.call(this, elements[i], this.settings.errorClass + ' ' + this.settings.warningClass);
						/* CUSTOM CODE END */
					}
				}
				this.toHide = this.toHide.not(this.toShow).not('.section-error');
				this.hideErrors();
				this.addWrapper(this.toShow).show();
			},

			validElements: function () {
				return this.currentElements.not(this.invalidElements());
			},

			invalidElements: function () {
				return $(this.errorList).map(function () {
					return this.element;
				});
			},

			showLabel: function (element, message, elementId, sectionName, sectionPage) {
				/* CUSTOM CODE START */
				elementId = elementId || element.id;
				/* CUSTOM CODE END */
				var label = this.errorsFor(elementId, sectionName, sectionPage); ////////////////////////////////////////////////////////////////////////// 
				var sectionActual = '';
				if (sectionName) {
					var section2 = $('input[type="hidden"]', '#' + sectionName);
					if (section2 && section2.length !== 0) {
						sectionActual = (section2.first()).attr('data-section-name') || section2.first()[0].name;
					}
				}
				if (label.length) {
					// refresh error/success class
					label.removeClass().addClass(this.errorTypes[elementId] === 'w' ? this.settings.warningClass : this.settings.errorClass).addClass(sectionName ? 'section-error' : ''); ////////////////////////////////////////////////////////////////////////// 

					// check if we have a generated label, replace the message then
					label.attr("generated") && label.html(message + (sectionActual ? ' (' + sectionActual + ': ' : '') + (sectionPage ? sectionPage + ')' : ''));
				} else {
					// create label
					/* CUSTOM CODE START */
					//label = $("<" + this.settings.errorElement + "/>")
					//    .attr({ "for": this.idOrName(element), generated: true })
					//    .addClass(this.settings.errorClass)
					//    .html(message || "");
					var validator = this;
					
					label = $("<" + validator.settings.errorElement + "/>")
                        .attr({ "for": elementId, generated: true })
                        .addClass(validator.errorTypes[elementId] === 'w' ? validator.settings.warningClass : validator.settings.errorClass)
                        .addClass(sectionName ? 'section-error' : '')
                        .html((message || '') + (sectionActual ? ' (' + sectionActual + ': ' : '') + (sectionPage ? sectionPage + ')' : ''));

					if (sectionName && sectionPage) {
						label.data('section', { name: sectionName, page: sectionPage })
						label
                            .unbind('click.ego')
                            .bind('click.ego', function (e) {
                            	e.preventDefault();
                            	var sectionData = $(this).data('section');
                            	var section = $('#' + sectionData.name).pageableSection();
                            	section.goToPage(sectionData.page);
                            	section.focusin(elementId);
                            });
					}
					/* CUSTOM CODE END */

					if (this.settings.wrapper) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
					}
					if (!this.labelContainer.append(label).length)
						this.settings.errorPlacement
                            ? this.settings.errorPlacement(label, $(element))
                            : label.insertAfter(element);
				}
				if (!message && this.settings.success) {
					label.text("");
					typeof this.settings.success == "string"
                        ? label.addClass(this.settings.success)
                        : this.settings.success(label);
				}
				this.toShow = this.toShow.add(label);
			},

			errorsFor: function (elementid, sectionName, sectionPage) { ////////////////////////////////////////////////////////////////////////// 
				if (sectionName && sectionPage) {
					var labels = this.errors().filter("[for='" + elementid + "']");
					return $($.grep(labels, function (label) {
						var section = $(label).data('section');
						if (section) {
							return section.name === sectionName && section.page === sectionPage;
						}
						return true;
					}));
				}

				return this.errors().filter("[for='" + elementid + "']");
			},

			idOrName: function (element) {
				//////////////////////////////////////////////////////////////////////////
				// return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
				if (!element) {
					return '';
				}

				if (this.checkable(element)) {
					if ($(element).closest('.radioButtonList').length) {
						return element.name || '';
					}

					if ($(element).is(':checkbox')) {
						return element.name || '';
					}

					return GetValueWithoutIncremental(element.id || element.name) || '';
				}

				return element.name || element.id || '';
			},

			checkable: function (element) {
				if (!!element)
					return /radio|checkbox/i.test(element.type);
			},

			findByName: function (name) {
				// select by name and filter by form for performance over form.find("[name=...]")
				var form = this.currentForm;
				return $(document.getElementsByName(name)).map(function (index, element) {
					return element.form == form && element.name == name && element || null;
				});
			},

			getLength: function (value, element) {
				switch (element.nodeName.toLowerCase()) {
					case 'select':
						return $("option:selected", element).length;
					case 'input':
						if (this.checkable(element))
							return this.findByName(element.name).filter(':checked').length;
				}
				return value.length;
			},

			depend: function (param, element) {
				return this.dependTypes[typeof param]
                    ? this.dependTypes[typeof param](param, element)
                    : true;
			},

			dependTypes: {
				"boolean": function (param, element) {
					return param;
				},
				"string": function (param, element) {
					return !!$(param, element.form).length;
				},
				"function": function (param, element) {
					return param(element);
				}
			},

			optional: function (element) {
				return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
			},

			startRequest: function (element) {
				if (!this.pending[element.name]) {
					this.pendingRequest++;
					this.pending[element.name] = true;
				}
			},

			stopRequest: function (element, valid) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if (this.pendingRequest < 0)
					this.pendingRequest = 0;
				delete this.pending[element.name];
				if (valid && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
					$(this.currentForm).submit();
				} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
				}
			},

			previousValue: function (element) {
				return $.data(element, "previousValue") || $.data(element, "previousValue", previous = {
					old: null,
					valid: true,
					message: this.defaultMessage(element, "remote")
				});
			}
		},

		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			dateDE: { dateDE: true },
			number: { number: true },
			numberDE: { numberDE: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},

		addClassRules: function (className, rules) {
			className.constructor == String ?
                this.classRuleSettings[className] = rules :
                $.extend(this.classRuleSettings, className);
		},

		classRules: function (element) {
			var rules = {};
			var classes = $(element).attr('class');
			classes && $.each(classes.split(' '), function () {
				if (this in $.validator.classRuleSettings) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
			return rules;
		},

		attributeRules: function (element) {
			var rules = {};
			var $element = $(element);

			for (method in $.validator.methods) {
				var value = $element.attr(method);
				if (value) {
					rules[method] = value;
				}
			}

			// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
			if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
				delete rules.maxlength;
			}

			return rules;
		},

		metadataRules: function (element) {
			if (!$.metadata) return {};

			var meta = $.data(element.form, 'validator').settings.meta;
			return meta ?
                $(element).metadata()[meta] :
                $(element).metadata();
		},

		staticRules: function (element) {
			var rules = {};
			var validator = $.data(element.form, 'validator');
			if (validator.settings.rules) {
				rules = $.validator.normalizeRule(validator.settings.rules[validator.idOrName(element)]) || {};
			}
			return rules;
		},

		normalizeRules: function (rules, element) {
			// handle dependency check
			$.each(rules, function (prop, val) {
				// ignore rule when param is explicitly false, eg. required:false
				if (val === false) {
					delete rules[prop];
					return;
				}
				if (val.param || val.depends) {
					var keepRule = true;
					switch (typeof val.depends) {
						case "string":
							keepRule = !!$(val.depends, element.form).length;
							break;
						case "function":
							keepRule = val.depends.call(element, element);
							break;
					}
					if (keepRule) {
						rules[prop] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[prop];
					}
				}
			});

			// evaluate parameters
			$.each(rules, function (rule, parameter) {
				rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
			});

			// clean number parameters
			$.each(['minlength', 'maxlength', 'min', 'max'], function () {
				if (rules[this]) {
					rules[this] = Number(rules[this]);
				}
			});
			$.each(['rangelength', 'range'], function () {
				if (rules[this]) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				}
			});

			if ($.validator.autoCreateRanges) {
				// auto-create ranges
				if (rules.min && rules.max) {
					rules.range = [rules.min, rules.max];
					delete rules.min;
					delete rules.max;
				}
				if (rules.minlength && rules.maxlength) {
					rules.rangelength = [rules.minlength, rules.maxlength];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			// To support custom messages in metadata ignore rule methods titled "messages"
			if (rules.messages) {
				delete rules.messages;
			}

			return rules;
		},

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function (data) {
			if (typeof data == "string") {
				var transformed = {};
				$.each(data.split(/\s/), function () {
					transformed[this] = true;
				});
				data = transformed;
			}
			return data;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
		addMethod: function (name, method, message) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message;
			if (method.length < 3) {
				$.validator.addClassRules(name, $.validator.normalizeRule(name));
			}
		},

		methods: {
			// http://docs.jquery.com/Plugins/Validation/Methods/required
			required: function (value, element, param) {
				// check if dependency is met
				if (!this.depend(param, element))
					return "dependency-mismatch";
				switch (element.nodeName.toLowerCase()) {
					case 'select':
						var options = $("option:selected", element);
						return options.length > 0 && (element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
					case 'input':
						if (this.checkable(element))
							return this.getLength(value, element) > 0;
					default:
						return $.trim(value).length > 0;
				}
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/remote
			remote: function (value, element, param) {
				if (this.optional(element))
					return "dependency-mismatch";

				var previous = this.previousValue(element);

				if (!this.settings.messages[element.name])
					this.settings.messages[element.name] = {};
				this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;

				param = typeof param == "string" && { url: param } || param;

				if (previous.old !== value) {
					previous.old = value;
					var validator = this;
					this.startRequest(element);
					var data = {};
					data[element.name] = value;
					$.ajax($.extend(true, {
						url: param,
						mode: "abort",
						port: "validate" + element.name,
						dataType: "json",
						data: data,
						success: function (response) {
							if (response) {
								var submitted = validator.formSubmitted;
								validator.prepareElement(element);
								validator.formSubmitted = submitted;
								validator.successList.push(element);
								validator.showErrors();
							} else {
								var errors = {};
								errors[element.id] = response || validator.defaultMessage(element, "remote");  //////////////////////////////////////////////////////////////////////////
								validator.showErrors(errors);
							}
							previous.valid = response;
							validator.stopRequest(element, response);
						}
					}, param));
					return "pending";
				} else if (this.pending[element.name]) {
					return "pending";
				}
				return previous.valid;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/minlength
			minlength: function (value, element, param) {
				return this.optional(element) || this.getLength($.trim(value), element) >= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
			maxlength: function (value, element, param) {
				return this.optional(element) || this.getLength($.trim(value), element) <= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
			rangelength: function (value, element, param) {
				var length = this.getLength($.trim(value), element);
				return this.optional(element) || (length >= param[0] && length <= param[1]);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/min
			min: function (value, element, param) {
				return this.optional(element) || value >= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/max
			max: function (value, element, param) {
				return this.optional(element) || value <= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/range
			range: function (value, element, param) {
				return this.optional(element) || (value >= param[0] && value <= param[1]);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/email
			email: function (value, element) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/url
			url: function (value, element) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
				return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/date
            date: function (value, element) {
                return this.optional(element) || /^$|^\d{4}-([0][1-9]|[1][0-2])-(([0][1-9])|([12][0-9])|(3[01]))$/.test(value) || /^$|^(([0][1-9])|([12][0-9])|(3[01])).([0][1-9]|[1][0-2]).\d{4}$/.test(value);
				//return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
			dateISO: function (value, element) {
				return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/dateDE
			dateDE: function (value, element) {
				return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/number
			number: function (value, element) {
				return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/numberDE
			numberDE: function (value, element) {
				return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/digits
			digits: function (value, element) {
				return this.optional(element) || /^\d+$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
			// based on http://en.wikipedia.org/wiki/Luhn
			creditcard: function (value, element) {
				if (this.optional(element))
					return "dependency-mismatch";
				// accept only digits and dashes
				if (/[^0-9-]+/.test(value))
					return false;
				var nCheck = 0,
                    nDigit = 0,
                    bEven = false;

				value = value.replace(/\D/g, "");

				for (n = value.length - 1; n >= 0; n--) {
					var cDigit = value.charAt(n);
					var nDigit = parseInt(cDigit, 10);
					if (bEven) {
						if ((nDigit *= 2) > 9)
							nDigit -= 9;
					}
					nCheck += nDigit;
					bEven = !bEven;
				}

				return (nCheck % 10) == 0;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/accept
			accept: function (value, element, param) {
				param = typeof param == "string" ? param : "png|jpe?g|gif";
				return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
			equalTo: function (value, element, param) {
				return value == $(param).val();
			}
		}
	});

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;
(function ($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function (settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if (pendingRequests[port]) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;
(function ($) {
	$.each({
		focus: 'focusin',
		blur: 'focusout'
	}, function (original, fix) {
		$.event.special[fix] = {
			setup: function () {
				if ($.browser.msie) return false;
				this.addEventListener(original, $.event.special[fix].handler, true);
			},
			teardown: function () {
				if ($.browser.msie) return false;
				this.removeEventListener(original,
                        $.event.special[fix].handler, true);
			},
			handler: function (e) {
				arguments[0] = $.event.fix(e);
				arguments[0].type = fix;
				return $.event.handle.apply(this, arguments);
			}
		};
	});
	$.extend($.fn, {
		delegate: function (type, delegate, handler) {
			return this.bind(type, function (event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		},
		triggerEvent: function (type, target) {
			return this.triggerHandler(type, [$.event.fix({ type: type, target: target })]);
		}
	});
})(jQuery);