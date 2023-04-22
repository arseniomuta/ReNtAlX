import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listCategoryUseCase: ListCategoryUseCase) { }

  handler(request: Request, response: Response): Response {
    const all = this.listCategoryUseCase.execute();
    return response.json(all);
  }
}

export { ListCategoryController };
