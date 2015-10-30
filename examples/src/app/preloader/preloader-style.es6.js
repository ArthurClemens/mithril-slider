const styles = [{
    '.preloader': {
        // layout
        display: '-ms-flexbox',
        display: '-webkit-flex',
        display: 'flex',
        visibility: 'hidden',

        // center
        '-ms-flex-align': 'center',
        '-webkit-align-items': 'center',
        'align-items': 'center',

        ' svg': {
            width: '40px',
            height: '40px',

            // flex
            '-ms-flex': '1 1 0.000000001px',
            '-webkit-flex': 1,
            flex: 1,
            '-webkit-flex-basis': '0.000000001px',
            'flex-basis': '0.000000001px',

            // self-center-center
            '-ms-align-self': 'center',
            '-webkit-align-self': 'center',
            'align-self': 'center',

            ' path': {
                fill: 'rgba(0, 0, 0, .5)'
            }
        }
    }
}];

export default styles;
