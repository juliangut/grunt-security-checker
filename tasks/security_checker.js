/*
 * grunt-security-checker
 * https://github.com/juliangut/grunt-security-checker
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

var path = require('path');
var exec = require('child_process').exec;

module.exports = function(grunt) {

  var attributes = {
    format: 'format',
    endPoint: 'end-point',
    timeout: 'timeout'
  };

  grunt.registerMultiTask('security_checker', 'Grunt sensiolabs security-checker runner', function() {
    var cmd = null;
    var done = null;

    var config = this.options({
      bin: 'security-checker'
    });

    if (this.data.file === undefined || !grunt.file.exists(this.data.file)) {
      grunt.verbose.error();
      grunt.fail.warn('File "' + this.data.file + '"" is not reachable or does not exist.');
    }

    if (config.format !== undefined) {
      config.format = config.format.replace(/\s+/g, '').toLowerCase();

      if (['text', 'simple', 'json'].indexOf(config.format) === -1) {
        grunt.verbose.error();
        grunt.fail.warn('Format ' + config.format + ' is not supported.');
      }
    }

    if (config.output !== undefined) {
      config.output = path.normalize(config.output).replace(/\\$/, '');

      if (!grunt.file.exists(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Output directory ' + config.output + ' not found.');
      }
      if (!grunt.file.isPathInCwd(config.output)) {
        grunt.verbose.error();
        grunt.fail.warn('Cannot output to a directory outside the current working directory.');
      }
    }

    cmd = path.normalize(config.bin) + ' security:check ' +  this.data.file;

    for (var attribute in attributes) {
      if (config[attribute] !== undefined) {
        cmd += ' --' + attributes[attribute] + '=' + config[attribute];
      }
    }

    grunt.log.writeln('Starting security-checker (target: ' + this.target.cyan + ')');
    grunt.verbose.writeln('Execute: ' + cmd);

    done = this.async();

    return exec(cmd, function(err, stdout) {
      if (/^Error: Command failed: .+ No such file or directory\n$/g.test(err)) {
        grunt.fatal(err);
      }

      if (config.output === undefined) {
        grunt.log.write(stdout);
      } else {
        var outputFile = config.output + '/security-checker-output' + (config.format === 'json' ? '.json' : '');

        grunt.file.write(outputFile, stdout);
        grunt.log.write('Generating output file ' + outputFile);
      }

      return done();
    });
  });

};
