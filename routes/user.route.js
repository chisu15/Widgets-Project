const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { verifyAccessToken } = require("../helpers/jwt_service");

router.get('/', verifyAccessToken, controller.index);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post("/refresh-token", controller.refreshToken);
module.exports = router;
