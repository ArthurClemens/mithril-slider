import m from 'mithril';
import slider from 'mithril-slider';
import styler from 'app/app/styler';
import sliderStyle from 'mithril-slider-style';
styler.add('slider', sliderStyle);
import common from 'app/app/common';
import preloader from 'app/preloader/preloader';
import github from 'app/app/github';

const loaded = {};

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
                common.fadeInImage(el, data, () => {
                    loaded[listIndex] = true;
                });
            }
        }),
        loaded[listIndex] ? null : preloader
    ]) : null;
    return m('.page', {key: listIndex}, content);
};

let example = {};
example.view = (ctrl, opts) => {
    return m('div', [
        m.component(slider, {
            pageData: common.getPageData,
            page: createPage,
            class: 'example images'
        }),
        m('.slider-placeholder'),
        opts.hideGithub ? null : github()
    ]);
};

export default example;
