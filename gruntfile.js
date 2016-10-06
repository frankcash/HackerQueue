module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: { jshintrc: '.jshintrc', reporterOutput: "" },
      myFiles: ['routes/*.js', "public/app.js" , 'app.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint']);
};
