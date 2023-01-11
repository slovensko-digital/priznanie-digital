/// <reference path="jquery-1.4.1-vsdoc.js" />
$(document).ready(function () {
    InitStatusDialog();
});

function InitStatusDialog() {
    statusDialog.initDialog();
}

var statusDialog = {

    getDialog: function () {
        return $("#statusDialog");
    },

    initDialog: function () {
        var dlg = statusDialog.getDialog();

        dlg.dialog({ 
            'autoOpen': false,
            'modal': true,
            'title': 'Dialog',
            'resizable': 'disable',
            'width': '350px',
            'height': 'auto'
        });
    },

    showDialog: function () {
        statusDialog.getDialog().dialog('open');
    },

    hideDialog: function () {
        statusDialog.getDialog().dialog('close');
    },

    showProgress: function () {
        statusDialog.getDialog().find("#statusLoader").show();
    },

    hideProgress: function () {
        statusDialog.getDialog().find("#statusLoader").hide();
    },

    setTitle: function (title) {
        statusDialog.getDialog().dialog("option", "title", title);
    },

    setMessage: function (message) {
        statusDialog.getDialog().find("#statusMessage").text(message);
    },

    setOptions: function (options) {
        statusDialog.getDialog().dialog("option", options);
    }

}

