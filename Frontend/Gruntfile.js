module.exports = function (grunt) {
    'use strict';
    var jsSources = [
        'js/components/*.js',
        'js/modules/*.js',
        'js/utils/*.js',
    ];
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {

            jsBuild: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> (c) 2018 ThinhLP */\n'
                },
                files: {
                    'dist/js/<%= pkg.name %>.min.js': jsSources
                }
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
