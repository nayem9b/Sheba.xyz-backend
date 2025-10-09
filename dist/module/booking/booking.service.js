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
exports.deleteBookingFromDB = exports.updateBookingFromDB = exports.getAllRejectedBookingsFromDB = exports.getAllCanceledBookingsFromDB = exports.getAllDeliveredBookingsFromDB = exports.getAllPendingBookingsFromDB = exports.getAllBookingsFromDB = exports.getBookingByidFromDB = exports.getBookingByUseridFromDB = exports.addBookingToDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addBookingToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.booking.create({
        data,
        include: {
            service: true,
        },
    });
    return result;
});
exports.addBookingToDB = addBookingToDB;
const getBookingByUseridFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId: id,
        },
        include: {
            service: true,
        },
    });
    return result;
});
exports.getBookingByUseridFromDB = getBookingByUseridFromDB;
const getBookingByidFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
        include: {
            service: true,
        },
    });
    return result;
});
exports.getBookingByidFromDB = getBookingByidFromDB;
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
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
exports.getAllBookingsFromDB = getAllBookingsFromDB;
const getAllPendingBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            status: "pending",
        },
    });
    return result;
});
exports.getAllPendingBookingsFromDB = getAllPendingBookingsFromDB;
const getAllDeliveredBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            status: "delivered",
        },
    });
    return result;
});
exports.getAllDeliveredBookingsFromDB = getAllDeliveredBookingsFromDB;
const getAllCanceledBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            status: "canceled",
        },
    });
    return result;
});
exports.getAllCanceledBookingsFromDB = getAllCanceledBookingsFromDB;
const getAllRejectedBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            status: "rejected",
        },
    });
    return result;
});
exports.getAllRejectedBookingsFromDB = getAllRejectedBookingsFromDB;
const updateBookingFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
        include: {
            service: true,
        },
    });
    return result;
});
exports.updateBookingFromDB = updateBookingFromDB;
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield prisma_1.default.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteBookingFromDB = deleteBookingFromDB;
