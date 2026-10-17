const mongoose = require("mongoose");

const orientationRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 120
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 10,
    match: /^\d{10}$/
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.models.OrientationRequest
  || mongoose.model("OrientationRequest", orientationRequestSchema);
