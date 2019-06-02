import m from "mithril";
import { addStyle } from "../app/styler";
import controls from "../controls";
import footer from "../app/footer";
import style, { offset } from "./style";

addStyle("slider-examples-carousel", style);

export default {
  view: () => [
    m(controls, {
      hideFooter: true,
      class: "carousel",
      pageOffsetX: offset
    }),
    footer()
  ]
};
