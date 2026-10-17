const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  text: {
    type: String,
    required: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
});

chatMessageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);
