import { z } from "zod";
import { READER_MODES } from "../config";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72),
  displayName: z.string().trim().min(2).max(40),
  allowAdult: z.boolean().optional(),
  readerMode: z.enum(READER_MODES).optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(72),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const visitorPrefsSchema = z.object({
  allowAdult: z.boolean().optional(),
  readerMode: z.enum(READER_MODES).optional(),
});
export type VisitorPrefsInput = z.infer<typeof visitorPrefsSchema>;

export const updateAccountSchema = z.object({
  displayName: z.string().trim().min(2).max(40).optional(),
  preferences: visitorPrefsSchema.optional(),
});
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
