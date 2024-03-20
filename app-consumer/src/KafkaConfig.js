const { Kafka } = require("kafkajs")

class KafkaConfig {
  constructor(groupId) {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["kafka1:9092", "kafka2:9093", "kafka3:9094"],
    })
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId })
  }

  async produce(topic, message) {
    try {
      await this.producer.connect()
      await this.producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }]
      })
    } catch (error) {
      console.error(error)
    } finally {
      await this.producer.disconnect()
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect()
      await this.consumer.subscribe({ topic: topic, fromBeginning: true })
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log('TOPIC ->', topic)
          console.log('PARTITION ->', partition)
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
