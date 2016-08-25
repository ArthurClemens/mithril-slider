import vars from 'app/app/variables';
import mixins from 'app/app/mixins';

const buttonSize = 40;

const pageSizes = () => {
    const sizes = {};
    let i = 1;
    while (i <= 5) {
        const size = vars.size / i;
        sizes['&.group-' + i] = {
            ' .content': {
                height: Math.floor(size) + 'px'
            },
            ' .page': {
                width: size + 'px',
                height: size + 'px'
            }
        };
        i++;
    }
    return sizes;
};

const countStyle = () => {
    const buttonCount = 5;
    const minButtonSize = 30;
    const margin = 10;
    const width = 5 * minButtonSize + buttonCount * margin;
    const height = buttonSize;

    return {
        position: 'absolute',
        left: '50%',
        height: height + 'px',
        width: width + 'px',
        'margin-left': -width / 2 + 'px',

        ' a': [
            mixins.vendorize({
                'user-select': 'none'
            }),
            mixins.vendorize({
                'transition-property': 'opacity'
            }),
            mixins.vendorize({
                'transition-timing-function': 'ease-out'
            }),
            mixins.vendorize({
                'transition-duration': '200ms'
            }), {
                display: 'block',
                float: 'left',
                margin: ((buttonSize - minButtonSize) / 2) + 'px ' + (margin / 2) + 'px',
                width: minButtonSize + 'px',
                height: minButtonSize + 'px',
                'border-radius': minButtonSize / 2 + 'px',
                'background-color': 'rgba(0, 0, 0, .1)',
                cursor: 'pointer',
                'text-align': 'center',
                'font-size': '13px',
                'line-height': minButtonSize + 'px',

                '&.selected': {
                    'background-color': 'rgba(0, 0, 0, .4)',
                    color: '#fff',
                    cursor: 'default',
                    'pointer-events': 'none'
                }
            }
        ]
    };
};

const prevNextButtonStyle = () => {
    return {
        ' a.prev, a.next': [
            mixins.vendorize({
                'user-select': 'none'
            }),
            mixins.vendorize({
                'transition-property': 'opacity'
            }),
            mixins.vendorize({
                'transition-timing-function': 'ease-out'
            }),
            mixins.vendorize({
                'transition-duration': '200ms'
            }),
            mixins.vendorize({
                'background-size': '30px'
            }), {
                display: 'block',
                width: buttonSize + 'px',
                height: buttonSize + 'px',
                'border-radius': buttonSize / 2 + 'px',
                position: 'absolute',
                'background-color': 'rgba(0, 0, 0, .1)',
                'text-indent': '-1234em',
                cursor: 'default',
                'background-repeat': 'no-repeat',
                'background-position': '50%',
                opacity: 0,

                '&.enabled': {
                    opacity: '1',
                    cursor: 'pointer',

                    '&:hover': {
                        'background-color': 'rgba(0, 0, 0, .2)'
                    }
                }
            }
        ],
        ' a.prev': {
            left: '10px',
            'background-image': 'url(app/assets/svg/navigate-before.svg)'
        },
        ' a.next': {
            right: '10px',
            'background-image': 'url(app/assets/svg/navigate-next.svg)'
        }
    };
};

const pageNumberStyle = () => {
    const size = 30;
    return {
        position: 'absolute',
        left: 0,
        top: 0,
        width: size + 'px',
        height: size + 'px',
        'line-height': size + 'px',
        'font-size': '12px',
        'text-align': 'center',
        'background-color': 'rgba(255,255,255,.5)',
        'z-index': 1
    };
};

const styles = [{
    '.example.group': [
        pageSizes(), {
            position: 'relative',

            ' .page': {
                position: 'static',
                float: 'left',

                ' span': pageNumberStyle(),

                ' .preloader, .image-container, .image': {
                    width: '100%',
                    height: '100%'
                }
            }
        }
    ],
    '.slider-controls.slider-controls-group': [
        prevNextButtonStyle(), {
            width: vars.size + 'px',
            height: buttonSize + 2* 10 + 'px',
            padding: '10px 0',
            position: 'relative',
            margin: '0 auto',

            ' .count': countStyle()
        }
    ]
}];

export default styles;
