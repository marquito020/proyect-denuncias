import TypeComplaintModel from "../models/typeComplaint.model.js";
import ComplaintModel from "../models/complaint.model.js";
import PersonModel from "../models/person.model.js";
import AreaModel from "../models/area.model.js";

import { Complaint } from "../interfaces/complaint.interface.js";
import { fileUploadType } from "../interfaces/fileUploadType.js";

import { itIsOfensive, validateMessage } from "../utils/verifyText.utils.js";
import { uploadMultipleImages } from "../utils/uploadImage.utils.js";
import { validateImages } from "../utils/rekognition.js";

import { io } from "../index.js";

// import { messageFirebase } from '../config/firebase.js'

const addComplaint = async (data: Complaint, files: fileUploadType) => {
  const typeComplaint = await TypeComplaintModel.findById({
    _id: data.typeComplaintId,
  });

  if (!files) return { message: "No envio fotos" };

  const currentDate = new Date();
  const initialDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  const complaintsOfDay = await ComplaintModel.find({
    personId: data.personId,
    createdAt: {
      $gte: new Date(initialDate),
      $lt: new Date(initialDate).setHours(23, 59, 59, 0),
    },
  });

  if (complaintsOfDay.length >= 10)
    return { message: "Alcanzo el maximo de denuncias por dia" };

  const existComplaint = complaintsOfDay.find(
    (complaint) => complaint.typeComplaintId == data.typeComplaintId
  );

  if (existComplaint) return { message: "Ya hizo una denuncia de este tipo" };

  let state: string | undefined = undefined;

  //Todo: verificar que la descripcion y titulo no contengas palabras ofencivas
  const offensiveText = await itIsOfensive(data.title, data.description);
  if (offensiveText) {
    state = "rechazado";
    data.observation = "El titulo o la descripción contiene palabras ofencivas";
  }

  //Todo: verificar que la descripcion y titulo sea valida (Usar ChatGPT)
  if (!offensiveText) {
    const message = await validateMessage(
      `${typeComplaint?.name}`,
      data.title,
      data.description
    );

    if (!message.includes("ok")) return { message };
  }

  //Todo: verificar que las fotos sean validas
  const isValidImages = await validateImages(typeComplaint!.tags, files);

  if (!isValidImages) {
    state = "rechazado";
    data.observation = "Una o todas las imagenes no corresponden a la denuncia";
  }

  const photos: string[] = await uploadMultipleImages(files);

  const newComplaint = await ComplaintModel.create({
    title: data.title,
    description: data.description,
    photos,
    latitude: data.latitude,
    longitude: data.longitude,
    typeComplaintId: data.typeComplaintId,
    personId: data.personId,
    state,
    observation: data.observation,
  });

  io.emit("newComplaint", "new complaint added");

  return newComplaint;
};

const getComplaint = async (id: string) => {
  const complaintFound = await ComplaintModel.findById({ _id: id });

  if (!complaintFound) {
    return { message: "La denuncia no existe" };
  }

  return complaintFound;
};

const updateComplaint = async (
  id: string,
  data: Partial<Complaint>,
  files: fileUploadType
) => {
  const complaint = await ComplaintModel.findById({ _id: id });
  const category = await TypeComplaintModel.findById({
    _id: complaint!.typeComplaintId,
  });

  const message = await validateMessage(
    `${category?.name}`,
    `${data.title}`,
    `${data.description}`
  );

  if (!message.includes("ok")) return { message };

  // const photos: string[] = [];
  // const uploadPromises: Promise<void>[] = [];

  // for (const key in files) {
  //   const photo = files[key];
  //   const { tempFilePath } = photo as UploadedFile;

  //   const uploadPromise = uploadImage(tempFilePath).then((imageCloudinary) => {
  //     photos.push(imageCloudinary.secure_url);
  //     return fs.unlink(tempFilePath); // deleted image of storage (uploads)
  //   });

  //   uploadPromises.push(uploadPromise);
  // }

  // await Promise.all(uploadPromises); // ejecuta todas las promesas

  // if (data.photos) {
  //   data.photos = data.photos.concat(photos);
  // }

  const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
    { _id: id },
    {
      title: data.title,
      description: data.description,
      photos: data.photos,
    },
    { new: true }
  );

  return updatedComplaint;
};

const deleteComplaint = async (id: string) => {
  const deletedComplaint = await ComplaintModel.findByIdAndUpdate(
    { _id: id },
    { state: "cancelado" },
    { new: true }
  );

  if (!deletedComplaint) {
    return { message: "La denuncia no existe" };
  }

  return deletedComplaint;
};

const getAllComplaintPerson = async (personId: string) => {
  const allComplaints = await ComplaintModel.find({ personId }).sort({
    createdAt: -1,
  });

  return allComplaints;
};

const getAllComplaintsOfficial = async (personId: string) => {
  const officialFound = await PersonModel.findById({ _id: personId });

  if (!officialFound) return [];

  const area = await AreaModel.findById({ _id: officialFound.areaId });

  if (!area) return [];

  const typesComplaintIdList = area.typesComplaintId;

  const allComplaints = await ComplaintModel.find({
    typeComplaintId: { $in: typesComplaintIdList },
  }).sort({ createdAt: -1 });

  return allComplaints;
};

const addObservationWithState = async (complaintData: Complaint) => {
  const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
    { _id: complaintData._id },
    { state: complaintData.state, observation: complaintData.observation },
    { new: true }
  );

  if (!updatedComplaint) {
    return { message: "La denuncia no existe" };
  }

  return updatedComplaint;
};

const updateStateComplaint = async (id: string, state: string) => {
  const complaint = await ComplaintModel.findById({ _id: id });

  if (!complaint) return { message: "La denuncia no existe" };

  complaint.state = state;
  await complaint.save();

  // TODO: SEND NOTIFICATION

  return complaint;
};

export default {
  addComplaint,
  getComplaint,
  deleteComplaint,
  updateComplaint,
  getAllComplaintPerson,
  getAllComplaintsOfficial,
  updateStateComplaint,
  addObservationWithState,
};
