const { Nuxt, Builder } = require('nuxt-edge')
const config = require('./fixture/nuxt.config')

let nuxt

const setupNuxt = async (config) => {
  nuxt = new Nuxt(config)

  const build = new Builder(nuxt)

  await build.validatePages()
  await build.generateRoutesAndFiles()
  await nuxt.listen(3000)
}

describe('module', () => {
  beforeAll(async () => {
    config.nuxtAlias = {
      rootDir: ['components'],
      ignoreDir: ['folder-A']
    }

    await setupNuxt(config)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('nuxt-alias', () => {
    expect(nuxt.options).toHaveProperty('nuxtAlias')
  })

  test('option', () => {
    expect(nuxt.options.nuxtAlias).toHaveProperty('rootDir')
    expect(nuxt.options.nuxtAlias).toHaveProperty('ignoreDir')
  })
})
