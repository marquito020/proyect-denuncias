import { Schema, model } from "mongoose";
import { Rol } from "../interfaces/rol.interface.js";

const RolSchema = new Schema<Rol>(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RolModel = model("Rol", RolSchema);

export default RolModel;