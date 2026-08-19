import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ANALYTICS_EVENT_TYPES } from "../../config";

const ANALYTICS_EVENT_TTL_SECONDS = 60 * 60 * 24 * 180; // 180 dias

const analyticsEventSchema = new Schema(
  {
    type: { type: String, enum: ANALYTICS_EVENT_TYPES, required: true, index: true },
    path: { type: String },
    manga: { type: Schema.Types.ObjectId, ref: "Manga", index: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    visitorId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userAgent: { type: String },
    referrer: { type: String },
    createdAt: { type: Date, default: Date.now, expires: ANALYTICS_EVENT_TTL_SECONDS },
  },
  { timestamps: { createdAt: false, updatedAt: false } }
);

export type AnalyticsEventDoc = InferSchemaType<typeof analyticsEventSchema>;

export const AnalyticsEvent: Model<AnalyticsEventDoc> =
  models.AnalyticsEvent ?? model<AnalyticsEventDoc>("AnalyticsEvent", analyticsEventSchema);
