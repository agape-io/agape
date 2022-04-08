import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminModel = new Schema({
  email: { type: String },
  password: { type: String },
}, {
  timestamps: true,
});

export const Admin = mongoose.model('Admin', AdminModel);
