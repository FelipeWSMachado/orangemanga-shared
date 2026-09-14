import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { TAKEDOWN_STATUSES } from "../../config";

const takedownRequestSchema = new Schema(
  {
    requesterName: { type: String, required: true, trim: true },
    requesterEmail: { type: String, required: true, trim: true, lowercase: true },
    rightsHolder: { type: String, required: true, trim: true },
    workTitle: { type: String, required: true, trim: true },
    contentUrl: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: TAKEDOWN_STATUSES, default: "pending", index: true },
    adminNotes: { type: String },
    resolvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export type TakedownRequestDoc = InferSchemaType<typeof takedownRequestSchema>;

export const TakedownRequest: Model<TakedownRequestDoc> =
  models.TakedownRequest ?? model<TakedownRequestDoc>("TakedownRequest", takedownRequestSchema);
