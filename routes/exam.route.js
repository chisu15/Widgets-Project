const express = require("express");
const router = express.Router();
const controller = require("../controllers/exam.controller");
const { verifyAccessToken } = require('../helpers/jwt_service');

router.get('/', controller.index);
router.get('/detail/:id', controller.detail);

// router.post('/create', verifyAccessToken(['admin', 'teacher']), controller.create);
router.post('/start/:id', verifyAccessToken('student'), controller.start);

router.post('/create', controller.create);
// router.post('/start/:id', controller.start);

router.patch('/edit/:id', controller.edit);
router.delete('/delete/:id', controller.delete);

module.exports = router;
