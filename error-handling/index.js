module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" })
  })

  app.use((err, req, res, next) => {

    console.error("ERROR", req.method, req.path, err)

    if (err.code && err.code === 11000) {
      const errorKey = Object.keys(err.keyValue)
      const error = errorKey[0].charAt(0).toUpperCase() + errorKey[0].slice(1)
      res.status(409).json({ errorMessages: [`${error} must be unique.`] })
    }

    if (err.name === 'ValidationError') {
      let errorMessages = Object.values(err.errors).map(el => el.message)
      res.status(400).json({ errorMessages })
    }

    if (!res.headersSent) {
      res.status(500).json({ errorMessages: ['An error has occured on the server.'] })
    }

  })
}