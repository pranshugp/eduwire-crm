const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  stepNumber: {
    type: Number,
    
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  autoEmailTemplate: {
    type: String // could be HTML or plain text
  },
  order: {
    type: Number, // for drag-and-drop sorting
    default: 0
  }
}, {
  timestamps: true
});

module.exports =  mongoose.model('Status', statusSchema);
