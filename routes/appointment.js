const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

router.post('/book-appointment', async (req, res) => {
    const { appointmentDate, time, doctor, purpose } = req.body;
    const userId = req.user.userId;

    const appointment = new Appointment({ userId, date: appointmentDate, time, doctor, purpose });

    try {
        await appointment.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
});

router.get('/my-appointments', async (req, res) => {
    const userId = req.user.userId;
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
});

module.exports = router;
