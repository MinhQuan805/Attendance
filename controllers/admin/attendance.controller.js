const Attendance = require("../../models/attendance.model");
const Table = require("../../models/table.model");
const systemConfig = require("../../config/system");

// [GET] /attendance
module.exports.index = async (req, res) => {
    const tables = await Table.find({deleted: false});
    let id = req.query.course_id || tables[0].course_id;
    const attendances = await Attendance.find({
        course: {$elemMatch: {course_id: id}},
        deleted: false,
    });
    res.render("admin/pages/attendance/index", {
        pageTitle: "Danh sách học sinh",
        attendances: attendances,
        course_id: id,
        tables: tables,
    });
}

// [GET] /attendance/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/attendance/create", 
        {pageTitle: "Tạo mới bảng điểm danh",
    });
}

// [POST] /attendance/create
module.exports.createPost = async (req, res) => {
    let newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.redirect(`${systemConfig.prefixAdmin}/attendance`);
}

module.exports.updateAttendance = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const {studentId, courseId, index, currentStatus} = req.body;
        
        if (!studentId || !courseId || index === undefined) {
            return res.status(400).json({success: false, error: 'Missing required parameters'});
        }
        
        const student = await Attendance.findById(studentId);
        if (!student) {
            return res.status(404).json({success: false, error: 'Student not found'});
        }
        
        const course = student.course.find(c => c.course_id === courseId);
        if (!course) {
            return res.status(404).json({success: false, error: 'Course not found'});
        }
        
        let newStatus;
        if (!course.attend[index] || course.attend[index] === "Empty") {
            course.attend[index] = "Absent";
            newStatus = "Vắng";
        } 
        else if (course.attend[index] === "Absent") {
            course.attend[index] = "Empty";
            newStatus = "";
        }
        await student.save();
        console.log('Attendance updated:', {studentId, courseId, index, newStatus});
        res.json({success: true, newStatus});
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({success: false, error: error.message});
    }
};
