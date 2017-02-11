import { styleVariables } from "./variables";

export const pagePositions = (dir, offset = 0) => {
  const sizes = {};
  let i = 0;
  while (i <= 10) {
    const posPx = offset + (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      top: 0,
      left: dir === "rtl" ? "auto" : posPx,
      right: dir === "ltr" ? "auto" : posPx
    };
    i++;
  }
  return sizes;
};

export default [{
  "*": {
    boxSizing: "border-box"
  },
  " html, body": {
    minHeight: "100%",
    height: "100%",
  },
  " body": {
    margin: 0,
    padding: 0,
    fontFamily: "arial, sans-serif",
    minWidth: styleVariables.size + "px"
  },
  " #app": {
    height: "inherit"
  },
  " .example": [
    pagePositions("ltr"),
    {
      "&.mithril-slider": {
        width: styleVariables.size + "px",
        height: styleVariables.size + "px",
        margin: "0 auto"
      },
      " .mithril-slider__content": {
        position: "relative",
        minHeight: styleVariables.size + "px"
      },
      " .page": {
        position: "absolute",
        width: styleVariables.size + "px",
        maxWidth: styleVariables.size + "px",

        " .image-container": {
          position: "relative",
          backgroundColor: "#f0f0f0"
        },
        " .image-container, .preloader, .image": {
          width: styleVariables.size + "px",
          height: styleVariables.size + "px"
        },
        " .preloader, .image": {
          position: "absolute"
        },
        " .image": {
          userSelect: "none",
          opacity: 0,
          transition: "opacity .7s",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: 1
        }
      }
    }
  ],
  " .slider-placeholder": {
    height: styleVariables.size + "px"
  },
  " .mithril-slider + .slider-placeholder": {
    display: "none"
  },
  " [dir='rtl']": {
    " .example": pagePositions("rtl")
  },
  " a": {
    "&:link, &:visited": {
      "color": "#1E88E5",
      "text-decoration": "none"
    }
  }
}];
