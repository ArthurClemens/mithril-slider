import m from "../node_modules/mithril/mithril";
import prop from "./prop";
import { Touch } from "./touch";
import { classes } from "./classes";

const DEFAULT_DURATION = 160;
const DEFAULT_CANCEL_DRAG_FACTOR = 1 / 5;
const DEFAULT_GROUP_SIZE = 1;
const DEFAULT_ORIENTATION = "vertical";
const DEFAULT_DIRECTION = 1;
const DEFAULT_OFFSET_X = 0;
const DEFAULT_OFFSET_Y = 0;

const view = ({state, attrs}) => {
  if (attrs.sliderController) {
    attrs.sliderController(state);
  }
  const currentIndex = state.index();
  // sizes need to be set each redraw because of screen resizes
  state.groupBy(attrs.groupBy || 1);
  const contentEl = state.contentEl;
  if (contentEl) {
    state.updateContentSize(contentEl);
  }
  return m("div",
    {
      class: [
        classes.slider,
        attrs.class || ""
      ].join(" ")
    },
    [
      attrs.before
        ? m("." + classes.before, attrs.before)
        : null,
      m("div",
        {
          class: classes.content,
          onupdate: ({dom}) => {
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
          onremove: () => state.touch && state.touch.destroy()
        },
        state.list().map((data, listIndex) =>
          attrs.page({
            data,
            listIndex,
            currentIndex
          })
        )
      ),
      attrs.after
        ? m("." + classes.after, attrs.after)
        : null
    ]
  );
};

const oninit = vnode => {
  const attrs = vnode.attrs;
  const list = prop([]);
  if (attrs.pageData) {
    attrs.pageData().then(result => initWithResult(result));
  }
  const duration = parseInt(attrs.duration, 10) || DEFAULT_DURATION;
  const index = prop(attrs.index || -1);
  let contentEl;
  let pageSize = 0;
  const groupBy = prop(attrs.groupBy || DEFAULT_GROUP_SIZE);
  const cancelDragFactor = attrs.cancelDragFactor || DEFAULT_CANCEL_DRAG_FACTOR;
  const isVertical = attrs.orientation === DEFAULT_ORIENTATION;
  const dir = attrs.rtl ? -1 : DEFAULT_DIRECTION;
  const pageOffsetX = attrs.pageOffsetX || DEFAULT_OFFSET_X;
  const pageOffsetY = attrs.pageOffsetY || DEFAULT_OFFSET_Y;

  const initWithResult = result => {
    list(result);
    // First redraw so that pages are drawn
    // continuation in view's oncreate
    m.redraw();
  };

  const setIndex = idx => {
    const oldIndex = index();
    if (oldIndex !== idx) {
      index(idx);
      m.redraw();
      if (attrs.getState) {
        const el = contentEl;
        const page = getPageEl(el, index());
        attrs.getState({
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
    contentEl.style["-webkit-transition-duration"] = contentEl.style["transition-duration"] = duration + "ms";
  };

  const goTo = (idx, duration) => {
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
    updateContentSize(contentEl);
    setTransitionDurationStyle(duration);
    goTo(normalizedStep());
  };

  const goNext = (dur = duration) => (
    setTransitionDurationStyle(dur),
    index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep())
  );

  const goPrevious = (dur = duration) => (
    setTransitionDurationStyle(dur),
    index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep())
  );

  const hasNext = () => index() + groupBy() < list().length;

  const hasPrevious = () => index() > 0;

  const setContentEl = el => {
    contentEl = el;
    updateContentSize(el);
    goCurrent();
  };

  const handleDragStart = () => (
    updateContentSize(contentEl),
    setTransitionDurationStyle(0)
  );

  const handleDrag = e => {
    const el = contentEl;
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
    const el = contentEl;
    const page = getPageEl(el, index());
    const width = page.clientWidth;
    const speed = Math.abs(velocity) || 1;
    let dur = 1 / speed * width;
    if (dur > duration) {
      dur = duration;
    }
    return dur;
  };

  const handleDragEnd = e => {
    const dur = calculateTransitionDuration(e.velocity);
    const delta = isVertical ? e.deltaY : e.deltaX;
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

  Object.assign(vnode.state, {
    // component methods
    list,
    contentEl,
    setContentEl,
    handleDrag,
    handleDragStart,
    handleDragEnd,
    groupBy,
    updateContentSize,

    // public interface
    index,
    hasNext,
    hasPrevious,
    goTo,
    goCurrent,
    goNext,
    goPrevious
  });
};

export const slider = {
  oninit,
  view
};
