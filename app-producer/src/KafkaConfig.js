const { Kafka } = require("kafkajs")

class KafkaConfig {
  constructor(groupId) {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["kafka1:9092", "kafka2:9093", "kafka3:9094"],
    })
    this.admin = this.kafka.admin()
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId })
  }

  async createTopic(topic) {
    try {
      await this.admin.connect()
      await this.admin.createTopics({
        topics: [{
          topic,
          numPartitions: 3,
          replicationFactor: 2
        }]
    })
    } catch (error) {
      console.error(error)
    } finally {
      await this.admin.disconnect()
    }
  }

  async publish(topic, message) {
    try {
      await this.producer.connect()
      await this.producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
      })
    } catch (error) {
      console.error(error)
    } finally {
      await this.producer.disconnect()
    }
  }
}

module.exports = { KafkaConfig }
