import { valueLabel } from './valueLabel'

export type TestCase = any[]
export type TestCases = TestCase[]

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
  label?: string | ((args: any[], result: any) => string)
): void => {
  const _label =
    typeof label === 'function'
      ? label
      : typeof label === 'string'
      ? (args, result) =>
          `${label}(${args.map(valueLabel).join(', ')}) -> ${valueLabel(
            result
          )}`
      : (args, result) =>
          `${fn.name}(${args.map(valueLabel).join(', ')}) -> ${valueLabel(
            result
          )}`

  cases.forEach((case_) => {
    const result = case_[case_.length - 1]
    const args = case_.slice(0, case_.length - 1)

    if (
      result === Error ||
      Object.prototype.isPrototypeOf.call(Error, result) || // see https://eslint.org/docs/rules/no-prototype-builtins
      result instanceof Error
    ) {
      // eslint-disable-next-line jest/valid-title
      test(_label(args, result), () => {
        expect(() => fn(...args)).toThrow(result)
      })
    } else if (typeof result === 'function') {
      // eslint-disable-next-line jest/valid-title, jest/expect-expect
      test(_label(args, result), () => result(fn(...args)))
    } else {
      // eslint-disable-next-line jest/valid-title
      test(_label(args, result), () => expect(fn(...args)).toEqual(result))
    }
  })
}
