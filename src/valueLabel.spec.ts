import { testCases } from './testCases'
import { valueLabel, fnCallLabel, variableName } from './valueLabel'

describe('valueLabel(value: any)', () => {
  testCases(
    [
      ['some string', "'some string'"],
      [9, '9'],
      [true, 'true'],
      [undefined, 'undefined'],
      [null, 'null'],
      ['', "''"],
      [['array', 'of', 'items'], "['array', 'of', 'items']"],
      [{ key1: 'value1', key2: true }, "{ key1: 'value1', key2: true }"],
      [
        [{ key1: 'value1', key2: true }, 'complex'],
        "[{ key1: 'value1', key2: true }, 'complex']",
      ],
      [new Set(), 'Set'],
      [new WeakSet(), 'WeakSet'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      [function someFn() {}, 'someFn'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      [function () {}, 'Function'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      [new (function SomeConstructor() {})(), 'SomeConstructor'],
    ],
    valueLabel
  )

  describe('variableName(name)', () => {
    testCases(
      [
        ['someVariable', "'someVariable'"],
        [variableName('someVariable'), 'someVariable'],
      ],
      valueLabel
    )
  })
})

describe('fnCallLabel(name, args, result)', () => {
  testCases(
    [
      ['sum', [5, 6], 11, 'sum(5, 6) -> 11'],
      [
        'someFn',
        ['str', 5, { opt: true }],
        'RESULT',
        "someFn('str', 5, { opt: true }) -> 'RESULT'",
      ],
    ],
    fnCallLabel
  )
})
