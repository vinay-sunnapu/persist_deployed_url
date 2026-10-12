
const WorkboxWebpackPlugin = require(
  "workbox-webpack-plugin"
);

module.exports = {
  webpack: {
    configure: (webpackConfig, {
      env,
      paths
    }) => {
      if (env !== "production") {
        return webpackConfig;
      }

      // Replace any existing service worker
      // generation plugin, if present.
      webpackConfig.plugins =
        webpackConfig.plugins.filter(
          (plugin) =>
            !(
              plugin instanceof
                WorkboxWebpackPlugin.GenerateSW
            ) &&
            !(
              plugin instanceof
                WorkboxWebpackPlugin.InjectManifest
            )
        );

      webpackConfig.plugins.push(
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: "./src/service-worker.js",
          swDest: "service-worker.js",
          exclude: [
            /\.map$/,
            /asset-manifest\.json$/,
            /LICENSE/
          ],
          maximumFileSizeToCacheInBytes:
            5 * 1024 * 1024
        })
      );

      return webpackConfig;
    }
  }
};
