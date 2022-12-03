const Note = require("../models/noteModel");
const mongoose = require("mongoose");

// get all notes
//ใช้คำสั่ง find เพื่อค้นใน mongodb
//แล้วส่่ง item กลับมาในรูปแบบ json
const getNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });

  res.status(200).json(notes);
};

// get a single note
//รับ id มา แล้วก็ หา item ที่เป็น id นั้น
//แล้วสงกลับมาเป็น json
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// create a new note
// การสร้าง note ใหม่ จะรับ json มา
//แล้วก็สร้าง note ใช้คำสั่ง create ตาม json ที่ได้มา
const createNote = async (req, res) => {
  const { title, before, text } = req.body;

  // add to the database
  try {
    const note = await Note.create({ title, before, text });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a note
//รับ id มา
//ใช้ find one and delete เพื่อลบ note ตาม id ที่ได้มา
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// update a note
//รับ json มา
//ใช้คำสั่ง find one and update เพื่อ update data ตาม json
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
