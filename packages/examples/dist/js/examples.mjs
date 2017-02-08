import FastClick from 'fastclick';
import m from 'mithril';
import { css, slider } from 'mithril-slider';
import { prefixPlugin } from 'j2c-plugin-prefix-browser';
import J2c from 'j2c';

var layer = document.body;
var fastClick = void 0;

var add = function add() {
  fastClick = new FastClick(layer);
};

var init = function init() {
  add();
};

init();

var j2c = new J2c(prefixPlugin);

/*
 * @param id: identifier, used as HTMLElement id for the attached <style></style> element
 * @param styles: list of lists style Objects
 */
var addStyle = function addStyle(id) {
  for (var _len = arguments.length, styles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styles[_key - 1] = arguments[_key];
  }

  removeStyle(id);
  var styleEl = document.createElement("style");
  if (id) {
    styleEl.setAttribute("id", id);
  }
  styles.forEach(function (styleList) {
    // each style returns a list
    if (Object.keys(styleList).length) {
      styleList.forEach(function (style) {
        var scoped = { "@global": style };
        var sheet = j2c.sheet(scoped);
        styleEl.appendChild(document.createTextNode(sheet));
      });
    }
  });
  document.head.appendChild(styleEl);
};

var removeStyle = function removeStyle(id) {
  if (id) {
    var old = document.getElementById(id);
    if (old) {
      old.parentNode.removeChild(old);
    }
  }
};

var styleVariables = {
  size: 320,
  mobile_small: 320,
  mobile_medium: 375,
  mobile_large: 480,
  size_px: "320px",
  text_color: "#263238"
};

var pagePositions = function pagePositions(dir) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var sizes = {};
  var i = 0;
  while (i <= 10) {
    var posPx = offset + (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      top: 0,
      left: dir === "rtl" ? "auto" : posPx,
      right: dir === "ltr" ? "auto" : posPx
    };
    i++;
  }
  return sizes;
};

var appStyle = [{
  "*": {
    boxSizing: "border-box"
  },
  " html, body": {
    minHeight: "100%",
    height: "100%"
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
  " .example": [pagePositions("ltr"), {
    "&.slider": {
      width: styleVariables.size + "px",
      height: styleVariables.size + "px",
      margin: "0 auto"
    },
    " .content": {
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
  }],
  " .slider-placeholder": {
    height: styleVariables.size + "px"
  },
  " .slider + .slider-placeholder": {
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

var textColorLight = "#90A4AE";
var indexBlockBackgroundColor = "#CFD8DC";
var indexBlockTextColor = "rgba(0,0,0,.85)";
var indexBlockTextColorLight = "rgba(0,0,0,.4)";
var menuWidthPx = styleVariables.size_px;

var indexStyle = [{
  ".index": {
    " h1": {
      display: "block",
      margin: "40px auto 0 auto",
      width: styleVariables.size + "px",
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "normal",
      color: styleVariables.text_color
    },
    " .menu": {
      width: menuWidthPx,
      margin: "20px auto",
      padding: "0 0 20px 0",
      listStyle: "none",

      " li": {
        margin: "0 0 1px 0",
        padding: 0,

        "&.header": {
          fontSize: "18px",
          color: textColorLight
        },
        "&.header, a": {
          padding: "20px"
        },
        " a": {
          display: "block",
          textDecoration: "none",
          backgroundColor: indexBlockBackgroundColor,

          " .title": {
            display: "block",
            color: indexBlockTextColor,
            fontSize: "18px",
            lineHeight: 1.4 * 18 + "px"
          },
          " .subtitle": {
            display: "block",
            color: indexBlockTextColorLight,
            fontSize: "14px"
          }
        }
      }
    }
  }
}];

var SIDE_PADDING = 16;
var VERSION = "0.4.0";

var styles = [{
  ".footer": {
    width: styleVariables.size - 2 * SIDE_PADDING + "px",
    margin: "32px auto 0 auto",
    textAlign: "left",
    padding: "24px " + SIDE_PADDING + "px",
    fontSize: "14px",
    lineHeight: 1.3,
    color: "#90A4AE",
    opacity: ".85",

    " hr": {
      height: "1px",
      border: "none",
      margin: "1em -" + SIDE_PADDING + "px",
      backgroundColor: "#CFD8DC",
      opacity: ".85"
    }
  }
}];

addStyle("slider-examples-footer", styles);

var content = function content() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return m(".footer", {
    dir: "ltr"
  }, [!opts.home ? m("a", {
    href: "/",
    config: m.route
  }, "All examples") : null, m("hr"), m.trust("mithril-slider, content slider for Mithril on mobile and desktop. This site runs on version " + VERSION + ". Project page on <a href=\"https: //github.com/ArthurClemens/mithril-slider\">Github</a>.")]);
};

var DATA_URL = "data/server.json";

var getPageData = function getPageData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_URL;
  return m.request({
    method: "GET",
    url: url
  });
};

var fadeInImage = function fadeInImage(el, url, callback) {
  var showImage = function showImage() {
    el.style.backgroundImage = "url(" + url + ")";
    el.style.opacity = 1;
    el.dataset.seen = true;
    if (callback) {
      setTimeout(function () {
        callback();
      }, 500);
    }
  };
  if (!el.dataset.seen) {
    el.style.opacity = 0;
    var img = new Image();
    img.onload = function () {
      showImage();
    };
    img.src = url;
  } else {
    showImage();
  }
};

var style = [{
  ".preloader": {
    // layout
    display: "flex",
    visibility: "hidden",

    // center
    "align-items": "center",

    " svg": {
      width: "40px",
      height: "40px",

      // flex
      flex: 1,
      "flex-basis": "0.000000001px",

      // self-center-center
      "align-self": "center",

      " path": {
        fill: "rgba(0, 0, 0, .5)"
      }
    }
  }
}];

addStyle("preloader", style);

var preloader = m(".preloader", {
  config: function config(el, inited) {
    if (inited) {
      return;
    }
    setTimeout(function () {
      el.style.visibility = "visible";
    }, 1000);
  }
}, m.trust("<svg version=\"1.1\" id=\"loader-1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"40px\" height=\"40px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n    <path fill=\"#000\" d=\"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z\">\n    <animateTransform attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"0 25 25\" to=\"360 25 25\" dur=\"1.0s\" repeatCount=\"indefinite\"></animateTransform>\n    </path>\n    </svg>"));

var loaded = {};

var page = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content$$1 = inRange ? m(".image-container", [m(".image", {
    config: function config(el, inited) {
      if (inited) {
        return;
      }
      fadeInImage(el, data, function () {
        loaded[listIndex] = true;
      });
    }
  }), loaded[listIndex] ? null : preloader]) : null;
  return m(".page", {
    key: listIndex
  }, content$$1);
};

var images = {
  view: function view(ctrl, opts) {
    return m("div", [m(slider, {
      pageData: getPageData,
      page: page,
      class: "example images"
    }), m(".slider-placeholder"), opts.hideFooter ? null : content()]);
  }
};

var pagePositions$1 = function pagePositions() {
  var sizes = {};
  var i = 0;
  while (i <= 10) {
    var posPx = (i - 1) * styleVariables.size + "px";
    sizes[" .page:nth-child(" + i + ")"] = {
      left: "auto",
      top: posPx
    };
    i++;
  }
  return sizes;
};

var style$1 = [{
  ".example.vertical": [pagePositions$1(), {
    "&.slider, .page": {
      height: styleVariables.size + "px"
    }
  }]
}];

addStyle("slider-examples-vertical", style$1);

var page$1 = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content$$1 = inRange ? m(".image-container", [m(".image", {
    config: function config(el, inited) {
      if (inited) {
        return;
      }
      fadeInImage(el, data);
    }
  }), preloader]) : null;
  return m(".page", { key: listIndex }, content$$1);
};

var vertical = {
  view: function view(ctrl) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return m("div", [m(slider, {
      pageData: getPageData,
      page: page$1,
      class: "example vertical",
      orientation: "vertical"
    }), m(".slider-placeholder"), opts.hideFooter ? null : content()]);
  }
};

var buttonSize = 40;
var inputGotoWidth = buttonSize;
var inputGotoHeight = buttonSize;

var style$2 = [{
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

addStyle("slider-examples-controls", style$2);

var page$2 = function page(opts) {
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2;
  var content$$1 = inRange ? m(".image-container", [m(".image", {
    config: function config(el, inited) {
      if (inited) {
        return;
      }
      fadeInImage(el, data);
    }
  }), preloader]) : null;
  return m(".page", {
    key: listIndex,
    class: currentIndex === listIndex ? "current-page" : null
  }, content$$1);
};

var controls = {
  controller: function controller() {
    return {
      sliderController: m.prop(),
      isEditing: m.prop(false) // allow value change when typing
    };
  },
  view: function view(ctrl) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var rtl = opts.rtl;
    var sliderController = ctrl.sliderController();
    var mySlider = m(slider, {
      pageData: function pageData() {
        return Promise.resolve(["http://arthurclemens.github.io/assets/mithril-slider/img/01.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/02.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/03.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/04.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/05.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/06.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/07.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/08.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/09.jpg", "http://arthurclemens.github.io/assets/mithril-slider/img/10.jpg"]);
      },
      page: page$2,
      pageOffsetX: opts.pageOffsetX,
      sliderController: ctrl.sliderController,
      class: ["example controls", opts.class].join(" "),
      rtl: rtl
    });
    var sliderControls = sliderController ? m(".slider-controls.slider-controls-controls", [m("input.goto", {
      value: ctrl.isEditing() ? "" : sliderController.index() + 1,
      oninput: function oninput(e) {
        ctrl.isEditing(true);
        var idx = parseInt(e.target.value, 10) - 1;
        if (!isNaN(idx)) {
          sliderController.goTo(idx, 0);
          ctrl.isEditing(false);
        }
      }
    }), m("a.prev", {
      class: sliderController.hasPrevious() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goPrevious();
      }
    }, "Previous"), m("a.next", {
      class: sliderController.hasNext() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goNext();
      }
    }, "Next")]) : null;
    var props = rtl ? { dir: "rtl" } : {};
    return m("div", props, [mySlider, m(".slider-placeholder"), sliderControls, opts.hideFooter ? null : content()]);
  }
};

var regularWidth = 320;
var pageWidth = 420;

var offset = (pageWidth - regularWidth) / 2;

var style$3 = [{
  " .example.slider.carousel": [pagePositions("ltr", offset), {
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
  }]
}];

addStyle("slider-examples-carousel", style$3);

var carousel = {
  view: function view() {
    return [m(controls, {
      hideFooter: true,
      class: "carousel",
      pageOffsetX: offset
    }), content()];
  }
};

var ltr = {
  view: function view() {
    return m(controls, { rtl: true });
  }
};

var buttonSize$1 = 40;

var pageSizes = function pageSizes() {
  var sizes = {};
  var i = 1;
  while (i <= 5) {
    var size = styleVariables.size / i;
    sizes[".group-" + i] = {
      " .content": {
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

var countStyle = function countStyle() {
  var buttonCount = 5;
  var minButtonSize = 30;
  var margin = 10;
  var width = 5 * minButtonSize + buttonCount * margin;
  var height = buttonSize$1;

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
      margin: (buttonSize$1 - minButtonSize) / 2 + "px " + margin / 2 + "px",
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

var prevNextButtonStyle = function prevNextButtonStyle() {
  return {
    " a.prev, a.next": {
      userSelect: "none",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease-out",
      transitionDuration: "200ms",
      backgroundSize: "30px",
      display: "block",
      width: buttonSize$1 + "px",
      height: buttonSize$1 + "px",
      borderRadius: buttonSize$1 / 2 + "px",
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

var pageNumberStyle = function pageNumberStyle() {
  var size = 30;
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
    zIndex: 1
  };
};

var style$4 = [{
  ".example.group": [pageSizes(), {
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
  }],
  ".slider-controls.slider-controls-group": [prevNextButtonStyle(), {
    width: styleVariables.size + "px",
    height: buttonSize$1 + 2 * 10 + "px",
    padding: "10px 0",
    position: "relative",
    margin: "0 auto",

    " .count": countStyle()
  }]
}];

addStyle("group", style$4);

var callRight = function callRight(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, remainingArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      remainingArgs[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, remainingArgs.concat(args));
  };
};

var page$3 = function page(opts, ctrl) {
  var groupBy = ctrl.groupBy();
  var currentIndex = opts.currentIndex;
  var listIndex = opts.listIndex;
  var data = opts.data;
  // lazy loading
  var inRange = Math.abs(currentIndex - listIndex) < 2 * groupBy;
  var content$$1 = inRange ? [m(".image-container", [m(".image", {
    config: function config(el, inited) {
      if (inited) {
        return;
      }
      fadeInImage(el, data);
    }
  }), m("span", listIndex + 1), preloader])] : null;
  return m(".page", {
    key: listIndex
  }, content$$1);
};

var group = {
  controller: function controller() {
    return {
      sliderController: m.prop(),
      isEditing: m.prop(false),
      groupBy: m.prop(3)
    };
  },
  view: function view(ctrl, opts) {
    var sliderController = ctrl.sliderController();
    var groupBy = ctrl.groupBy();
    var mySlider = m(slider, {
      pageData: getPageData,
      page: callRight(page$3, ctrl),
      groupBy: groupBy,
      sliderController: ctrl.sliderController,
      class: ["example", "group", "group-" + groupBy].join(" ")
    });
    var sliderControls = m(".slider-controls.slider-controls-group", sliderController ? [m("a.prev", {
      class: sliderController.hasPrevious() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goPrevious();
      }
    }, "Previous"), m(".count", [[1, 2, 3, 4, 5].map(function (size) {
      return m("a", {
        onclick: function onclick() {
          ctrl.groupBy(size);
          setTimeout(function () {
            sliderController.goCurrent();
          }, 0);
        },
        class: size === groupBy ? "selected" : ""
      }, size);
    })]), m("a.next", {
      class: sliderController.hasNext() ? "enabled" : "",
      onclick: function onclick() {
        return sliderController.goNext();
      }
    }, "Next")] : null);
    return m("div", [sliderControls, mySlider, m(".slider-placeholder"), opts.hideFooter ? null : content()]);
  }
};

var multiple = {
  view: function view() {
    return [m(images, { hideFooter: true }), m(controls, { hideFooter: true }), content()];
  }
};

addStyle("slider", css);
addStyle("slider-examples-app", appStyle);
addStyle("slider-examples-index", indexStyle);

// import pages from "../pages";
var menuData = [{
  href: "/images",
  title: "Simple image swipe",
  subtitle: "Swiping a series of images."
}, {
  href: "/vertical",
  title: "Vertical image swipe",
  subtitle: "Swiping a vertical series of images."
}, {
  href: "/controls",
  title: "Slider controls",
  subtitle: "Using controls to manage sliding and get feedback."
}, {
  href: "/carousel",
  title: "Centered image",
  subtitle: "Showing hints of previous and next images."
}, {
  href: "/ltr",
  title: "Left-to-right",
  subtitle: "Controls with left-to-right language support."
}, {
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
}];

var menu = m("ul.menu", [m("li.header", "Examples"), menuData.map(function (menuItem) {
  return m("li", m("a", {
    href: menuItem.href,
    config: m.route
  }, [m("span.title", menuItem.title), m("span.subtitle", menuItem.subtitle)]));
})]);

var app = {
  view: function view() {
    return m(".index", [m("h1", "Content Slider for Mithril"), menu, content({ home: true })]);
  }
};

var mountNode = document.querySelector("#app");
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
