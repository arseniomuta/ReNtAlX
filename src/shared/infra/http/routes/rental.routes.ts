import { Router } from "express";

import { CreateRentalControl } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentCarController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsUserByCar/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalControl = new CreateRentalControl();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalControl.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
