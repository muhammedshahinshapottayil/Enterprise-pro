import { DbError } from "@enterprisepro/common";
import mysql, { Connection, MysqlError } from "mysql";
import "dotenv/config";
import { natsWrapper } from "./nats-wrapper";
import { getDepartmentByIdListener } from "../events/listeners/get-department-listener";
let connection: Connection;
export default async () => {
  try {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "enterprisepro_deps_tasks",
    });

    connection.connect((error: MysqlError) => {
      if (error) {
        console.error("Error connecting to MySQL:", error);
      } else {
        console.log("Connected to MySQL database");
      }
    });

    await natsWrapper.connect("http://localhost:4222");

    new getDepartmentByIdListener(natsWrapper.client).listen();

    
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};

export { connection };
