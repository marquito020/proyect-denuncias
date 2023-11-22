import "dotenv/config";
import { connect } from "mongoose";

import SegipModel from "../models/segip.model.js";
import CategoryModel from "../models/typeComplaint.model.js";
import RolModel from "../models/rol.model.js";
import UserModel from "../models/user.model.js";
import { encrypt } from "../utils/bcrypt.utils.js";
import PersonModel from "../models/person.model.js";

export const dbConnet = async () => {
  const DB_URI = <string>process.env.DB_URI || "";
  await connect(DB_URI);
};

export const seeders = async () => {
  console.log("Implementing seeders");
  // await SegipModel.create({
  //   name: "Joe Doe",
  //   address: "Street Fake #123",
  //   phone: "87654321",
  //   photo:
  //     "https://res.cloudinary.com/dwn7fonh6/image/upload/v1683827537/exam1-software/cx3no6vuqqsqqaend88m.jpg",
  //   ci: "12345678",
  // });
  //   await SegipModel.create({
  //   name: "Glem Doe",
  //   address: "Street Fake #456",
  //   phone: "80111320",
  //   photo:
  //     "https://res.cloudinary.com/dwn7fonh6/image/upload/v1683827537/exam1-software/cx3no6vuqqsqqaend88m.jpg",
  //   ci: "01435678",
  // });

  // const passwordHash = await encrypt("12345678mM@");
  // const userAdmin = await UserModel.create({
  //   email: "roy@gmail.com",
  //   passwords: [passwordHash],
  //   lastPasswordChange: new Date(),
  //   state: true,
  //   tokenMovil: "",
  //   rolId: "64a73446e1ff5379e694ee82",
  // });

  // await PersonModel.create({
  //   name: "Roy Ramirez Pineda",
  //   ci: "00000001",
  //   address: "Calle falsa",
  //   phone: "00000012",
  //   photo: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1683827537/exam1-software/cx3no6vuqqsqqaend88m.jpg",
  //   type: "official",
  //   userId: userAdmin._id,
  // });

  // await RolModel.create([
  //   { name: "admin" },
  //   { name: "official" },
  //   { name: "neighbor" },
  // ]);

  // await CategoryModel.create([
  //   {
  //     name: "Agua potable y alcantarillado",
  //     tags: ["Sewer", "Drain", "Pipeline"],
  //   },
  //   {
  //     name: "Basura y reciclaje",
  //     tags: ["Garbage", "Trash"],
  //   },
  //   {
  //     name: "Problemas de alumbrado público",
  //     tags: ["Utility Pole", "Lamp Post"],
  //   },
  //   {
  //     name: "Transporte público",
  //     tags: ["Transportation", "Bus", "Vehicle"],
  //   },
  //   {
  //     name: "Baches y estado de las calles",
  //     tags: ["Puddle", "Tarmac", "Hole"],
  //   },
  //   {
  //     name: "Espacios públicos deteriorados",
  //     tags: ["Outdoors", "Nature", "Play Area", "Outdoor Play Are"],
  //   },
  //   {
  //     name: "Vandalismo y graffiti",
  //     tags: ["Graffiti", "Painting", "Mural"],
  //   },
  // ]);

  console.log("Seeders implements");
};
