import { category, Category } from "./entity";
export type CategoryRepository = {
  saveCategory: (category: Omit<Category, "id">) => void;
  listCategories: () => Category[];
  deleteCategory: (categoryId: Category["id"]) => void;
};

const localStorageKey = "categoryRepository";

const getFromLocalStorage = () => {
  const localStorageItem = localStorage.getItem(localStorageKey);
  if (localStorageItem === null) {
    return [];
  }
  return category.array().parse(JSON.parse(localStorageItem));
};

const saveToLocalStorage = (categories: Category[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(categories));
};

export const categoryRepository: CategoryRepository = {
  saveCategory: (category) => {
    const currentCategories = getFromLocalStorage();
    saveToLocalStorage([
      ...currentCategories,
      { ...category, id: crypto.randomUUID() },
    ]);
  },
  listCategories: () => {
    return getFromLocalStorage();
  },
  deleteCategory: (categoryId) => {
    const currentCategories = getFromLocalStorage();
    saveToLocalStorage(
      currentCategories.filter((category) => category.id !== categoryId)
    );
  },
};
