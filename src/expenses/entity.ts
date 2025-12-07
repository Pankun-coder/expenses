import z from "zod";

export const expense = z.object({
  id: z.uuidv4(),
  spentAt: z.date(),
  amount: z.number(),
  categoryId: z.string(),
  note: z.string().optional(),
});

export type Expense = z.infer<typeof expense>;
