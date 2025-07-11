const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const attendanceSchema = new mongoose.Schema({
    fullName: String,
    student_id: String,
    phone: String,
    facebook: String,
    email: String,
    course: [{
        course_id: String,
        attend: [String],
    }],
    slug: { type: String, slug: "fullName", unique: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {timestamps: true});

const Attendance = mongoose.model('Attendance', attendanceSchema, "attendances");

module.exports = Attendance;