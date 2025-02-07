const path = require("path");
const { override, addWebpackResolve } = require("customize-cra");

console.log("Alias @root points to:", path.resolve(__dirname, "src"));

module.exports = override(
  (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@root": path.resolve(__dirname, "src"),
    };
    return config;
  },
  addWebpackResolve({
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
    },
  }),
);
