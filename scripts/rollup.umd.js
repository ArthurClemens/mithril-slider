/* global process */
/*
Build to an Universal Module Definition
*/
import { pkg, createConfig } from "./rollup.base";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

const env = process.env;
const baseConfig = createConfig();
const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output,
    {
      format: env.FORMAT || "umd",
      file: `${env.DEST || pkg.main}.js`,
      sourcemap: true,
      extend: true,
    }
  )
});
targetConfig.plugins.unshift(
  babel({
    configFile: "../../babel.config.umd.js"
  })
);
targetConfig.plugins.push(terser());

export default targetConfig;
