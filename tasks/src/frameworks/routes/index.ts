import assignRoutes from "./assign-task";
import getTaskRoutes from "./get-task";
import express from "express";

export default (dependencies: any) => {
  const routes = express.Router();
  const assign = assignRoutes(dependencies);
  const getTask = getTaskRoutes(dependencies);

  routes.use("/task", assign);
  routes.use("/task", getTask);

  return routes;
};
