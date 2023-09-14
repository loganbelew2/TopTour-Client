const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory
    filename: 'bundle.js',  // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Use Babel for JavaScript/JSX files
        },
      },
      // Add more rules for other file types (e.g., CSS, images)
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // File extensions to resolve
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};
