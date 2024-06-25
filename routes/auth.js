const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { firstName, lastName, gender, dob, address, contactNumber, email } = req.body;
    const password = 'Change@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, gender, dob, address, contactNumber, email, password: hashedPassword });

    try {
        await user.save();
        // Assuming sendEmail is a function to send emails (not implemented here)
        // sendEmail(email, password);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;
