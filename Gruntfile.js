'use strict';

module.exports = function (grunt) {
    var _portConfig = {
        dev: 9090,
        build: 9999
    }
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                hostname: 'localhost',
                keepalive: true,
                open: true,
                livereload: 35729,
            },
            dev: {
                options: {
                    port: _portConfig.dev,
                    base: {
                        path: '<%= pkg.config.dev%>',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            },
            build: {
                options: {
                    port: _portConfig.build,
                    base: {
                        path: '<%= pkg.config.build%>',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        clean: {
            dev: ['<%= pkg.config.dev%>'],
            dest: ['<%= pkg.config.dev%>', '<%= pkg.config.build%>', '<%= pkg.config.tmp%>'],
            tmp: ['<%= pkg.config.tmp%>']
        },
        copy: {
            lib: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src%>/assets/js',
                    src: ['lib/**/*.js'],
                    dest: '<%= pkg.config.tmp%>/assets/js',
                    filter: 'isFile'
                }]
            },
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src%>/assets/js',
                    src: ['**/*.js'],
                    dest: '<%= pkg.config.tmp%>/assets/js',
                    filter: 'isFile'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src%>',
                    src: ['**/*', '!**/*.html', '!template/**/*.art', '!assets/less/**/*.less', '!assets/js/**/*.js'],
                    dest: '<%= pkg.config.dev%>',
                    filter: 'isFile'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src%>/assets/js',
                    src: ['**/*', '!app/**/*.js', '!common/config.js', '!lib/require.js', '!lib/jweixin-1.0.0.js'],
                    dest: '<%= pkg.config.dev%>/assets/js',
                    filter: 'isFile'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.dev%>',
                    src: ['**/*', '!assets/css/**/*.css',],
                    dest: '<%= pkg.config.build%>',
                    filter: 'isFile'
                }]
            },
            buildjs: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.tmp%>/assets/js',
                    src: ['**/*', '!app/**/*.js', '!common/config.js', '!lib/require.js', '!lib/jweixin-1.0.0.js'],
                    dest: '<%= pkg.config.build%>/assets/js',
                    filter: 'isFile'
                }]
            }
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src%>/assets/less',
                    src: ['**/*.less', '!**/*base.less', '!**/*global.less', '!module/**/*.less'],
                    dest: '<%= pkg.config.tmp%>/assets/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dev%>/assets/css',
                    src: ['**/*.css'],
                    dest: '<%= pkg.config.build%>/assets/css'
                }]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.src%>/assets/js',
                    src: ['**/*.js', '!lib/**/*.js'],
                    dest: '<%= pkg.config.tmp%>/assets/js'
                }]
            }
        },
        template: {
            compile: {
                options: {
                    root: '<%= pkg.config.src%>/template/',
                    data: {
                        version: '<%= pkg.version %>'
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.src%>',
                    src: ['**/*.html', '!template/**/*.html'],
                    dest: '<%= pkg.config.dev%>'
                }]
            }
        },
        prettify: {
            options: {
                config: '.jsbeautifyrc'
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dev%>',
                    src: ['**/*.html', '!template/**/*.html'],
                    dest: '<%= pkg.config.dev%>'
                }]
            }
        },
        useminPrepare: {
            options: {
                root: '<%= pkg.config.tmp%>',
                dest: '<%= pkg.config.dev%>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['concat']
                        },
                        post: {}
                    }
                }
            },
            html: ['<%= pkg.config.dev%>/**/*.html']
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            js: {
                src: ['<%= pkg.config.dev%>/assets/js/app/**/*.js']
            },
            images: {
                src: '<%= pkg.config.dev%>/assets/images/app/**/*.{jpg,jpeg,gif,png,webp}'
            },
            css: {
                src: '<%= pkg.config.dev%>/assets/css/**/*.css'
            }
        },
        usemin: {
            options: {
                assetsDirs: [
                    '<%= pkg.config.dev%>/',
                    '<%= pkg.config.dev%>/assets/css/',
                    '<%= pkg.config.dev%>/assets/js/'
                ]
            },
            css: ['<%= pkg.config.dev%>/assets/css/**/*.css'],
            html: ['<%= pkg.config.dev%>/**/*.html']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.build%>',
                    src: ['**/*.html'],
                    dest: '<%= pkg.config.build%>'
                }]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['clean:dest']);

    return grunt.registerTask('server', function (target) {
        if (target !== 'dest') {
            return grunt.task.run([
                'clean:dest',
                'less',
                'copy:tmp',
                'copy:js',
                'copy:dest',
                'template',
                'prettify',
                'useminPrepare',
                'concat',
                'filerev',
                'usemin',
                'clean:tmp',
                'connect:dev'
            ]);
        }
        else {
            return grunt.task.run([
                'clean:dest',
                'less',
                'copy:lib',
                'uglify',
                'copy:dest',
                'template',
                'useminPrepare',
                'concat',
                'filerev',
                'usemin',
                'copy:build',
                'copy:buildjs',
                'clean:tmp',
                'cssmin:build',
                'htmlmin',
                'clean:dev',
                'connect:build'
            ]);
        }
    });
};