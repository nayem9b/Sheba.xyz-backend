import { Kafka, logLevel, Producer } from 'kafkajs';
import config from '../config';

let producer: Producer | null = null;

export async function initKafka() {
  const kafka = new Kafka({
    clientId: config.kafka.clientId,
    brokers: config.kafka.brokers,
    retry: { initialRetryTime: 300, retries: 8 },
    logLevel: logLevel.NOTHING,
  });
  producer = kafka.producer();
  await producer.connect();
  console.log('✅ Kafka producer connected');
}

export function getKafkaProducer(): Producer {
  if (!producer) throw new Error('Kafka producer not initialized');
  return producer;
}

export async function gracefulKafkaShutdown() {
  if (producer) {
    await producer.disconnect();
    console.log('✅ Kafka producer disconnected');
  }
}
