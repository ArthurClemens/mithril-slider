import m from 'mithril';
import 'hammerjs';

var prop = (function (x) {
  var p = x;
  return function (args) {
    if (args === undefined) {
      return p;
    } else {
      p = args;
    }
  };
});

/* global Hammer */
var Touch = function Touch(_ref) {
  var el = _ref.el,
      orientation = _ref.orientation,
      onStart = _ref.onStart,
      onMove = _ref.onMove,
      onEnd = _ref.onEnd;

  var hammer = new Hammer.Manager(el, {});
  hammer.add(new Hammer.Pan({
    direction: orientation === "vertical" ? Hammer.DIRECTION_VERTICAL : orientation === "all" ? Hammer.DIRECTION_ALL : Hammer.DIRECTION_HORIZONTAL,
    threshold: 0
  }));
  hammer.on("panstart", onStart);
  hammer.on("panmove", onMove);
  hammer.on("panend", onEnd);

  return {
    destroy: function destroy() {
      hammer.off("panstart", onStart);
      hammer.off("panmove", onMove);
      hammer.off("panend", onEnd);
    }
  };
};

var classes = {
  slider: "mithril-slider",
  content: "mithril-slider__content",
  before: "mithril-slider__before",
  after: "mithril-slider__after"
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var DEFAULT_DURATION = 160;
var DEFAULT_CANCEL_DRAG_FACTOR = 1 / 5;
var DEFAULT_GROUP_SIZE = 1;
var DEFAULT_ORIENTATION = "vertical";
var DEFAULT_DIRECTION = 1;
var DEFAULT_OFFSET_X = 0;
var DEFAULT_OFFSET_Y = 0;

var view = function view(_ref) {
  var state = _ref.state,
      attrs = _ref.attrs;

  if (attrs.sliderController) {
    attrs.sliderController(state);
  }
  var currentIndex = state.index();
  // sizes need to be set each redraw because of screen resizes
  state.groupBy(attrs.groupBy || 1);
  var contentEl = state.contentEl;
  if (contentEl) {
    state.updateContentSize(contentEl);
  }
  return m("div", {
    class: [classes.slider, attrs.class || ""].join(" ")
  }, [attrs.before ? m("." + classes.before, attrs.before) : null, m("div", {
    class: classes.content,
    onupdate: function onupdate(_ref2) {
      var dom = _ref2.dom;

      if (state.inited) {
        return;
      }
      if (dom.childNodes.length > 0) {
        state.setContentEl(dom);
        state.updateContentSize(dom);
        state.touch = new Touch({
          el: dom,
          orientation: attrs.orientation,
          onStart: state.handleDragStart,
          onMove: state.handleDrag,
          onEnd: state.handleDragEnd
        });
        state.inited = true;
      }
    },
    onremove: function onremove() {
      return state.touch && state.touch.destroy();
    }
  }, state.list().map(function (data, listIndex) {
    return attrs.page({
      data: data,
      listIndex: listIndex,
      currentIndex: currentIndex
    });
  })), attrs.after ? m("." + classes.after, attrs.after) : null]);
};

var oninit = function oninit(vnode) {
  var attrs = vnode.attrs;
  var list = prop([]);
  if (attrs.pageData) {
    attrs.pageData().then(function (result) {
      return initWithResult(result);
    });
  }
  var duration = parseInt(attrs.duration, 10) || DEFAULT_DURATION;
  var index = prop(attrs.index || -1);
  var contentEl = void 0;
  var pageSize = 0;
  var groupBy = prop(attrs.groupBy || DEFAULT_GROUP_SIZE);
  var cancelDragFactor = attrs.cancelDragFactor || DEFAULT_CANCEL_DRAG_FACTOR;
  var isVertical = attrs.orientation === DEFAULT_ORIENTATION;
  var dir = attrs.rtl ? -1 : DEFAULT_DIRECTION;
  var pageOffsetX = attrs.pageOffsetX || DEFAULT_OFFSET_X;
  var pageOffsetY = attrs.pageOffsetY || DEFAULT_OFFSET_Y;

  var initWithResult = function initWithResult(result) {
    list(result);
    // First redraw so that pages are drawn
    // continuation in view's oncreate
    m.redraw();
  };

  var setIndex = function setIndex(idx) {
    var oldIndex = index();
    if (oldIndex !== idx) {
      index(idx);
      m.redraw();
      if (attrs.getState) {
        var el = contentEl;
        var page = getPageEl(el, index());
        attrs.getState({
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
    contentEl.style["-webkit-transition-duration"] = contentEl.style["transition-duration"] = duration + "ms";
  };

  var goTo = function goTo(idx, duration) {
    if (idx < 0 || idx > list().length - 1) {
      return;
    }
    updateContentSize(contentEl);
    if (duration !== undefined) {
      setTransitionDurationStyle(duration);
    }
    setTransitionStyle(contentEl, -dir * idx * pageSize);
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
    var prop$$1 = isVertical ? "height" : "width";
    var page = el.childNodes[0];
    if (page.getBoundingClientRect()[prop$$1]) {
      pageSize = page.getBoundingClientRect()[prop$$1];
      el.style[prop$$1] = list().length * pageSize + "px";
    }
  };

  var goCurrent = function goCurrent() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    updateContentSize(contentEl);
    setTransitionDurationStyle(duration);
    goTo(normalizedStep());
  };

  var goNext = function goNext() {
    var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : duration;
    return setTransitionDurationStyle(dur), index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep());
  };

  var goPrevious = function goPrevious() {
    var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : duration;
    return setTransitionDurationStyle(dur), index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep());
  };

  var hasNext = function hasNext() {
    return index() + groupBy() < list().length;
  };

  var hasPrevious = function hasPrevious() {
    return index() > 0;
  };

  var setContentEl = function setContentEl(el) {
    contentEl = el;
    updateContentSize(el);
    goCurrent();
  };

  var handleDragStart = function handleDragStart() {
    return updateContentSize(contentEl), setTransitionDurationStyle(0);
  };

  var handleDrag = function handleDrag(e) {
    var el = contentEl;
    var page = getPageEl(el, index());
    var delta = isVertical ? e.deltaY + pageOffsetY : e.deltaX + pageOffsetX;
    var origin = isVertical ? page.offsetTop : dir === -1 ? page.offsetLeft - page.parentNode.clientWidth + page.clientWidth : page.offsetLeft;
    setTransitionStyle(el, delta - origin);
    e.preventDefault();
  };

  var calculateTransitionDuration = function calculateTransitionDuration(velocity) {
    var el = contentEl;
    var page = getPageEl(el, index());
    var width = page.clientWidth;
    var speed = Math.abs(velocity) || 1;
    var dur = 1 / speed * width;
    if (dur > duration) {
      dur = duration;
    }
    return dur;
  };

  var handleDragEnd = function handleDragEnd(e) {
    var dur = calculateTransitionDuration(e.velocity);
    var delta = isVertical ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > pageSize * groupBy() * cancelDragFactor) {
      if (dir * delta < 0) {
        goNext(dur);
      } else {
        goPrevious(dur);
      }
    } else {
      goCurrent(dur);
    }
  };

  _extends(vnode.state, {
    // component methods
    list: list,
    contentEl: contentEl,
    setContentEl: setContentEl,
    handleDrag: handleDrag,
    handleDragStart: handleDragStart,
    handleDragEnd: handleDragEnd,
    groupBy: groupBy,
    updateContentSize: updateContentSize,

    // public interface
    index: index,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    goTo: goTo,
    goCurrent: goCurrent,
    goNext: goNext,
    goPrevious: goPrevious
  });
};

var slider = {
  oninit: oninit,
  view: view
};

var css = [{
  ".mithril-slider": {
    overflow: "hidden",

    " .mithril-slider__content": {
      transitionProperty: "transform",
      transitionTimingFunction: "ease-out",
      // transition-duration set in js
      transform: "translate3d(0, 0, 0)"
    }
  }
}];

export { slider, css };
