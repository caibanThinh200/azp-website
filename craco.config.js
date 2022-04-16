const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#3CB371',
                            '@menu-item-active-b': "##98FB98"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};