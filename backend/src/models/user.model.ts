import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface.js";

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    passwords: [{ type: String, min: 8, required: true }],
    lastPasswordChange: { type: Date, required: true },
    state: { type: Boolean, default: true },
    tokenMovil: { type: String },
    rolId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
