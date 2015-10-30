System.config({
    baseURL: '.',
    defaultJSExtensions: true,
    transpiler: 'babel',
    babelOptions: {
        'optional': [
            'runtime',
            'optimisation.modules.system'
        ]
    },
    'map': {
        'fastclick': 'node_modules/fastclick/lib/fastclick',
        'hammerjs': 'node_modules/hammerjs/hammer.min',
        'j2c': 'node_modules/j2c/dist/j2c.global.min',
        'mithril': 'node_modules/mithril/mithril.min',
        'mithril-slider': 'node_modules/mithril-slider/lib/mithril-slider',
        'mithril-slider-style': 'node_modules/mithril-slider/lib/mithril-slider-style'
    }
});
