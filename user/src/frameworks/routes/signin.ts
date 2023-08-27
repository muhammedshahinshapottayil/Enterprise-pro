import express, { Router } from "express";
import { body } from "express-validator";
import { requestValidationerr } from "@enterprisepro/common";
import Controllers from "../../controllers";

export default (dependencies: any) => {
  const { signinController } = Controllers(dependencies);
  const router: Router = express.Router();
  router.post(
    "/signin",
    [
      body("username").isEmail().withMessage("Email must be valid"),
      body("password")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must have 8 character and should not exceed 20"),
    ],
    requestValidationerr,
    signinController
  );
  return router;
};

// export default router;
