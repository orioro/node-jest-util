import { isPlainObject } from 'is-plain-object'

/**
 * Takes any value as input and returns an adequate label to represent
 * that value.
 *
 * @function valueLabel
 * @param {*} value
 * @returns {String} label
 */
export const valueLabel = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  value: any
): string => {
  if (typeof value === 'string') {
    return `'${value}'`
  } else if (isPlainObject(value)) {
    return `{${Object.keys(value).reduce(
      (acc, key) =>
        acc !== ''
          ? `${acc}, ${key}: ${valueLabel(value[key])}`
          : `${key}: ${valueLabel(value[key])}`,
      ''
    )}}`
  } else if (Array.isArray(value)) {
    return `[${value.map(valueLabel).join(', ')}]`
  } else if (typeof value === 'object' && value !== null) {
    if (typeof value.constructor === 'function' && value.constructor.name) {
      return value.constructor.name
    } else {
      return Object.prototype.toString.call(value).slice(8, -1)
    }
  } else if (typeof value === 'function') {
    return value.name ? value.name : 'Function'
  } else {
    return String(value)
  }
}
