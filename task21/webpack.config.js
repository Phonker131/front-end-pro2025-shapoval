import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

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
            assetModuleFilename: "assets/[name][hash][ext][query]",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset",
                },
            ],
        },
        optimization: {
            splitChunks: { chunks: "all" },
            minimize: isProd,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
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
            isProd && new MiniCssExtractPlugin({ filename: "styles/[name].[contenthash].css" }),
            isProd &&
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: [["gifsicle", { interlaced: true }], ["jpegtran", { progressive: true }], ["optipng", { optimizationLevel: 5 }], ["svgo"]],
                        },
                    },
                }),
        ].filter(Boolean),

        watch: !isProd,

        devServer: !isProd
            ? {
                  static: resolve(__dirname, "dist"),
                  port: 5173,
                  open: true,
                  hot: true,
                  compress: true,
                  watchFiles: ["src/**/*", "index.html"],
                  client: { overlay: true },
              }
            : undefined,
    };
};
