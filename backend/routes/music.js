const express = require("express");
const router = express.Router();

// Set up cloudinary
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqkd1gnef",
  api_key: "817879615381634",
  api_secret: "VcwTHXhG2vzYkS_HaMwbJHpGH4U",
});

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50MB file size limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("audio/")) {
      return cb(new Error("Only audio files are allowed!"));
    }
    cb(null, true);
  },
});

const musicModel = require("../models/music");

// get all musics
router.get("/", async (req, res, next) => {
  try {
    // latest musics first
    const musics = await musicModel.find().sort({ createdAt: -1 });
    res.json(musics);
  } catch (err) {
    // send the error message
    res.status(500).json({ message: err.message });
  }
});

// get one music
router.get("/:id", async (req, res, next) => {
  try {
    const music = await musicModel.findById(req.params.id);
    res.json(music);
  } catch {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// create one music
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    console.log("UPLOADING", req)
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      format: "mp3",
    });

    console.log("RESULT:", result.url);

    console.log("ADDING");
    const musicData = req.body;
    musicData.file = result.url;

    console.log(musicData);
    const music = await new musicModel(musicData).save();

    res.status(201).json(music);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// update one music
router.patch("/:id", async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const music = await musicModel.findById(req.params.id);
    if (req.body.title) {
      music.title = req.body.title;
    }
    if (req.body.artist) {
      music.artist = req.body.artist;
    }

    const updatedMusic = await music.save();
    res.json(updatedMusic);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// delete one music
router.delete("/:id", async (req, res, next) => {
  try {
    console.log("DELETING", req.params.id);
    const music = await musicModel.deleteOne({ _id: req.params.id });

    res.status(204).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
