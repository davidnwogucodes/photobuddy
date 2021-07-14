const express = require("express");
const { signup, login } = require("../controller/auth");
const {
  postImage,
  upload,
  getPost,
  fetchPosts,
  deletePosts,
  updatePosts,
} = require("../controller/post");
const router = express.Router();
router.get("/image", (req, res) => {
  res.send(
    "<form action='/image' method='post' enctype='multipart/form-data' ><input type='file' name='photo'/><input type='submit' value='upload an image'/></form>"
  );
});
// router.post("/postImage", postImage);
router.post("/getPost", getPost);
router.post("/fetchPosts", fetchPosts);
router.post("/deletePosts", deletePosts);
router.post("/updatePosts", updatePosts);
router.post("/login", login);
router.get("/login", (req, res) => {
  res.send(
    "<form action='/login' method='post'><input type='text' name='email'/><br/><input type='text' name='password'/><input type='submit' value='login'/></form>"
  );
});

router.post("/image", upload.single("photo"), postImage);
module.exports = router;
