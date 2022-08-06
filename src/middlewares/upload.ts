import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../config";

v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: v2,
});
const parser = multer({
  storage,
  limits: {
    fileSize: 5120 * 1024 * 1024,
  },
}) ;

export default parser;
