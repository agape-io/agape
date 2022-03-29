import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotificationModel = new Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: { type: String },
  read: { type: Boolean },
}, {
  timestamps: true,
});

export const Notification = mongoose.model('Notification', NotificationModel);
