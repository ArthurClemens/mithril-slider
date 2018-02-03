/* globals process */
import fs from "fs";
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export const pkg = JSON.parse(fs.readFileSync("./package.json"));
const external = Object.keys(pkg.dependencies || {});
const env = process.env; // eslint-disable-line no-undef
const input = env.ENTRY || "index.js";
const moduleName = env.MODULE || pkg.name;

const globals = {
  mithril: "m"
};

export const createConfig = ({ includeDepencies, lint }) => {
  const config = {
    input,
    external: includeDepencies ? ["mithril"] : external,
    output: {
      name: moduleName,
      globals
    },
    plugins: []
  };
  config.plugins.push(resolve({
    jsnext: true,
    main: true
  }));
  config.plugins.push(commonjs({
    include: "node_modules/**"
  }));
  lint && config.plugins.push(eslint({
    cache: true
  }));
  config.plugins.push(babel());
  return config;
};

