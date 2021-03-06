import m from "mithril";
import { slider } from "mithril-slider";
import { fadeInImage } from "../app/common";
import preloader from "../preloader";
import footer from "../app/footer";
import { addStyle } from "../app/styler";
import style from "./style";
addStyle("slider-examples-controls", style);

const page = opts => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const data = opts.data;
  // lazy loading
  const inRange = Math.abs(currentIndex - listIndex) < 2;
  const content = inRange
    ? m(".image-container",
      [
        m(".image", {
          oncreate: ({dom}) => {
            fadeInImage(dom, data);
          }
        }),
        preloader
      ])
    : null;
  return m(".page", {
    key: listIndex,
    class: currentIndex === listIndex ? "current-page" : null
  }, content);
};

const sliderControls = (sliderController, isEditing, setIsEditing) =>
  sliderController
    ? m(".slider-controls.slider-controls-controls",
      [
        m("input.goto", {
          value: isEditing ? "" : sliderController.index() + 1,
          oninput: e => {
            setIsEditing(true);
            const idx = parseInt(e.target.value, 10) - 1;
            if (!isNaN(idx)) {
              sliderController.goTo(idx, 0);
              setIsEditing(false);
            }
          }
        }),
        m("a.prev", {
          class: sliderController.hasPrevious() ? "enabled" : "",
          onclick: () => sliderController.goPrevious()
        }, "Previous"),
        m("a.next", {
          class: sliderController.hasNext() ? "enabled" : "",
          onclick: () => sliderController.goNext()
        }, "Next")
      ]
    )
    : null;

export default {
  view: ({attrs, state}) => {
    const rtl = attrs.rtl;
    const sliderController = state.sliderController;
    const mySlider = m(slider, {
      pageData: () => Promise.resolve([
        "http://arthurclemens.github.io/assets/mithril-slider/img/01.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/02.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/03.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/04.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/05.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/06.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/07.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/08.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/09.jpg",
        "http://arthurclemens.github.io/assets/mithril-slider/img/10.jpg"
      ]),
      page,
      pageOffsetX: attrs.pageOffsetX,
      sliderController: ctrl => state.sliderController = ctrl,
      class: ["example controls", attrs.class].join(" "),
      rtl
    });
    const controls = sliderControls(sliderController, state.isEditing, editing => state.isEditing = editing);
    const props = rtl
      ? { dir: "rtl" }
      : null;
    return m("div", props, [
      mySlider,
      m(".slider-placeholder"),
      controls,
      attrs.hideFooter ? null : footer()
    ]);
  }
};