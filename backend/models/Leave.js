const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNumber: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: String, required: true },
  leaveDateFrom: { type: Date, required: true },
  leaveDateTo: { type: Date, required: true },
  totalLeaveDays: { type: Number, required: true },
  reason: { type: String, required: true },
  leaveAlreadyAvailed: { type: Number, required: true },
  labSessionOnLeaveDate: { type: Boolean, required: true },
  labDetails: { type: String }
});

module.exports = mongoose.model('Leave', leaveSchema);
