// Karma configuration
// Generated on Mon Aug 04 2014 14:17:51 GMT+0100 (BST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'browserify'],
    files: [
      'test/*Spec.pogo'
    ],

    browserify: {
      extensions: ['.pogo'],
      transform: ['pogoify'],
    },


    preprocessors: {
      'test/*Spec.pogo' : ['browserify']
    },

    // list of files to exclude
    exclude: [
      '*~'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
