const express = require("express");
const router = express.Router();

const musicModel = require("../models/music");

// get all musics
router.get("/", async (req, res, next) => {
  try {
    const musics = await musicModel.find();
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
router.post("/", async (req, res, next) => {
  try {
    console.log("ADDING");
    const musicData = req.body;
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
    if (req.body.file) {
      music.artist = req.body.artist;
    }
    if (req.body.description) {
      music.album = req.body.album;
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
    console.log("DELETING", req.params.id)
    const music = await musicModel.deleteOne({ _id: req.params.id });

    res.status(204).json({message: "Deleted successfully"});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
