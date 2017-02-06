import { pagePositions } from "../app/style";

const regularWidth = 320;
const pageWidth = 420;

export const offset = (pageWidth - regularWidth) / 2;

export default [{
  " .example.slider.carousel": [
    pagePositions("ltr", offset),
    {
      width: pageWidth + "px",
      maxWidth: pageWidth + "px",

      " .page": {
        opacity: .2,
        transitionProperty: "opacity",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "300ms",

        ".current-page": {
          opacity: 1,
          zIndex: 1
        }
      }
    }
  ]
}];
