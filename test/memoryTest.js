'use strict';

var should = require('chai').should(),
    stripDebug = require('./../'),
    options = {
        alert: true,
        console: true,
        debugger: true
    };

describe(
	'# Testing memory',
	function() {
		it('shouldn\'t leak memory', function () {
			(function () {
				stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { console.warn(\'NOPE!\'); }').toString();
			}).should
            .not
            .Throw()
		});
	}
)

