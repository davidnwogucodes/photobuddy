const multer = require("multer");
const Post = require("../models/post.models");
const { post } = require("../Routes/router");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage });

module.exports = {
  postImage: async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        res.send("please add description");
      }
      const file = req.file;

      if (!file) {
        res.send("please add image");
      }
      const username = req.session.user.username;
      if (!user) {
        res.send("unauthorized");
      }
      const post = new Post({
        author: username,
        image: file.path,
        description,
      });
      const isSaved = await post.save();
      if (!isSaved) {
        res.send("not saved");
      }
      res.send("post saved ");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  upload,
  getPost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) {
        res.send("cant obtain post");
      }
      res.json({ post });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchPosts: async (req, res) => {
    try {
      const isFetched = await Post.find({});
      if (!isFetched) {
        res.send("post not found");
      }
      res.json({ post });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deletePosts: async (req, res) => {
    try {
      const isDeleted = await Post.findOneAndDelete({ _id: req.params.id });
      if (!isDeleted) {
        res.send("unable to delete");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updatePosts: async (req, res) => {
    const isUpdated = await Post.findByIdAndUpdate({ _id: req.params.id });
    if (!isUpdated) {
      res.send("unable to update posts");
    }
  },
};
