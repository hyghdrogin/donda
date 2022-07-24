import mongoose from "mongoose";
import config from "./index";

const connect = async () => {
  const connection = await mongoose.connect(config.MONGO_URL as string);
  if (!connection) {
    console.log("DATABASE connection failed! Exiting Now");
    process.emit("SIGTERM");
    process.exit(1);
  }
  console.log("DATABASE connected successfully!");
  return connection;
};

export default { connect };

//    multer-storage-cloudinarycloudinary
