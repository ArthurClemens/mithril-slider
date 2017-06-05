/*
Build an UMD bundle that is updated with each file change
*/
import { pkg, createConfig } from "./rollup.base.js";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const env = process.env; // eslint-disable-line no-undef
const includeDepencies = !!parseInt(env.DEPS, 10) || false; // Use `false` if you are creating a library, or if you are including external script in html
const dest = env.DEST || pkg.main;
const watchDir = env.WATCH_DIR;
const serverPort = env.PORT;

const baseConfig = createConfig({ includeDepencies, lint: false });
const targetConfig = Object.assign({}, baseConfig, {
  dest,
  format: "umd",
  sourceMap: false
});

targetConfig.plugins.push(
  serve({
    contentBase: watchDir,
    port: serverPort
  })
);

targetConfig.plugins.push(
  livereload({
    watch: watchDir
  })
);

export default targetConfig;
