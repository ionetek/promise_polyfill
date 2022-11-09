class MyPromise {
  constructor(executor = () => {}) {
    this.handlers = []
    this.errorHandler = () => {}
    this.finallyHandler = () => {}
    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
    } catch (e) {
      this.errorHandler(e)
    } finally {
      this.finallyHandler()
    }
  }

  onResolve(data) {
    this.handlers.forEach((callback) => {
      data = callback(data)
    })
    this.finallyHandler()
  }

  onReject(error) {
    this.errorHandler(error)
    this.finallyHandler()
  }

  then(fn) {
    this.handlers.push(fn)
    return this
  }

  catch(fn) {
    this.errorHandler = fn
    return this
  }

  finally(fn) {
    this.finallyHandler = fn
    return this
  }
}

module.exports = MyPromise
