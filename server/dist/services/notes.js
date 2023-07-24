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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNote = exports.modifyNote = exports.noteExists = exports.getOneNote = exports.getAllNotes = exports.createNote = void 0;
const models_1 = require("../models");
const createNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.create({ data: note });
});
exports.createNote = createNote;
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.findMany();
});
exports.getAllNotes = getAllNotes;
const getOneNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.findFirst({ where: { id } });
});
exports.getOneNote = getOneNote;
const noteExists = (note) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.findFirst({
        where: { OR: [{ title: note.title }, { content: note.content }] },
    });
});
exports.noteExists = noteExists;
const modifyNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.update({
        data: note,
        where: { id: note.id },
    });
});
exports.modifyNote = modifyNote;
const removeNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.prisma.note.delete({ where: { id } });
});
exports.removeNote = removeNote;
