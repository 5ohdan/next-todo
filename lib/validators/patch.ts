import * as z from "zod";

export const patchPatchSchema = z.object({
  id: z.number(),
  title: z.string().min(3).max(128).optional(),
  description: z.any().optional(),
});
