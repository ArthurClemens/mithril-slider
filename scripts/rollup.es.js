/* global process */
/*
Build to a module that has ES2015 module syntax but otherwise only syntax features that node supports
https://github.com/rollup/rollup/wiki/jsnext:main
*/
import { pkg, createConfig } from "./rollup.base.js";
import babel from "rollup-plugin-babel";

const env = process.env;
const baseConfig = createConfig();
const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output,
    {
      format: "es",
      file: `${env.DEST || pkg.main}.mjs`,
    }
  )
});
targetConfig.plugins.unshift(
  babel({
    configFile: "../../babel.config.es.js"
  })
);
export default targetConfig;

