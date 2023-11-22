import { Request, Response } from "express";
import UserService from "../services/user.service.js";

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userFound = await UserService.getUser(id);

    if ("message" in userFound) {
      return res.status(400).json(userFound);
    }

    return res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { getUser };
