/*
 * grunt-security-checker
 * https://github.com/juliangut/grunt-security-checker
 *
 * Copyright (c) 2015 Julián Gutiérrez (juliangut@gmail.com)
 * Licensed under the BSD-3-Clasue license.
 */

'use strict';

module.exports = function(grunt) {

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
      custon_attributes: {
        options: {
          format: 'json',
          output: './tmp'
        },
        file: './test/composer.lock'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.registerTask('default', ['jshint', 'clean', 'mkdir', 'security_checker']);

};
