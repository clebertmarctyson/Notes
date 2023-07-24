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
exports.deleteUser = exports.updateUser = exports.getUser = exports.logOutUser = exports.loginUser = exports.signUpUser = void 0;
const users_1 = require("./../services/users");
const index_1 = require("./../utils/index");
const index_2 = require("../utils/index");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_2 = require("../schemas/users");
const users_3 = require("../services/users");
exports.signUpUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = users_2.userSchema.parse(req.body);
    if (yield (0, users_3.userExists)(userData)) {
        res.status(409);
        throw new Error("User already exists");
    }
    const createdUser = yield (0, users_3.createUser)(userData);
    const token = (0, index_2.generateToken)(createdUser.id);
    res
        .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    })
        .status(201)
        .json(createdUser);
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserData = users_2.loginUserSchema.parse(req.body);
    const user = yield (0, users_3.getUserByEmailOrUsername)(loginUserData.username, loginUserData.email);
    if (!user || (yield (0, index_1.unHashPassword)(loginUserData.password, user.password))) {
        res.status(400);
        throw new Error("Incorrect user credentials.");
    }
    const token = (0, index_2.generateToken)(user.id);
    res
        .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    })
        .status(201)
        .json(user);
}));
exports.logOutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    })
        .status(200)
        .json();
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const user = yield (0, users_3.getOneUser)(id);
    if (!user) {
        res.status(404);
        throw new Error(`User id: ${id} not found`);
    }
    res.status(200).json(user);
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const updatedUser = yield (0, users_1.updateOneUser)(Object.assign(Object.assign({}, userData), { 
        //@ts-ignore
        id: req.id }));
    res.status(200).json(updatedUser);
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield (0, users_3.deleteOneUser)(
    // @ts-ignore
    req.id);
    res.status(200).json(deletedUser);
}));
