import { Request, Response } from 'express';
import Assignment from '../models/Assignment';
import mongoose from 'mongoose';

export const getAssignments = async (req: Request, res: Response) => {
    // Ensure user is authenticated
    if (!req.user) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    try {
        const assignments = await Assignment.find({ admin: req.user._id });
        res.json(assignments);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error fetching assignments.');
    }
};

export const acceptAssignment = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid assignment ID.');
    }

    try {
        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
        if (!assignment) return res.status(404).send('Assignment not found.');
        res.send('Assignment accepted.');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error accepting assignment.');
    }
};

export const rejectAssignment = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid assignment ID.');
    }

    try {
        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!assignment) return res.status(404).send('Assignment not found.');
        res.send('Assignment rejected.');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error rejecting assignment.');
    }
};