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
exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.postNewNote = void 0;
const notes_1 = require("../services/notes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notes_2 = require("../services/notes");
const notes_3 = require("../schemas/notes");
exports.postNewNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteData = notes_3.noteSchema.parse(req.body);
    if (yield (0, notes_2.noteExists)(noteData)) {
        res.status(409);
        throw new Error("Note already exists");
    }
    const createdNote = yield (0, notes_2.createNote)(noteData);
    res.status(201).json(createdNote);
}));
exports.getNotes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, notes_2.getAllNotes)();
    res.status(200).json(notes);
}));
exports.getNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const note = yield (0, notes_2.getOneNote)(id);
    if (!note) {
        res.status(404);
        throw new Error(`Note id: ${id} not found`);
    }
    res.status(200).json(note);
}));
exports.updateNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
    const note = yield (0, notes_2.getOneNote)(id);
    if (!note) {
        res.status(404);
        throw new Error(`Note id: ${id} not found`);
    }
    const updatedNote = yield (0, notes_1.modifyNote)(Object.assign(Object.assign({}, note), { title: title ? title : note.title, content: content ? content : note.content }));
    res.status(200).json(updatedNote);
}));
exports.deleteNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const note = yield (0, notes_2.getOneNote)(id);
    if (!note) {
        res.status(404);
        throw new Error(`Note id: ${id} not found`);
    }
    const deletedNote = yield (0, notes_1.removeNote)(id);
    res.status(200).json(deletedNote);
}));
