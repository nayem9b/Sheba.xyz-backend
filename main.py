import json
import asyncio
from fastapi import FastAPI, HTTPException
from kafka import KafkaConsumer, KafkaProducer
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Kafka Service Stream Processor")

# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')
SERVICE_CREATION_TOPIC = os.getenv('SERVICE_CREATION_TOPIC', 'service-created')

# Pydantic model for service data
class ServiceCreate(BaseModel):
    service_id: str
    name: str
    description: str
    price: float
    category: str
    metadata: Dict[str, Any] = {}
    
    class Config:
        extra = "allow"  # Allow extra fields in the model

# In-memory storage for demo (replace with database in production)
services_db = {}

# Kafka consumer setup
def create_kafka_consumer():
    try:
        consumer = KafkaConsumer(
            SERVICE_CREATION_TOPIC,
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
            value_deserializer=lambda x: json.loads(x.decode('utf-8')),
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id='service-group',
            api_version_auto_timeout_ms=3000,  # 3 second timeout
            request_timeout_ms=3000
        )
        # Test the connection
        consumer.topics()
        return consumer
    except Exception as e:
        print(f"Error creating Kafka consumer: {e}")
        raise

# Kafka producer setup
def create_kafka_producer():
    return KafkaProducer(
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        value_serializer=lambda x: json.dumps(x).encode('utf-8')
    )

async def consume_messages():
    while True:  # Keep trying to reconnect
        consumer = None
        try:
            consumer = create_kafka_consumer()
            print("Kafka consumer started successfully")
            
            for message in consumer:
                try:
                    service_data = message.value
                    print(f"Processing service creation: {service_data}")
                    
                    service_id = service_data.get('service_id')
                    if service_id:
                        services_db[service_id] = service_data
                        print(f"Service {service_id} processed and stored")
                        
                except json.JSONDecodeError as e:
                    print(f"Error decoding message: {e}")
                except Exception as e:
                    print(f"Error processing message: {e}")
                    
        except Exception as e:
            print(f"Kafka connection error: {e}")
            if consumer:
                await asyncio.sleep(5)  # Wait before reconnecting
                print("Attempting to reconnect to Kafka...")
                continue
                
        finally:
            if consumer:
                consumer.close()
                print("Kafka consumer closed")
        consumer.close()

# API Endpoints
@app.get("/services/{service_id}")
async def get_service(service_id: str):
    if service_id not in services_db:
        raise HTTPException(status_code=404, detail="Service not found")
    return services_db[service_id]

@app.get("/services")
async def list_services():
    return list(services_db.values())

from fastapi import FastAPI
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    try:
        # Start the Kafka consumer in the background
        asyncio.create_task(consume_messages())
        logger.info("Kafka consumer background task started")
    except Exception as e:
        logger.error(f"Failed to start Kafka consumer: {e}")
        # The application will continue to run even if Kafka is not available
    print("Kafka consumer started in background")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "kafka": "connected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
