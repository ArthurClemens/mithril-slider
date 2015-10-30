const vendors = ['o', 'moz', 'ms', 'webkit'];
const vendorsSel = vendors.map((v) => ('_' + v + '$')).join('');

const vendorize = (what) => {
    return {
        [vendorsSel]: what
    };
};

export default {
    vendorize: vendorize
};
