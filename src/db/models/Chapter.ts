import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { CHAPTER_STATUSES } from "../../config";

const pageSchema = new Schema(
  {
    key: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false }
);

const chapterSchema = new Schema(
  {
    manga: { type: Schema.Types.ObjectId, ref: "Manga", required: true, index: true },
    number: { type: Number, required: true, index: true },
    title: { type: String, trim: true },
    pages: [pageSchema],
    pageCount: { type: Number, default: 0 },
    status: { type: String, enum: CHAPTER_STATUSES, default: "draft", index: true },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

chapterSchema.index({ manga: 1, number: 1 }, { unique: true });

export type ChapterDoc = InferSchemaType<typeof chapterSchema>;

export const Chapter: Model<ChapterDoc> = models.Chapter ?? model<ChapterDoc>("Chapter", chapterSchema);
