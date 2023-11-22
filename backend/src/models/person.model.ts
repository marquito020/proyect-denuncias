import { Schema, model } from "mongoose";
import { Person, TypeOfPerson } from "../interfaces/person.interface.js";

const PersonSchema = new Schema<Person>(
  {
    name: String,
    ci: String,
    photo: String,
    address: String,
    phone: String,
    type: { type: String, enum: TypeOfPerson, require: true },
    userId: String,
    areaId: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PersonModel = model("Person", PersonSchema);

export default PersonModel;
