import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: String,
  name: String,
  specialty: String,
  img: String,
  exp: String,
  hospital: String,
  location: String,
  fee: Number,
  rating: Number,
  reviews: Number,
  description: String,
  availability: [String],
  times: [String],
});

export const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");