import h from "react-hyperscript";
import { useState, useRef } from "react";
import { Slider } from "cyano-react-slider";
// import { fadeInImage } from "../app/common";
import preloader from "../preloader";
import footer from "../app/footer";
import { addStyle } from "../app/styler";
import style from "./style";
addStyle("slider-examples-controls", style);

const page = opts => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const url = opts.data;
  // lazy loading
  const inRange = Math.abs(currentIndex - listIndex) < 2;
  const content = inRange
    ? h(".image-container",
      [
        h(".image", {
          style: {
            backgroundImage: `url(${url})`,
            opacity: 1
          }
        }),
        preloader
      ])
    : null;
  return h(".page", {
    key: listIndex,
    className: currentIndex === listIndex ? "current-page" : null
  }, content);
};

const sliderControls = (sliderController, isEditing, setIsEditing) => {
  return sliderController
    ? h(".slider-controls.slider-controls-controls",
      [
        h("input.goto", {
          value: isEditing ? "" : sliderController.index() + 1,
          onChange: e => {
            setIsEditing(true);
            const idx = parseInt(e.target.value, 10) - 1;
            if (!isNaN(idx)) {
              sliderController.goTo(idx, 0);
              setIsEditing(false);
            }
          },
        }),
        h("a.prev", {
          className: sliderController.hasPrevious() ? "enabled" : "",
          onClick: () => sliderController.goPrevious()
        }, "Previous"),
        h("a.next", {
          className: sliderController.hasNext() ? "enabled" : "",
          onClick: () => sliderController.goNext()
        }, "Next")
      ]
    )
    : null
};

const Controls = attrs => {
  const [sliderController, setSliderController] = useState();
  const [isEditing, setIsEditing] = useState();

  const rtl = attrs.rtl;
  const mySlider = h(Slider, {
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
    sliderController: ctrl => setSliderController(ctrl),
    className: ["example controls", attrs.className].join(" "),
    rtl
  });
  const controls = sliderControls(
    sliderController,
    isEditing,
    editing => setIsEditing(editing)
  );
  const props = rtl
    ? { dir: "rtl" }
    : null;
  return h("div", props, [
    mySlider,
    h(".slider-placeholder"),
    controls,
    attrs.hideFooter ? null : footer()
  ]);
};

export default Controls;
