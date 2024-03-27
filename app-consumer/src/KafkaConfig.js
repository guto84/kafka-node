const { Kafka } = require("kafkajs")

class KafkaConfig {
  constructor(clientId, groupId) {
    this.kafka = new Kafka({
      clientId,
      brokers: ["kafka1:9092", "kafka2:9093", "kafka3:9094"],
    })
    this.consumer = this.kafka.consumer({ groupId })
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect()
      await this.consumer.subscribe({ topic, fromBeginning: true })
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log('TOPIC     >>>', topic)
          console.log('PARTITION >>>', partition)
          const value = message.value.toString()
          callback(value)
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { KafkaConfig }
