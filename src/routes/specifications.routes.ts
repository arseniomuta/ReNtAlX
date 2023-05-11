import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ImportSpecificationController } from "../modules/cars/useCases/createSpecification/ImportSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new ImportSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
