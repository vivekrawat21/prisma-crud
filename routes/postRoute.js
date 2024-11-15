const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { createPost, updatePost, deletePost, getAllPost } = require("../controllers/postController");
router.route('/post').post(isLoggedIn,createPost);
router.route('/post/:id').put(isLoggedIn, updatePost);
router.route('/post/:id').delete(isLoggedIn, deletePost);
router.route('/post').get(getAllPost);

module.exports=router