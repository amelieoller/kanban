const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = (dir) => path.join(__dirname, '../../', dir);

const isDev = process.env.NODE_ENV === 'development';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolve('client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: isDev ? '[name].css' : '[name].[hash].css',
  chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
});

const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({
  logo: resolve('client/assets/favicons/favicon.png'),
  prefix: 'favicons/',
  emitStats: false,
  statsFilename: 'faviconstats.json',
  persistentCache: false,
  inject: true,
  icons: {
    android: false,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false,
  },
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin({
  verbose: true,
  cleanStaleWebpackAssets: false,
});

module.exports = {
  entry: ['./client/assets/index.js', './client/index.js'],
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      _client: resolve('client'),
      _assets: resolve('client/assets/'),
      _styles: resolve('client/styles/'),
      _utils: resolve('client/utils/'),
      _api: resolve('client/api/'),
      _hooks: resolve('client/hooks/'),
      _atoms: resolve('client/components/atoms/'),
      _molecules: resolve('client/components/molecules/'),
      _organisms: resolve('client/components/organisms/'),
      _templates: resolve('client/components/templates/'),
      _pages: resolve('client/components/pages/'),
      _environment: resolve('client/components/environment/'),
      _store: resolve('client/store/'),
      _actions: resolve('client/store/actions/'),
      _reducers: resolve('client/store/reducers/'),
      _thunks: resolve('client/store/thunks/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('client')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'images/[name].[ext]' },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: { optimizationLevel: 7 },
              pngquant: { quality: [0.75, 0.9], speed: 3 },
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: false },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
          limit: 8192,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]' },
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    CleanWebpackPluginConfig,
    MiniCssExtractPluginConfig,
    FaviconsWebpackPluginConfig,
    HtmlWebpackPluginConfig,
  ],
  performance: {
    hints: false,
  },
};
