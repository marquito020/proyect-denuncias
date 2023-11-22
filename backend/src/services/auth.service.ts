import { UploadedFile } from "express-fileupload";

import { Auth } from "../interfaces/auth.interface.js";
import { fileUploadType } from "../interfaces/fileUploadType.js";

import SegipModel from "../models/segip.model.js";
import UserModel from "../models/user.model.js";
import PersonModel from "../models/person.model.js";

import { verify, encrypt } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
import { confirmFace } from "../utils/rekognition.js";
import { transport } from "../config/nodemailer.js";
import RolModel from "../models/rol.model.js";
import { PersonEditDataType } from "../interfaces/person.interface.js";
import { dataUserType } from "../interfaces/user.interface.js";



const verifyDataUser = async (ci: string, files: fileUploadType) => {
  const existPerson = await PersonModel.findOne({ ci });
  if (existPerson) return { message: "El usuario ya existe" };

  // llamada a la api del Segip
  const segipPersonFound = await SegipModel.findOne({ ci });
  if (!segipPersonFound)
    return { message: "El ci no esta registrado en el SEGIP" };

  if (files?.image) {
    // llamada a la api de reconocimiento facial
    const userImage = files.image as UploadedFile;
    const isOk = await confirmFace(userImage, segipPersonFound.photo);

    if (!isOk) return { message: "El ci enviado no coicide con la foto" };
  } else {
    return { message: "No envio una foto" };
  }

  // enviando los datos encontrados del Segip
  return segipPersonFound;
};

// registro de nuevo vecino
const registerNewUser = async ({
  name,
  email,
  password,
  ci,
  address,
  phone,
  photo,
  tokenMovil,
}: dataUserType) => {
  //data limpia, se supone que paso todas las validaciones de la funcion VerifyDataUser

  const rol = await RolModel.findOne({ name: "neighbor" });

  const passwordHash = await encrypt(password);
  const newUser = await UserModel.create({
    email,
    passwords: [passwordHash],
    lastPasswordChange: new Date(),
    tokenMovil,
    rolId: rol?._id,
  });

  const newPerson = await PersonModel.create({
    ci,
    name,
    address,
    phone,
    photo,
    typePerson: "neighbor",
    userId: newUser._id,
  });

  const data = { user: newUser, person: newPerson };
  return data;
};

const sendEmail = async (email: string, code: string) => {
  const info = await transport.sendMail({
    from: '"Ricky Roy Ramirez Pineda" <ramirezpineda@midominio.com>',
    to: `${email}`,
    subject: `Código de verificación`,
    html: `<h1>Este es su código de verificación: ${code}</h1>`,
  });
};

const login = async ({ email, password }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  const lastPasswordIndex = userFound.passwords.length - 1;
  const passwordHash = userFound.passwords[lastPasswordIndex];

  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const person = await PersonModel.findOne({ userId: userFound._id });
  if (!person) return null;

  const rol = await RolModel.findById({ _id: userFound.rolId });
  if (!rol) return null;

  const token = generateToken(userFound);
  const data = {
    _id: userFound._id,
    email: userFound.email,
    lastPasswordChange: userFound.lastPasswordChange,
    tokenMovil: userFound.tokenMovil,
    name: person.name,
    ci: person.ci,
    address: person.address,
    phone: person.phone,
    photo: person.photo,
    personId: person._id,
    token,
    rolName: rol.name,
  };

  return data;
};


const updateProfile = async (id: string, data: PersonEditDataType) => {
  const userFound = await UserModel.findById({ _id: id });
  const personFound = await PersonModel.findOne({ userId: id });
  if (!userFound || !personFound)
    return { message: "Usuario o Persona no encontrado" };

  if (data.password) {
    //Verificar que la contrasena nueva no fue utilizada anteriormente
    for await (const passwordHashDB of userFound.passwords) {
      const used = await verify(data.password, passwordHashDB);

      if (used) return { message: "La contraseña ya fue utilizada" };
    }

    const passwordHash = await encrypt(data.password);
    userFound.passwords.push(passwordHash);
    userFound.lastPasswordChange = new Date();
    await userFound.save();
  }

  personFound.address = data.address;
  personFound.phone = data.phone;
  await personFound.save();

  const newData = {
    address: personFound.address,
    phone: personFound.phone,
    lastPasswordChange: userFound.lastPasswordChange,
  };

  return newData;
};

export default {
  verifyDataUser,
  registerNewUser,
  sendEmail,
  updateProfile,
  login,
};
