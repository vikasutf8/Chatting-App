import { Schema, model, Document,Types } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    role: 'User ' | 'Admin';
}

const userSchema = new Schema<IUser >({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User ', 'Admin'], default: 'User ' },
});

const User = model<IUser >('User ', userSchema);
export default User;