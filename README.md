# @orioro/jest-util

```
npm install @orioro/jest-util
yarn add @orioro/jest-util
```

Set of utility methods for generating tests using `jest`.

# API Docs

- [`isErrorExpectation(value)`](#iserrorexpectationvalue)
- [`testCases(cases, fn, label)`](#testcasescases-fn-label)
- [`asyncResult(expectedResult)`](#asyncresultexpectedresult)
- [`variableName(name)`](#variablenamename)
- [`valueLabel(value)`](#valuelabelvalue)
- [`resultLabel(result)`](#resultlabelresult)
- [`fnCallLabel(fnName, args, result)`](#fncalllabelfnname-args-result)

##### `isErrorExpectation(value)`

- `value` {*}

##### `testCases(cases, fn, label)`

Takes an array of test cases and generates one test for
each case using provided function and label generators

- `cases` {TestCases}
- `fn` {Function}
- `label` {Function | String}
- Returns: {void} 

##### `asyncResult(expectedResult)`

Creates a function that verifies async expectation

- `expectedResult` {*}
- Returns: {Function} 

##### `variableName(name)`

Wraps a name in a VariableName instance so that `valueLabel` serializer
knows not to wrap it in quotes.

- `name` {String}

##### `valueLabel(value)`

Takes any value as input and returns an adequate label to represent
that value.

- `value` {*}
- Returns: `label` {String} 

##### `resultLabel(result)`

- `result` {*}
- Returns: {String} 

##### `fnCallLabel(fnName, args, result)`

- `fnName` {String}
- `args` {*[]}
- `result` {*}
- Returns: {String}
