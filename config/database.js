const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/attendance');
        console.log("Connect Success");
    }
    catch(err) {
        console.log(`Connect Error: ${err}`);
    }
}
module.exports = connection;