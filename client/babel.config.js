const { gestureHandlerRootHOC } = require("react-native-gesture-handler");

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        moduleName: "@env",
        path: ".env",
        safe: true,
        allowUndefined: true
      }]
    ]
  };
};
