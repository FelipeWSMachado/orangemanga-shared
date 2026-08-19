import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { COMMENT_TARGET_TYPES, COMMENT_STATUSES } from "../../config";

const commentSchema = new Schema(
  {
    targetType: { type: String, enum: COMMENT_TARGET_TYPES, required: true, index: true },
    targetId: { type: Schema.Types.ObjectId, required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    status: { type: String, enum: COMMENT_STATUSES, default: "visible", index: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    editedAt: { type: Date },
  },
  { timestamps: true }
);

commentSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });

export type CommentDoc = InferSchemaType<typeof commentSchema>;

export const Comment: Model<CommentDoc> = models.Comment ?? model<CommentDoc>("Comment", commentSchema);
