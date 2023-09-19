const Kafka = require('kafka-node');
const Producer = Kafka.Producer;

// Specify the Kafka broker's address
const kafkaHost = 'localhost:9093';

// Create a Kafka client
const client = new Kafka.KafkaClient({ kafkaHost });

// Create a Kafka producer
const producer = new Producer(client);

// Event handler for when the producer is ready
producer.on('ready', () => {
  const topic = 'test-meta-coin-topic';

  // Produce 10,000 random messages
  for (let i = 0; i < 10000; i++) {
    const message = `Message ${i}`;

    // Create a payload with the message to be sent to Kafka
    const payloads = [{ topic, messages: message }];

    // Send the message to Kafka
    producer.send(payloads, (error, data) => {
      if (error) {
        console.error(`Error sending message: ${error}`);
      } else {
        console.log(`Sent message: ${message}`);
      }
    });
  }
});

// Event handler for producer errors
producer.on('error', (err) => {
  console.error(`Error connecting to Kafka: ${err}`);
});
