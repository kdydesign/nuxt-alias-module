const { resolve } = require('path')
const consola = require('consola')
const glob = require('glob')

const { compact, isIgnoreDir } = require('./utils')

const logger = consola.withScope('nuxt:nuxt-alias')

function nuxtAliasModule (_moduleOptions) {
  const EXTENSION_REGEX = /\.[0-9a-z]+$/i
  const options = {
    srcDir: this.options.srcDir,
    ...this.options.nuxtAlias,
    ..._moduleOptions
  }

  const matchingDir = options.srcDir.replace(/\\/g, '/')
  const sourceFilePath = resolve(options.srcDir)

  let aliasRootDir = '**'

  if (Array.isArray(options.rootDir)) {
    if (options.rootDir.length === 1) {
      aliasRootDir = options.rootDir[0]
    }

    if (options.rootDir.length > 1) {
      aliasRootDir = `{${options.rootDir.join(',').replace(/ /gi, '')}}`
    }
  }

  let filePath = []

  try {
    glob(`${sourceFilePath}/${aliasRootDir}/**/*.*`, (er, files) => {
      filePath = files.map(f => f.replace(matchingDir, ''))
    })
  } catch (e) {
    logger.warn('file error: ', e)
  }

  this.extendBuild((config, b) => {
    filePath.forEach((path) => {
      const splitPath = compact(path.split('/'))
      const realPath = splitPath.slice(0, splitPath.length - 1).join('/')

      let fileName = splitPath[splitPath.length - 2]

      if (fileName) {
        fileName = splitPath[splitPath.length - 2].replace(EXTENSION_REGEX, '')

        const ignoreIdx = splitPath.findIndex(sp => fileName !== sp)

        if (isIgnoreDir(ignoreIdx)) {
          Object.assign(config.resolve.alias, {
            [fileName]: `~/${realPath}`
          })
        }
      }
    })
  })
}

module.exports = nuxtAliasModule
module.exports.meta = require('../package.json')
