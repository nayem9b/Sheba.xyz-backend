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
exports.deleteCartFromDB = exports.getMyCartByUseridFromDB = exports.addCartToDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
require("dotenv/config");
const addCartToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.myCart.create({
        data,
    });
    return result;
});
exports.addCartToDB = addCartToDB;
const getMyCartByUseridFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.myCart.findMany({
        where: {
            userId: id,
        },
        include: {
            service: true,
        },
    });
    return result;
});
exports.getMyCartByUseridFromDB = getMyCartByUseridFromDB;
const deleteCartFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.myCart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteCartFromDB = deleteCartFromDB;
// export const clerkTesting = async () => {
//   const userList = await clerk?.users.getUserList();
//   console.log(userList);
// };
// async function getUsersList(): Promise<Clerk.User[]> {
//   const clerk = new Clerk({
//     secretKey: process.env.CLERK_SECRET_KEY,
//   });
//   const userList = await clerk.users.getUserList();
//   return userList;
// }
// const userList = clerk.users.getUserList({});
