const Path = require('path');
const StatoscopeWebpackPlugin = require('@statoscope/ui-webpack');

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';

  return {
    entry: './src/index.ts',
    output: {
      path: Path.resolve(__dirname, './dist'),
      filename: 'index.js',
      publicPath: '/',
      libraryTarget: 'commonjs',
    },
    devtool: 'source-map',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'ts-loader'
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
      },
    },
    plugins: [
      new StatoscopeWebpackPlugin({
        saveTo: './dist/report-[name]-[hash].html',
        saveStatsTo: './dist/stats-[name]-[hash].json',
        watchMode: false,
        open: 'file',
        name: 'bundles',
      })
    ]
  };
};
