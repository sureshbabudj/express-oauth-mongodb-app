import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
