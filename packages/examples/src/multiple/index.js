import m from "mithril";
import images from "../images";
import controls from "../controls";
import footer from "../app/footer";

export default {
  view: () =>
    [
      m(images, { hideFooter: true }),
      m(controls, { hideFooter: true }),
      footer()
    ]
};
