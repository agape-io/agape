import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserModel = new Schema({
  email: { type: String },
  password: { type: String },
  isOnline: { type: Boolean },
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
    maxDist: { type: String },
    minAge: { type: String },
    maxAge: { type: String },
    religion: [{ type: String }],
  },
  settings: {
    pushNotifications: Boolean,
    membershipType: String,
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
