import { Schema, model } from "mongoose";
import { TypeComplaint } from "../interfaces/typeComplaint.interface.js";

const TypeComplaintSchema = new Schema<TypeComplaint>(
  {
    name: String,
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TypeComplaintModel = model("TypeComplaint", TypeComplaintSchema);

export default TypeComplaintModel;

