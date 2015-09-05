# config-strip-debug [![Build Status](https://travis-ci.org/luizdesign/config-strip-debug.svg?branch=master)](https://travis-ci.org/luizdesign/config-strip-debug)

> Strip `console`, `alert`, and `debugger` statements from JavaScript code

Useful for making sure you didn't leave any logging in builded code.

Also available as [gulp](https://github.com/luizdesign/gulp-config-strip-debug) plugin.


## Usage

For install:
```sh
npm install --save strip-debug
```

For use this module:
```js
var stripDebug = require('strip-debug');

stripDebug('function foo(){console.log("foo");alert("foo");debugger;}').toString();
//=> function foo(){void 0;void 0;}
```


### API

## stripDebug(input)

Returns the modified [Esprima AST](http://esprima.org) which can be used to make additional modifications.

Call `.toString()` to get the stringified output.

To prevent any side-effects, `console.*`/`alert*` is replaced with `void 0` instead of being stripped.

### input

Type: `string`

Pass in a string of JavaScript code or a [Esprima compatible AST](http://esprima.org).


## CLI

For install:
```sh
$ npm install --global strip-debug
```

For use:
```sh
$ strip-debug --help

  Usage
    $ strip-debug <input file> > <output file>
    $ cat <input file> | strip-debug > <output file>

  Example
    $ strip-debug src/app.js > dist/app.js
    $ cat src/app.js | strip-debug > dist/app.js
```

## Testing
For execute the unit tests:
```sh
npm test
```

### Coverage
For generate the code coverage this module use the [istambul](http://gotwarlost.github.io/istanbul/). The code coverage report is generate in **coverage/** folder.

## Contribute
For contribute with this project, create a fork in github https://github.com/luizdesign/config-strip-debug.
