import { isPlainObject } from 'is-plain-object'

import { ExpectedResultFn } from './types'

export class VariableName {
  name: string
  constructor(name: string) {
    this.name = name
  }

  toString(): string {
    return this.name
  }
}

/**
 * Wraps a name in a VariableName instance so that `valueLabel` serializer
 * knows not to wrap it in quotes.
 *
 * @function variableName
 * @param {String} name
 */
export const variableName = (name: string): VariableName =>
  new VariableName(name)

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
  if (value instanceof VariableName) {
    return value.name
  }
  if (typeof value === 'string') {
    return `'${value}'`
  } else if (isPlainObject(value)) {
    return `{ ${Object.keys(value).reduce(
      (acc, key) =>
        acc !== ''
          ? `${acc}, ${key}: ${valueLabel(value[key])}`
          : `${key}: ${valueLabel(value[key])}`,
      ''
    )} }`
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

/**
 * @function resultLabel
 * @param {*} result
 * @returns {String}
 */
export const resultLabel = (result: ExpectedResultFn | any): string => {
  return typeof result === 'function' && result.label
    ? result.label
    : valueLabel(result)
}

/**
 * @function fnCallLabel
 * @param {String} fnName
 * @param {*[]} args
 * @param {*} result
 * @returns {String}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fnCallLabel = (fnName: string, args: any[], result: any): string =>
  `${fnName}(${args.map(valueLabel).join(', ')}) -> ${resultLabel(result)}`
