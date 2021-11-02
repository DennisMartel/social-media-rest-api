const router = require('express').Router();
const PostController = require("../controllers/PostController");

router.post("/", PostController.createPost);

module.exports = router;