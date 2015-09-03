'use strict';
var assert = require('assert');
var stripDebug = require('./');

it('should strip debugger statement', function () {
	assert.equal(stripDebug('function test(){debugger;}').toString(), 'function test(){}');
	assert.equal(stripDebug('"use strict";debugger;foo()').toString(), '"use strict";foo()');
	assert.equal(stripDebug('function test(){debugger;}', {debugger: true}).toString(), 'function test(){}');
});
it('shouldn\'t strip debugger statement', function () {
	assert.equal(stripDebug('function test(){debugger;}', {debugger: false}).toString(), 'function test(){debugger;}');
	assert.equal(stripDebug('"use strict";debugger;foo()', {debugger: false}).toString(), '"use strict";debugger;foo()');
});

it('should strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('function test(){window.console.warning("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('var test = () => console.error("foo");', {console: true}).toString(), 'var test = () => void 0;');
	assert.equal(stripDebug('"use strict";console.info("foo");foo()').toString(), '"use strict";void 0;foo()');
	assert.equal(stripDebug('if(console){console.table("foo", "bar");}', {console: true}).toString(), 'if(console){void 0;}');
	assert.equal(stripDebug('foo && console.trace("foo");').toString(), 'foo && void 0;');
	assert.equal(stripDebug('if (foo) console.dir("foo")\nnextLine();', {console: true}).toString(), 'if (foo) void 0\nnextLine();');
});
it('shouldn\'t strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log("foo");}', {console: false}).toString(), 'function test(){console.log("foo");}');
	assert.equal(stripDebug('function test(){window.console.warning("foo");}', {console: false}).toString(), 'function test(){window.console.warning("foo");}');
	assert.equal(stripDebug('var test = () => console.error("foo");', {console: false}).toString(), 'var test = () => console.error("foo");');
	assert.equal(stripDebug('"use strict";console.info("foo");foo()', {console: false}).toString(), '"use strict";console.info("foo");foo()');
	assert.equal(stripDebug('if(console){console.table("foo", "bar");}', {console: false}).toString(), 'if(console){console.table("foo", "bar");}');
	assert.equal(stripDebug('foo && console.trace("foo");', {console: false}).toString(), 'foo && console.trace("foo");');
	assert.equal(stripDebug('if (foo) console.dir("foo")\nnextLine();', {console: false}).toString(), 'if (foo) console.dir("foo")\nnextLine();');
});

it('should strip alert statement', function () {
	assert.equal(stripDebug('function test(){alert("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('function test(){window.alert("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('var test = () => alert("foo");').toString(), 'var test = () => void 0;');
	assert.equal(stripDebug('"use strict";alert("foo");foo()').toString(), '"use strict";void 0;foo()');
	assert.equal(stripDebug('if(alert){alert("foo", "bar");}').toString(), 'if(alert){void 0;}');
	assert.equal(stripDebug('foo && alert("foo");').toString(), 'foo && void 0;');
	assert.equal(stripDebug('if (foo) alert("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(stripDebug(t).toString(), t);
});

it('shouldn\'t leak memory', function () {
	assert.doesNotThrow(function () {
		stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
	});
});
