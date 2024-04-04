const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const deps = require("./package.json").dependencies

module.exports = {
    cache: false,
    mode: 'development',
    devtool: 'source-map',

    optimization: {
        minimize: false,
    },

    output: {
        publicPath: 'http://localhost:3003/'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        hot: true,
        port: 3003,
        historyApiFallback: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept',
        },
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'shared',
            library: { type: 'var', name: 'shared' },
            filename: 'remoteEntry.js',
            exposes: {
                './provider': './src/provider/index.tsx',
                './hooks/useAppDispatch': './src/hooks/useAppDispatch.ts',
                './hooks/useAppSelector': './src/hooks/useAppSelector.ts',
                './service/menu': './src/services/client/menu/menu.service.ts'
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}