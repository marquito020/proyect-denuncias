import { Area } from "../interfaces/area.interface.js";
import AreaModel from "../models/area.model.js";

const getAllAreas = async () => {
  const allAreas = await AreaModel.find();
  return allAreas;
};

const addArea = async (areaData: Area) => {
  const newArea = await AreaModel.create(areaData);

  return newArea;
};

const getArea = async (id: string) => {
  const areaFound = await AreaModel.findById({ _id: id });

  if (!areaFound) {
    return { message: "El área no existe" };
  }

  return areaFound;
};

const upadateArea = async (id: string, areaData: Area) => {
  const existArea = await AreaModel.findById({ _id: id });

  if (!existArea) {
    return { message: "El área no existe" };
  }

  const updatedArea = await AreaModel.findByIdAndUpdate({ _id: id }, areaData, {
    new: true,
  });

  return updatedArea;
};

const deleteArea = async (id: string) => {
  const existArea = await AreaModel.findById({ _id: id });

  if (!existArea) {
    return { message: "El área no existe" };
  }

  const deletedArea = await AreaModel.deleteOne({ _id: id });
  return deletedArea;
};

export default { getAllAreas, addArea, getArea, upadateArea, deleteArea };
