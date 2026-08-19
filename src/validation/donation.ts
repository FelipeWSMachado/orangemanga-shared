import { z } from "zod";

export const createDonationCheckoutSchema = z.object({
  amountCents: z.number().int().min(100).max(100_000_00),
  message: z.string().trim().max(500).optional(),
  donorName: z.string().trim().max(80).optional(),
  isAnonymous: z.boolean().default(false),
});
export type CreateDonationCheckoutInput = z.infer<typeof createDonationCheckoutSchema>;
