const mongoose = require('mongoose');





const leadSchema = new mongoose.Schema({
   fullname :{
        type: String,
        required: true,
        trim: true
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
    DOB:{
        type: Date,
        required: true
    },
    gender:{
        type: String,
        enum:['Male','Female','Other'],
        required: true
    },
    countryofresidence:{
        type: String,
        required: true
    },
    preferencecountry:{
        type: String,
        required: true
    },
    prefferredcourse:{
        type: String,
        required: true
    },
    intake:{
        type: String,
        
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        
        default: 'None'
    },
    budget:{
        type: String,
        required: true
    },

 editRequest: {
  type: String,
  default: '',
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
    leaddate:{
        type: Date,
        default: Date.now
    },

   assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null
},
counsellorname: {
  type: String,  // can be optional if you use assignedTo ref
}
,
  remarks: {
    type: String,
  },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;