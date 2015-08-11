'use strict';

import m from 'mithril';
import Hammer from 'hammerjs';
require('./mithril-slider.css!');

const createView = (ctrl, opts) => {
    const contentEl = ctrl.contentEl();
    const list = ctrl.list();
    const currentIndex = ctrl.index();
    // sizes need to be set each redraw because of screen resizes
    ctrl.groupBy(opts.groupBy || 1);
    if (contentEl) {
        ctrl.updateContentSize(contentEl);
    }
    return m('div', {
        class: ['slider', opts.class || ''].join(' ')
    }, opts.before ? m('.before', opts.before) : null, m('.content', {
        config: (el, inited, context) => {
            if (inited) {
                return;
            }
            ctrl.setContentEl(el);
            let mc = new Hammer.Manager(el, {});
            mc.add(new Hammer.Pan({
                orientation: (opts.orientation === 'vertical') ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
                threshold: 0
            }));
            mc.on('panmove', ctrl.handleDrag);
            mc.on('panend', ctrl.handleDragEnd);
            mc.on('panstart', ctrl.handleDragStart);
            context.onunload = () => {
                mc.off('panmove', ctrl.handleDrag);
                mc.off('panend', ctrl.handleDragEnd);
                mc.off('panstart', ctrl.handleDragStart);
            };
        }
    }, list.map((data, listIndex) => {
        return opts.page({
            data: data,
            listIndex: listIndex,
            currentIndex: currentIndex
        });
    })), opts.after ? m('.after', opts.after) : null);
};

let slider = {};

slider.controller = (opts = {}) => {
    const defaultDuration = parseInt(opts.duration, 10) || 250;
    //let duration;
    const index = m.prop(opts.index || 0);
    const list = opts.pageData();
    list.then(m.redraw);
    let contentEl = m.prop();
    let pageSize = 0;
    let groupBy = m.prop(opts.groupBy || 1);
    const cancelDragFactor = opts.cancelDragFactor || (1 / 5);
    const isVertical = opts.orientation === 'vertical';

    const setIndex = (idx) => {
        index(idx);
        m.redraw();
    };

    const getPageEl = (el, idx) => el.childNodes[idx];

    const setTransitionStyle = (el, value) => {
        const style = el.style;
        const createAttrs = () => {
            const x = isVertical ? '0' : value + 'px';
            const y = isVertical ? value + 'px' : '0';
            const z = '0';
            const attrs = [x, y, z].join(', ');
            return 'translate3d(' + attrs + ')';
        };
        style.transform = style['-webkit-transform'] = style['-moz-transform'] = style['-ms-transform'] = createAttrs();
    };

    const setTransitionDurationStyle = (duration) => {
        contentEl().style['-webkit-transition-duration'] = contentEl().style['transition-duration'] = duration + 'ms';
    };

    const goTo = (idx, duration) => {
        if (idx < 0 || idx > list().length - 1) {
            return;
        }
        if (duration !== undefined) {
            setTransitionDurationStyle(duration);
        }
        setTransitionStyle(contentEl(), -1 * idx * pageSize);
        setIndex(idx);
    };

    const normalizedStep = (orientation) => {
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

    const updateContentSize = (el) => {
        const page = el.childNodes[0];
        const prop = isVertical ? 'height' : 'width';
        pageSize = page.getBoundingClientRect()[prop];
        el.style[prop] = (list().length * pageSize) + 'px';
    };

    const goCurrent = (duration = 0) => {
        updateContentSize(contentEl());
        setTransitionDurationStyle(duration);
        goTo(normalizedStep(0));
    };

    const goNext = (duration = defaultDuration) => (
        setTransitionDurationStyle(duration),
        index() < list().length ? goTo(normalizedStep(1)) : goTo(normalizedStep(0))
    );

    const goPrev = (duration = defaultDuration) => (
        setTransitionDurationStyle(duration),
        index() > 0 ? goTo(normalizedStep(-1)) : goTo(normalizedStep(0))
    );

    const hasNext = () => index() + groupBy() < list().length;

    const hasPrevious = () => index() > 0;

    const setContentEl = (el) => {
        contentEl(el);
        updateContentSize(el);
        goCurrent(0);
    };

    const handleDragStart = () => (setTransitionDurationStyle(0));

    const handleDrag = (e) => {
        const el = contentEl();
        const page = getPageEl(el, index());
        const delta = isVertical ? e.deltaY : e.deltaX;
        const origin = isVertical ? page.offsetTop : page.offsetLeft;
        setTransitionStyle(el, delta - origin);
        e.preventDefault();
    };

    const calculateTransitionDuration = (velocity) => {
        const speed = Math.abs(velocity);
        let duration = 1 / speed * 360;
        if (duration < 80) {
            duration = 80;
        }
        if (duration > defaultDuration) {
            duration = defaultDuration;
        }
        return duration;
    };

    const handleDragEnd = (e) => {
        const duration = calculateTransitionDuration(e.velocity);
        const delta = isVertical ? e.deltaY : e.deltaX;
        if (Math.abs(delta) > pageSize * groupBy() * cancelDragFactor) {
            if (delta < 0) {
                goNext(duration);
            } else {
                goPrev(duration);
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

        // public interface
        index: index,
        hasNext: hasNext,
        hasPrevious: hasPrevious,
        goTo: goTo,
        goCurrent: goCurrent,
        goNext: goNext,
        goPrevious: goPrev
    };
};

slider.view = (ctrl, opts) => {
    if (opts.sliderController) {
        opts.sliderController(ctrl);
    }
    return createView(ctrl, opts);
};

export default slider;
