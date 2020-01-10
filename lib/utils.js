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
 * ignore root dir
 */
export function isIgnoreDir (index) {
  return index === 0
}
