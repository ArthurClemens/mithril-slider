"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _variables=require("app/app/variables"),_variables2=_interopRequireDefault(_variables),pagePositions=function(){for(var a={},e=0;10>=e;){var t=(e-1)*_variables2.default.size+"px";a[" .page:nth-child("+e+")"]={top:0,left:"auto",top:t},e++}return a},styles=[{".example.vertical":[pagePositions(),{"&.slider, .page":{height:_variables2.default.size+"px"}}]}];exports.default=styles;