import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  userEmail: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  doctorImg: string;
  patientName: string;
  gender: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  fee: number;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userEmail: { type: String, required: true, index: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: String, default: "" },
    doctorImg: { type: String, default: "" },
    patientName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
    phone: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    status: { type: String, enum: ["Upcoming", "Completed", "Cancelled"], default: "Upcoming" },
    fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model<IAppointment>("Appointment", AppointmentSchema);
