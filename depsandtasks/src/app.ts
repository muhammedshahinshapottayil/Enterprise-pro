import express, { json } from "express";
import "express-async-errors";
import routes from "./frameworks/routes";
import { errorhandler } from "@enterprisepro/common";
import { NotFound } from "@enterprisepro/common";
import dbConnection from "./config/dbConfig";
import dependencies from "./config/dependencies";
import cors from "cors";
const app = express();
dbConnection();
app.use(json());
app.use(cors());
app.use("/api", routes(dependencies));
app.all("*", () => {
  throw new NotFound();
});
app.use(errorhandler);
export default app;
