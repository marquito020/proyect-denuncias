import { configCloudinary } from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

import { UploadedFile } from "express-fileupload";
import fs from "fs-extra";

import { fileUploadType } from "../interfaces/fileUploadType.js";

cloudinary.config(configCloudinary);

const uploadImage = async (filePath: string) => {
  const imageCloudinary = await cloudinary.uploader.upload(filePath, {
    folder: "topics",
  });

  return imageCloudinary;
};

const deleteImage = async (public_id: string) => {
  const deletedImage = await cloudinary.uploader.destroy(public_id);
  return deletedImage;
};


const uploadMultipleImages = async (files: fileUploadType) => {
  const photos: string[] = [];
  const uploadPromises: Promise<void>[] = [];

  for (const key in files) {
    const photo = files[key];
    const { tempFilePath } = photo as UploadedFile;

    const uploadPromise = uploadImage(tempFilePath).then((imageCloudinary) => {
      photos.push(imageCloudinary.secure_url);
      return fs.unlink(tempFilePath); // deleted image of storage (uploads)
    });

    uploadPromises.push(uploadPromise);
  }

  await Promise.all(uploadPromises);

  return photos;
}


export { uploadImage, deleteImage, uploadMultipleImages };
