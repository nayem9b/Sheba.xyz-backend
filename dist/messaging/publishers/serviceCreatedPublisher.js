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
exports.publishServiceCreated = publishServiceCreated;
const config_1 = __importDefault(require("../../config"));
const kafka_1 = require("../kafka");
function publishServiceCreated(svc) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield (0, kafka_1.getKafkaProducer)().send({
            topic: config_1.default.kafka.topics.serviceCreated,
            messages: [{ key: svc.id, value: JSON.stringify(payload) }],
        });
        console.log(`📤 Published service created event for service: ${svc.name} (${svc.id})`);
    });
}
