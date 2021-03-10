export type TestCase = any[]
export type TestCases = TestCase[]

export interface ExpectedResultFn {
  (actualResult: any): any
  label?: string
}

export interface AsyncExpectedResultFn extends ExpectedResultFn {
  (actualResult: any): Promise<any>
}
