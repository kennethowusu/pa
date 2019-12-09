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
              'dist/css/general.css':'src/scss/general/general.scss',
              'dist/css/auth.css':'src/scss/auth.scss'
          }
        }
      },

      babel: {
  options: {
    sourceMap: true,
    presets: ['@babel/preset-env','@babel/preset-react'],
    plugins: ["transform-es2015-modules-amd"]
  },
  dist: {
    files: {
      'dist/sample.js': 'src/app.js'
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
  grunt.loadNpmTasks('grunt-babel');

  //=============registering tasks=============//
  grunt.registerTask('default', 'watch');
  grunt.registerTask('uglify', ['uglify']);
  grunt.registerTask('bab', ['babel']);
};
