"use strict";

var expect = require('chai').expect,
    stripDebug = require('./../');

describe(
    '# Testing Alert statements',
    function() {
        it('Should strip alert statement', function () {
            expect(stripDebug('function test(){alert("foo");}').toString())
                .to.be.a('string')
                .to.equal('function test(){void 0;}');

            expect(stripDebug('function test(){window.alert("foo");}', {alert: true}).toString())
                .to.be.a('string')
                .to.equal('function test(){void 0;}');

            expect(stripDebug('var test = () => alert("foo");').toString())
                .to.be.a('string')
                .to.equal('var test = () => void 0;');

            expect(stripDebug('"use strict";alert("foo");foo()', {alert: true}).toString())
                .to.be.a('string')
                .to.equal('"use strict";void 0;foo()');

            expect(stripDebug('if(alert){alert("foo", "bar");}').toString())
                .to.be.a('string')
                .to.equal('if(alert){void 0;}');

            expect(stripDebug('foo && alert("foo");', {alert: true}).toString())
                .to.be.a('string')
                .to.equal('foo && void 0;');

            expect(stripDebug('if (foo) alert("foo")\nnextLine();').toString())
                .to.be.a('string')
                .to.equal('if (foo) void 0\nnextLine();');
        });

        it('Shouldn\'t strip alert statements when alert config is equal to false', function () {
            expect(stripDebug('function test(){alert("foo");}', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('function test(){alert("foo");}');

            expect(stripDebug('function test(){window.alert("foo");}', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('function test(){window.alert("foo");}');

            expect(stripDebug('var test = () => alert("foo");', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('var test = () => alert("foo");');

            expect(stripDebug('"use strict";alert("foo");foo()', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('"use strict";alert("foo");foo()');

            expect(stripDebug('if(alert){alert("foo", "bar");}', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('if(alert){alert("foo", "bar");}');

            expect(stripDebug('foo && alert("foo");', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('foo && alert("foo");');

            expect(stripDebug('if (foo) alert("foo")\nnextLine();', {alert: false}).toString())
                .to.be.a('string')
                .to.equal('if (foo) alert("foo")\nnextLine();');
        });
    }
);
