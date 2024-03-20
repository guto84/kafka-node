const { KafkaConfig } = require("./KafkaConfig")

class Controller {
  constructor() {
    this.kafka = new KafkaConfig('my-group')
  }

  async sendMessage(req, res) {
    try {
      await this.kafka.produce(req.body.topic, req.body.message)

      res.status(201).send(req.body)
    }
    catch(e) {
      console.log('ERROR >>>', e)
    }
  }

  async createTopic(req, res) {
    try {
      await this.kafka.createTopic(req.body.topic)

      res.status(201).send(req.body)
    }
    catch(e) {
      console.log('ERROR >>>', e)
    }
  }
}

module.exports = { Controller }
