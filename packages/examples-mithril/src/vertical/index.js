import m from "mithril";
import { addStyle } from "../app/styler";
import { getPageData, fadeInImage } from "../app/common";
import { Slider } from "cyano-mithril-slider";
import footer from "../app/footer";
import preloader from "../preloader";
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
      oncreate: ({dom}) => {
        fadeInImage(dom, data);
      }
    }),
    preloader
  ]) : null;
  return m(".page",
    { key: listIndex },
    content);
};

export default {
  view: ({attrs}) => {
    return m("div", [
      m(Slider, {
        pageData: getPageData,
        page,
        class: "example vertical",
        orientation: "vertical"
      }),
      m(".slider-placeholder"),
      attrs.hideFooter ? null : footer()
    ]);
  }
};
