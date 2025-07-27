import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (_, argv) => {
    const mode = argv.mode || "development";
    const isProd = mode === "production";

    return {
        mode,
        entry: resolve(__dirname, "src/js/app.js"),
        devtool: !isProd ? "source-map" : false,
        output: {
            path: resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset",
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(__dirname, "index.html"),
                minify: isProd,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: resolve(__dirname, "public"),
                        to: resolve(__dirname, "dist"),
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],
    };
};
