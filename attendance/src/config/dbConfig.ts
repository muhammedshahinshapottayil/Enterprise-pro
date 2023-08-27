import { DbError,Subjects } from "@enterprisepro/common";
import mongoose from "mongoose";
import "dotenv/config";
import { natsWrapper } from "./nats-wrapper";
export default async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/enterprisepro_attendance", {});
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );
    await natsWrapper.connect("http://localhost:4222");
  
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};
