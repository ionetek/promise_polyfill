let MyPromise = require('./promise')

describe('Ivan Promise', () => {
  let promise
  let fn
  const successResult = 42
  const errorResult = 'Error result'

  //Запускается перед каждым тестом
  beforeEach(() => {
    fn = jest.fn((r) => setTimeout(() => r(successResult), 150))
    promise = new MyPromise(fn)
  })

  test('should exist and to fe typeof function', () => {
    expect(MyPromise).toBeDefined()
    expect(typeof MyPromise).toBe('function')
  })

  test('instance should have methods: then, catch, finally', () => {
    expect(promise.then).toBeDefined()
    expect(promise.catch).toBeDefined()
    expect(promise.finally).toBeDefined()
  })

  test('should call executor function', () => {
    expect(fn).toHaveBeenCalled()
  })

  test('should get data in then() and chain them', async () => {
    const result = await promise.then((num) => num).then((num) => num * 2)
    expect(result).toBe(successResult * 2)
  })

  test('should catch error', () => {
    const errFn = (_, reject) => setTimeout(() => reject(errorResult), 150)
    const errorPromise = new MyPromise(errFn)

    return new Promise((resolve) => {
      errorPromise.catch((error) => {
        expect(error).toBe(errorResult)
        resolve()
      })
    })
  })

  test('should call finally method', async () => {
    const finallyFn = jest.fn(() => {})
    const result = await promise.finally(finallyFn)
    expect(finallyFn).toHaveBeenCalled()
  })
})
