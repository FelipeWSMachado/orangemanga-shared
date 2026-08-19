import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { USER_ROLES, USER_STATUSES } from "../../config";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    role: { type: String, enum: USER_ROLES, default: "reader", index: true },
    status: { type: String, enum: USER_STATUSES, default: "active", index: true },
    refreshTokenVersion: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> = models.User ?? model<UserDoc>("User", userSchema);
