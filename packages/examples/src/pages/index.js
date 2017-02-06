import m from "mithril";
import slider from "mithril-slider";
import { getPageData, fadeInImage } from "../app/common";
import preloader from "../preloader";
import { addStyle } from "../app/styler";
import style from "./style";
addStyle("pages", style);

const dummyText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const DATA_URL = "data/pages.json";

const callRight = (fn, ...args) =>
  (...remainingArgs) =>
  fn(...remainingArgs, ...args);

const page = opts => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const data = opts.data;
  const inRange = Math.abs(currentIndex - listIndex) < 2;
  const content = inRange ?
    m(".page-content",
      m(".article", [
        m(".image-container", [
          m(".image", {
            config: (el, inited) => {
              if (inited) {
                return;
              }
              fadeInImage(el, data.image);
            }
          }),
          preloader
        ]),
        m(".article-content", [
          m(".title", data.title),
          m("p", dummyText)
        ])
      ])) : null;
  return m(".page", {
    key: listIndex
  }, content);
};

let example = {};
example.view = () => {
  return m.component(slider, {
    pageData: callRight(getPageData, DATA_URL),
    page,
    class: "example pages"
  });
};

export default example;