var path = require('path'),
    async = require('async'),
    watchFilesLess = 'assets/style/**/*.less',

    Mapper = require('multibundle-mapper'),
    usersBundleTemplatePath = 'app/templates/users_bundle/**/*.hbs',
    reposBundleTemplatePath = 'app/templates/repos_bundle/**/*.hbs';


module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configuration to be run (and then tested).
        'multibundle-requirejs': {
            options: {
                '_config': {
                    // 4 is silent in r.js world
                    logLevel: process.env.quiet ? 4 : 1,
                    destination: 'public/js',
                    sharedBundles: ['common'],
                    // or custom function `hashFiles(output, componentOptions)`
                    hashFiles: true,
                    handleMapping: function(options, grunt, done) {
                        // For this example, write to the local config.
                        // For production, prefix should be configured by environment to build for CDNs, etc.
                        return Mapper.json('config/local.json', {
                                prefix: '/js'
                            },
                            function(err) {
                                console.log('Mapping meta data has been written.', err);
                                // grunt style callback, so that we can 
                                done(err ? false : true);
                            });
                    },

                    // pass options to r.js
                    baseUrl: '.',
                    optimize: 'uglify',
                    // optimize: 'none',
                    sharedPaths: {
                        // test location namespacing
                        'app': 'app',
                        'assets': 'assets',
                        // needed for rendr modules
                        'rendr': 'node_modules/rendr'
                    },
                    preserveLicenseComments: false
                },

                // Creates `<destination>/common.<hash>.js` file that includes all the modules specified in the bundle,
                // shared modules between all the pages.
                common: [
                    // node modules
                    {
                        'requirejs': 'node_modules/requirejs/require.js'
                    },

                    // multiple entry points module
                    {
                        'rendr/shared': 'node_modules/rendr/shared/app.js'
                    }, {
                        'rendr/client': 'node_modules/rendr/client/router.js'
                    },

                    // modules needed to be shimmed
                    {
                        'async': {
                            src: 'node_modules/async/lib/async.js',
                            exports: 'async'
                        }
                    },
                    // module with implicit dependencies
                    {
                        'backbone': {
                            src: 'node_modules/backbone/backbone.js',
                            deps: ['jquery', 'underscore'],
                            exports: 'Backbone'
                        }
                    }, {
                        'handlebars': {
                            src: 'node_modules/handlebars/dist/handlebars.runtime.js',
                            exports: 'Handlebars'
                        }
                    }, {
                        'underscore': {
                            src: 'node_modules/underscore/underscore.js',
                            exports: '_'
                        }
                    }, {
                        'rendr-handlebars': {
                            src: 'node_modules/rendr-handlebars/index.js',
                            exports: 'rendr-handlebars'
                        }
                    },

                    // checked in assets

                    // assets needed to be shimmed
                    {
                        'jquery': {
                            src: './assets/vendor/jquery-1.9.1.min.js',
                            exports: 'jQuery'
                        }
                    },

                    // execute plugin to add methods to jQuery

                    // config/trigger
                    {
                        'main': 'assets/js/requireJsMain'
                    },

                    // base app files
                    'app/*.js',
                    'app/templates/*.js',

                    // lib
                    'app/lib/**/*.js',

                    'app/views/home/**/*.js',
                    'app/controllers/home_controller.js',
                ],
                // Creates separate bundle for user page components – `<destination>/user.<hash>.js`
                user: [
                    'app/models/users_bundle/**/*.js',
                    'app/collections/users_bundle/**/*.js',
                    'app/views/users_bundle/**/*.js',
                    'app/controllers/users_bundle/**/*.js',
                    'public/js/app/templates/users_bundle/compiledTemplates.js'
                ],

                // Creates separate bundle for repos page components – `<destination>/repos.<hash>.js`
                repos: [
                    'app/models/repos_bundle/**/*.js',
                    'app/collections/repos_bundle/**/*.js',
                    'app/views/repos_bundle/**/*.js',
                    'app/controllers/repos_bundle/**/*.js',
                    'public/js/app/templates/repos_bundle/compiledTemplates.js'
                ]
            }
        },

        handlebars: {
            compile_server: {
                options: {
                    namespace: false,
                    commonjs: true,
                    processName: function(filename) {
                        return filename.replace('app/templates/', '').replace('.hbs', '');
                    }
                },
                src: 'app/templates/**/*.hbs',
                dest: 'app/templates/compiledTemplates.js',
                filter: function(filepath) {
                    var filename = path.basename(filepath);
                    // Exclude files that begin with '__' from being sent to the client,
                    // i.e. __layout.hbs.
                    return filename.slice(0, 2) !== '__';
                }
            },
            /*
             * Create separate compiled templates so that they can be bundled
             */
            compile_client: {
                options: {
                    amd: true,
                    processName: function(filename) {
                        return filename.replace('app/templates/', '').replace('.hbs', '');
                    }
                },
                files: {
                    'public/js/app/templates/compiledTemplates.js': ['app/templates/**/*.hbs',
                        '!' + usersBundleTemplatePath, // Exclude since we'll build it separate
                        '!' + reposBundleTemplatePath, // Exclude since we'll build it separate
                        '!app/templates/__layout.hbs'
                    ],
                    'public/js/app/templates/users_bundle/compiledTemplates.js': usersBundleTemplatePath,
                    'public/js/app/templates/repos_bundle/compiledTemplates.js': reposBundleTemplatePath
                }
            }
        },

        less: { // Task
            production: { // Target
                options: {
                    paths: [watchFilesLess], // Target options
                    'include less': true,
                    compress: true
                },
                files: {
                    'public/site.css': 'assets/style/site.less'
                }
            },
            staging: { // Target
                options: {
                    paths: [watchFilesLess], // Target options
                    'include less': true,
                    compress: true
                },
                files: {
                    'public/site.css': 'assets/style/site.less'
                }
            },
            development: { // Target
                options: {
                    paths: [watchFilesLess], // Target options
                    'include less': true
                },
                files: {
                    'public/site.css': 'assets/style/site.less'
                }
            }
        },

        watch: {
            scripts: {
                files: 'app/**/*.js',
                tasks: ['multibundle-requirejs'],
                options: {
                    interrupt: true
                }
            },
            templates: {
                files: 'app/**/*.hbs',
                tasks: ['handlebars'],
                options: {
                    interrupt: true
                }
            },
            filesLess: {
                files: [watchFilesLess],
                tasks: ['less'],
                options: {
                    spawn: true,
                    interval: 5007
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-multibundle-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('runNode', function() {
        grunt.util.spawn({
            cmd: 'node',
            args: ['./node_modules/nodemon/nodemon.js', 'index.js'],
            opts: {
                stdio: 'inherit'
            }
        }, function() {
            grunt.fail.fatal(new Error("nodemon quit"));
        });
    });

    grunt.registerTask('compile_js', ['handlebars', 'multibundle-requirejs']);
    grunt.registerTask('compile', ['compile_js', 'less:development']);

    // Run the server and watch for file changes
    grunt.registerTask('server', ['compile', 'runNode', 'watch']);

    // Default task(s).
    grunt.registerTask('default', ['compile']);

    // wrapper for grunt.util.spawn
    // to trim down boilerplate
    // while using with async

    function spawn(cmd, args) {
        return function(callback) {
            grunt.util.spawn({
                cmd: cmd,
                args: args
            }, function(err, res, code) {
                callback(err || code, res);
            });
        };
    }
};
