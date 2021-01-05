const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
            lessOptions: {
                javascriptEnabled: true
            }
        },
        customizeTheme: {
          "@primary-color": "#154d42",
          "@border-radius-base": "15px"
        },
      },
    },
  ],
};

