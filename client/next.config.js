const webpack = require('webpack');

const { BACKEND_URL = '', BASE_PATH = '' } = process.env;

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.plugins.push(new webpack.EnvironmentPlugin({ BACKEND_URL, BASE_PATH }));
    config.node = {
      fs: 'empty',
    };

    return config;
  },
  basePath: BASE_PATH,
  trailingSlash: true,
};
