import express, { Router } from "express";
import { body } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import controllers from "../../controllers";
import fileUpload from "../../utils/fileUpload";

export default (dependancies: any) => {
  const { signupController } = controllers(dependancies);

  const router: Router = express.Router();
  router.post(
    "/register",
    [
      body("name").notEmpty().withMessage("Please Make Sure Name is not Empty"),
      body("scan_image").notEmpty().withMessage("Please Make Sure image is Scanned"),
      body("role").notEmpty().withMessage("Role Should not be Empty"),
      body("profile_image")
        .notEmpty()
        .withMessage("Profile Should not be Empty"),
      body("address").notEmpty().withMessage("Profile Should not be Empty"),
      body("mobile").notEmpty().withMessage("Mobile Should not be Empty"),
      body("username").notEmpty().withMessage("Email must be valid"),
      body("department").notEmpty().withMessage("Department must be valid"),
      body("type").notEmpty().withMessage("Type must be valid"),
      body("unique_id").notEmpty().withMessage("Type must be valid"),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password must have 4 character and should not exceed 20"),
    ],
    requestValidationerr,
    // fileUpload,
    signupController
  );
  return router;
};
