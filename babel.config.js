module.exports = api => {
  const isTest = api.env("test");
  const presentEnvOptions = {};

  if (isTest) {
    presentEnvOptions.targets = {
      node: "current"
    };
  }

  return {
    presets: [["@babel/preset-env", presentEnvOptions], "@babel/preset-react"],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime"
    ],
    ignore: [!isTest && "**/*.test.js"].filter(Boolean)
  };
};
