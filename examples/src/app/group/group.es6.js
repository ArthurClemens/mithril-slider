import m from 'mithril';
import slider from 'mithril-slider';
import common from 'app/app/common';
import preloader from 'app/preloader/preloader';
import github from 'app/app/github';
import styler from 'app/app/styler';
import style from './group-style';
styler.add('group', style);

const callRight = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...remainingArgs, ...args);

const createPage = (opts, ctrl) => {
    const groupBy = ctrl.groupBy();
    const currentIndex = opts.currentIndex;
    const listIndex = opts.listIndex;
    const data = opts.data;
    // lazy loading
    const inRange = Math.abs(currentIndex - listIndex) < 2 * groupBy;
    const content = inRange ? [
        m('.image-container', [
            m('.image', {
                config: (el, inited) => {
                    if (inited) {
                        return;
                    }
                    common.fadeInImage(el, data);
                }
            }),
            m('span', listIndex + 1),
            preloader
        ])
    ] : null;
    return m('.page', {key: listIndex}, content);
};

let example = {};
example.controller = () => {
    return {
        sliderController: m.prop(),
        isEditing: m.prop(false),
        groupBy: m.prop(3)
    };
};
example.view = (ctrl, opts) => {
    const sliderController = ctrl.sliderController();
    const groupBy = ctrl.groupBy();
    const mySlider = m.component(slider, {
        pageData: common.getPageData,
        page: callRight(createPage, ctrl),
        groupBy: groupBy,
        sliderController: ctrl.sliderController,
        class: ['example', 'group', 'group-' + groupBy].join(' ')
    });
    const sliderControls = m('.slider-controls.slider-controls-group',
        sliderController ? [
            m('a.prev', {
                class: sliderController.hasPrevious() ? 'enabled' : '',
                onclick: () => sliderController.goPrevious()
            }, 'Previous'),
            m('.count', [
                [1, 2, 3, 4, 5].map((size) => {
                    return m('a', {
                        onclick: () => {
                            ctrl.groupBy(size);
                            setTimeout(() => {
                                sliderController.goCurrent();
                            }, 0);
                        },
                        class: (size === groupBy) ? 'selected' : ''
                    }, size);
                })
            ]),
            m('a.next', {
                class: sliderController.hasNext() ? 'enabled' : '',
                onclick: () => sliderController.goNext()
            }, 'Next')
        ] : null);
    return m('div', [
        sliderControls,
        mySlider,
        m('.slider-placeholder'),
        opts.hideGithub ? null : github()
    ]);
};

export default example;
