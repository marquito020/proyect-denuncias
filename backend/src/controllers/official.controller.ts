import { Request, Response } from "express";
import OfficialService from "../services/official.service.js";

const getAllOfficials = async (req: Request, res: Response) => {
  try {
    const allOfficials = await OfficialService.getAllOfficials();
    return res.status(200).json(allOfficials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const addOfficial = async (req: Request, res: Response) => {
  try {
    const { user, person } = req.body;
    const { email, passwords } = user;
    const { name, ci, address, phone, photo, areaId, type } = person;

    const newOfficial = await OfficialService.addOfficial(
      { email, passwords, tokenMovil: "", rolId: "" },
      { name, ci, address, phone, photo, areaId, type, userId: "" }
    );

    if ("message" in newOfficial) {
      return res.status(400).json(newOfficial);
    }

    return res.status(200).json(newOfficial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getOfficial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const officialFound = await OfficialService.getOfficial(id);

    if ("message" in officialFound) {
      return res.status(400).json(officialFound);
    }

    return res.status(200).json(officialFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateOfficial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    const { user, person } = req.body;
    const { email } = user;
    const { name, ci, address, phone, photo, areaId, type, userId } = person;

    const updatedOfficial = await OfficialService.updateOfficial(
      id,
      { email, passwords: [], tokenMovil: "", rolId: "" },
      { name, ci, address, phone, photo, areaId, type, userId }
    );

    if (!updatedOfficial || "message" in updatedOfficial) {
      return res.status(400).json(updatedOfficial);
    }

    return res.status(200).json(updatedOfficial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const deleteOfficial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOfficial = await OfficialService.deleteOfficial(id);

    if ("message" in deletedOfficial) {
      return res.status(400).json(deletedOfficial);
    }

    return res.status(200).json(deletedOfficial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default {
  getAllOfficials,
  addOfficial,
  getOfficial,
  updateOfficial,
  deleteOfficial,
};
