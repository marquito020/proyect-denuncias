import { Request, Response } from "express";
import NeighborService from "../services/neighbor.service.js";

const getNeighbor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const neighborFound = await NeighborService.getNeighbor(id);

    if ("message" in neighborFound) {
      return res.status(400).json(neighborFound);
    }

    return res.status(200).json(neighborFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { getNeighbor };
