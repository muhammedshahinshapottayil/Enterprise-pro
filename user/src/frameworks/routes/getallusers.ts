import express, { Router } from "express";
import controllers from "../../controllers";
import { body } from "express-validator";
import mongoose from "mongoose";
export default (dependancies: any) => {
  const { allUsersController, getAllusersController } =
    controllers(dependancies);
  const router: Router = express.Router();
  router.get("/all-users", allUsersController);
  router.get(
    "/all-users/:id",
    [
      body("id")
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("User id Not Id"),
    ],
    getAllusersController
  );

  return router;
};
