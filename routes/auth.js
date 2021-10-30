const router = require('express').Router();
const AuthController = require("../controllers/AuthController");

router.post("/signupUser", AuthController.signupUser);
router.post("/signinUser", AuthController.signinUser);

module.exports = router;