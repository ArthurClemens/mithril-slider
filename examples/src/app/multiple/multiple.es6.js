'use strict';

import m from 'mithril';
import images from 'app/images/images';
import controls from 'app/controls/controls';
import github from 'app/app/github';


let example = {};
example.view = () => {
    return [
        m.component(images, {hideGithub: true}),
        m.component(controls, {hideGithub: true}),
        github()
    ];
};

export default example;
