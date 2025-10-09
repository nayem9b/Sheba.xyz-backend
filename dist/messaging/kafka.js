"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKafka = initKafka;
exports.getKafkaProducer = getKafkaProducer;
exports.gracefulKafkaShutdown = gracefulKafkaShutdown;
const kafkajs_1 = require("kafkajs");
const config_1 = __importDefault(require("../config"));
let producer = null;
function initKafka() {
    return __awaiter(this, void 0, void 0, function* () {
        const kafka = new kafkajs_1.Kafka({
            clientId: config_1.default.kafka.clientId,
            brokers: config_1.default.kafka.brokers,
            retry: { initialRetryTime: 300, retries: 8 },
            logLevel: kafkajs_1.logLevel.NOTHING,
        });
        producer = kafka.producer();
        yield producer.connect();
        console.log('✅ Kafka producer connected');
    });
}
function getKafkaProducer() {
    if (!producer)
        throw new Error('Kafka producer not initialized');
    return producer;
}
function gracefulKafkaShutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        if (producer) {
            yield producer.disconnect();
            console.log('✅ Kafka producer disconnected');
        }
    });
}
