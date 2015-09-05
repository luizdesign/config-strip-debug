'use strict';

// External Modules
var rocambole = require('rocambole');
var stripDebugger = require('rocambole-strip-debugger');
var stripConsole = require('rocambole-strip-console');
var stripAlert = require('rocambole-strip-alert');

// Debug options
var stripDebugDefaultOptions = {
    debugger: true,
    console: true,
    alert: true
};

// esprima@2.1 introduces a "handler" property on TryStatement, so we would
// loop the same node twice (see jquery/esprima/issues/1031 and #264)
rocambole.BYPASS_RECURSION.handler = true;

module.exports = function (src, options) {
    var validation = Services.validation(src);
    var stripDebugOptions = Services.mergeObject(
        stripDebugDefaultOptions,
        options
    );

    if (!validation.status) {
        throw validation.throwMessage;
    }

    return rocambole.moonwalk(src, function (node) {
        if (stripDebugOptions.debugger) {
            stripDebugger(node);
        }

        if (stripDebugOptions.console) {
            stripConsole(node);
        }

        if (stripDebugOptions.alert) {
            stripAlert(node);
        }
	});
};


var Services = {
    mergeObject: function(defaults, params) {
        var mergedObject = {};

        for (var attrname in defaults) {
            mergedObject[attrname] = defaults[attrname];
        }
        for (var attrname in params) {
            mergedObject[attrname] = params[attrname];
        }

        return mergedObject;
    },
    validation: function(src) {
        var validation = true,
            message = '';

        if (typeof src !== 'string') {
            validation = false;
            message = 'TypeError: src must be a string';
        } else if (src === '') {
            validation = false;
            message = 'ReferenceError: src is mandatory';
        }

        return {
            status: validation,
            throwMessage: message
        };
    }
};
