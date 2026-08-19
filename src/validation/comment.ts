import { z } from "zod";
import { COMMENT_TARGET_TYPES } from "../config";

export const createCommentSchema = z.object({
  targetType: z.enum(COMMENT_TARGET_TYPES),
  targetId: z.string().min(1),
  content: z.string().trim().min(1).max(2000),
  parentComment: z.string().min(1).optional(),
});
export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export const updateCommentSchema = z.object({
  content: z.string().trim().min(1).max(2000),
});
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;

export const moderateCommentSchema = z.object({
  status: z.enum(["visible", "hidden"]),
});
export type ModerateCommentInput = z.infer<typeof moderateCommentSchema>;
