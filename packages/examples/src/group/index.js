import m from "mithril";
import { slider } from "mithril-slider";
import { getPageData, fadeInImage } from "../app/common";
import preloader from "../preloader";
import footer from "../app/footer";
import { addStyle } from "../app/styler";
import style from "./style";
addStyle("group", style);

const callRight = (fn, ...args) =>
  (...remainingArgs) =>
  fn(...remainingArgs, ...args);

const page = (opts, groupBy) => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const data = opts.data;
  // lazy loading
  const inRange = Math.abs(currentIndex - listIndex) < 2 * groupBy;
  const content = inRange
    ? [
      m(".image-container", [
        m(".image", {
          oncreate: ({dom}) => fadeInImage(dom, data)
        }),
        m("span", listIndex + 1),
        preloader
      ])
    ]
    : null;
  return m(".page", {
    key: listIndex
  }, content);
};

const sliderControls = (sliderController, groupBy, onSetGroupBy) =>
  m(".slider-controls.slider-controls-group",
    sliderController ? [
      m("a.prev", {
        class: sliderController.hasPrevious() ? "enabled" : "",
        onclick: () => sliderController.goPrevious()
      }, "Previous"),
      m(".count", [
        [1, 2, 3, 4, 5].map(size => {
          return m("a", {
            onclick: () => {
              onSetGroupBy(size);
              setTimeout(() => {
                sliderController.goCurrent();
              }, 0);
            },
            class: size === groupBy ? "selected" : ""
          }, size);
        })
      ]),
      m("a.next", {
        class: sliderController.hasNext() ? "enabled" : "",
        onclick: () => sliderController.goNext()
      }, "Next")
    ] : null);

export default {
  oninit : vnode => {
    vnode.state = {
      sliderController: undefined,
      isEditing: false,
      groupBy: 3
    };
  },
  view: ({attrs, state}) => {
    const sliderController = state.sliderController;
    const groupBy = state.groupBy;
    const mySlider = m(slider, {
      pageData: getPageData,
      page: callRight(page, groupBy),
      groupBy,
      sliderController: ctrl => state.sliderController = ctrl,
      class: ["example", "group", "group-" + groupBy].join(" ")
    });
    const controls = sliderControls(sliderController, groupBy, size => state.groupBy = size);
    return m("div", [
      controls,
      mySlider,
      m(".slider-placeholder"),
      attrs.hideFooter ? null : footer()
    ]);
  }
};