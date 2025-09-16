const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audioUrl"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fileData = await uploadFile(req.file);
  res.json({
    message: "songs created successfully",
    song: req.body,
  });
});

module.exports = router;
