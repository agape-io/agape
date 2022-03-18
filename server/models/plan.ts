import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlanModel = new Schema({
  name: { type: String },
  price: { type: String },
}, {
  timestamps: true,
});

export const Plan = mongoose.model('Plan', PlanModel);
