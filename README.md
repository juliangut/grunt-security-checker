[![Latest Version](https://img.shields.io/npm/v/grunt-security-checker.svg?style=flat-square)](https://npmjs.org/package/grunt-security-checker)
[![License](https://img.shields.io/github/license/juliangut/grunt-security-checker.svg?style=flat-square)](https://github.com/juliangut/grunt-security-checker/blob/master/LICENSE)

[![Total Downloads](https://img.shields.io/npm/dt/grunt-security-checker.svg?style=flat-square)](https://npmjs.org/package/grunt-security-checker)
[![Monthly Downloads](https://img.shields.io/npm/dm/grunt-security-checker.svg?style=flat-square)](https://npmjs.org/package/grunt-security-checker)

# security-checker Grunt plugin

> Grunt plugin for running [security-checker](https://github.com/sensiolabs/security-checker)

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-security-checker --save-dev
```

Make sure you have security-checker installed

```shell
composer require sensiolabs/security-checker
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-security-checker');
```

## The "security_checker" task

### Overview
In your project's Gruntfile, add a section named `security-checker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  security_checker: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bin
Type: `String`
Default value: `'security-checker'`

security-checker executable binary.

In case you do not provide security-checker binary path you need to have it on PATH environment variable otherwise plugin will raise an error

#### options.format
Type: `String`
Default value: `undefined`

Output format to use. One of `text` or `json`

#### options.output
Type: `String`
Default value: `undefined`

Output path to save security-checker reports.

Output file name will be security-checker-output

### Usage Example

```js
grunt.initConfig({
  security_checker: {
    all {
      options: {
        format: 'json'
      },
      file: './test/composer.lock'
    }
  },
});
```

## Contributing

Found a bug or have a feature request? [Please open a new issue](https://github.com/juliangut/grunt-security-checker/issues). Have a look at existing issues before.

See file [CONTRIBUTING.md](https://github.com/juliangut/grunt-security-checker/blob/master/CONTRIBUTING.md)

## License

See file [LICENSE](https://github.com/juliangut/grunt-security-checker/blob/master/LICENSE) included with the source code for a copy of the license terms.
