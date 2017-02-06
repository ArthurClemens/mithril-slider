import m from "mithril";
import Hammer from "hammerjs";
import { classes } from "./classes";
import "./css";

const view = (ctrl, opts) => {
  if (opts.sliderController) {
    opts.sliderController(ctrl);
  }
  const currentIndex = ctrl.index();
  // sizes need to be set each redraw because of screen resizes
  ctrl.groupBy(opts.groupBy || 1);
  const contentEl = ctrl.contentEl();
  if (contentEl) {
    ctrl.updateContentSize(contentEl);
  }
  return m("div",
    {
      class: [
        classes.slider,
        opts.class || ""
      ].join(" ")
    },
    [
      opts.before
        ? m("." + classes.before, opts.before)
        : null,
      m("div",
        {
          class: classes.content,
          config: (el, inited, context) => {
            if (context.inited) {
              return;
            }
            if (el.childNodes.length > 0) {
              ctrl.setContentEl(el);
              ctrl.updateContentSize(el);

              const mc = new Hammer.Manager(el, {});
              mc.add(new Hammer.Pan({
                direction: opts.orientation === "vertical"
                  ? Hammer.DIRECTION_VERTICAL
                  : opts.orientation === "all"
                  ? Hammer.DIRECTION_ALL
                  : Hammer.DIRECTION_HORIZONTAL,
                threshold: 0
              }));
              mc.on("panmove", ctrl.handleDrag);
              mc.on("panend", ctrl.handleDragEnd);
              mc.on("panstart", ctrl.handleDragStart);
              context.onunload = () => {
                mc.off("panmove", ctrl.handleDrag);
                mc.off("panend", ctrl.handleDragEnd);
                mc.off("panstart", ctrl.handleDragStart);
              };
              context.inited = true;
            }
          }
        },
        ctrl.list().map((data, listIndex) =>
          opts.page({
            data,
            listIndex,
            currentIndex
          })
        )
      ),
      opts.after
        ? m("." + classes.after, opts.after)
        : null
    ]
  );
};


const controller = (opts = {}) => {
  let list = m.prop([]);
  if (opts.pageData) {
    opts.pageData().then(result => initWithResult(result));
  }
  const defaultDuration = parseInt(opts.duration, 10) || 160;
  const index = m.prop(opts.index || -1);
  const contentEl = m.prop();
  let pageSize = 0;
  const groupBy = m.prop(opts.groupBy || 1);
  const cancelDragFactor = opts.cancelDragFactor || (1 / 5);
  const isVertical = opts.orientation === "vertical";
  const dir = opts.rtl ? -1 : 1;
  const pageOffsetX = opts.pageOffsetX || 0;
  const pageOffsetY = opts.pageOffsetY || 0;

  const initWithResult = result => {
    list(result);
    // First redraw so that pages are drawn
    // continuation in view's config
    m.redraw();
  };

  const setIndex = idx => {
    const oldIndex = index();
    if (oldIndex !== idx) {
      index(idx);
      m.redraw();
      if (opts.getState) {
        const el = contentEl();
        const page = getPageEl(el, index());
        opts.getState({
          index: idx,
          hasNext: hasNext(),
          hasPrevious: hasPrevious(),
          pageEl: page
        });
      }
    }
  };

  const getPageEl = (el, idx) => el.childNodes[idx];

  const createAttrs = value => {
    const x = isVertical ? "0" : value + "px";
    const y = isVertical ? value + "px" : "0";
    const z = "0";
    const attrs = [x, y, z].join(", ");
    return "translate3d(" + attrs + ")";
  };

  const setTransitionStyle = (el, value) => {
    const style = el.style;
    style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-ms-transform"] = createAttrs(value);
  };

  const setTransitionDurationStyle = duration => {
    contentEl().style["-webkit-transition-duration"] = contentEl().style["transition-duration"] = duration + "ms";
  };

  const goTo = (idx, duration) => {
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

  const normalizedStep = (orientation = 0) => {
    const idx = index();
    const size = groupBy();
    const min = 0;
    const max = list().length;
    const next = idx + (orientation * size);
    // make sure that last item aligns at the right
    if ((next + size) > max) {
      return max - size;
    }
    if (next < min) {
      return min;
    }
    return next;
  };

  const updateContentSize = el => {
    const prop = isVertical ? "height" : "width";
    const page = el.childNodes[0];
    if (page.getBoundingClientRect()[prop]) {
      pageSize = page.getBoundingClientRect()[prop];
      el.style[prop] = (list().length * pageSize) + "px";
    }
  };

  const goCurrent = (duration = 0) => {
    updateContentSize(contentEl());
    setTransitionDurationStyle(duration);
    goTo(normalizedStep());
  };

  const goNext = (duration = defaultDuration) => (
    setTransitionDurationStyle(duration),
    index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep())
  );

  const goPrevious = (duration = defaultDuration) => (
    setTransitionDurationStyle(duration),
    index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep())
  );

  const hasNext = () => index() + groupBy() < list().length;

  const hasPrevious = () => index() > 0;

  const setContentEl = el => {
    contentEl(el);
    updateContentSize(el);
    goCurrent();
  };

  const handleDragStart = () => (
    updateContentSize(contentEl()),
    setTransitionDurationStyle(0)
  );

  const handleDrag = e => {
    const el = contentEl();
    const page = getPageEl(el, index());
    const delta = isVertical
      ? e.deltaY + pageOffsetY
      : e.deltaX + pageOffsetX;
    const origin = isVertical
      ? page.offsetTop
      : dir === -1
        ? page.offsetLeft - page.parentNode.clientWidth + page.clientWidth
        : page.offsetLeft;
    setTransitionStyle(el, delta - origin);
    e.preventDefault();
  };

  const calculateTransitionDuration = velocity => {
    const el = contentEl();
    const page = getPageEl(el, index());
    const width = page.clientWidth;
    const speed = Math.abs(velocity) || 1;
    let duration = 1 / speed * width;
    if (duration > defaultDuration) {
      duration = defaultDuration;
    }
    return duration;
  };

  const handleDragEnd = e => {
    const duration = calculateTransitionDuration(e.velocity);
    const delta = isVertical ? e.deltaY : e.deltaX;
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
    list,
    contentEl,
    setContentEl,
    handleDrag,
    handleDragStart,
    handleDragEnd,
    groupBy,
    updateContentSize,
    // registerPage,

    // public interface
    index,
    hasNext,
    hasPrevious,
    goTo,
    goCurrent,
    goNext,
    goPrevious
  };
};

export const slider = {
  controller,
  view
};
