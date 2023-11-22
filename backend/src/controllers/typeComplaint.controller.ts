import { Request, Response } from "express";
import TypeComplaintService from "../services/typeComplaint.service.js";

const getAllTypesOfComplaint = async (req: Request, res: Response) => {
  try {
    const allTypes = await TypeComplaintService.getAllTypesOfComplaint();
    return res.status(200).json(allTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const addTypeOfComplaint = async (req: Request, res: Response) => {
  try {
    const { name, tags } = req.body;

    const newTypeOfComplaint = await TypeComplaintService.addTypeOfComplaint({
      name,
      tags,
    });
    return res.status(200).json(newTypeOfComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateTypeOfComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, tags } = req.body;
    const updatedTypeOfComplaint =
      await TypeComplaintService.updateTypeOfComplaint(id, { name, tags });

    if (!updatedTypeOfComplaint || "message" in updatedTypeOfComplaint) {
      return res.status(400).json(updatedTypeOfComplaint);
    }

    return res.status(200).json(updatedTypeOfComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getTypeOfComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeOfComplaintFound = await TypeComplaintService.getTypeOfComplaint(
      id
    );

    if ("message" in typeOfComplaintFound) {
      return res.status(400).json(typeOfComplaintFound);
    }

    return res.status(200).json(typeOfComplaintFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const deleteTypeOfComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTypeOfComplaint =
      await TypeComplaintService.deleteTypeOfComplaint(id);

    if ("message" in deletedTypeOfComplaint) {
      return res.status(400).json(deletedTypeOfComplaint);
    }

    return res.status(200).json(deletedTypeOfComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getAllTypesOfComplaintWithComplaints = async (
  req: Request,
  res: Response
) => {
  try {
    const allCategoriesWithComplaints =
      await TypeComplaintService.getAllTypesOfComplaintWithComplaints();

    return res.status(200).json(allCategoriesWithComplaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default {
  getAllTypesOfComplaint,
  addTypeOfComplaint,
  getTypeOfComplaint,
  updateTypeOfComplaint,
  deleteTypeOfComplaint,
  getAllTypesOfComplaintWithComplaints,
};
