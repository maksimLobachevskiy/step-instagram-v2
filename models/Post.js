const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: "users"
  },
  likes: [
    {
      type: ObjectId,
      ref: "users"
    }
  ],
  postedTime: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      by: {
        type: ObjectId,
        ref: "users"
      },
      comment: {
        type: String
      }
    }
  ]
});

module.exports = Post = mongoose.model("posts", PostSchema);
