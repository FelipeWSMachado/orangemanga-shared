import { z } from "zod";

const score = z.number().int().min(1).max(5);

export const createRatingSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("simple"),
    simpleScore: score,
    reviewText: z.string().trim().max(3000).optional(),
  }),
  z.object({
    mode: z.literal("advanced"),
    advanced: z.object({
      art: score,
      story: score,
      pacing: score,
      translation: score,
    }),
    reviewText: z.string().trim().max(3000).optional(),
  }),
]);
export type CreateRatingInput = z.infer<typeof createRatingSchema>;
