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
exports.deleteServiceFromDB = exports.updateServiceFromDB = exports.getSingleServiceFromDB = exports.getSingleServiceByCategoryIDFromDB = exports.getAllServiceFromDBService = exports.addServiceToDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const services_constant_1 = require("./services.constant");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const addServiceToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.services.create({
        data,
    });
    return result;
});
exports.addServiceToDB = addServiceToDB;
const getAllServiceFromDBService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(filtersData);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: services_constant_1.servicesSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(JSON.stringify(andConditions));
    console.log(JSON.stringify(whereConditions));
    if (filtersData === null || filtersData === void 0 ? void 0 : filtersData.title) {
        const result = yield prisma_1.default.services.findMany({
            where: {
                category: {
                    title: filtersData.title,
                },
            },
            include: {
                category: true,
            },
            take: limit,
            skip,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {},
        });
        const total = yield prisma_1.default.services.count({
            where: {
                category: {
                    title: filtersData.title,
                },
            },
        });
        return {
            meta: {
                total,
                page,
                limit,
            },
            data: result,
        };
    }
    else {
        const result = yield prisma_1.default.services.findMany({
            where: whereConditions,
            include: {
                category: true,
            },
            take: limit,
            skip,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {},
        });
        const total = yield prisma_1.default.services.count({
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
    }
});
exports.getAllServiceFromDBService = getAllServiceFromDBService;
const getSingleServiceByCategoryIDFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.findMany({
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.getSingleServiceByCategoryIDFromDB = getSingleServiceByCategoryIDFromDB;
const getSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.getSingleServiceFromDB = getSingleServiceFromDB;
const updateServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
exports.updateServiceFromDB = updateServiceFromDB;
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteReview = yield prisma_1.default.reviewAndRating.deleteMany({
        where: {
            servicesId: id,
        },
    });
    const deleteBooking = yield prisma_1.default.booking.deleteMany({
        where: {
            servicesId: id,
        },
    });
    if (!!deleteReview || !!deleteBooking) {
        const result = yield prisma_1.default.services.delete({
            where: {
                id,
            },
        });
        return result;
    }
});
exports.deleteServiceFromDB = deleteServiceFromDB;
