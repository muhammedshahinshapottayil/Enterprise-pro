import express from "express";
import { param } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import controllers from "../../controllers";
import mongoose from "mongoose";

export default (dependancies: any) => {
  const {
    getAlluserController,
    getTaskbyDepController,
    getTaskbyTaskController,
    getTaskbyUserIdController,
    getAlltaskByController,
  } = controllers(dependancies);
  const router = express.Router();
  router.get("/", getAlluserController);
  router.get(
    "/department/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getTaskbyDepController
  );
  router.get(
    "/user/:id/department/:dep",
    [
      param("id")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("Not a valid id"),
      param("dep").notEmpty().isNumeric().withMessage("Not a valid id"),
    ],
    requestValidationerr,
    getTaskbyUserIdController
  );
  router.get(
    "/task/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getTaskbyTaskController
  );

  router.get(
    "/all/department/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getAlltaskByController
  );

  return router;
};
