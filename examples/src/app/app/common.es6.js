'use strict';

import m from 'mithril';

const DATA_URL = 'app/data/server.json';
//const DATA_URL = 'app/data/local.json';

const vm = {
    seen: {}
};

export default {
    getPageData: (url = DATA_URL) => {
        return m.request({
            method: 'GET',
            url: url,
            background: false
        });
    },

    fadeInImage: (el, url) => {
        const showImage = () => {
            el.style.backgroundImage = 'url(' + url + ')';
            el.style.opacity = 1;
            vm.seen[url] = 1;
        };
        if (!vm.seen[url]) {
            let img = new Image();
            img.onload = () => {
                showImage();
            };
            img.src = url;
        } else {
            showImage();
        }
    }
};
