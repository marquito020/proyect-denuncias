import { Schema, model } from "mongoose";
import { Area } from "../interfaces/area.interface.js";

const AreaSchema = new Schema<Area>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    typesComplaintId: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AreaModel = model("Area", AreaSchema);

export default AreaModel;
