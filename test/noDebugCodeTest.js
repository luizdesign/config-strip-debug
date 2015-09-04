'use strict';

var expect = require('chai').expect,
    stripDebug = require('./../'),
    options = {
        alert: true,
        console: true,
        debugger: true
    };

describe(
    '# Testing non-debugging codes',
    function() {
        it('Should never strip away non-debugging code', function () {
            var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
            expect(stripDebug(t, options).toString())
                .to.be.a("string")
                .to.equal(t);
        });
    }
)
