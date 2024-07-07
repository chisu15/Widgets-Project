const express = require("express");
const router = express.Router();
const controller = require("../controllers/role.controller");

router.get('/', controller.index);
router.get('/:id', controller.detail);
router.post('/', controller.create);
router.patch('/edit/:id', controller.edit);
router.delete('/:id', controller.delete);
module.exports = router;
