const path = require('path');

module.exports = {
    entry: "./dms.ts",
    // devtool: 'source-map',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, "dist/browser"),
        filename: 'dms.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'dms'
    }
}