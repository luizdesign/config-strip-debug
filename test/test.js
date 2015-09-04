'use strict';
var assert = require('assert'),
	stripDebug = require('./../');

describe(
	"# Testing non-debugging codes",
	function() {
		it('should never strip away non-debugging code', function () {
			var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
			assert.equal(stripDebug(t).toString(), t);
		});
	}
)

describe(
	"# Testing memory",
	function() {
		it('shouldn\'t leak memory', function () {
			assert.doesNotThrow(function () {
				stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
			});
		});
	}
)

