const path = require('path')
const consola = require('consola')

const logger = consola.withScope('nuxt-alias')

function nuxtAliasModule (_moduleOptions) {
}

module.exports = nuxtAliasModule
module.exports.meta = require('../package.json')
