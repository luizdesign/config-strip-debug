'use strict';

module.exports = {
    mergeObject: function(defaults, params) {
        var mergedObject = {};

        for (var attrname in defaults) {
            mergedObject[attrname] = defaults[attrname];
        }
        for (var attrname in params) {
            mergedObject[attrname] = params[attrname];
        }

        return mergedObject;
    }
};
