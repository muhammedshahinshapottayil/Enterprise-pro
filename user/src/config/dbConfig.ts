import { DbError } from "@enterprisepro/common";
import mongoose from "mongoose";
import "dotenv/config";
import { natsWrapper } from "./nats-wrapper";
import { getUserByIdListener } from "../events/listeners/get-unAssigned-dataListener";

export default async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/enterprisepro_users", {});
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );
    await natsWrapper.connect("http://0.0.0.0:4222");
    new getUserByIdListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};
