const Encore = require('@symfony/webpack-encore');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('layout', './assets/js/layout.js')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .enableVueLoader()
    .addPlugin(new VuetifyLoaderPlugin())
    .enableSassLoader(options => {
        options.implementation = require('sass');
    })

    .enableIntegrityHashes(Encore.isProduction());

module.exports = Encore.getWebpackConfig();
