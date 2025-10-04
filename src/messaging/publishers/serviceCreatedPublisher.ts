import { Services } from '@prisma/client';
import config from '../../config';
import { getKafkaProducer } from '../kafka';

export async function publishServiceCreated(svc: Services) {
  const payload = {
    id: svc.id,
    name: svc.name,
    price: svc.price,
    details: svc.details,
    image: svc.image,
    categoryId: svc.categoryId,
    rating: svc.rating,
    location: svc.location,
    status: svc.status,
  };
  
  await getKafkaProducer().send({
    topic: config.kafka.topics.serviceCreated,
    messages: [{ key: svc.id, value: JSON.stringify(payload) }],
  });
  
  console.log(`📤 Published service created event for service: ${svc.name} (${svc.id})`);
}
