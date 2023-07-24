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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.updateOneUser = exports.userExists = exports.getUserByEmailOrUsername = exports.getOneUser = exports.createUser = void 0;
const index_1 = require("./../utils/index");
const models_1 = require("../models");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmPassword, password } = user, userWithoutPassword = __rest(user, ["confirmPassword", "password"]);
    return yield models_1.prisma.user.create({
        data: Object.assign(Object.assign({}, userWithoutPassword), { password: yield (0, index_1.hashPassword)(password) }),
    });
});
exports.createUser = createUser;
const getOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.user.findFirst({ where: { id } });
});
exports.getOneUser = getOneUser;
const getUserByEmailOrUsername = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.user.findFirst({
        where: { OR: [{ username }, { email }] },
    });
});
exports.getUserByEmailOrUsername = getUserByEmailOrUsername;
const userExists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.user.findFirst({
        where: { OR: [{ username: user.username }, { email: user.email }] },
    });
});
exports.userExists = userExists;
const updateOneUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmPassword, password } = user, userWithoutPassword = __rest(user, ["confirmPassword", "password"]);
    const searchedUser = yield (0, exports.getOneUser)(user.id);
    return yield models_1.prisma.user.update({
        data: Object.assign(Object.assign({}, userWithoutPassword), { username: userWithoutPassword.username
                ? userWithoutPassword.username
                : searchedUser === null || searchedUser === void 0 ? void 0 : searchedUser.username, name: userWithoutPassword.name
                ? userWithoutPassword.name
                : searchedUser === null || searchedUser === void 0 ? void 0 : searchedUser.name, email: userWithoutPassword.email
                ? userWithoutPassword.email
                : searchedUser === null || searchedUser === void 0 ? void 0 : searchedUser.email, password: password
                ? yield (0, index_1.hashPassword)(password)
                : searchedUser === null || searchedUser === void 0 ? void 0 : searchedUser.password }),
        where: { id: userWithoutPassword.id },
    });
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.user.delete({ where: { id } });
});
exports.deleteOneUser = deleteOneUser;
