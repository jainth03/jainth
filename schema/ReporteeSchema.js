const mongoose = require('mongoose');
const ReporteeSchema = mongoose.Schema({
    reporter_name : {
        type : String,
        required : true,
        lowercase:true
    },
    reporter_team : {
        type : String,
        required : true
    },
    reportee_name : {
        type : String,
        required : true
    },
    team : {
        type : String,
        required : true
    },
    countermeasure_brief_if : {
        type : String,
        required : true
    },
    reporter_id : {
        type : String,
        required : true
    },
    // breif_if : {
    //     type : String,
    //     required : true
    // },
    changingThisBreaksApplicationSecurity : {
        type : String
    },
    createdDate : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Reportee',ReporteeSchema);