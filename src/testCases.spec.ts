import { testCases, asyncResult } from './testCases'

describe('testCases - basic scenario', () => {
  const testFn = (arg1, arg2) => `${arg1}-${arg2}`

  testCases(
    [
      ['str-1', 'str-2', 'str-1-str-2'],
      [1, 2, '1-2'],
    ],
    testFn
  )
})

describe('testCases - throw error results', () => {
  const testFn = (arg) => {
    switch (typeof arg) {
      case 'string':
      case 'number':
        return `${arg}-valid`
      case 'object':
        throw new TypeError('MUST NOT BE OBJECT')
      default:
        throw new Error('DEFAULT_UNKNOWN_ERROR')
    }
  }

  testCases(
    [
      ['str-1', 'str-1-valid'],
      [1, '1-valid'],
      [{}, TypeError],
      [[], TypeError],
      [true, Error],
    ],
    testFn
  )
})

describe('testCases - custom comparison for single case', () => {
  const testFn = (arg) => {
    switch (typeof arg) {
      case 'string':
      case 'number':
        return `${arg}-valid`
      case 'object':
        throw new TypeError('MUST NOT BE OBJECT')
      default:
        return new Error('DEFAULT_UNKNOWN_ERROR')
    }
  }

  testCases(
    [
      ['str-1', 'str-1-valid'],
      [1, '1-valid'],
      [[], TypeError],
      [
        true,
        (result) => expect(result).toEqual(Error('DEFAULT_UNKNOWN_ERROR')),
      ],
    ],
    testFn
  )
})

describe('testCases - async results', () => {
  const testFn = (arg) => {
    switch (typeof arg) {
      case 'string':
      case 'number':
        return `${arg}-valid`
      case 'object':
        throw new TypeError('MUST NOT BE OBJECT')
      default:
        throw new Error('DEFAULT_UNKNOWN_ERROR')
    }
  }

  testCases(
    [
      ['str-1', asyncResult('str-1-valid')],
      [1, asyncResult('1-valid')],
      [[], asyncResult(TypeError)],
      [true, asyncResult(new Error('DEFAULT_UNKNOWN_ERROR'))],
    ],
    (input) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            resolve(testFn(input))
          } catch (err) {
            reject(err)
          }
        }, 100)
      }),
    'asyncTestFn'
  )
})
