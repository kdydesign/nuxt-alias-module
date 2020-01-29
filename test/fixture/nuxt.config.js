const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  buildModules: [{
    handler: require('../../')
  }],
  nuxtAlias: {
    rootDir: ['components'],
    ignoreDir: ['folder-C'],
    transformDir: key => key.replace('folder', 'alias')
  },
  plugins: ['~/plugins/index']
}
