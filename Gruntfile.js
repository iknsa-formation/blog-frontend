module.exports = function(grunt) {
    // autoload tasks
    require('load-grunt-tasks')(grunt);

    var appConfig = grunt.file.readJSON('package.json');

    // require('time-grunt')(grunt);
    var pathsConfig = function () {

        return {
            dist       : 'dist/',
            css        : 'dist/css',
            js         : 'dist/js',
            fonts      : 'dist/css/fonts',
            icons_fonts: 'dist/css/icons_fonts',
            img        : 'dist/img',
            dev_css    : 'vendor/vahana/vahana-landing/scss',
            dev_js     : 'vendor/vahana/vahana-landing/js',
            dev_fonts  : 'vendor/vahana/vahana-landing/scss/fonts',
            dev_icons_fonts  : 'vendor/vahana/vahana-landing/scss/icons_fonts',
            dev_img    : 'vendor/vahana/vahana-landing/img',
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
                  sassDir        : '<%= paths.dev_css%>',
                  cssDir         : '<%= paths.css %>',
                  http_fonts_path: "fonts/",
                  fontsDir       : '<%= paths.fonts %>',
                  environment    : 'production',
                  require        : 'susy',
                  require        : 'compass',
                }
            }
        },

        watch: {
            compass: {
                files: ['<%= paths.dev_css %>/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            js: {
                files: ['<%= paths.dev_js %>/**/*.js'],
                tasks: ['concat:js']
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
                    {
                        expand: true, flatten: true, 
                        src: ['vendor/jquery/dist/jquery.min.js', 'vendor/jquery/dist/jquery.min.map'], 
                        dest: '<%= paths.js %>', filter: 'isFile'
                    },
                    {
                        expand: true, flatten: true,
                        src: ['<%= paths.dev_fonts %>/**/*'], 
                        dest: '<%= paths.fonts %>'
                    },
                    {
                        expand: true, flatten: true,
                        src: ['<%= paths.dev_icons_fonts %>/**/*'], 
                        dest: '<%= paths.icons_fonts %>'
                    },
                    {
                        expand: true, flatten: true,
                        src: ['<%= paths.dev_img %>/**/*'], 
                        dest: '<%= paths.img %>'
                    }
                ],
            }
        },

        concat: {
            options: {
                banner      : '<%= banner %>',
            },
            vendor_css: {
                src : [
                    'vendor/normalize.css/normalize.css',
                    'vendor/ks-normalize/dist/css/ks-normalize.min.css',
                    'vendor/ks-buttons/dist/css/ks-buttons.min.css'
                ],
                dest: '<%= paths.css %>/vendor.css',
            },
            vendor_js: {
                src : [
                ],
                dest: '<%= paths.js %>/vendor.js',
            },
            js: {
                src : ['<%= paths.dev_js %>/**/*.js'],
                dest: '<%= paths.js %>/app.js'
            },
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
        "concat"
    ]);

    grunt.registerTask('build', [
        'clean', 'compass', 'copy', 'concat'
    ]);

    grunt.registerTask("default", ["clean", 'build']);
    
};
