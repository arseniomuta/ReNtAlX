import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalControl = new CreateCarController();

rentalRoutes.post("/", ensureAuthenticated, createRentalControl.handle);

export { rentalRoutes };
