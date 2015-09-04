'use strict';
var assert = require('assert'),
	stripDebug = require('./../');

describe(
	'# Testing memory',
	function() {
		it('shouldn\'t leak memory', function () {
			assert.doesNotThrow(function () {
				stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
			});
		});
	}
)

