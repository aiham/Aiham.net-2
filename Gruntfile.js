module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, dest: 'public/css/vendor/', src: 'bower_components/bootstrap/dist/css/bootstrap.min.css'},
          {expand: true, flatten: true, dest: 'public/js/vendor/', src: 'bower_components/angular/angular.min.js'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};
