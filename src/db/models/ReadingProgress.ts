import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const readingProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    visitorId: { type: String, required: true, index: true },
    manga: { type: Schema.Types.ObjectId, ref: "Manga", required: true, index: true },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    chapterNumber: { type: Number, required: true },
    lastReadAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false },
);

readingProgressSchema.index({ userId: 1, manga: 1 }, { unique: true, sparse: true });
readingProgressSchema.index({ visitorId: 1, manga: 1 }, { unique: true });

export type ReadingProgressDoc = InferSchemaType<typeof readingProgressSchema>;

export const ReadingProgress: Model<ReadingProgressDoc> =
  models.ReadingProgress ?? model<ReadingProgressDoc>("ReadingProgress", readingProgressSchema);
