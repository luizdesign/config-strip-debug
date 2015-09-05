'use strict';

var should = require('chai').should(),
    stripDebug = require('./../');

describe('# Testing diferents enter data types', function() {
    it ('With a number should returns a exception', function() {
        (function() {stripDebug(637)})
            .should
            .throw();
    });
    it ('With a array should returns a exception', function() {
        (function() {stripDebug(['637'])})
            .should
            .throw();
    });
});
