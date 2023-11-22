import { Schema, model } from "mongoose";
import { Complaint } from "../interfaces/complaint.interface.js";

const ComplaintSchema = new Schema<Complaint>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String }],
    state: { type: String, default: "pendiente" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    observation: { type: String, default: null },
    typeComplaintId: { type: String, required: true },
    personId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ComplaintModel = model("Complaint", ComplaintSchema);

export default ComplaintModel;
