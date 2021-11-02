const router = require('express').Router();
const PostController = require("../controllers/PostController");

router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.put("/:id/like", PostController.likePost);
router.get("/:id", PostController.getPost);
router.get("/timeline/all", PostController.getTimelinePost);

module.exports = router;