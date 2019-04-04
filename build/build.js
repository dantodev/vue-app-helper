const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

async function build() {
  const bundle = await rollup.rollup({
    input: "src/vue-app-helper.js",
    plugins: [
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: false
      }),
      resolve(),
      commonjs()
    ]
  });
  await bundle.write({
    dir: "lib",
    format: "cjs",
    exports: "named"
  });
}

build();
