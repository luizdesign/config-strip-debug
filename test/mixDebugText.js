'use strict';

var expect = require('chai').expect,
    stripDebug = require('./../');

describe(
    '# Testing mix statements',
    function() {
        var code = 'function t() {alert("ok"); var a = b; debugger; console.log(a); console.info(b); var consoleTest; var debuggerTest = b; var alertTest = c;}';
        it('Should strip Alert, Console and debugger statements', function() {
            expect(stripDebug(code).toString())
                .to.be.a("string")
                .to.equal('function t() {void 0; var a = b;  void 0; void 0; var consoleTest; var debuggerTest = b; var alertTest = c;}');

            expect(stripDebug(code, {alert: true, console: true, debugger: true}).toString())
                .to.be.a("string")
                .to.equal('function t() {void 0; var a = b;  void 0; void 0; var consoleTest; var debuggerTest = b; var alertTest = c;}');
        });

        it('Should strip Alert and Console but shouldn\'t strip debugger statements', function() {
            expect(stripDebug(code, {alert: true, console: true, debugger: false}).toString())
                .to.be.a("string")
                .to.equal('function t() {void 0; var a = b; debugger; void 0; void 0; var consoleTest; var debuggerTest = b; var alertTest = c;}');
        });

        it('Should strip Alert but shouldn\'t strip debugger and Console statements', function() {
            expect(stripDebug(code, {alert: true, console: false, debugger: false}).toString())
                .to.be.a("string")
                .to.equal('function t() {void 0; var a = b; debugger; console.log(a); console.info(b); var consoleTest; var debuggerTest = b; var alertTest = c;}');
        });

        it('Shouldn\'t strip Alert but should strip debugger and Console statements', function() {
            expect(stripDebug(code, {alert: false, console: true, debugger: true}).toString())
                .to.be.a("string")
                .to.equal('function t() {alert("ok"); var a = b;  void 0; void 0; var consoleTest; var debuggerTest = b; var alertTest = c;}');
        });

    }
);
