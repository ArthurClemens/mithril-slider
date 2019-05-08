/* global process */
import fs from "fs";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import pathmodify from "rollup-plugin-pathmodify";
import path from "path";

function toCamelCase(string) {
  string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
    return match.charAt(match.length-1).toUpperCase();
  });
  return string.charAt(0).toLowerCase() + string.substring(1);
}

const env = process.env;
export const pkg = JSON.parse(fs.readFileSync("./package.json"));
const baseDir = process.cwd();
const whichCyano = env.CYANO;
const name = toCamelCase(whichCyano || pkg.name);

const globals = {};
const includes = (env.INCLUDES || "").split(/\s*,\s*/);
const external = [
  "mithril",
  "react",
].filter(e => includes.indexOf(e) === -1);
external.forEach(ext => {
  switch (ext) {
  case "mithril":
    globals["mithril"] = "m";
    break;
  case "react":
    globals["react"] = "React";
    break;
  case "react-dom":
    globals["react-dom"] = "ReactDOM";
    break;
  default:
    globals[ext] = ext;
  }
});

export const createConfig = () => {
  const config = {
    input: env.ENTRY || "./src/index.js",
    external,
    output: {
      name,
      globals,
    },
    plugins: [
      resolve(),
      whichCyano && pathmodify({
        aliases: [
          {
            id: "cyano",
            resolveTo: path.resolve(baseDir, `node_modules/${whichCyano}/dist/${whichCyano}.mjs`),
          },
        ]
      }),
      commonjs({
        // namedExports: {
        //   "node_modules/react/index.js": ["Children", "Component", "PropTypes", "createElement", "createFactory"],
        //   "node_modules/react-dom/index.js": ["render"]
        // }
      }),
    ]
  };
  
  return config;
};