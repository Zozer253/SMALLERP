const express = require("express");
const router = express.Router();
const { singup, login, miningsignup } = require("../controllers/authController");

router.post("/signup", singup);
router.post("/login", login);
router.post("/miningsignup", miningsignup);

module.exports = router;