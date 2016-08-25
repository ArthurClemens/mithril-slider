'use strict';

import m from 'mithril';
import styler from 'app/app/styler';
import style from './github-style';
styler.add('github', style);

let content = (opts = {}) => {
    return m('.github', {
        dir: 'ltr'
    }, [!opts.home ? m('a', {
            href: 'index.html',
            config: null
        }, 'All examples') : null,
        m('hr'),
        m.trust('mithril-slider, content slider for Mithril on mobile and desktop. Project page on <a href="https://github.com/ArthurClemens/mithril-slider">Github</a>.')
    ]);
};

export default content;
