const Attendance = require("../../models/attendance.model");
const systemConfig = require("../../config/system");
// [GET] /student
module.exports.index = async (req, res) => {
    const attendances = await Attendance.find({
        deleted: false,
    });
    res.render("admin/pages/student/index", {
        pageTitle: "Danh sách học sinh",
        attendances: attendances,
    });
}
// [GET] /student/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/student/create", {
        pageTitle: "Thêm học sinh",
    });
}
// [POST] /student/create
module.exports.createPost = async (req, res) => {
    const student = new Attendance(req.body);
    await student.save();
    res.redirect(`${systemConfig.prefixAdmin}/student`);
}