'use strict';

var expect = require('chai').expect,
    stripDebug = require('./../');

describe ('# Testing Debugger statements', function() {
    it ('Should strip debugger statements', function() {
        expect(stripDebug('function test(){debugger;}').toString())
            .to.be.a('string')
            .to.equal("function test(){}");

        expect(stripDebug('"use strict";debugger;foo()', {alert: true}).toString())
            .to.be.a('string')
            .to.equal('"use strict";foo()');

        expect(stripDebug('"use strict";debugger;foo()', {console: true}).toString())
            .to.be.a('string')
            .to.equal('"use strict";foo()');

        expect(stripDebug('function test(){debugger;}', {console: true, alert: true}).toString())
            .to.be.a('string')
            .to.equal("function test(){}");

        expect(stripDebug('function test(){debugger;}', {debugger: true}).toString())
            .to.be.a('string')
            .to.equal('function test(){}');

        expect(stripDebug('function test(){debugger;}', {console: true, alert: true, debugger: true}).toString())
            .to.be.a('string')
            .to.equal('function test(){}');
    });

    it('Shouldn\'t strip debugger statements when the debugger config is equal to false', function () {
        expect(stripDebug('function test(){debugger;}', {debugger: false}).toString())
            .to.be.a('string')
            .to.equal('function test(){debugger;}');

        expect(stripDebug('"use strict";debugger;foo()', {debugger: false}).toString())
            .to.be.a('string')
            .to.equal('"use strict";debugger;foo()');
    });
});

