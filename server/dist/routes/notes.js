"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const noteRouter = (0, express_1.Router)();
noteRouter.route("/").post(notes_1.postNewNote).get(notes_1.getNotes);
noteRouter.route("/:id").get(notes_1.getNote).put(notes_1.updateNote).delete(notes_1.deleteNote);
exports.default = noteRouter;
