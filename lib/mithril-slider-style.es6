const styles = [{
    '.slider': {
        overflow: 'hidden',

        ' .content': {
            'transition-property': 'transform',
            '-webkit-transition-property': 'transform',
            '-moz-transition-property': 'transform',
            '-o-transition-property': 'transform',

            'transition-timing-function': 'ease-out',
            '-webkit-transition-timing-function': 'ease-out',
            '-moz-transition-timing-function': 'ease-out',
            '-o-transition-timing-function': 'ease-out',

            // transition-duration set in js

            'transform': 'translate3d(0, 0, 0)',
            '-webkit-transform': 'translate3d(0, 0, 0)',
            '-moz-transform': 'translate3d(0, 0, 0)',
            '-o-transform': 'translate3d(0, 0, 0)',
        }
    }
}];

export default styles;
