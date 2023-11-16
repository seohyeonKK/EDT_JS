const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	// 번들링 시작점
	entry: "./src/main.js",
	output: {
		filename: "main.[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true, // dist폴더 정리
	},
	plugins: [
		// 동적인 번들 파일명을 위해 html 파일 자동 생성 플러그인
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html",
			chunks: ["main"],
		}),
	],
	// 디버깅을 위해 번들 파일과 원본 소스 mapping
	devtool: "source-map",
};
