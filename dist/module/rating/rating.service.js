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
exports.getSpecificServiceReviewFromDB = exports.getAllReviewsFromDBService = exports.addRatingToDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addRatingToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.reviewAndRating.create({
        data,
        include: {
            service: true,
        },
    });
    return result;
});
exports.addRatingToDB = addRatingToDB;
const getAllReviewsFromDBService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findMany({
        include: {
            service: {
                include: {
                    category: true,
                },
            },
        },
    });
    return result;
});
exports.getAllReviewsFromDBService = getAllReviewsFromDBService;
const getSpecificServiceReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findMany({
        where: {
            servicesId: id,
        },
        include: {
            service: {
                include: {
                    category: true,
                },
            },
        },
    });
    return result;
});
exports.getSpecificServiceReviewFromDB = getSpecificServiceReviewFromDB;
