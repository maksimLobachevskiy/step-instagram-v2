const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, keys.secretOrKey, (err, payload) => {
    if (err) {
      return res.status(422).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id)
      .populate("posts", "url _id")
      .exec()
      .then((userdata) => {
        req.user = userdata;
        next();
      })
      .catch((err) => console.log(er));
  });
};
