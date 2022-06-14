class MyError extends Error {
  code: string
  errText: string

  constructor(code: string, errText: string) {
    let message = `${errText} (${code})`
    super(message)
    this.code = code
    this.errText = errText
  }
}

export {
  MyError
}