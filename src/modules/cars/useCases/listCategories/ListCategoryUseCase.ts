import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategorieRepository";

class ListCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
