/*
 * grunt-security-checker
 * https://github.com/juliangut/grunt-security-checker
 *
 * Copyright (c) 2016 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clause license.
 */

'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.loadTasks('tasks');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      application: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ]
    },

    clean: {
      tests: ['tmp']
    },

    mkdir: {
      tests: {
        options: {
          create: ['tmp']
        }
      }
    },

    security_checker: {
      options: {
        bin: './vendor/bin/security-checker'
      },
      default_options: {
        file: './test/composer.lock'
      },
      custom_attributes: {
        options: {
          format: 'json',
          output: './tmp'
        },
        file: './test/composer.lock'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'mkdir', 'security_checker']);
};
