const express = require("express");
const router = express.Router();
const controller = require("../controllers/generalType.controller");
const upload = require("../middlewares/uploadFile");

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);
router.post('/create', upload('image', 'generalType'), controller.create);
router.patch('/edit/:id', upload('image', 'generalType'), controller.edit);
router.delete('/delete/:id', controller.delete);
module.exports = router;
