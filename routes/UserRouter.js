const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers"); // Route 는 오직 Controller 에만 의존 합니다.

router.post("/sign-in", UserController.signIn); // '/users/login'
router.post("/sign-up", UserController.signUp);

module.exports = router;
