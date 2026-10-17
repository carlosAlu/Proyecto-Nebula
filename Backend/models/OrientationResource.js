const mongoose = require("mongoose");

const orientationResourceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["sitios", "multimedia", "documentos"]
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  source: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  url: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2048
  },
  embedUrl: {
    type: String,
    trim: true,
    maxlength: 2048
  },
  type: {
    type: String,
    required: true,
    enum: ["link", "video", "pdf"]
  }
}, {
  timestamps: true,
  versionKey: false
});

orientationResourceSchema.index({ category: 1, url: 1 }, { unique: true });

module.exports = mongoose.models.OrientationResource
  || mongoose.model("OrientationResource", orientationResourceSchema);
