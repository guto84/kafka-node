const express = require('express')
const { Controller } = require('./Controller')

const app = express()
const port = 3000

app.use(express.json())

app.post('/sendMessage', async (req, res) => {
  const controller = new Controller()
  await controller.sendMessage(req, res)
})

app.post('/createTopic', async (req, res) => {
  const controller = new Controller()
  await controller.createTopic(req, res)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
