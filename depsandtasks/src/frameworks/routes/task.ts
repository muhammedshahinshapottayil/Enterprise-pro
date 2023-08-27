import express from "express";
import { body, param } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import Controllers from "../../controllers";

export default (dependencies: any) => {
  const {
    saveTaskController,
    getAllTask,
    getTaskbyIdController,
    deleteTaskController,
    getTaskbyDepartment,
  } = Controllers(dependencies);
  const router = express.Router();
  router
    .route("/")
    .post(
      [
        body("name").notEmpty().withMessage("Name is mandatory"),
        body("fk_department").notEmpty().withMessage("Department is mandatory"),
      ],
      requestValidationerr,
      saveTaskController
    )
    .get(getAllTask);
  router
    .route("/:id")
    .get(
      [param("id").notEmpty().withMessage("Need Params")],
      requestValidationerr,
      getTaskbyIdController
    )
    .delete(
      [param("id").notEmpty().withMessage("Need Params")],
      requestValidationerr,
      deleteTaskController
    );
  router
    .route("/department/:id")
    .get(
      [param("id").notEmpty().withMessage("Need Params")],
      requestValidationerr,
      getTaskbyDepartment
    );

  return router;
};

// export default router;
