/* eslint-disable no-param-reassign */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? process.env.THEME_PATH : '',
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((opts) => {
        opts[0].filename = 'index.php';
        opts[0].title = 'DPSG DV Osnabrück';
        return opts;
      });
    }
  },
};
