import express, { Router } from "express";
import { isAuth } from "@enterprisepro/common";
import Controllers from "../../controllers";

export default (dependencies: any) => {
  const { refreshController } = Controllers(dependencies);
  const router: Router = express.Router();
  router.post("/refresh", isAuth, refreshController);
  return router;
};
