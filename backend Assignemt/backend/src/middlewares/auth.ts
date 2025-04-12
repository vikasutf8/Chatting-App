import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
    user?: any; // Adjust the type as necessary based on your User model
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = await User.findById(verified.id);
        if (!req.user) {
            return res.status(404).send('User  not found.');
        }
        next();
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).send('Invalid token.');
    }
};

export default auth;