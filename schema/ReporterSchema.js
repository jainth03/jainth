const mongoose = require('mongoose');
const ReporterSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase:true
    },
    team : {
        type : String,
        required : true
    },
    date_of_report : {
        type : String,
        required : true
    },
    issue_level_indicator : {
        type : String,
        required : true
    },
    responsible_team : {
        type : String,
        required : true
    },
    issue_location : {
        type : String,
        required : true
    },
    target : {
        type : String,
        required : true
    },
    brief : {
        type : String,
        required : true
    },
    changingThisBreaksApplicationSecurity : {
        type : String
    },
    createdDate : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Reporter',ReporterSchema);