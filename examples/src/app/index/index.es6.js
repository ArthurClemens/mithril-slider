import 'app/app/no-tap-delay';
import m from 'mithril';
import styler from 'app/app/styler';
import commonStyle from 'app/app/common-style';
import indexStyle from './index-style';
styler.add('common', commonStyle);
styler.add('index', indexStyle);

import images from 'app/images/images';
import vertical from 'app/vertical/vertical';
import controls from 'app/controls/controls';
import ltr from 'app/ltr/ltr';
import group from 'app/group/group';
// import pages from 'app/pages/pages';
import multiple from 'app/multiple/multiple';
import github from 'app/app/github';

const menuData = [
    {
        href: '/images',
        title: 'Simple image swipe',
        subtitle: 'Swiping a series of images.'
    },
    {
        href: '/vertical',
        title: 'Vertical image swipe',
        subtitle: 'Swiping a vertical series of images.'
    },
    {
        href: '/controls',
        title: 'Slider controls',
        subtitle: 'Using controls to manage sliding and get feedback.'
    },
    {
        href: '/ltr',
        title: 'Left-to-right',
        subtitle: 'Controls with left-to-right language support.'
    },
    {
        href: '/group',
        title: 'Dynamic groups',
        subtitle: 'Creating dynamically sized pages.'
    },
    // {
    //     href: '/pages',
    //     title: 'Page content',
    //     subtitle: 'More diverse content.'
    // },
    {
        href: '/multiple',
        title: 'Multiple',
        subtitle: 'Multiple sliders on one page.'
    }
];

const menu = m('ul.menu', [
    m('li.header', 'Examples'),
    menuData.map(menuItem => {
        return m('li', m('a', {href: menuItem.href, config: m.route}, [
            m('span.title', menuItem.title),
            m('span.subtitle', menuItem.subtitle)
        ]));
    })
]);

let app = {};
app.view = () => {
    return m('.index', [
        m('h1', 'Content Slider for Mithril'),
        menu,
        github({home: true})
    ]);
};

m.route.mode = 'hash';
m.route(document.body, '/', {
    '/': app,
    '/images': images,
    '/vertical': vertical,
    '/controls': controls,
    '/ltr': ltr,
    '/group': group,
    //'/pages': pages,
    '/multiple': multiple
});
