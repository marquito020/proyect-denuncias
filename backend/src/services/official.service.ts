import { Person } from "../interfaces/person.interface.js";
import { User } from "../interfaces/user.interface.js";
import PersonModel from "../models/person.model.js";
import RolModel from "../models/rol.model.js";
import UserModel from "../models/user.model.js";
import { encrypt } from "../utils/bcrypt.utils.js";

const getAllOfficials = async () => {
  const allOfficials = await PersonModel.find({ type: "official" });
  return allOfficials;
};

const addOfficial = async (userData: User, personData: Person) => {
  const existEmail = await UserModel.findOne({ email: userData.email });

  if (existEmail) {
    return { message: "El email ya existe" };
  }

  const existCi = await PersonModel.findOne({ ci: personData.ci });

  if (existCi) {
    return { message: "El ci ya existe" };
  }

  const existPhone = await PersonModel.findOne({ phone: personData.phone });

  if (existPhone) {
    return { message: "El telefono ya existe" };
  }

  const rol = await RolModel.findOne({ name: "official" });

  const passwordHash = await encrypt(userData.passwords[0]);

  const newUser = await UserModel.create({
    email: userData.email,
    passwords: [passwordHash],
    lastPasswordChange: new Date(),
    tokenMovil: "",
    rolId: rol?._id,
  });

  personData.userId = newUser._id;

  const newOfficial = await PersonModel.create(personData);
  return newOfficial;
};

const getOfficial = async (id: string) => {
  const officialFound = await PersonModel.findById({ _id: id });

  if (!officialFound) {
    return { message: "El funcionario no existe" };
  }

  return officialFound;
};

const updateOfficial = async (
  id: string,
  userData: User,
  personData: Person
) => {
  const existOfficial = await PersonModel.findById({ _id: id });

  if (!existOfficial) {
    return { message: "El funcionario no existe" };
  }

  const existUser = await UserModel.findOne({
    email: userData.email,
  });

  if (existUser) {
    if (existUser._id != personData.userId) {
      console.log("entro aqui");
      return { message: "El email ya esta en uso" };
    }
  }

  await UserModel.findByIdAndUpdate(
    { _id: personData.userId },
    { email: userData.email },
    { new: true }
  );

  const updatedOfficial = await PersonModel.findByIdAndUpdate(
    { _id: id },
    personData,
    { new: true }
  );

  return updatedOfficial;
};

const deleteOfficial = async (id: string) => {
  const existOfficial = await PersonModel.findById({ _id: id });

  if (!existOfficial) {
    return { message: "El funcionario no existe" };
  }

  const deletedOfficial = await PersonModel.deleteOne({ _id: id });
  await UserModel.deleteOne({ _id: existOfficial.userId });

  return deletedOfficial;
};

export default {
  getAllOfficials,
  addOfficial,
  getOfficial,
  updateOfficial,
  deleteOfficial,
};
