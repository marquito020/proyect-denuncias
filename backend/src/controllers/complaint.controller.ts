import { Request, Response } from "express";
import ComplaintService from "../services/complaint.service.js";

const addComplaint = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      typeComplaintId,
      personId,
      latitude,
      longitude,
    } = req.body;
    console.log(req.body);
    const newComplaint = await ComplaintService.addComplaint(
      {
        title,
        description,
        photos: [],
        latitude,
        longitude,
        typeComplaintId,
        personId,
        state: "",
        observation: null,
      },
      req.files
    );

    if ("message" in newComplaint) {
      return res.status(400).json(newComplaint);
    }

    return res.json(newComplaint);
    // res.json({message: "hola"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const complaintFound = await ComplaintService.getComplaint(id);

    if ("message" in complaintFound) {
      return res.status(400).json(complaintFound);
    }

    return res.status(200).json(complaintFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, photos, typeComplaintId, personId } = req.body;
    const updatedComplaint = await ComplaintService.updateComplaint(
      `${id}`,
      {
        title,
        description,
        photos,
        typeComplaintId,
        personId,
      },
      req.files
    );

    if (!updatedComplaint || "message" in updatedComplaint) {
      return res.status(400).json(updatedComplaint);
    }

    return res.status(200).json(updatedComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await ComplaintService.deleteComplaint(`${id}`);

    if (!deletedComplaint || "message" in deletedComplaint) {
      return res.status(400).json(deletedComplaint);
    }

    return res.status(200).json(deletedComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getAllComplaintPerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allComplaints = await ComplaintService.getAllComplaintPerson(`${id}`);

    res.status(200).json(allComplaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getAllComplaintsOfficial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allComplaints = await ComplaintService.getAllComplaintsOfficial(
      `${id}`
    );

    res.status(200).json(allComplaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const addObservationWithState = async (req: Request, res: Response) => {
  try {
    const { _id, observation, state } = req.body;
    const updatedComplaint = await ComplaintService.addObservationWithState({
      _id,
      title: "",
      description: "",
      typeComplaintId: "",
      latitude: 0,
      longitude: 0,
      personId: "",
      photos: [],
      observation,
      state,
    });

    if ("message" in updatedComplaint) {
      return res.status(400).json(updatedComplaint);
    }

    return res.status(200).json(updatedComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default {
  addComplaint,
  getComplaint,
  deleteComplaint,
  updateComplaint,
  getAllComplaintPerson,
  getAllComplaintsOfficial,
  addObservationWithState,
};
