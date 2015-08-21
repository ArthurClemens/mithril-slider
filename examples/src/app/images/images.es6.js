'use strict';

import m from 'mithril';
import slider from 'mithril-slider';
import common from 'app/app/common';
import preloader from 'app/preloader/preloader';
import github from 'app/app/github';
require('app/app/common.css!');

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
example.view = () => {
    return [
        m.component(slider, {
			pageData: common.getPageData,
            page: createPage,
            class: 'example images'
        }),
        github()
    ];
};

export default example;
