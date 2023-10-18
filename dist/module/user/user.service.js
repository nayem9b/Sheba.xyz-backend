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
exports.updateUserFromDB = exports.deleteUserFromDB = exports.getSingleDBUserFromDB = exports.getSingleUserFromDB = exports.getAllUsersFromDB = exports.loginUserToDB = exports.signUpUserTODB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const signUpUserTODB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data: data,
    });
    return result;
});
exports.signUpUserTODB = signUpUserTODB;
const loginUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: email,
            password: password,
        },
    });
    if (!isUserExist) {
        http_status_1.default.NOT_FOUND, "User does not exist";
    }
    else {
        const { id: userId, role } = isUserExist;
        const accessToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
        const refreshToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            accessToken,
            refreshToken,
        };
    }
});
exports.loginUserToDB = loginUserToDB;
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({});
    return result;
});
exports.getAllUsersFromDB = getAllUsersFromDB;
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            userId: userId,
        },
    });
    return result;
});
exports.getSingleUserFromDB = getSingleUserFromDB;
const getSingleDBUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id,
        },
    });
    return result;
});
exports.getSingleDBUserFromDB = getSingleDBUserFromDB;
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield prisma_1.default.user.deleteMany({
        where: {
            userId: id,
        },
    });
    return result;
});
exports.deleteUserFromDB = deleteUserFromDB;
const updateUserFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.updateMany({
        where: {
            userId: id,
        },
        data: payload,
    });
    return result;
});
exports.updateUserFromDB = updateUserFromDB;
