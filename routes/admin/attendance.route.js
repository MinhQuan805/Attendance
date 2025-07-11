const express = require("express");
const multer = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const router = express.Router();

const uploadCloud = require('../../middleware/admin/uploadCloud.middleware');
const upload = multer();

const controller = require("../../controllers/admin/attendance.controller.js");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",controller.createPost);
router.post("/update", controller.updateAttendance);
module.exports = router;