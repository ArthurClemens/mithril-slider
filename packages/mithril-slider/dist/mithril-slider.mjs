import m from 'mithril';
import Hammer from 'hammerjs';
import { prefixPlugin } from 'j2c-plugin-prefix-browser';
import J2c from 'j2c';

var classes = {
  slider: "slider",
  content: "content",
  before: "before",
  after: "after"
};

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

var styles = [{
  ".slider": {
    overflow: "hidden",

    " .content": {
      transitionProperty: "transform",
      transitionTimingFunction: "ease-out",
      // transition-duration set in js
      transform: "translate3d(0, 0, 0)"
    }
  }
}];

addStyle("mithril-slider", styles);

var view = function view(ctrl, opts) {
  if (opts.sliderController) {
    opts.sliderController(ctrl);
  }
  var currentIndex = ctrl.index();
  // sizes need to be set each redraw because of screen resizes
  ctrl.groupBy(opts.groupBy || 1);
  var contentEl = ctrl.contentEl();
  if (contentEl) {
    ctrl.updateContentSize(contentEl);
  }
  return m("div", {
    class: [classes.slider, opts.class || ""].join(" ")
  }, [opts.before ? m("." + classes.before, opts.before) : null, m("div", {
    class: classes.content,
    config: function config(el, inited, context) {
      if (context.inited) {
        return;
      }
      if (el.childNodes.length > 0) {
        (function () {
          ctrl.setContentEl(el);
          ctrl.updateContentSize(el);

          var mc = new Hammer.Manager(el, {});
          mc.add(new Hammer.Pan({
            direction: opts.orientation === "vertical" ? Hammer.DIRECTION_VERTICAL : opts.orientation === "all" ? Hammer.DIRECTION_ALL : Hammer.DIRECTION_HORIZONTAL,
            threshold: 0
          }));
          mc.on("panmove", ctrl.handleDrag);
          mc.on("panend", ctrl.handleDragEnd);
          mc.on("panstart", ctrl.handleDragStart);
          context.onunload = function () {
            mc.off("panmove", ctrl.handleDrag);
            mc.off("panend", ctrl.handleDragEnd);
            mc.off("panstart", ctrl.handleDragStart);
          };
          context.inited = true;
        })();
      }
    }
  }, ctrl.list().map(function (data, listIndex) {
    return opts.page({
      data: data,
      listIndex: listIndex,
      currentIndex: currentIndex
    });
  })), opts.after ? m("." + classes.after, opts.after) : null]);
};

var controller = function controller() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var list = m.prop([]);
  if (opts.pageData) {
    opts.pageData().then(function (result) {
      return initWithResult(result);
    });
  }
  var defaultDuration = parseInt(opts.duration, 10) || 160;
  var index = m.prop(opts.index || -1);
  var contentEl = m.prop();
  var pageSize = 0;
  var groupBy = m.prop(opts.groupBy || 1);
  var cancelDragFactor = opts.cancelDragFactor || 1 / 5;
  var isVertical = opts.orientation === "vertical";
  var dir = opts.rtl ? -1 : 1;
  var pageOffsetX = opts.pageOffsetX || 0;
  var pageOffsetY = opts.pageOffsetY || 0;

  var initWithResult = function initWithResult(result) {
    list(result);
    // First redraw so that pages are drawn
    // continuation in view's config
    m.redraw();
  };

  var setIndex = function setIndex(idx) {
    var oldIndex = index();
    if (oldIndex !== idx) {
      index(idx);
      m.redraw();
      if (opts.getState) {
        var el = contentEl();
        var page = getPageEl(el, index());
        opts.getState({
          index: idx,
          hasNext: hasNext(),
          hasPrevious: hasPrevious(),
          pageEl: page
        });
      }
    }
  };

  var getPageEl = function getPageEl(el, idx) {
    return el.childNodes[idx];
  };

  var createAttrs = function createAttrs(value) {
    var x = isVertical ? "0" : value + "px";
    var y = isVertical ? value + "px" : "0";
    var z = "0";
    var attrs = [x, y, z].join(", ");
    return "translate3d(" + attrs + ")";
  };

  var setTransitionStyle = function setTransitionStyle(el, value) {
    var style = el.style;
    style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-ms-transform"] = createAttrs(value);
  };

  var setTransitionDurationStyle = function setTransitionDurationStyle(duration) {
    contentEl().style["-webkit-transition-duration"] = contentEl().style["transition-duration"] = duration + "ms";
  };

  var goTo = function goTo(idx, duration) {
    if (idx < 0 || idx > list().length - 1) {
      return;
    }
    updateContentSize(contentEl());
    if (duration !== undefined) {
      setTransitionDurationStyle(duration);
    }
    setTransitionStyle(contentEl(), -dir * idx * pageSize);
    setIndex(idx);
  };

  var normalizedStep = function normalizedStep() {
    var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var idx = index();
    var size = groupBy();
    var min = 0;
    var max = list().length;
    var next = idx + orientation * size;
    // make sure that last item aligns at the right
    if (next + size > max) {
      return max - size;
    }
    if (next < min) {
      return min;
    }
    return next;
  };

  var updateContentSize = function updateContentSize(el) {
    var prop = isVertical ? "height" : "width";
    var page = el.childNodes[0];
    if (page.getBoundingClientRect()[prop]) {
      pageSize = page.getBoundingClientRect()[prop];
      el.style[prop] = list().length * pageSize + "px";
    }
  };

  var goCurrent = function goCurrent() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    updateContentSize(contentEl());
    setTransitionDurationStyle(duration);
    goTo(normalizedStep());
  };

  var goNext = function goNext() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDuration;
    return setTransitionDurationStyle(duration), index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep());
  };

  var goPrevious = function goPrevious() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDuration;
    return setTransitionDurationStyle(duration), index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep());
  };

  var hasNext = function hasNext() {
    return index() + groupBy() < list().length;
  };

  var hasPrevious = function hasPrevious() {
    return index() > 0;
  };

  var setContentEl = function setContentEl(el) {
    contentEl(el);
    updateContentSize(el);
    goCurrent();
  };

  var handleDragStart = function handleDragStart() {
    return updateContentSize(contentEl()), setTransitionDurationStyle(0);
  };

  var handleDrag = function handleDrag(e) {
    var el = contentEl();
    var page = getPageEl(el, index());
    var delta = isVertical ? e.deltaY + pageOffsetY : e.deltaX + pageOffsetX;
    var origin = isVertical ? page.offsetTop : dir === -1 ? page.offsetLeft - page.parentNode.clientWidth + page.clientWidth : page.offsetLeft;
    setTransitionStyle(el, delta - origin);
    e.preventDefault();
  };

  var calculateTransitionDuration = function calculateTransitionDuration(velocity) {
    var el = contentEl();
    var page = getPageEl(el, index());
    var width = page.clientWidth;
    var speed = Math.abs(velocity) || 1;
    var duration = 1 / speed * width;
    if (duration > defaultDuration) {
      duration = defaultDuration;
    }
    return duration;
  };

  var handleDragEnd = function handleDragEnd(e) {
    var duration = calculateTransitionDuration(e.velocity);
    var delta = isVertical ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > pageSize * groupBy() * cancelDragFactor) {
      if (dir * delta < 0) {
        goNext(duration);
      } else {
        goPrevious(duration);
      }
    } else {
      goCurrent(duration);
    }
  };

  return {
    // component methods
    list: list,
    contentEl: contentEl,
    setContentEl: setContentEl,
    handleDrag: handleDrag,
    handleDragStart: handleDragStart,
    handleDragEnd: handleDragEnd,
    groupBy: groupBy,
    updateContentSize: updateContentSize,
    // registerPage,

    // public interface
    index: index,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    goTo: goTo,
    goCurrent: goCurrent,
    goNext: goNext,
    goPrevious: goPrevious
  };
};

var slider$1 = {
  controller: controller,
  view: view
};

export default slider$1;
