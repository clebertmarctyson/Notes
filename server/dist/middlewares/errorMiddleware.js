"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const zod_1 = require("zod");
const notFoundHandler = (req, res, next) => {
    res.status(404);
    const error = new Error(`Not found: ${req.originalUrl}`);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, req, res, next) => {
    var _a;
    res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
        message: error instanceof zod_1.ZodError ? (_a = error.issues.at(0)) === null || _a === void 0 ? void 0 : _a.message : error.message,
        stack: process.env.NODE_ENV === "production" ? "💩" : error.stack,
    });
    next();
};
exports.errorHandler = errorHandler;
