import m from "mithril";
import images from "../images";
import controls from "../controls";
import footer from "../app/footer";

export default {
  view: () =>
    [
      m.component(images, { hideFooter: true }),
      m.component(controls, { hideFooter: true }),
      footer()
    ]
};
