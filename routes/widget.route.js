const express = require("express");
const router = express.Router();
const controller = require("../controllers/widget.controller");

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
