const { KafkaConfig } = require("./KafkaConfig")

const kafkaConfig0 = new KafkaConfig('nodejs-kafka0', 'my-group-consumer')
const kafkaConfig1 = new KafkaConfig('nodejs-kafka1', 'my-group-consumer')
const kafkaConfig2 = new KafkaConfig('nodejs-kafka2', 'my-group-consumer')

kafkaConfig0.consume("topic", (value) => {
  console.log("CONSUMER 0 >>>: ", value)
})

kafkaConfig1.consume("topic", (value) => {
  console.log("CONSUMER 1 >>>: ", value)
})

kafkaConfig2.consume("topic", (value) => {
  console.log("CONSUMER 2 >>>: ", value)
})
