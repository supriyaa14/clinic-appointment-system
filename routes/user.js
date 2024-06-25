const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/user-data', async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (user) {
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            dob: user.dob.toISOString().split('T')[0],
            age: new Date().getFullYear() - user.dob.getFullYear()
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.get('/home-data', async (req, res) => {
    // Assuming some logic to get total bookings and next booking date (not implemented here)
    res.json({
        totalBookings: 5,
        nextBookingDate: '2023-12-01'
    });
});

module.exports = router;
