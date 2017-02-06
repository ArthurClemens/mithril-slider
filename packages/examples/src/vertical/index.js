import m from "mithril";
import slider from "mithril-slider";
import { getPageData, fadeInImage } from "../app/common";
import preloader from "../preloader";
import footer from "../app/footer";
import { addStyle } from "../app/styler";
import style from "./style";
addStyle("slider-examples-vertical", style);

const page = opts => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const data = opts.data;
  // lazy loading
  const inRange = Math.abs(currentIndex - listIndex) < 2;
  const content = inRange ? m(".image-container", [
    m(".image", {
      config: (el, inited) => {
        if (inited) {
          return;
        }
        fadeInImage(el, data);
      }
    }),
    preloader
  ]) : null;
  return m(".page",
    { key: listIndex },
    content);
};

export default {
  view: (ctrl, opts = {}) => {
    return m("div", [
      m.component(slider, {
        pageData: getPageData,
        page,
        class: "example vertical",
        orientation: "vertical"
      }),
      m(".slider-placeholder"),
      opts.hideFooter ? null : footer()
    ]);
  }
};
