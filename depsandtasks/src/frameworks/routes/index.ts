import departmentRoutes from "./department";
import taskRoutes from "./task";
import express from "express";

export default (dependencies: any) => {
  const routes = express.Router();
  const department = departmentRoutes(dependencies);
  const task = taskRoutes(dependencies);
  routes.use("/department", department);
  routes.use("/task", task);
  return routes;
};
