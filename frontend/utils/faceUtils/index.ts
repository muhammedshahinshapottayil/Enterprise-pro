import * as faceapi from "face-api.js";
import { SetStateType } from "../../types/intefaces";
const loadAllModels = async () => {
  return new Promise(async (response, reject) => {
    try {
      const data = await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
      ]);
      response(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const loadedConfirmation = {
  isFacedetectionModeloaded: () => {
    return !!faceapi.nets.ssdMobilenetv1.params;
  },
  isFeatureExtractionModeloaded: () => {
    return !!faceapi.nets.faceRecognitionNet.params;
  },
  isFacialLandmarkDetectionModeloaded: () => {
    return !!faceapi.nets.faceLandmark68TinyNet.params;
  },
};

const getFaceDescription = async (image: any) => {
  try {
    // await loadAllModels();
    let img: any = await faceapi.fetchImage(image);

    const scoreThreshold: number = 0.8;
    const OPTION = new faceapi.SsdMobilenetv1Options({
      maxResults: 1,
      minConfidence: scoreThreshold,
    });

    const useTinyModel = true;
    // faceapi.detectSingleFace
    const data: any =
      (await faceapi
        .detectAllFaces(img, OPTION)
        .withFaceLandmarks(useTinyModel)
        .withFaceDescriptors()) ?? [];
    return data;
  } catch (error) {
    console.log(error);
    console.log("Err Occurred while Detecting images");
  }
};

const matchingThreshold = 0.45;
const createMatcher = (data: any) => {
  const labelDescriptors = data
    .map((item: any) => {
      if (typeof item.scan_image == "string")
        return new faceapi.LabeledFaceDescriptors(item.id, [
          new Float32Array(
            item.scan_image.match(/-?\d+(?:\.\d+)?/g).map(Number)
          ),
        ]);
    })
    .filter((item: any) => item != undefined);
  const faceMatcher = new faceapi.FaceMatcher(
    labelDescriptors,
    matchingThreshold
  );
  
  return faceMatcher;
};

export { loadAllModels, loadedConfirmation, getFaceDescription, createMatcher };
