import { categoryRepository } from "../categories/repository";
import { saveCategory } from "../categories/usecase";

document.addEventListener("DOMContentLoaded", () => {
  const categoryCreateForm = document.getElementById("category-create-form");
  if (!(categoryCreateForm instanceof HTMLFormElement)) {
    throw new Error("category create form not found");
  }

  categoryCreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formDeta = new FormData(categoryCreateForm);
    const name = formDeta.get("category-name");
    if (!name) {
      throw new Error("name is null");
    }
    saveCategory(categoryRepository, { name: name.toString() });
    alert("category saved " + name.toString());
  });
});
