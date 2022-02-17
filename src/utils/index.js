import exifr from "exifr";
import { addPhotoToAWS as addPhotoToAWSAPI } from "../api/index";

export const isTokenExpired = async (message) => {
  return message === "TokenExpired";
};

export const uploadImage = async (eventTarget) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("img", eventTarget.files[0]);

    const { originalUrl, url } = await addPhotoToAWSAPI(imageFormData);

    if (originalUrl) {
      return {
        result: "ok",
        originalUrl,
        url,
      };
    }
  } catch (err) {
    return {
      result: "fail",
      message: "Fail upload Image to AWS",
    };
  }
};

export const getImageMetadata = async (eventTarget) => {
  const locations = [null, null];
  const metaLocations = await exifr.gps(eventTarget.files[0]);

  if (metaLocations) {
    const { latitude, longitude } = metaLocations;

    locations[0] = longitude;
    locations[1] = latitude;
  }

  return locations;
};
