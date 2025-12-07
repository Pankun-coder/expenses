import { Expense } from "./entity";
import { ExpenseRepository } from "./repository";

export const saveExpense = (
  repository: ExpenseRepository,
  expense: Omit<Expense, "id">
) => {
  repository.saveExpense(expense);
};
export const listExpenses = (repository: ExpenseRepository) => {
  return repository.listExpenses();
};
export const deleteExpense = (
  repository: ExpenseRepository,
  expenseId: string
) => {
  return repository.deleteExpense(expenseId);
};
