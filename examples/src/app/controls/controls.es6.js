'use strict';

import m from 'mithril';
import slider from 'mithril-slider';
import common from 'app/app/common';
import preloader from 'app/preloader/preloader';
import github from 'app/app/github';
require('app/app/common.css!');
require('./controls.css!');

const createPage = (opts) => {
    const currentIndex = opts.currentIndex;
    const listIndex = opts.listIndex;
    const data = opts.data;
    // lazy loading
    const inRange = Math.abs(currentIndex - listIndex) < 2;
    const content = inRange ? m('.image-container', [
        m('.image', {
            config: (el, inited) => {
                if (inited) {
                    return;
                }
                common.fadeInImage(el, data);
            }
        }),
        preloader
    ]) : null;
    return m('.page', content);
};

let example = {};
example.controller = () => {
    return {
        sliderController: m.prop(),
        isEditing: m.prop(false) // allow value change when typing
    };
};
example.view = (ctrl) => {
    const sliderController = ctrl.sliderController();
    const mySlider = m.component(slider, {
        pageData: common.getPageData,
        page: createPage,
        sliderController: ctrl.sliderController,
        class: 'example controls'
    });
    const sliderControls = sliderController ? m('.slider-controls.slider-controls-controls', [
        m('input.goto', {
            value: ctrl.isEditing() ? '' : sliderController.index(),
            oninput: (e) => {
                ctrl.isEditing(true);
                const idx = parseInt(e.target.value, 10);
                if (!isNaN(idx)) {
                    sliderController.goTo(idx, 0);
                    ctrl.isEditing(false);
                }
            }
        }),
        m('a.prev', {
            class: sliderController.hasPrevious() ? 'enabled' : '',
            onclick: () => sliderController.goPrevious()
        }, 'Previous'),
        m('a.next', {
            class: sliderController.hasNext() ? 'enabled' : '',
            onclick: () => sliderController.goNext()
        }, 'Next')
    ]) : null;
    return [
        mySlider,
        sliderControls,
        github
    ];
};

export default example;
