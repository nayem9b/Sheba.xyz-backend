import { Kafka } from 'kafkajs';

export async function startServiceCreatedConsumer() {
  const kafka = new Kafka({ 
    clientId: 'sheba-graphql', 
    brokers: ['localhost:29092'] 
  });
  
  const consumer = kafka.consumer({ groupId: 'graphql-service-created' });
  
  try {
    await consumer.connect();
    console.log('✅ GraphQL Kafka consumer connected');
    
    await consumer.subscribe({ 
      topic: 'services.created.v1', 
      fromBeginning: false 
    });
    
    await consumer.run({
      eachMessage: async ({ message }) => {
        if (message?.value) {
          const evt = JSON.parse(message.value.toString());
          console.log('📨 ServiceCreated event received in GraphQL service:', {
            serviceId: evt.id,
            serviceName: evt.name,
            price: evt.price,
            location: evt.location,
            status: evt.status,
            categoryId: evt.categoryId,
            rating: evt.rating
          });
          
          // Here you could:
          // - Update GraphQL cache
          // - Send real-time notifications
          // - Trigger other business logic
          // - Update search indexes
        }
      }
    });
  } catch (error) {
    console.error('❌ GraphQL Kafka consumer error:', error);
  }
}

export async function stopServiceCreatedConsumer() {
  // This would be called during graceful shutdown
  console.log('🛑 Stopping GraphQL Kafka consumer...');
}
