export function logger(req, res, next) {
  const { method, originalUrl: url } = req
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    console.log(method, url, res.statusCode, `${ms}ms`)
  })
  next()
}
