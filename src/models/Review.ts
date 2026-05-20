import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  doctorId: string;
  userEmail: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    doctorId:  { type: String, required: true, index: true },
    userEmail: { type: String, required: true },
    userName:  { type: String, required: true },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    text:      { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

// One review per user per doctor
ReviewSchema.index({ doctorId: 1, userEmail: 1 }, { unique: true });

export const Review = (mongoose.models.Review as mongoose.Model<IReview>) || mongoose.model<IReview>("Review", ReviewSchema);