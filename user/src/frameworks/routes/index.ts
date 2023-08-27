import express, { Router } from "express";

import refreshToken from "./refreshToken";
import signinRoutes from "./signin";
import signupRoutes from "./signup";
import getallusersRoutes from "./getallusers";
import deleteusersRoutes from "./deleteUser";


export default (dependencies: any) => {
  const routes: Router = express.Router();
  const signin: Router = signinRoutes(dependencies);
  const signup: Router = signupRoutes(dependencies);
  const refresh: Router = refreshToken(dependencies);
  const deleteUser: Router = deleteusersRoutes(dependencies);
  const getAllusers: Router = getallusersRoutes(dependencies);

  routes.use("/user", signin);
  routes.use("/user", signup);
  routes.use("/user", refresh);
  routes.use("/user", getAllusers);
  routes.use("/user", deleteUser);

  return routes;
};
