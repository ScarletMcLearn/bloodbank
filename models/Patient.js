var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = {

  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title required'
  },

  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content required'

  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Patient = mongoose.model('Patient', PatientSchema, 'patients');
module.exports = Patient;
