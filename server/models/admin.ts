import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

export const Admin = mongoose.model('Admin', AdminModel);
