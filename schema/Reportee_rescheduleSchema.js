const mongoose = require('mongoose');
const Reportee_rescheduleSchema = mongoose.Schema({
    reschedule_reporter_name : {
        type : String,
        required : true,
        lowercase:true
    },
    reschedule_reporter_team : {
        type : String,
        required : true
    },
    re_target_date : {
        type : String,
        required : true
    },
    breif_if : {
        type : String,
        required : true
    },
    reporter_id : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Reporteeshedule',Reportee_rescheduleSchema);