const webpack = require('webpack');

const { URL_DOSARE, URL_DOSARE2, URL_SEDINTE } = process.env;

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.plugins.push(
      new webpack.EnvironmentPlugin({ URL_DOSARE, URL_DOSARE2, URL_SEDINTE }),
    );
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};
