const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const isLogged = require("../../middleware/isLogged");

// Load User model
const User = require("../../models/User");

router.post("/user/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate("posts")

    .exec()
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(422).json({ error: "Invalid Username" });
      } else {
        foundUser.password = undefined;
        res.json({ user: foundUser });
      }
    })
    .catch((er) => console.log(er));
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter all fields." });
  }
  User.findOne({ email: email })
    .populate("posts", "url _id")
    .exec()
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(422).json({ error: "Invalid email or password." });
      }
      bcrypt
        .compare(password, foundUser.password)
        .then((doMatched) => {
          if (doMatched) {
            const token = jwt.sign({ _id: foundUser._id }, keys.secretOrKey);
            res.json({
              token,
              message: "Successfully signed in.",
              user: foundUser
            });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid email or password." });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/allusers", (req, res) => {
  User.find()
    .populate("posts", "src _id")
    .populate("followers", "_id")
    .populate("following", "_id")
    .exec()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => console.log(err));
});

router.post("/user/:username/follow", isLogged, (req, res) => {
  User.findOne({ username: req.params.username })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(422).json({ error: "Invalid Username" });
      } else {
        if (
          foundUser.followers.find((followerId) =>
            followerId.equals(req.user._id)
          )
        ) {
          User.updateOne(
            { username: req.params.username },
            { $pull: { followers: req.user._id } }
          ).exec();
          User.updateOne(
            { username: req.user.username },
            { $pull: { following: foundUser._id } }
          ).exec();
        } else {
          User.updateOne(
            { username: req.params.username },
            { $push: { followers: req.user._id } }
          ).exec();
          User.updateOne(
            { username: req.user.username },
            { $push: { following: foundUser._id } }
          ).exec();
        }
      }
    })
    .catch((er) => console.log(er));
  res.json({ message: "task completed." });
});

module.exports = router;
