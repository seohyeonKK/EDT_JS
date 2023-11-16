const path = require("path");

module.exports = {
	// 번들링 시작점
	entry: "./src/main.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
};
