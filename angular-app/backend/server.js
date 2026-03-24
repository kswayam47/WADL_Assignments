const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/user_registration_db';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));


app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password, year, department } = req.body;
        console.log('Register request body:', req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const newUser = new User({ name, email, password, year, department });
        const savedUser = await newUser.save();
        console.log('User saved to DB:', savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
    }
});


app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found with this email' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        console.log('Login successful for:', user.email);
        res.json(user);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
});


app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        console.log('Fetching user details for:', user.email);
        res.json(user);
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ message: err.message });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/api/users/:id', async (req, res) => {
    try {
        const { name, email, year, department } = req.body;
        console.log('Update request for ID:', req.params.id, 'Data:', { name, email, year, department });

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, year, department },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        console.log('User updated successfully:', updatedUser);
        res.json(updatedUser);
    } catch (err) {
        console.error('Update error:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE USER (Delete)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Schema confirmed with year and department fields');
});
