import vars from 'app/app/variables';

const pagePositions = () => {
    const sizes = {};
    let i = 0;
    while (i <= 10) {
        const posPx = (i - 1) * vars.size + 'px';
        sizes[' .page:nth-child(' + i + ')'] = {
            top: 0,
            left: 'auto',
            top: posPx
        };
        i++;
    }
    return sizes;
};

const styles = [{
    '.example.vertical': [
        pagePositions(), {
            '&.slider, .page': {
                height: vars.size + 'px'
            }
        }
    ]
}];

export default styles;
