import { addStyle } from "./styler";

const styles = [{
  ".slider": {
    overflow: "hidden",

    " .content": {
      transitionProperty: "transform",
      transitionTimingFunction: "ease-out",
      // transition-duration set in js
      transform: "translate3d(0, 0, 0)"
    }
  }
}];

addStyle("mithril-slider", styles);
