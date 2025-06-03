const mongoose = require('mongoose');





const leadSchema = new mongoose.Schema({
    firstname :{
        type: String,
        required: true
    },
    lastname :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/
    },
    countryofinterest: {
        type: String,
        required: true
    },

    course : {
        type: String,
        required: true
    },
    source:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Followed Up', 'Converted', 'Not Interested'],
        default: 'New'
    },

     assignedTo: {
    type: String, // just store counsellor name
    default: 'Unassigned'
  },
    followUps: [{
        date: {
            type: Date,
            default: Date.now
        },
        notes: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;