import express, { Router } from "express";
import controllers from "../../controllers";
import { body } from "express-validator";
import mongoose from "mongoose";
export default (dependancies: any) => {
  const { deleteUserController } = controllers(dependancies);
  const router: Router = express.Router();
  router.delete(
    "/delete-user/:id",
    [
      body("id")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User id Not Id"),
    ],
    deleteUserController
  );

  return router;
};
