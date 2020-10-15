module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
    "plugins": [
      "@babel/transform-runtime",
      "@babel/plugin-proposal-class-properties"
    ],
  ],
};
