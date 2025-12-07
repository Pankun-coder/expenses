import z from "zod";

export const category = z.object({
  id: z.uuidv4(),
  name: z.string(),
});

export type Category = z.infer<typeof category>;
