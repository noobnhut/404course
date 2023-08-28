const express = require("express");
const {
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require("../Controller/noteController");
const routerNote = express.Router();

routerNote.get("/api/note/get", getNote);
routerNote.post("/api/note/add", addNote);
routerNote.put("/api/note/update/:id", updateNote);
routerNote.delete("/api/note/delete/:id", deleteNote);

module.exports = {
  routerNote,
};
