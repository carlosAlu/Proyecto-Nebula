const mongoose = require("mongoose");

const anonymousReportSchema = new mongoose.Schema({
  folio: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Psicológica", "Física", "Sexual", "Económica", "Patrimonial", "Digital", "Otra"]
  },
  place: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  status: {
    type: String,
    required: true,
    enum: ["Recibido", "En revisión", "En seguimiento", "Resuelto"],
    default: "Recibido"
  },
  evidence: {
    fileName: { type: String, maxlength: 255 },
    mimeType: { type: String, enum: ["image/jpeg", "image/png", "image/webp", "application/pdf"] },
    data: Buffer
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.models.AnonymousReport
  || mongoose.model("AnonymousReport", anonymousReportSchema);
