import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportSpecificationUseCase } from "./ImportSpecificationUseCase";

class ImportSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const importSpecificationUseCase = container.resolve(
      ImportSpecificationUseCase
    );

    await importSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { ImportSpecificationController };
