import { z } from "zod";

export const createTakedownRequestSchema = z.object({
  requesterName: z.string().trim().min(2).max(120),
  requesterEmail: z.string().trim().email().max(160),
  rightsHolder: z.string().trim().min(2).max(160),
  workTitle: z.string().trim().min(1).max(200),
  contentUrl: z.string().trim().min(1).max(500),
  description: z.string().trim().min(20).max(3000),
});
export type CreateTakedownRequestInput = z.infer<typeof createTakedownRequestSchema>;
