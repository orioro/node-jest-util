import { fnCallLabel, valueLabel } from './valueLabel'

import { TestCases, AsyncExpectedResultFn } from './types'

/**
 * @function isErrorExpectation
 * @param {*} value
 * @type {Boolean}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isErrorExpectation = (value: any): boolean =>
  value === Error ||
  Object.prototype.isPrototypeOf.call(Error, value) || // see https://eslint.org/docs/rules/no-prototype-builtins
  value instanceof Error

/**
 * Takes an array of test cases and generates one test for
 * each case using provided function and label generators
 *
 * @function testCases
 * @param {TestCases} cases
 * @param {Function} fn
 * @param {Function | String} label
 * @returns {void}
 */
export const testCases = (
  cases: TestCases,
  fn: (...args: any[]) => any,
  label?: string | ((args: any[], expectedResult: any) => string)
): void => {
  const _label =
    typeof label === 'function'
      ? label
      : fnCallLabel.bind(
          null,
          typeof label === 'string' ? label : fn.name || '???'
        )

  cases.forEach((case_) => {
    const expectedResult = case_[case_.length - 1]
    const args = case_.slice(0, case_.length - 1)
    const testLabel = _label(args, expectedResult)

    if (isErrorExpectation(expectedResult)) {
      // eslint-disable-next-line jest/valid-title
      test(testLabel, () => {
        expect(() => fn(...args)).toThrow(expectedResult)
      })
    } else if (typeof expectedResult === 'function') {
      // eslint-disable-next-line jest/valid-title, jest/expect-expect
      test(testLabel, () => expectedResult(fn(...args)))
    } else {
      // eslint-disable-next-line jest/valid-title
      test(testLabel, () => expect(fn(...args)).toEqual(expectedResult))
    }
  })
}

/**
 * Creates a function that verifies async expectation
 *
 * @function asyncResult
 * @param {*} expectedResult
 * @returns {Function}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const asyncResult = (expectedResult: any): AsyncExpectedResultFn => {
  const resultExpectFn: AsyncExpectedResultFn = (actualResult: any) =>
    isErrorExpectation(expectedResult)
      ? expect(actualResult).rejects.toThrow(expectedResult) // eslint-disable-line jest/valid-expect
      : expect(actualResult).resolves.toEqual(expectedResult) // eslint-disable-line jest/valid-expect

  resultExpectFn.label = `async(${valueLabel(expectedResult)})`

  return resultExpectFn
}
