import { styleVariables } from "../app/variables";

const buttonSize = 40;
const inputGotoWidth = buttonSize;
const inputGotoHeight = buttonSize;

export default [{
  ".slider-controls.slider-controls-controls": {
    position: "relative",
    width: styleVariables.size + "px",
    height: buttonSize + 2 * 10 + "px",
    margin: "0 auto",
    marginTop: -1.4 * buttonSize + "px",
    padding: "10px 0",

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
      backgroundColor: "#eee",
      textIndent: "-1234em",
      cursor: "default",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50%",
      opacity: 0,

      ".enabled": {
        opacity: 1,
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#ddd"
        }
      }
    },
    " a.prev": {
      backgroundImage: "url(assets/previous.svg)",
      left: "10px"
    },
    " a.next": {
      "background-image": "url(assets/next.svg)",
      right: "10px"
    },
    " input.goto": {
      position: "absolute",
      backgroundColor: "#eee",
      left: "50%",
      height: inputGotoHeight + "px",
      width: inputGotoWidth + "px",
      margin: "0 0 0 " + -inputGotoWidth / 2 + "px",
      padding: 0,
      textAlign: "center",
      border: "none",
      fontSize: "14px",

      "&:focus": {
        backgroundColor: "#fff"
      }
    }
  },
  "[dir='rtl']": {
    " .slider-controls.slider-controls-controls": {
      " a.next": {
        right: "auto",
        left: "10px",
        transform: "scaleX(-1)"
      },
      " a.prev": {
        left: "auto",
        right: "10px",
        transform: "scaleX(-1)"
      }
    }
  }
}];
