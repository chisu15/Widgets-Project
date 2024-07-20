const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionType.controller");
const upload = require("../middlewares/uploadFile");

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/create', upload('image', 'questionType'), controller.create);
router.patch('/edit/:id', upload('image', 'questionType'), controller.edit);
router.delete('/delete/:id', controller.delete);
module.exports = router;
