/**
 * Used to setup TypeScript support in cypress
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wp = require("@cypress/webpack-preprocessor");

module.exports = on => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
    },
  };
  on("file:preprocessor", wp(options));
};
