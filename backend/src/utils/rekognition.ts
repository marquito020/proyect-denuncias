import fetch from "node-fetch";
import {
  CompareFacesCommand,
  DetectLabelsCommand,
  Label,
} from "@aws-sdk/client-rekognition";

import { rekognition } from "../config/awsRekognition.js";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { fileUploadType } from "../interfaces/fileUploadType.js";

const confirmFace = async (userImageFile: UploadedFile, segipImage: string) => {
  const userImageBase64 = fs.readFileSync(userImageFile.tempFilePath, "base64");
  const userImageBytes = Uint8Array.from(
    Buffer.from(userImageBase64, "base64")
  );

  const response2 = await fetch(segipImage);
  const imageBuffer2 = await response2.arrayBuffer();
  const imageBytes2 = new Uint8Array(imageBuffer2);

  const inputParams = {
    SourceImage: {
      Bytes: userImageBytes,
    },
    TargetImage: {
      Bytes: imageBytes2,
    },
    SimilarityThreshold: 80,
  };

  // Realiza la comparación de rostros
  const command = new CompareFacesCommand(inputParams);
  const result = await rekognition.send(command);

  if (result.FaceMatches && result.FaceMatches.length > 0) {
    console.log("El rostro de la imagen1 esta presente en la imagen2");
    return true;
  } else {
    console.log("El rostro de la imagen1 NO esta presente en la imagen2.");
    return false;
  }
};


const validateImages = async (tags: string[], files: fileUploadType) => {
  let isOk = true;
  const uploadPromises: Promise<boolean>[] = [];

  for (const key in files) {

    const photo = files[key];
    const imageFile = photo as UploadedFile;

    const uploadPromise = detectingLabelsInAnImage(tags, imageFile).then(isValidPhoto => {
      if (!isValidPhoto) {
        isOk = false;
      }

      return isValidPhoto;
    });

    uploadPromises.push(uploadPromise);

  }

  await Promise.all(uploadPromises);

  return isOk;
}


const detectingLabelsInAnImage = async (
  tags: string[],
  imageFile: UploadedFile
) => {
  //Detecting Labels In An Image
  const imageBase64 = fs.readFileSync(imageFile.tempFilePath, "base64");
  const imageBytes = Uint8Array.from(Buffer.from(imageBase64, "base64"));

  const inputParams = {Image: {Bytes: imageBytes},MaxLabels: 20};

  const command = new DetectLabelsCommand(inputParams);

  const result = await rekognition.send(command);
  // console.log(result);

  if (result.Labels) {
    const labels: Label[] = result.Labels

    for (let i = 0; i < labels.length; i++) {
      const element = labels[i];
      
      console.log(element.Name);
      const isOk = tags.indexOf(`${element.Name}`);
      if (isOk != -1) {
        return true; // la foto es valida
      }
    }

  }

  return false; // la foto no es valida
};

export { confirmFace, detectingLabelsInAnImage, validateImages };
