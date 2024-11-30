import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in environment variables.');
        process.exit(1); 
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    }
};

export default connectDB;