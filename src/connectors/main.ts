import { categoryRepository } from "../categories/repository";
import { listCategories } from "../categories/usecase";
import { expenseRepository } from "../expenses/repository";
import { saveExpense } from "../expenses/usecases";

document.addEventListener("DOMContentLoaded", (event) => {
  const categorySelect = document.getElementById("category");
  if (!categorySelect) {
    throw new Error("category select not found");
  }
  const categories = listCategories(categoryRepository);
  categories.forEach((category) => {
    const optionElement = document.createElement("option");
    optionElement.value = category.id;
    optionElement.innerText = category.name;
    categorySelect.appendChild(optionElement);
  });

  const formElement = document.getElementById("form");
  if (!(formElement instanceof HTMLFormElement)) {
    throw new Error("form element not found");
  }
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const categoryId = formData.get("category");
    const amount = formData.get("amount");
    const note = formData.get("note");

    if (!categoryId || !amount) {
      throw new Error("invalid input");
    }

    saveExpense(expenseRepository, {
      amount: Number(amount),
      categoryId: categoryId.toString(),
      spentAt: new Date(),
      note: note ? note.toString() : undefined,
    });

    alert("ok");
  });
});
