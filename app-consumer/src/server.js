const { KafkaConfig } = require("./KafkaConfig")

const kafkaConfig = new KafkaConfig('my-group-consumer')
kafkaConfig.consume("my-topic", (value) => {
  console.log("<<< --- >>>: ", value)
})
