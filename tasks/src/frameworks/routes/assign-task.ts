import express from "express";
import { body } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import Controllers from "../../controllers";
import mongoose from "mongoose";

export default (dependencies: any) => {
  const { assignController, updateController } = Controllers(dependencies);
  const router = express.Router();
  router.post(
    "/assign",
    [
      body("data").notEmpty().withMessage("Data should not be empty"),
      body("assignedData")
        .notEmpty()
        .withMessage("Data should not be empty")
        .bail()
        .bail()
        .custom((value, { req }) => {
          if (req.body.data || req.body.assignedData) {
            return true;
          }
        })
        .withMessage("At least one data should not be empty"),
      body("userId")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User id Not Id"),
      body("EmpID").isNumeric().withMessage("EmpID must be valid"),
      body("task_id")
        .notEmpty()
        .isNumeric()
        .withMessage("TaskID must be valid"),
      body("task_name")
        .notEmpty()
        .isString()
        .withMessage("Task Name must be valid"),
      body("department_id").isNumeric().withMessage("Department must be valid"),
      body("department_name")
        .notEmpty()
        .isString()
        .withMessage("Department Name must be valid"),
    ],
    requestValidationerr,
    assignController
  );

  router.post(
    "/update",
    [
      body("title").notEmpty().withMessage("Title should not be empty"),
      body("user")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User should not be empty"),
      body("id")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User should not be empty"),
    ],
    requestValidationerr,
    updateController
  );

  return router;
};

// export default router;
