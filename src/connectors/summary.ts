import { categoryRepository } from "../categories/repository";
import { listCategories } from "../categories/usecase";
import { expenseRepository } from "../expenses/repository";
import { listExpenses } from "../expenses/usecases";

document.addEventListener("DOMContentLoaded", (event) => {
  const expenses = listExpenses(expenseRepository);
  const expensesInThisMonth = expenses.filter(
    (expense) =>
      expense.spentAt.getFullYear() === new Date().getFullYear() &&
      expense.spentAt.getMonth() === new Date().getMonth()
  );
  const categories = listCategories(categoryRepository);
  const categoryIdToCategory = new Map(
    categories.map((category) => [category.id, category])
  );
  const divElement = document.getElementById("content");
  if (!(divElement instanceof HTMLDivElement)) {
    throw new Error("div not found");
  }
  const sum = expensesInThisMonth.reduce((acc, curr) => acc + curr.amount, 0);
  const sumElement = document.createElement("p");
  sumElement.innerText = `${sum}`;
  divElement.appendChild(sumElement);
  expensesInThisMonth.forEach((expense) => {
    const el = document.createElement("li");
    const date = expense.spentAt.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
    });
    const categoryName =
      categoryIdToCategory.get(expense.categoryId)?.name ?? "";
    const { amount, note } = expense;
    el.innerText = [date, categoryName, amount, note].join(" ");
    divElement.appendChild(el);
  });
});
