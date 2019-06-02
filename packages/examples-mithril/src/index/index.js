import m from "mithril";
import { addStyle } from "../app/styler";
import { css } from "cyano-mithril-slider";
import appStyle from "../app/style";
import footer from "../app/footer";
import indexStyle from "./style";

addStyle("slider", css);
addStyle("slider-examples-app", appStyle);
addStyle("slider-examples-index", indexStyle);

import images from "../images";
import vertical from "../vertical";
import controls from "../controls";
import carousel from "../carousel";
import ltr from "../ltr";
import group from "../group";

const menuData = [
  {
    href: "/images",
    title: "Simple",
    subtitle: "Swiping a series of images."
  },
  {
    href: "/vertical",
    title: "Vertical",
    subtitle: "Swiping a vertical series of images."
  },
  {
    href: "/controls",
    title: "Controls",
    subtitle: "Using controls to manage sliding and get feedback."
  },
  {
    href: "/carousel",
    title: "Centered",
    subtitle: "Showing hints of previous and next images."
  },
  {
    href: "/ltr",
    title: "Left-to-right",
    subtitle: "Controls with left-to-right language support."
  },
  {
    href: "/group",
    title: "Groups",
    subtitle: "Creating dynamically sized pages."
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
            oncreate: m.route.link
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
m.route.prefix("#");
m.route(mountNode, "/", {
  "/": app,
  "/images": images,
  "/vertical": vertical,
  "/controls": controls,
  "/carousel": carousel,
  "/ltr": ltr,
  "/group": group
});
