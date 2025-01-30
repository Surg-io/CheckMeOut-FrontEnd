const path = require('path');
console.log('Alias @root points to:', path.resolve(__dirname, 'src'));
module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@root': path.resolve(__dirname, 'src'),
    };
    return config;
};

const { override, addWebpackResolve } = require('customize-cra');
module.exports = override(
    addWebpackResolve({
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
        },
    })
);