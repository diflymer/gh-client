const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyle = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
                    namedExport: false,
                    exportLocalsConvention: 'asIs', // Сохранять оригинальные имена классов
                },
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'autoprefixer'
                    ]
                }
            }
        },
        'sass-loader'
    ]
}

const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
    entry: path.join(SRC_PATH, 'main.tsx'),
    target: isProd ? 'browserslist' : 'web',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'), // путь до нашего шаблона
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        isProd && new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerWebpackPlugin()
    ].filter(Boolean),
    module:
    {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyle(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyle()
            },
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpe?g)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            components: path.join(SRC_PATH, 'components'),
            config: path.join(SRC_PATH, 'config'),
            styles: path.join(SRC_PATH, 'styles'),
            utils: path.join(SRC_PATH, 'utils'),
            store: path.join(SRC_PATH, 'store'),
        }
    },
    devServer: {
        host: '127.0.0.1', // хост нашего сервера
        port: 9000, // порт, по которому к нему можно обращаться
        static: {
            directory: __dirname,
        },
        hot: true,
        historyApiFallback: true
    }
}