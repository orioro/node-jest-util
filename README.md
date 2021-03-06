# @orioro/jest-util

```
npm install @orioro/jest-util
yarn add @orioro/jest-util
```

Set of utility methods for generating tests using `jest`.

# API Docs

- [`testCases(cases, fn, label)`](#testcasescases-fn-label)
- [`valueLabel(value)`](#valuelabelvalue)

##### `testCases(cases, fn, label)`

Takes an array of test cases and generates one test for
each case using provided function and label generators

- `cases` {TestCases}
- `fn` {Function}
- `label` {Function | String}
- Returns: {void} 

##### `valueLabel(value)`

Takes any value as input and returns an adequate label to represent
that value.

- `value` {*}
- Returns: `label` {String}
