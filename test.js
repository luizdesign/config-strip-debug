'use strict';
var assert = require('assert');
var stripDebug = require('./');

it('should strip debugger statement', function () {
	var mock = 'function test(){debugger;}',
		mock1 = '"use strict";debugger;foo()';

	assert.equal(stripDebug(mock).toString(), 'function test(){}');
	assert.equal(stripDebug(mock1).toString(), '"use strict";foo()');

	assert.equal(stripDebug(mock, {debugger: false}).toString(), mock);
	assert.equal(stripDebug(mock1, {debugger: false}).toString(), mock1);
});

it('should strip console statement', function () {
	assert.equal(stripDebug('function test(){console.log("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('function test(){window.console.log("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('var test = () => console.log("foo");').toString(), 'var test = () => void 0;');
	assert.equal(stripDebug('"use strict";console.log("foo");foo()').toString(), '"use strict";void 0;foo()');
	assert.equal(stripDebug('if(console){console.log("foo", "bar");}').toString(), 'if(console){void 0;}');
	assert.equal(stripDebug('foo && console.log("foo");').toString(), 'foo && void 0;');
	assert.equal(stripDebug('if (foo) console.log("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
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
