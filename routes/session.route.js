const express = require("express");
const router = express.Router();
const controller = require("../controllers/session.controller");

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.delete('/delete/:id', controller.delete);
router.post("/expire-all", controller.expireAll)
module.exports = router;
