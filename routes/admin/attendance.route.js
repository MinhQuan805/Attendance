const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/attendance.controller.js");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",controller.createPost);
router.post("/update", controller.updateAttendance);
module.exports = router;