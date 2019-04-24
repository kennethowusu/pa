module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //=============configuring sass================//

    //======================configuring autoprefixer===================//
    // autoprefixer:{
    //     options:{
    //         // We need to `freeze` browsers versions for testing purposes.
    //         browsers: ['opera 12', 'ff 15', 'chrome 25']
    //     },
    //
    //      style: {
    //       src: 'public/stylesheets/style.css',
    //       dest: 'public/stylesheets/style.css'
    //     }
    // },

    //=========================configuring watch=================//
    watch: {
       options:{
         livereload:false
       },
       sass: {
         files: ['sass/**/*'],
         tasks: ['sass','autoprefixer']
       },
       js:{
         files:['js/**/*','scripts/**/**/**/**'],
         tasks:['concat']
       }
    },
    concat: {
  options: {
    separator: ';',
  },
  dist: {
    src: ['js/account-universal.js',
           'js/main.js',
           'js/remodal.js',
           'js/withdraw.js'

          ],
    dest: 'public/javascripts/addscript.js',
  },
  home:{
    src:[
       'js/vendors/jquery-3.2.1.min.js',
      'js/vendors/jquery-migrate-3.0.1.min.js',
      'js/vendors/popper.min.js',
      'js/vendors/bootstrap.min.js',
      'js/vendors/jquery.easing.1.3.js',
      'js/vendors/jquery.waypoints.min.js',
      'js/vendors/jquery.stellar.min.js',
      'js/vendors/owl.carousel.min.js',
      'js/vendors/jquery.magnific-popup.min.js',
      'js/vendors/aos.js',
      'js/vendors/jquery.animateNumber.min.js',
      'js/vendors/bootstrap-datepicker.js',
      'js/vendors/scrollax.min.js',
      'js/vendors/universal.js',
      'js/vendors/main.js',
      'js/vendors/addscript.js'

    ],
    dest:'public/javascripts/home.js'
  },

  account:{
    src:[

      'js/account/universal.js',
      // 'js/account/util.js',
      // 'js/account/modal.js',
      // 'js/account/popover.js',
      // 'js/account/dropdown.js',
      'node_modules/sweetalert/dist/sweetalert.min.js',
      'js/account/settings.js',
      'js/account/copy.js',
      'js/account/investment.js',
      'js/account/withdraw.js',
      'js/account/notification.js'

    ],
    dest:'public/javascripts/account.js'
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
