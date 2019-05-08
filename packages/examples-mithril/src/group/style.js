import { styleVariables } from "../app/variables";

const buttonSize = 40;

const pageSizes = () => {
  const sizes = {};
  let i = 1;
  while (i <= 5) {
    const size = styleVariables.size / i;
    sizes[".group-" + i] = {
      " .mithril-slider__content": {
        height: Math.floor(size) + "px"
      },
      " .page": {
        width: size + "px",
        height: size + "px"
      }
    };
    i++;
  }
  return sizes;
};

const countStyle = () => {
  const buttonCount = 5;
  const minButtonSize = 30;
  const margin = 10;
  const width = 5 * minButtonSize + buttonCount * margin;
  const height = buttonSize;

  return {
    position: "absolute",
    left: "50%",
    height: height + "px",
    width: width + "px",
    "margin-left": -width / 2 + "px",

    " a": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      display: "block",
      float: "left",
      margin: ((buttonSize - minButtonSize) / 2) + "px " + (margin / 2) + "px",
      width: minButtonSize + "px",
      height: minButtonSize + "px",
      borderRadius: minButtonSize / 2 + "px",
      backgroundColor: "rgba(0, 0, 0, .1)",
      cursor: "pointer",
      textAlign: "center",
      fontSize: "13px",
      lineHeight: minButtonSize + "px",

      ".selected": {
        backgroundColor: "rgba(0, 0, 0, .4)",
        color: "#fff",
        cursor: "default",
        pointerEvents: "none"
      }
    }
  };
};

const prevNextButtonStyle = () => {
  return {
    " a.prev, a.next": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      backgroundSize: "30px",
      display: "block",
      width: buttonSize + "px",
      height: buttonSize + "px",
      borderRadius: buttonSize / 2 + "px",
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, .1)",
      textIndent: "-1234em",
      cursor: "default",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50%",
      opacity: 0,

      ".enabled": {
        opacity: "1",
        cursor: "pointer",

        ":hover": {
          backgroundColor: "rgba(0, 0, 0, .2)"
        }
      }
    },
    " a.prev": {
      left: "10px",
      backgroundImage: "url(assets/previous.svg)"
    },
    " a.next": {
      right: "10px",
      backgroundImage: "url(assets/next.svg)"
    }
  };
};

const pageNumberStyle = () => {
  const size = 30;
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: size + "px",
    height: size + "px",
    lineHeight: size + "px",
    fontSize: "12px",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,.5)",
    zIndex: 2
  };
};

export default [{
  ".example.group": [
    pageSizes(), {
      position: "relative",

      " .page": {
        position: "static",
        float: "left",

        " span": pageNumberStyle(),

        " .preloader, .image-container, .image": {
          width: "100%",
          height: "100%"
        }
      }
    }
  ],
  ".slider-controls.slider-controls-group": [
    prevNextButtonStyle(), {
      width: styleVariables.size + "px",
      height: buttonSize + 2 * 10 + "px",
      padding: "10px 0",
      position: "relative",
      margin: "0 auto",

      " .count": countStyle()
    }
  ]
}];
