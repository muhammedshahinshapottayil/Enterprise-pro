import express from "express";
import { param } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import controllers from "../../controllers";

export default (dependancies: any) => {
  const {
    geAttendanceUserDetailsController,
    getAttendancebyUserIdController,
    getAllByDepartmentController,
    getTodaysByUserController,
    getAllByDepartmentDetailsController,
    getDepartmentByController,
  } = controllers(dependancies);
  const router = express.Router();
  router.get("/", getDepartmentByController);
  router.get(
    "/user/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getAttendancebyUserIdController
  );

  router.get(
    "/user-details/:id/:date",
    [
      param("id").notEmpty().withMessage("Not a valid id"),
      param("date").notEmpty().withMessage("Not a valid id"),
    ],
    requestValidationerr,
    geAttendanceUserDetailsController
  );

  router.get(
    "/todays/user/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getTodaysByUserController
  );

  router.get(
    "/all/department/:id",
    [param("id").notEmpty().withMessage("Not a valid id")],
    requestValidationerr,
    getAllByDepartmentController
  );

  router.get(
    "/all/department-details/:id/:date",
    [
      param("id").notEmpty().withMessage("Not a valid id"),
      param("date").notEmpty().withMessage("Not a valid id"),
    ],
    requestValidationerr,
    getAllByDepartmentDetailsController
  );

  return router;
};
