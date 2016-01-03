// Generated on <%- (new Date).toISOString().split('T')[0] %> using <%- pkg.name %> <%- pkg.version %>
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    complexity: {
      generic: {
        src: ['app/**/*.js'],
        options: {
          errorsOnly: false,
          cyclometric: 6,       // default is 3
          halstead: 16,         // default is 8
          maintainability: 100  // default is 100
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },<%
      switch (testFramework) {
        case 'mocha':
%>
    mochacli: {
      all: ['test/**/*.js'],
      options: {
        reporter: 'spec',
        ui: 'tdd'
      }
    },<%
          break;

        case 'redtape':
        case 'tape':
%>
    tape: {
      ci: {
        files: { src: ['./test/**/*.js'] },
        options: {
          pretty: false
        }
      },
      pretty: {
        files: { src: ['./test/**/*.js'] },
        options: {
          pretty: true
        }
      }
    },<%
          break;
      } %>
    watch: {
      js: {
        files: ['**/*.js', '!node_modules/**/*.js'],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  <%
    switch (testFramework) {
      case 'mocha':
  %>grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.registerTask('test', ['complexity', 'jshint', 'mochacli', 'watch']);
  grunt.registerTask('ci', ['complexity', 'jshint', 'mochacli']);
  grunt.registerTask('default', ['test']);<%
        break;

      case 'redtape':
      case 'tape':
  %>grunt.loadNpmTasks('grunt-tape');
  grunt.registerTask('test', ['complexity', 'jshint', 'tape:pretty', 'watch']);
  grunt.registerTask('ci', ['complexity', 'jshint', 'tape:ci']);
  grunt.registerTask('default', ['test']);<%
        break;
    }
  %>
};
