import express from "express";
import { body } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import Controllers from "../../controllers";
import mongoose from "mongoose";

export default (dependencies: any) => {
  const { assignController } = Controllers(dependencies);
  const router = express.Router();
  router.post(
    "/assign",
    [
      body("userId")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User id Not Id"),
      body("name").notEmpty().withMessage("Name must be valid"),
      body("department_id").notEmpty().withMessage("Department must be valid"),
      body("department_name").notEmpty().withMessage("Department must be valid"),

      body("type").notEmpty().withMessage("Type must be valid"),
      body("EmpID").notEmpty().withMessage("EmpID must be valid"),
    ],
    requestValidationerr,
    assignController
  );

  return router;
};
