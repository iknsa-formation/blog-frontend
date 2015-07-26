module.exports = function(grunt) {
    // autoload tasks
    require('load-grunt-tasks')(grunt);

    var appConfig = grunt.file.readJSON('package.json');

    var pathsConfig = function () {

        return {
            dist       : 'dist/',
            bower      : 'bower_components/',
            css        : 'dist/css',
            js         : 'dist/js',
            icon_fonts : 'dist/css/icon-fonts',
            img        : 'dist/'
        };
    };

    // Project configuration.
    grunt.initConfig({

        paths: pathsConfig(),
        pkg: appConfig,

        // Metadata.
        banner: '/*!\\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\\n' +
          '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\\n' +
          ' * Licensed <%= pkg.license %>\\n */',
        stripBanners: false,


        clean: {
            css: ['<%= paths.css %>/**/*'],
            js : ['<%= paths.js %>/**/*'],
            dist: ['<%= paths.dist %>/**/*']
        },

        compass: {
            dev: {
                options: {
                  sassDir        : 'vendor/',
                  cssDir         : 'dist/vendor/',
                  http_fonts_path: "fonts/",
                  fontsDir       : 'vendor/fonts',
                  environment    : 'development',
                  require        : 'susy',
                  require        : 'compass',
                }
            }
        },

        watch: {
            compass: {
                files: ['vendor/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            js: {
                files: ['vendor/**/*.js'],
                tasks: ['copy:js']
            },
            img: {
                files: ['vendor/**/*.{png,jpg,jpeg,gif,bmp}'],
                tasks: ['copy:img']
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path 
                    // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
             
                    // includes files within path and its sub-directories 
                    // {
                    //     expand: true,
                    //     src: ['vendor/jquery/dist/jquery.min.js', 'vendor/jquery/dist/jquery.min.map'],
                    //     dest: '<%= paths.js %>'
                    // },
             
                    // makes all src relative to cwd 
                    // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
             
                    // flattens results to a single level 
                    // {
                    //     expand: true, flatten: true, 
                    //     src: ['vendor/jquery/dist/jquery.min.js', 'vendor/jquery/dist/jquery.min.map'], 
                    //     dest: '<%= paths.js %>', filter: 'isFile'
                    // },
                    // includes files within path and its sub-directories 
                    {
                        expand: true, flatten: true,
                        src: ['vendor/img'], 
                        dest: '<%= paths.img %>'
                    }
                ],
            },
            js: {
                files: [
                    {
                        expand: true,
                        src: ['vendor/**/*.js'],
                        dest: 'dist/'
                    },
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        src: ['vendor/**/*.{png,jpg,jpeg,gif,bmp}'],
                        dest: 'dist/'
                    },
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        src: ['vendor/**/*.{eot,otf,svg,ttf,woff}'],
                        dest: 'dist/'
                    },
                ]
            }
        },

        concat: {
            options: {
                banner      : '<%= banner %>',
            },
            lib_css: {
                src : [
                    'bower_components/normalize.css/normalize.css',
                    'bower_components/ks-normalize/dist/css/ks-normalize.min.css',
                    // 'bower_components/ks-buttons/dist/css/ks-buttons.min.css'
                ],
                dest: '<%= paths.css %>/normalize.css',
            },
            // lib_js: {
            //     src : [
            //     ],
            //     dest: '<%= paths.js %>/lib.js',
            // },
            // js: {
            //     src : ['vendor/**/*.js'],
            //     dest: '<%= paths.js %>/app.js'
            // },
        },

        // cssmin: {
        //     target: {
        //         files: [{
        //             expand: true,
        //             cwd: 'dist/css/',
        //             src: ['*.concat.css'],
        //             dest: 'dist/css/',
        //             ext: '.min.css'
        //         }]
        //     }
        // },

        // uglify: {
        //     options: {
        //       banner: '<%= banner %>'
        //     },
        //     js: {
        //         src: ['<%= concat.js.dest %>'],
        //         dest: 'dist/js/<%= pkg.name %>.min.js'
        //     }
        // },
    });

    grunt.registerTask('serve', [
        'watch'
    ]);

    grunt.registerTask('dev', [
        "compass",
        "copy"
    ]);

    grunt.registerTask('build', [
        'clean:dist', 'compass', 'copy', 'concat'
    ]);

    grunt.registerTask("default", ['build']);
    
};
