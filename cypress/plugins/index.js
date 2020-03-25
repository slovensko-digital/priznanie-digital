/**
 * Used to setup TypeScript support in cypress
 */
// var path = require('path');
// var util = require('util');
// const wp = require('@cypress/webpack-preprocessor');

// module.exports = on => {
//   const options = wp.defaultOptions;

//   options.webpackOptions.output = {
//     fileName: 'bundle.js',
//     chunkFileName: '[name].bundle.js',
//   };
//   options.webpackOptions.resolve = {
//     extensions: ['.ts', '.tsx', '.js'],
//   };

//   options.webpackOptions.module.rules = options.webpackOptions.module.rules.concat(
//     [
//       {
//         test: /\.tsx?$/,
//         use: [
//           {
//             loader: 'ts-loader',
//             options: { transpileOnly: true },
//           },
//         ],
//       },
//     ],
//   );
//   util.inspect(options, { depth: Infinity });

//   on('file:preprocessor', wp(options));
// };

const wp = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      output: {
        fileName: 'bundle.js',
        chunkFileName: '[name].bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    },
  }
  on('file:preprocessor', wp(options))
}
