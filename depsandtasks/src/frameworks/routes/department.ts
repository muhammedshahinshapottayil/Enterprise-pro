import express from "express";
import { body, param } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import Controllers from "../../controllers";

export default (dependencies: any) => {
  const {
    saveDepController,
    getAlldepartment,
    getDepartmentByIdController,
    deleteDepartmentController,
  } = Controllers(dependencies);
  const router = express.Router();
  router
    .route("/")
    .post(
      [body("name").notEmpty().withMessage("Name is mandatory")],
      requestValidationerr,
      saveDepController
    )
    .get(getAlldepartment);
  router
    .route("/:id")
    .get(
      [param("id").notEmpty().withMessage("Need Params")],
      requestValidationerr,
      getDepartmentByIdController
    )
    .delete(
      [param("id").notEmpty().withMessage("Need Params")],
      requestValidationerr,
      deleteDepartmentController
    );
  return router;
};
