'use strict';

import m from 'mithril';
import images from 'app/images/images';
import vertical from 'app/vertical/vertical';
import controls from 'app/controls/controls';
import group from 'app/group/group';
import pages from 'app/pages/pages';
require('./index.css!');

const menuData = [
    {
        href: '/images',
        title: 'Simple image swipe',
        subtitle: 'Swiping a series of images, lazily loaded.'
    },
    {
        href: '/vertical',
        title: 'Vertical image swipe',
        subtitle: 'Swiping a vertical series of images, lazily loaded.'
    },
    {
        href: '/controls',
        title: 'Slider controls',
        subtitle: 'Using controls to manage sliding and get feedback, lazily loaded.'
    },
    {
        href: '/group',
        title: 'Dynamic groups',
        subtitle: 'Creating dynamically sized pages, lazily loaded.'
    },
    {
        href: '/pages',
        title: 'Page content',
        subtitle: 'More diverse content, lazily loaded.'
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
    return m('div', [
        m('h1', 'Content slider for Mithril'),
        menu
    ]);
};

m.route.mode = 'hash';
m.route(document.body, '/', {
    '/': app,
    '/images': images,
    '/vertical': vertical,
    '/controls': controls,
    '/group': group,
    '/pages': pages
});
