import { expense, Expense } from "./entity";
import z from "zod";
export type ExpenseRepository = {
  saveExpense: (expense: Omit<Expense, "id">) => void;
  listExpenses: () => Expense[];
  deleteExpense: (expenseId: Expense["id"]) => void;
};

const localStorageKey = "expensesRepository";

const stringifiableExpense = z.object({
  ...expense.shape,
  spentAt: z.number(),
  note: z.string().nullable(),
});

const getFromLocalStorage = () => {
  const localStorageItem = localStorage.getItem(localStorageKey);
  if (localStorageItem === null) {
    return [];
  }

  const parsed = stringifiableExpense
    .transform((expense) => ({
      ...expense,
      spentAt: new Date(expense.spentAt),
      note: expense.note !== null ? expense.note : undefined,
    }))
    .array()
    .parse(JSON.parse(localStorageItem));
  return parsed;
};

const saveToLocalStorage = (expenses: Expense[]) => {
  const escaped = expenses.map((expense) => {
    const escapedSpentAt = expense.spentAt.getTime();
    const escapedNote = expense.note ?? null;
    return {
      ...expense,
      spentAt: escapedSpentAt,
      note: escapedNote,
    };
  });
  localStorage.setItem(
    localStorageKey,
    JSON.stringify(stringifiableExpense.parse(escaped))
  );
};

export const expenseRepository: ExpenseRepository = {
  saveExpense: (expense) => {
    const currentExpenses = getFromLocalStorage();
    saveToLocalStorage([
      ...currentExpenses,
      { ...expense, id: crypto.randomUUID() },
    ]);
  },
  listExpenses: () => {
    return getFromLocalStorage();
  },
  deleteExpense: (expenseId) => {
    const currentExpenses = getFromLocalStorage();
    saveToLocalStorage(
      currentExpenses.filter((expense) => expense.id !== expenseId)
    );
  },
};
