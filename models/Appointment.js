const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    doctor: { type: String, required: true },
    purpose: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
