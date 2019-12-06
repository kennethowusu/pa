module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //=============configuring sass================//

    //======================configuring autoprefixer===================//
    sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
              'dist/css/primeaxis.css':'src/scss/primeaxis/primeaxis.scss',
              'dist/css/general.css':'src/scss/general/general.scss'
          }
        }
      },

    //=========================configuring watch=================//
    watch: {
       options:{
         livereload:false
       },
       sass: {
         files: ['src/scss/**/*'],
         tasks: ['sass']
       }
    },
    //=================================configuring uglify================//

      uglify: {
        options: {
          mangle: false
        },
        my_target: {
          files: {
            'public/stylesheets/style.css': ['public/stylesheets/style.css']
          }
        }
      }
  });


  //================ Load grunt plugins=========================//
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');


  //=============registering tasks=============//
  grunt.registerTask('default', 'watch');
  grunt.registerTask('uglify', ['uglify']);
};
