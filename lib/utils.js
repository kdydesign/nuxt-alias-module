const logger = require('./logger')

/**
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
export function compact (array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

/**
 * ignore dir
 */
export function isIgnoreDir (ignoreDir, fileName) {
  // eslint-disable-next-line unicorn/prefer-includes
  const ignoreFile = ignoreDir.indexOf(fileName) === -1

  if (!ignoreFile) {
    logger.info(`File ${fileName} is ignored.`)
  }

  return ignoreFile
}
