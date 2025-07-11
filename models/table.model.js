const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

// Mảng chứa 10 buổi của 1 học kì
const tableSchema = new mongoose.Schema({
    title: String,
    course_id: String,
    cell: {
        type: [Date],
        default: [],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: { type: String, slug: "title", unique: true },
}, {timestamps: true});

const Table = mongoose.model('Table', tableSchema, "tables");

module.exports = Table;
