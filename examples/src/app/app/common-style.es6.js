import vars from './variables';
import mixins from 'app/app/mixins';

const pagePositions = (dir) => {
    const sizes = {};
    let i = 0;
    while (i <= 10) {
        const posPx = (i - 1) * vars.size + 'px';
        sizes[' .page:nth-child(' + i + ')'] = {
            top: 0,
            left: dir === 'rtl' ? 'auto' : posPx,
            right: dir === 'ltr' ? 'auto' : posPx
        };
        i++;
    }
    return sizes;
};

const styles = [{
    '*': {
        'box-sizing': 'border-box'
    },
    ' html, body': {
        'min-height': '100%',
        height: '100%',
    },
    ' body': {
        margin: 0,
        padding: 0,
        'font-family': 'arial, sans-serif',
        'min-width': vars.size + 'px'
    },
    ' .example': [
        pagePositions('ltr'), {
            '&.slider': {
                width: vars.size + 'px',
                height: vars.size + 'px',
                margin: '0 auto'
            },
            ' .content': {
                position: 'relative',
                'min-height': vars.size + 'px'
            },
            ' .page': {
                position: 'absolute',
                width: vars.size + 'px',
                'max-width': vars.size + 'px',

                ' .image-container': {
                    position: 'relative',
                    'background-color': '#f0f0f0'
                },
                ' .image-container, .preloader, .image': {
                    width: vars.size + 'px',
                    height: vars.size + 'px'
                },
                ' .preloader, .image': {
                    position: 'absolute'
                },
                ' .image': [
                    mixins.vendorize({
                        'background-size': 'cover'
                    }),
                    mixins.vendorize({
                        'transition': 'opacity .7s'
                    }),
                    mixins.vendorize({
                        'user-select': 'none'
                    }), {
                        'background-repeat': 'no-repeat',
                        'z-index': 1,
                        opacity: 0
                    }
                ]
            }
        }
    ],
    ' .slider-placeholder': {
        height: vars.size + 'px'
    },
    ' .slider + .slider-placeholder': {
        display: 'none'
    },
    ' [dir="rtl"]': {
        ' .example': pagePositions('rtl')
    },
    ' a': {
        '&:link, &:visited': {
            'color': '#1E88E5',
            'text-decoration': 'none'
        }
    }
}];
export default styles;
