"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.noteSchema = zod_1.default.object({
    id: zod_1.default.number().positive().optional(),
    title: zod_1.default.string().min(1).max(15),
    content: zod_1.default.string().min(1),
    createdAt: zod_1.default.date().optional(),
    userId: zod_1.default.number().positive()
});
