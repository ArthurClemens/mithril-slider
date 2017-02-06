import { styleVariables } from "../app/variables";

const pagePositions = () => {
  const sizes = {};
  let i = 0;
  while (i <= 10) {
    const posPx = (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      left: "auto",
      top: posPx
    };
    i++;
  }
  return sizes;
};

export default [{
  ".example.vertical": [
    pagePositions(), {
      "&.slider, .page": {
        height: styleVariables.size + "px"
      }
    }
  ]
}];