import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserModel = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  isOnline: { type: Boolean, default: false },
  profile: {
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    yearBorn: { type: String },
    aboutMe: { type: String },
    religion: { type: String },
    location: { type: String },
    hobbies: [{ type: String }],
    photo: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  preferences: {
    sexuality: { type: String },
    maxDist: {
      type: String,
      default: 100,
    },
    minAge: {
      type: String,
      default: 18,
    },
    maxAge: {
      type: String,
      default: 23,
    },
    religion: [{ type: String }],
  },
  settings: {
    pushNotifications: Boolean,
    membershipType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      default: '6233c60d59af3002b221b0ce',
    },
    endingDate: {
      type: Date,
      default: null,
    },
    billingDate: {
      type: Date,
      default: null,
    },
  },
  swipedLeft: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  swipedRight: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserModel);
