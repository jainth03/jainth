const mongoose = require('mongoose');
const ApprovalSchema = mongoose.Schema({
    reportee_team : {
        type : String,
        required : true
    },
    reportee_countermeasure_brief_if : {
        type : String,
        required : true
    },
    final_approval : {
        type : String,
        required : true,
    },
    brief_if : {
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

module.exports = mongoose.model('Approval',ApprovalSchema);