module.exports = {
  plugins: [
    require("autoprefixer"),
    require("precss"),
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 1
    }),
    require("postcss-assets")({
      loadPaths: ["dist/img"]
    }),
    require("cssnano")({
      preset: "default"
    })
  ]
};
