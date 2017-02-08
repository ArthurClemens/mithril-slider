import "../app/no-tap-delay";
import m from "mithril";
import { css } from "mithril-slider";

import { addStyle } from "../app/styler";
import appStyle from "../app/style";
import indexStyle from "./style";
import footer from "../app/footer";
addStyle("slider", css);
addStyle("slider-examples-app", appStyle);
addStyle("slider-examples-index", indexStyle);

import images from "../images";
import vertical from "../vertical";
import controls from "../controls";
import carousel from "../carousel";
import ltr from "../ltr";
import group from "../group";
// import pages from "../pages";
import multiple from "../multiple";

const menuData = [
  {
    href: "/images",
    title: "Simple image swipe",
    subtitle: "Swiping a series of images."
  },
  {
    href: "/vertical",
    title: "Vertical image swipe",
    subtitle: "Swiping a vertical series of images."
  },
  {
    href: "/controls",
    title: "Slider controls",
    subtitle: "Using controls to manage sliding and get feedback."
  },
  {
    href: "/carousel",
    title: "Centered image",
    subtitle: "Showing hints of previous and next images."
  },
  {
    href: "/ltr",
    title: "Left-to-right",
    subtitle: "Controls with left-to-right language support."
  },
  {
    href: "/group",
    title: "Dynamic groups",
    subtitle: "Creating dynamically sized pages."
  },
  /* Pages is not ready for prime time */
  // {
  //   href: "/pages",
  //   title: "Page content",
  //   subtitle: "More diverse content."
  // },
  {
    href: "/multiple",
    title: "Multiple",
    subtitle: "Multiple sliders on one page."
  }
];

const menu = m("ul.menu",
  [
    m("li.header", "Examples"),
    menuData.map(menuItem =>
      m("li",
        m("a",
          {
            href: menuItem.href,
            config: m.route
          },
          [
            m("span.title", menuItem.title),
            m("span.subtitle", menuItem.subtitle)
          ]
        )
      )
    )
  ]
);

const app = {
  view: () =>
    m(".index",
      [
        m("h1", "Content Slider for Mithril"),
        menu,
        footer({ home: true })
      ]
    )
};

const mountNode = document.querySelector("#app");
m.route.mode = "hash";
m.route(mountNode, "/", {
  "/": app,
  "/images": images,
  "/vertical": vertical,
  "/controls": controls,
  "/carousel": carousel,
  "/ltr": ltr,
  "/group": group,
  // "/pages": pages,
  "/multiple": multiple
});