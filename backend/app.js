require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' }))

// cors allow all origins
const cors = require('cors');
app.use(cors({ origin: "*"})); 

const port = process.env.PORT || 3000;

// import routes
const music = require('./routes/music');

const router = express.Router();

// set up db
var mongoose = require("mongoose");

mongoose.set("strictQuery", false);
var url = process.env.MONGODB_CONNECT_URL;

async function connect() {
  for (let i = 0; i < 5; i++) {
    try {
      await mongoose.connect(url);
      break;
    } catch {
      console.log("Error connecting to db, Retrying...", i + 1);
    }
  }

  // check if connection successful
  if (mongoose.connection.readyState !== 1) {
    console.log("Error connecting to db");
  } else {
    console.log("Connected to db");
  }
}

connect().catch((error) => console.log("Error connecting to DB: ", error));

// assign the controller to the route
app.use('/music', music);

// error route
app.use((err, req, res, next) => {
  console.log(err.message)
  console.log("IN ERROR ROUTE");
  res.status(404).json({ error: err.message });
})

// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;