import assignRoutes from "./assign-attendance";
import getRoutes from "./get-attendance";
import express from "express";

export default (dependencies: any) => {
  const routes = express.Router();
  const assign = assignRoutes(dependencies);
  const getTask = getRoutes(dependencies);

  routes.use("/attendance", assign);
  routes.use("/attendance", getTask);

  return routes;
};
