import UserModel from "../models/user.model.js";

const getUser = async (id: string) => {
  const userFound = await UserModel.findById({ _id: id });

  if (!userFound) {
    return { message: "El usuario no existe" };
  }

  return userFound;
};

export default { getUser };
