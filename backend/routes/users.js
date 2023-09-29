var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

function createToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '1w' });
}

// get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        // send the error message
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// get one user
router.get('/:id', async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.json(user);
    } catch (err){
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// create one user
router.post('/', async (req, res, next) => {
    try {
        const userData = req.body;

        // hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;

        const user = await new userModel(userData).save();

        res.status(201).json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// login
router.post('/login', async (req, res, next) => {
  const userData = req.body;
  const user = await userModel.findOne({ username: userData.username });

  // check if user exists
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(userData.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  // send token
  const token = createToken(user);
  res.json({ token });

})

module.exports = router;
