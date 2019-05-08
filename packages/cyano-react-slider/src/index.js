import { _Slider, css } from "cyano-core-slider";
import { cast, h, useReducer, useState, useEffect, useRef, getRef } from "cyano-react";

export const Slider = cast(_Slider, { h, useReducer, getRef, useState, useEffect, useRef });
export { css };
