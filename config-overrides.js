const path = require('path');
console.log('Alias @root points to:', path.resolve(__dirname, 'src'));
module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@root': path.resolve(__dirname, 'src'),
    };
    return config;
};