'use strict';

var DESTINATION_DIR = process.argv[2];

var execute = function(command) {
    var exec = require('child_process').exec;
    var logError = function(error, stdout) {
        if (error && stdout) {
            console.log(error, stdout);
        }
    };
    exec(command, logError);
};

var copy = function(name, files) {
    var nameDir = [DESTINATION_DIR, '/', name].join('');
    execute(['mkdir', '-p', nameDir].join(' '));
    files.map(function(file) {
        execute(['cp', file, nameDir].join(' '));
    });
};

var copyDir = function(name, dir) {
    var nameDir = [DESTINATION_DIR, '/', name].join('');
    execute(['mkdir', '-p', nameDir].join(' '));
    execute(['cp', '-R', dir, nameDir + '/'].join(' '));
};

execute(['mkdir', '-p', DESTINATION_DIR].join(' '));

copy('systemjs', [
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system.js.map',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/systemjs/dist/system-polyfills.js.map',
    'node_modules/es6-module-loader/dist/es6-module-loader.js',
    'node_modules/es6-module-loader/dist/es6-module-loader.js.map'
]);

copy('system-css', [
    'node_modules/system-css/css.js'
]);

copy('system-text', [
    'node_modules/system-text/text.js'
]);

copy('mithril', [
    'node_modules/mithril/mithril.min.js',
    'node_modules/mithril/mithril.min.js.map'
]);

copy('hammerjs', [
    'node_modules/hammerjs/hammer.min.js',
    'node_modules/hammerjs/hammer.min.map'
]);

copy('mithril-slider', [
    'lib/mithril-slider.js',
    'lib/mithril-slider.css'
]);

