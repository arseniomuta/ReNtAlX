import { Category } from "modules/cars/infra/typeorm/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const user = this.categories.find((category) => category.name === name);

    return user;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;

    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const user = new Category();

    Object.assign(user, {
      name,
      description,
    });

    this.categories.push(user);
  }
}

export { CategoriesRepositoryInMemory };
