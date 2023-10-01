const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MusicModel = mongoose.model("Music", MusicSchema);
module.exports = MusicModel;
