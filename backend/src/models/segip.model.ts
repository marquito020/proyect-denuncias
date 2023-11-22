import { Schema, model } from "mongoose";
import { Segip } from "../interfaces/segip.interface.js";

const SegipSchema = new Schema<Segip>(
  {
    name: String,
    ci: String,
    photo: String,
    address: String,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SegipModel = model("Segip", SegipSchema);

export default SegipModel;
