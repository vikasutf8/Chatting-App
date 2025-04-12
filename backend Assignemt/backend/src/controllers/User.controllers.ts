import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Assignment from '../models/Assignment';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate username and password lengths
    if (username.length < 6) {
        return res.status(400).send('Username must be at least 6 characters long.');
    }
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ username, password: hashedPassword });
        await newUser .save();
        res.status(201).send('User  registered successfully.');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send('Error registering user.');
    } finally {
        console.log('Register attempt finished.'); // This will run regardless of the outcome
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate username and password presence
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User  not found.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials.');

        // Check JWT_SECRET
        const secret = process.env.JWT_SECRET || 'default_secret'; // Fallback secret
        const token = jwt.sign({ id: user._id }, secret);
        res.json({ token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error logging in.');
    } finally {
        console.log('Login attempt finished.'); // This will run regardless of the outcome
    }
};

export const uploadAssignment = async (req: Request, res: Response) => {
    const { task, admin } = req.body;

    // Ensure req.user is defined
    if (!req.user) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const assignment = new Assignment({ userId: req.user._id, task, admin });
    try {
        await assignment.save();
        res.status(201).send('Assignment uploaded successfully.');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send('Error uploading assignment.');
    } finally {
        console.log('Upload assignment attempt finished.'); // This will run regardless of the outcome
    }
};