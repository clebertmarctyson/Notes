"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default
    .object({
    id: zod_1.default.number().positive().optional(),
    username: zod_1.default
        .string()
        .min(1)
        .max(15)
        .regex(/^[a-z]+$/),
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(20),
    confirmPassword: zod_1.default.string().min(8).max(20),
    createdAt: zod_1.default.date().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.loginUserSchema = zod_1.default
    .object({
    username: zod_1.default
        .string()
        .min(1)
        .max(15)
        .regex(/^[a-z]+$/)
        .optional(),
    email: zod_1.default.string().email().optional(),
    password: zod_1.default.string().min(8).max(20),
})
    .refine((data) => data.username || data.email, {
    message: "Please provide username or email",
    path: ["username", "email"],
});
