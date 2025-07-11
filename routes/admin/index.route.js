const systemConfig = require("../../config/system");
const attendanceRoutes = require("./attendance.route");
const studentRoutes = require("./student.route");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/attendance", attendanceRoutes);
    app.use(PATH_ADMIN + "/student", studentRoutes);
}