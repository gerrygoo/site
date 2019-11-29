const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "webpack", "main"),
  output: {
    path: path.resolve(__dirname, '.'),
    filename: '[name]-bundle.js',
  },
  // optimization: {
  //   chunkIds: "deterministic" 
  // },
  // experiments: {
  //   asyncWebAssembly: true,
  //   importAwait: true
  // }
};
