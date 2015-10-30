import vars from 'app/app/variables';
import mixins from 'app/app/mixins';

const buttonSize = 40;
const inputGotoWidth = buttonSize;
const inputGotoHeight = buttonSize;

const styles = [{
    '.slider-controls.slider-controls-controls': {
        position: 'relative',
        width: vars.size + 'px',
        height: buttonSize + 2*10 + 'px',
        margin: '0 auto',
        'margin-top': -1.4 * buttonSize + 'px',
        padding: '10px 0',

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
                'background-color': '#eee',
                'text-indent': '-1234em',
                cursor: 'default',
                'background-repeat': 'no-repeat',
                'background-position': '50%',
                opacity: 0,

                '&.enabled': {
                    opacity: 1,
                    cursor: 'pointer',

                    '&:hover': {
                        'background-color': '#ddd'
                    }
                }
            }
        ],
        ' a.prev': {
            'background-image': 'url(app/assets/svg/navigate-before.svg)',
            left: '10px'
        },
        ' a.next': {
            'background-image': 'url(app/assets/svg/navigate-next.svg)',
            right: '10px'
        },
        ' input.goto': {
            position: 'absolute',
            'background-color': '#eee',
            left: '50%',
            height: inputGotoHeight + 'px',
            width: inputGotoWidth + 'px',
            margin: '0 0 0 ' + -inputGotoWidth / 2 + 'px',
            padding: 0,
            'text-align': 'center',
            border: 'none',
            'font-size': '14px',

            '&:focus': {
                'background-color': '#fff'
            }
        }
    },
    '[dir="rtl"]': {
        ' .slider-controls.slider-controls-controls': {
            ' a.next': {
                right: 'auto',
                left: '10px',
                transform: 'scaleX(-1)'
            },
            ' a.prev': {
                left: 'auto',
                right: '10px',
                transform: 'scaleX(-1)'
            }
        }
    }
}];

export default styles;
