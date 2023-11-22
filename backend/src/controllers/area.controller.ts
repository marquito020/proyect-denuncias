import { Request, Response } from "express";
import AreaService from "../services/area.service.js";

const getAllAreas = async (req: Request, res: Response) => {
  try {
    const allAreas = await AreaService.getAllAreas();
    return res.status(200).json(allAreas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const addArea = async (req: Request, res: Response) => {
  try {
    const { name, description, typesComplaintId } = req.body;
    const newArea = await AreaService.addArea({
      name,
      description,
      typesComplaintId,
    });

    return res.status(200).json(newArea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getArea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const areaFound = await AreaService.getArea(id);

    if ("message" in areaFound) {
      return res.status(400).json(areaFound);
    }

    return res.status(200).json(areaFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateArea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, typesComplaintId } = req.body;
    const updatedArea = await AreaService.upadateArea(id, {
      name,
      description,
      typesComplaintId,
    });

    if (!updatedArea || "message" in updatedArea) {
      return res.status(400).json(updatedArea);
    }

    return res.status(200).json(updatedArea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const deleteArea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArea = await AreaService.deleteArea(id);

    if ("message" in deletedArea) {
      return res.status(400).json(deletedArea);
    }

    return res.status(200).json(deletedArea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { getAllAreas, addArea, getArea, updateArea, deleteArea };
