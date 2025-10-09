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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ssl_service_1 = require("./ssl/ssl.service");
const payment_constants_1 = require("./payment.constants");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const initPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentSession = yield ssl_service_1.sslService.initPayment({
        total_amount: data.amount,
        tran_id: data.transactionId,
        cus_name: data.customerName,
        cus_email: data.customerEmail,
        cus_add1: data.address,
        cus_phone: data.phone,
    });
    yield prisma_1.default.payment.create({
        data: {
            amount: data.amount,
            transactionId: data.transactionId,
            customerId: data.customerId,
        },
    });
    console.log(paymentSession);
    return paymentSession.redirectGatewayURL;
});
const webhook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.status) || (payload === null || payload === void 0 ? void 0 : payload.status) !== "VALID") {
        return {
            massage: "Invalid Payment!",
        };
    }
    const result = yield ssl_service_1.sslService.validate(payload);
    if ((result === null || result === void 0 ? void 0 : result.status) !== "VALID") {
        return {
            massage: "Payment failed",
        };
    }
    const { tran_id } = result;
    yield prisma_1.default.payment.updateMany({
        where: {
            transactionId: tran_id,
        },
        data: {
            status: client_1.PaymentStatus.PAID,
            paymentGatewayData: payload,
        },
    });
    return {
        massage: "Payment Success",
    };
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: payment_constants_1.paymentSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.payment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.payment.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.PaymentService = {
    initPayment,
    webhook,
    getAllFromDB,
    getByIdFromDB,
};
