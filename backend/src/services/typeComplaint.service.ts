import TypeComplaintModel from "../models/typeComplaint.model.js";
import ComplaintModel from "../models/complaint.model.js";
import { TypeComplaint } from "../interfaces/typeComplaint.interface.js";

const getAllTypesOfComplaint = async () => {
  const allTypesOfComplaints = await TypeComplaintModel.find();
  return allTypesOfComplaints;
};

const addTypeOfComplaint = async ({ name, tags }: TypeComplaint) => {
  const newTypeOfComplaint = await TypeComplaintModel.create({ name, tags });
  return newTypeOfComplaint;
};

const updateTypeOfComplaint = async (
  id: string,
  { name, tags }: TypeComplaint
) => {
  const existTypeOfComplaint = await TypeComplaintModel.findById({ _id: id });
  if (!existTypeOfComplaint) {
    return { message: "El tipo de denuncia no existe" };
  }

  const updatedTypeOfComplaint = await TypeComplaintModel.findByIdAndUpdate(
    { _id: id },
    {
      name,
      tags,
    },
    { new: true }
  );

  return updatedTypeOfComplaint;
};

const getTypeOfComplaint = async (id: string) => {
  const typeOfComplaintFound = await TypeComplaintModel.findById({ _id: id });
  if (!typeOfComplaintFound) {
    return { message: "El tipo de denuncia no existe" };
  }

  return typeOfComplaintFound;
};

const deleteTypeOfComplaint = async (id: string) => {
  const existTypeOfComplaint = await TypeComplaintModel.findById({ _id: id });
  if (!existTypeOfComplaint) {
    return { message: "El tipo de denuncia no existe" };
  }

  const deletedTypeOfComplaint = await TypeComplaintModel.deleteOne({
    _id: id,
  });
  
  return deletedTypeOfComplaint;
};

// Obtiene todas los tipos de denuncia  con sus denuncias
const getAllTypesOfComplaintWithComplaints = async () => {
  const allTypesOfComplaint = await TypeComplaintModel.find();

  const allCategoriesWithComplaints = Promise.all(
    allTypesOfComplaint.map(async (typeComplaint) => {
      const complaints = await ComplaintModel.find({
        typeComplaintId: typeComplaint._id,
      });

      return {
        _id: typeComplaint._id,
        name: typeComplaint.name,
        complaints,
      };
    })
  );

  return allCategoriesWithComplaints;
};

export default {
  getAllTypesOfComplaint,
  addTypeOfComplaint,
  getTypeOfComplaint,
  updateTypeOfComplaint,
  deleteTypeOfComplaint,
  getAllTypesOfComplaintWithComplaints,
};
