const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userimg: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      type: ObjectId,
      ref: "users"
    }
  ],
  following: [
    {
      type: ObjectId,
      ref: "users"
    }
  ],
  posts: [
    {
      type: ObjectId,
      ref: "posts"
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
