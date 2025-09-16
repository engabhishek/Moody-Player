const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const songModel = require("../models/song.model");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audioUrl"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fileData = await uploadFile(req.file, req.body.title);

  const song = await songModel({
    title: req.body.title,
    artist: req.body.artist,
    audioUrl: fileData.url,
    mood: req.body.mood,
  });

  res.status(201).json({
    message: "songs created successfully",
    song: song,
  });
});

module.exports = router;
