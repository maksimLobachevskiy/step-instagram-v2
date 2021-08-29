const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const isLogged = require("../../middleware/isLogged");

router.post("/", (req, res) => {
  res.json({ isLogged: true, user: req.user });
});

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id username userimg")
    .populate("comments.by", "_id username userimg")
    .populate("likes", "_id username")
    .exec()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

//Add new comment
router.post("/postcomment", (req, res) => {
  const { postId, postedBy, comment } = req.body;

  Post.findById(postId, "comments")
    .then((post) => {
      Post.updateOne(
        { _id: postId },
        { $push: { comments: { by: postedBy, comment } } }
      )
        .exec()
        .catch((er) => console.log(er));
    })
    .catch((er) => console.log(er));
  res.json({ message: "task completed." });
});

//Получить все комменты поста
router.get("/:postId/comments", isLogged, (req, res) => {
  Post.findById(req.params.postId, "comments")
    .populate("comments.by", "username userimg _id")
    .exec()
    .then((comments) => {
      if (comments) {
        res.json({ comments });
      } else {
        res.status(422).json({ error: "no comments" });
      }
    })
    .catch((er) => console.log(er));
});

//Like post
router.post("/like", isLogged, (req, res) => {
  const { postId } = req.body;
  Post.findById(postId, "likes")
    .then((post) => {
      if (post.likes.find((likeid) => likeid.equals(req.user._id))) {
        Post.updateOne(
          { _id: postId },
          { $pull: { likes: req.user._id } }
        ).exec();
      } else {
        Post.updateOne(
          { _id: postId },
          { $push: { likes: req.user._id } }
        ).exec();
      }
    })
    .catch((er) => console.log(er));
  res.json({ message: "task completed." });
});

module.exports = router;
