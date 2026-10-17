const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  type: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  url: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2048
  },
  image: {
    type: String,
    trim: true,
    maxlength: 2048
  }
}, {
  timestamps: true,
  versionKey: false
});

partnerSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
