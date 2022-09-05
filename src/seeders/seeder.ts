import mongoose from "mongoose";
import config from "../config/index";
import models from "../models";
import adminSeed from "./admin";
import commentSeed from "./comment";

mongoose.connect(config.MONGO_URL, async () => {
  console.log("seeding started...");
  await models.Comment.deleteMany({});
  await models.Comment.insertMany(commentSeed);

  adminSeed.map(async (admin) => {
    await models.User.findByIdAndUpdate(admin._id, admin, { upsert: true });
  });

  console.log("seeding done...");
  // await mongoose.connection.close();
});
