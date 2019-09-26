const webpack = require('webpack');

const { BACKEND_URL = 'http://localhost:7000' } = process.env;

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.plugins.push(new webpack.EnvironmentPlugin({ BACKEND_URL }));
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
