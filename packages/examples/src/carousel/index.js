import m from "mithril";
import controls from "../controls";
import footer from "../app/footer";
import { addStyle } from "../app/styler";
import style, { offset } from "./style";
addStyle("slider-examples-carousel", style);

export default {
  view: () =>
    [
      m.component(controls, {
        hideFooter: true,
        class: "carousel",
        pageOffsetX: offset
      }),
      footer()
    ]
};
