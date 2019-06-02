/* global Hammer */
import { classes } from "./classes";
import O from "patchinko/immutable.mjs";
import "hammerjs";

const DEFAULT_DURATION = 160;
const DEFAULT_CANCEL_DRAG_FACTOR = 1 / 5;
const DEFAULT_GROUP_SIZE = 1;
const DEFAULT_ORIENTATION = "vertical";
const DEFAULT_DIRECTION = 1;
const DEFAULT_OFFSET_X = 0;
const DEFAULT_OFFSET_Y = 0;

const Touch = ({ el, orientation }) => {
  const hammer = new Hammer.Manager(el, {});
  hammer.add(new Hammer.Pan({
    direction: orientation === "vertical"
      ? Hammer.DIRECTION_VERTICAL
      : orientation === "all"
        ? Hammer.DIRECTION_ALL
        : Hammer.DIRECTION_HORIZONTAL,
    threshold: 0
  }));
  return hammer;
};

const Actions = update => ({
  setIndex: newIndex =>
    update({
      index: newIndex
    }),
  setList: newList =>
    update({
      list: newList
    }),
  setGroupBy: value =>
    update({
      groupBy: value
    }),
  setPageSize: value =>
    update({
      pageSize: value
    }),
});
    
export const _Slider = ({ h, useReducer, useState, useEffect, useRef, getRef, ...props }) => {
  const [state, update] = useReducer(O, {
    index: props.index || -1,
    list: [],
    groupBy: props.groupBy || DEFAULT_GROUP_SIZE,
    pageSize: 0
  });
  const actionsRef = useRef(Actions(update));
  const actions = actionsRef.current;

  const [domElement, setDomElement] = useState();
  const [contentElement, setContentElement] = useState();
  const touchRef = useRef(); // Reference to HammerJS instance
  
  const index = state.index;
  const list = state.list;
  const groupBy = state.groupBy;
  const pageSize = state.pageSize;

  const contentChildLength = contentElement
    ? contentElement.childNodes.length
    : 0;
  const duration = parseInt(props.duration, 10) || DEFAULT_DURATION;
  const cancelDragFactor = props.cancelDragFactor || DEFAULT_CANCEL_DRAG_FACTOR;
  const isVertical = props.orientation === DEFAULT_ORIENTATION;
  const dir = props.rtl ? -1 : DEFAULT_DIRECTION;
  const pageOffsetX = props.pageOffsetX || DEFAULT_OFFSET_X;
  const pageOffsetY = props.pageOffsetY || DEFAULT_OFFSET_Y;

  const hasPrevious = () =>
    index > 0;

  const hasNext = () =>
    (index + groupBy) < list.length;

  const getPageElement = (el, index) => (
    el.childNodes[index]
  );

  const updateIndex = newIndex => {
    const oldIndex = index;
    if (oldIndex !== newIndex) {
      actions.setIndex(newIndex);
      
      if (props.getState) {
        const el = contentElement;
        const page = getPageElement(el, index);
        props.getState({
          index: newIndex,
          hasNext: hasNext(),
          hasPrevious: hasPrevious(),
          pageElement: page
        });
      }
    }
  };
  
  const createStyleProps = value => {
    const x = isVertical ? "0" : value + "px";
    const y = isVertical ? value + "px" : "0";
    const z = "0";
    const attrs = [x, y, z].join(", ");
    return "translate3d(" + attrs + ")";
  };

  const setTransitionStyle = (el, value) => {
    console.log("setTransitionStyle", el, value);
    const style = el.style;
    style.transform = style["-webkit-transform"] = style["-moz-transform"] = style["-ms-transform"] = createStyleProps(value);
  };

  const setTransitionDurationStyle = duration => {
    contentElement.style["-webkit-transition-duration"] = contentElement.style["transition-duration"] = duration + "ms";
  };

  const goTo = (idx, duration) => {
    if (idx < 0 || idx > list.length - 1) {
      return;
    }
    updateContentSize(contentElement);
    if (duration !== undefined) {
      setTransitionDurationStyle(duration);
    }
    updateIndex(idx);
    // console.log("goTo", idx, "pageSize", pageSize, -dir * idx * pageSize);
    setTransitionStyle(contentElement, -dir * idx * pageSize);
  };

  const getNormalizedStep = (orientation = 0) => {
    const idx = index;
    const size = groupBy;
    const min = 0;
    const max = list.length;
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
    const which = isVertical ? "height" : "width";
    const page = el.childNodes[0];
    console.log("updateContentSize", page);
    if (!page) {
      return;
    }
    console.log("getBoundingClientRect", page.getBoundingClientRect()[which]);
    if (page.getBoundingClientRect()[which]) {
      const newPageSize = page.getBoundingClientRect()[which];
      console.log("updateContentSize", "pageSize", pageSize);
      if (newPageSize !== pageSize) {
        actions.setPageSize(newPageSize);
      }
      el.style[which] = (list.length * pageSize) + "px";
    }
  };

  const goCurrent = (duration = 0) => {
    console.log("goCurrent getNormalizedStep", getNormalizedStep());
    updateContentSize(contentElement);
    setTransitionDurationStyle(duration);
    goTo(getNormalizedStep());
  };

  const goNext = (dur = duration) => (
    setTransitionDurationStyle(dur),
    index < list.length
      ? goTo(getNormalizedStep(1))
      : goTo(getNormalizedStep())
  );

  const goPrevious = (dur = duration) => (
    setTransitionDurationStyle(dur),
    index > 0
      ? goTo(getNormalizedStep(-1))
      : goTo(getNormalizedStep())
  );

  const updateContentElement = el => {
    setContentElement(el);
    updateContentSize(el);
    goCurrent();
  };

  const handleDragStart = () => (
    updateContentSize(contentElement),
    setTransitionDurationStyle(0)
  );

  const handleDrag = e => {
    e.preventDefault();
    const el = contentElement;
    const page = getPageElement(el, index);
    if (!page) {
      return;
    }
    const delta = isVertical
      ? e.deltaY + pageOffsetY
      : e.deltaX + pageOffsetX;
    const origin = isVertical
      ? page.offsetTop
      : dir === -1
        ? page.offsetLeft - page.parentNode.clientWidth + page.clientWidth
        : page.offsetLeft;
    setTransitionStyle(el, delta - origin);
  };

  const handleDragEnd = e => {
    const dur = calculateTransitionDuration(e.velocity);
    const delta = isVertical ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > pageSize * groupBy * cancelDragFactor) {
      if (dir * delta < 0) {
        goNext(dur);
      } else {
        goPrevious(dur);
      }
    } else {
      goCurrent(dur);
    }
  };

  const calculateTransitionDuration = velocity => {
    const el = contentElement;
    const page = getPageElement(el, index);
    if (!page) {
      return;
    }
    const width = page.clientWidth;
    const speed = Math.abs(velocity) || 1;
    let dur = 1 / speed * width;
    if (dur > duration) {
      dur = duration;
    }
    return dur;
  };

  // Populate list (on mount)
  useEffect(
    () => {
      if (!domElement) {
        return;
      }
      if (props.pageData) {
        props.pageData().then(result => (
          actions.setList(result))
        );
      }
      setContentElement(domElement.querySelector(`.${classes.content}`));
    },
    [domElement]
  );

  // Init HammerJS
  useEffect(
    () => {
      if (contentChildLength == 0) {
        return;
      }
      
      updateContentElement(contentElement);
      updateContentSize(contentElement);
      
      touchRef.current = new Touch({
        el: contentElement,
        orientation: props.orientation,
      });
    },
    [contentChildLength]
  );

  // Update touch lib events
  useEffect(
    () => {
      if (!touchRef.current) {
        return;
      }
      // touchRef.current.off("panstart", handleDragStart);
      // touchRef.current.off("panmove", handleDrag);
      // touchRef.current.off("panend", handleDragEnd);

      touchRef.current.on("panstart", handleDragStart);
      touchRef.current.on("panmove", handleDrag);
      touchRef.current.on("panend", handleDragEnd);

      if (props.sliderController) {
        props.sliderController({
          index: () => index, // legacy
          state,
          hasNext,
          hasPrevious,
          goTo,
          goCurrent,
          goNext,
          goPrevious
        });
      }

      return () => {
        touchRef.current.off("panstart", handleDragStart);
        touchRef.current.off("panmove", handleDrag);
        touchRef.current.off("panend", handleDragEnd);
      };
    },
    [touchRef.current, index, groupBy]
  );

  // Each render
  useEffect(
    () => {
      if (!contentElement) {
        return;
      }
      // Sizes need to be set each redraw because of screen resizes
      if (groupBy !== props.groupBy) {
        actions.setGroupBy(props.groupBy || 1);
        updateContentSize(contentElement);
        goCurrent();
      } else {
        updateContentSize(contentElement);
      }
    }
  );

  const componentProps = Object.assign({},
    getRef(dom => dom && !domElement && (
      setDomElement(dom),
      props.getRef && props.getRef(dom)
    )),
    props.testId && { "data-test-id": props.testId },
    {
      className: [
        classes.slider,
        props.className || props.class
      ].join(" ")
    }
  );

  return h("div",
    componentProps,
    [
      props.before
        ? h("." + classes.before, props.before)
        : null,
      h("div",
        {
          className: classes.content,
        },
        list.map((data, listIndex) => (
          props.page({
            data,
            listIndex,
            currentIndex: index
          })
        ))
      ),
      props.after
        ? h("." + classes.after, props.after)
        : null
    ]
  );
};
