import mongoose from 'mongoose';

import { GENDER, MEMBERSHIP_TYPES, SEXUALITY } from '../config/constants';

const { Schema } = mongoose;

const UserModel = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  profile: {
    name: { type: String },
    age: { type: Number, min: 18 },
    gender: { type: String, enum: GENDER, lowercase: true },
    yearBorn: { type: Number },
    aboutMe: { type: String },
    religion: { type: String },
    location: { type: String },
    hobbies: [{ type: String }],
    photo: { type: String, default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' },
  },
  preferences: {
    sexuality: { type: String, enum: SEXUALITY, lowercase: true },
    maxDist: { type: Number, default: 100 },
    minAge: { type: Number, default: 18, min: 18 },
    maxAge: { type: Number, default: 23, min: 18 },
    religion: [{ type: String }],
  },
  settings: {
    pushNotifications: { type: Boolean, default: false },
    membershipType: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', default: MEMBERSHIP_TYPES.BASIC, enum: MEMBERSHIP_TYPES },
    endingDate: { type: Date, default: null },
    billingDate: { type: Date, default: null },
  },
  swipedLeft: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  swipedRight: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserModel);
