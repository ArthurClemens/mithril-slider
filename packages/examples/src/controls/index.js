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
  return m(".page", {
    key: listIndex,
    class: currentIndex === listIndex ? "current-page" : null
  }, content);
};

export default {
  controller: () => {
    return {
      sliderController: m.prop(),
      isEditing: m.prop(false) // allow value change when typing
    };
  },
  view: (ctrl, opts = {}) => {
    const rtl = opts.rtl;
    const sliderController = ctrl.sliderController();
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
      pageOffsetX: opts.pageOffsetX,
      sliderController: ctrl.sliderController,
      class: ["example controls", opts.class].join(" "),
      rtl
    });
    const sliderControls = sliderController ? m(".slider-controls.slider-controls-controls", [
      m("input.goto", {
        value: ctrl.isEditing() ? "" : sliderController.index() + 1,
        oninput: e => {
          ctrl.isEditing(true);
          const idx = parseInt(e.target.value, 10) - 1;
          if (!isNaN(idx)) {
            sliderController.goTo(idx, 0);
            ctrl.isEditing(false);
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
    ]) : null;
    const props = rtl
      ? { dir: "rtl" }
      : {};
    return m("div", props, [
      mySlider,
      m(".slider-placeholder"),
      sliderControls,
      opts.hideFooter ? null : footer()
    ]);
  }
};