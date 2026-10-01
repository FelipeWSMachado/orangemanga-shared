import { z } from "zod";
import { READER_MODES } from "../config";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Email inválido" })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value), { message: "Email inválido" }),
  password: z.string().min(8).max(72),
  displayName: z.string().trim().min(2).max(40),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(20)
    .regex(/^[a-z][a-z0-9_]{2,19}$/, "Username: letras minúsculas, números e underline"),
  allowAdult: z.boolean().optional(),
  readerMode: z.enum(READER_MODES).optional(),
  readerDisplay: z
    .object({
      size: z.number().int().min(40).max(100),
      brightness: z.number().int().min(50).max(150),
      saturation: z.number().int().min(0).max(200),
      contrast: z.number().int().min(50).max(150),
    })
    .optional(),
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
  readerDisplay: z
    .object({
      size: z.number().int().min(40).max(100),
      brightness: z.number().int().min(50).max(150),
      saturation: z.number().int().min(0).max(200),
      contrast: z.number().int().min(50).max(150),
    })
    .optional(),
});
export type VisitorPrefsInput = z.infer<typeof visitorPrefsSchema>;

export const updateAccountSchema = z.object({
  displayName: z.string().trim().min(2).max(40).optional(),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(20)
    .regex(/^[a-z][a-z0-9_]{2,19}$/, "Username: letras minúsculas, números e underline")
    .optional(),
  preferences: visitorPrefsSchema.optional(),
});
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(72),
  newPassword: z.string().min(8).max(72),
  code: z.string().length(6),
});
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const requestChangePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(72),
});
export type RequestChangePasswordInput = z.infer<typeof requestChangePasswordSchema>;

export const changeEmailSchema = z.object({
  newEmail: z.string().trim().toLowerCase().email(),
  currentPassword: z.string().min(1).max(72),
});
export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;

export const confirmChangeEmailSchema = z.object({
  code: z.string().length(6),
});
export type ConfirmChangeEmailInput = z.infer<typeof confirmChangeEmailSchema>;

export const emailVerifyTokenSchema = z.object({
  token: z.string().trim().min(20).max(200),
});
export type EmailVerifyTokenInput = z.infer<typeof emailVerifyTokenSchema>;

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>;

export const confirmPasswordResetSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  code: z.string().length(6),
  newPassword: z.string().min(8).max(72),
});
export type ConfirmPasswordResetInput = z.infer<typeof confirmPasswordResetSchema>;
