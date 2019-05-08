import { _Slider, css } from "../../cyano-core-slider/dist/cyano-core-slider";
import { cast, h, useReducer, useState, useEffect, useRef, getRef } from "../node_modules/cyano-mithril/dist/cyano-mithril";

export const Slider = cast(_Slider, { h, useReducer, getRef, useState, useEffect, useRef });
export { css };
