/* globals process */
import J2c from "j2c";
const j2c = new J2c();

import { css } from "../src/css.js";
const scoped = { "@global": css };
const sheet = j2c.sheet(scoped);

process.stdout.write(sheet);