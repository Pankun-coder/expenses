import { Category } from "./entity";
import { CategoryRepository } from "./repository";

export const saveCategory = (
  repository: CategoryRepository,
  category: Omit<Category, "id">
) => {
  repository.saveCategory(category);
};
export const listCategories = (repository: CategoryRepository) => {
  return repository.listCategories();
};
export const deleteCategory = (
  repository: CategoryRepository,
  categoryId: Category["id"]
) => {
  repository.deleteCategory(categoryId);
};
