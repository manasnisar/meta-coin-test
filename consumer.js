const Kafka = require('kafka-node');
const Consumer = Kafka.Consumer;

// Specify the Kafka broker's address
const kafkaHost = 'localhost:9093';

// Create a Kafka client
const client = new Kafka.KafkaClient({ kafkaHost });

// Create a Kafka consumer
const consumer = new Consumer(client, [{ topic: 'test-meta-coin-topic', partition: 0 }], {
  autoCommit: true,
  groupId: 'test-meta-coin-group',
});

// Event handler for when a message is received
consumer.on('message', (message) => {
  console.log(`Received message: ${message.value}`);
});

// Event handler for consumer errors
consumer.on('error', (err) => {
  console.error(`Error consuming message: ${err}`);
});
