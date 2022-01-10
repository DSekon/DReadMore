const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

function createBanner() {
    var pkg = JSON.parse(fs.readFileSync('./package.json'));
    return `${pkg.name} - ${pkg.version}

Author: ${pkg.author}

Licensed under the ${pkg.license} license

Project home: 
  ${pkg.homepage}
`;
}

var rules = {
    js: {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-modules-commonjs'],
            passPerPreset: true,
        },
    }
};

module.exports = {
    mode: 'production',
    entry: './src/js/core/core.js',
    output: {
        filename: 'dreadmore.min.js',
        path: path.resolve(__dirname, 'dist/js'),
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    optimization: {
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                terserOptions: {
                    sourceMap: 'production',
                    format: {
                        ascii_only: true,
                        beautify: false,
                        comments: /^!/
                    }
                },
                extractComments: false
            })
        ]
    },
    module: {
        rules: [
            rules.js
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: createBanner,
            entryOnly: false
        })
    ],
}
