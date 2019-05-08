// import "../app/no-tap-delay";
import ReactDOM from "react-dom";
import { css } from "cyano-react-slider";
import { addStyle } from "../app/styler";
import appStyle from "../app/style";
import indexStyle from "./style";
// import footer from "../app/footer";
addStyle("slider", css);
addStyle("slider-examples-app", appStyle);
addStyle("slider-examples-index", indexStyle);

import h from "react-hyperscript";

// import Images from "../images";
// import vertical from "../vertical";
import Controls from "../controls";
// import carousel from "../carousel";
// import ltr from "../ltr";
// import group from "../group";

const menuData = [
  {
    href: "/images",
    title: "Simple",
    subtitle: "Swiping a series of images."
  },
  // {
  //   href: "/vertical",
  //   title: "Vertical",
  //   subtitle: "Swiping a vertical series of images."
  // },
  // {
  //   href: "/controls",
  //   title: "Controls",
  //   subtitle: "Using controls to manage sliding and get feedback."
  // },
  // {
  //   href: "/carousel",
  //   title: "Centered",
  //   subtitle: "Showing hints of previous and next images."
  // },
  // {
  //   href: "/ltr",
  //   title: "Left-to-right",
  //   subtitle: "Controls with left-to-right language support."
  // },
  // {
  //   href: "/group",
  //   title: "Groups",
  //   subtitle: "Creating dynamically sized pages."
  // }
];

const Menu = () => 
  h("ul",
    {
      className: "menu"
    },
    [
      h("li", { className: "header" }, "Examples"),
      menuData.map(menuItem =>
        h("li", null,
          h("a",
            {
              href: menuItem.href,
            },
            [
              h("span", { className: "title" }, menuItem.title),
              h("span", { className: "subtitle" }, menuItem.subtitle)
            ]
          )
        )
      )
    ]
  );

const App = () => (
  h(Controls)
);

const mountNode = document.querySelector("#app");
ReactDOM.render(
  h(App),
  mountNode
);
