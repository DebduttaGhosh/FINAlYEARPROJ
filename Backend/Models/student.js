const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Serial: Number,
    Name: String,
    Roll: String,
    Current_Semester: String,
    Current_Year : String,
    SGPA_1: { type: Number, default: 0 },
    SGPA_2: { type: Number, default: 0 },
    SGPA_3: { type: Number, default: 0 },
    SGPA_4: { type: Number, default: 0 },
    SGPA_5: { type: Number, default: 0 },
    SGPA_6: { type: Number, default: 0 },
    SGPA_7: { type: Number, default: 0 },
    SGPA_8: { type: Number, default: 0 },
    Active_Backlog: { type: Number, default: 0 },
    Backlog_Subject: String,
    Subject1 : String,
    Subject2 : String,
    Subject3 : String,
    Subject4 : String,
    Action: String
});

module.exports = mongoose.model('Student', studentSchema);
