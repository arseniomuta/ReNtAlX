import { Router } from "express";

import { createSpecificationsController } from "../modules/cars/useCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  return createSpecificationsController.handler(request, response);
});

export { specificationRoutes };
