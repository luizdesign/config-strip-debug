'use strict';

module.exports = function(src) {
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
};
