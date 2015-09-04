'use strict';

var expect = require('chai').expect,
    stripDebug = require('./../');

describe(
    '# Testing Console statement',
    function() {
        it('Should strip console statement', function () {
            expect(stripDebug('function test(){console.log("foo");}').toString())
                .to.be.a('string')
                .to.equal('function test(){void 0;}');

            expect(stripDebug('function test(){window.console.warning("foo");}', {alert:true}).toString())
                .to.be.a('string')
                .to.equal('function test(){void 0;}');

            expect(stripDebug('var test = () => console.error("foo");', {console: true}).toString())
                .to.be.a('string')
                .to.equal('var test = () => void 0;');

            expect(stripDebug('"use strict";console.info("foo");foo()', {debugger: true}).toString())
                .to.be.a('string')
                .to.equal('"use strict";void 0;foo()');

            expect(stripDebug('if(console){console.table("foo", "bar");}', {console: true}).toString())
                .to.be.a('string')
                .to.equal('if(console){void 0;}');

            expect(stripDebug('foo && console.trace("foo");', {alert: true, debugger: true}).toString())
                .to.be.a('string')
                .to.equal('foo && void 0;');

            expect(stripDebug('if (foo) console.dir("foo")\nnextLine();', {console: true}).toString())
                .to.be.a('string')
                .to.equal('if (foo) void 0\nnextLine();');
        });

        it('Shouldn\'t strip console statement', function () {
            expect(stripDebug('function test(){console.log("foo");}', {console: false}).toString())
                .to.be.a('string')
                .to.equal('function test(){console.log("foo");}');

            expect(stripDebug('function test(){window.console.warning("foo");}', {console: false}).toString())
                .to.be.a('string')
                .to.equal('function test(){window.console.warning("foo");}');

            expect(stripDebug('var test = () => console.error("foo");', {console: false}).toString())
                .to.be.a('string')
                .to.equal('var test = () => console.error("foo");');

            expect(stripDebug('"use strict";console.info("foo");foo()', {console: false}).toString())
                .to.be.a('string')
                .to.equal('"use strict";console.info("foo");foo()');

            expect(stripDebug('if(console){console.table("foo", "bar");}', {console: false}).toString())
                .to.be.a('string')
                .to.equal('if(console){console.table("foo", "bar");}');

            expect(stripDebug('foo && console.trace("foo");', {console: false}).toString())
                .to.be.a('string')
                .to.equal('foo && console.trace("foo");');

            expect(stripDebug('if (foo) console.dir("foo")\nnextLine();', {console: false}).toString())
                .to.be.a('string')
                .to.equal('if (foo) console.dir("foo")\nnextLine();');
        });
    }
);
