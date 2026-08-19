import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { MANGA_ORIGINS, MANGA_STATUSES, GENRES } from "../../config";

const ratingAdvancedAvgSchema = new Schema(
  {
    art: { type: Number, default: 0 },
    story: { type: Number, default: 0 },
    pacing: { type: Number, default: 0 },
    translation: { type: Number, default: 0 },
  },
  { _id: false }
);

const mangaSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    alternativeTitles: [{ type: String, trim: true }],
    synopsis: { type: String, required: true },
    coverUrl: { type: String },
    coverOriginalKey: { type: String },
    origin: { type: String, enum: MANGA_ORIGINS, required: true, index: true },
    status: { type: String, enum: MANGA_STATUSES, default: "ongoing" },
    genres: [{ type: String, enum: GENRES, index: true }],
    tags: [{ type: String, trim: true, index: true }],
    author: { type: String, trim: true },
    studio: { type: String, trim: true },
    releaseYear: { type: Number },
    views: { type: Number, default: 0 },
    ratingAvgSimple: { type: Number, default: 0 },
    ratingCountSimple: { type: Number, default: 0 },
    ratingAvgAdvanced: { type: ratingAdvancedAvgSchema, default: () => ({}) },
    ratingCountAdvanced: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

mangaSchema.index({ title: "text", alternativeTitles: "text" });
mangaSchema.index({ origin: 1, genres: 1 });
mangaSchema.index({ isPublished: 1, views: -1 });

export type MangaDoc = InferSchemaType<typeof mangaSchema>;

export const Manga: Model<MangaDoc> = models.Manga ?? model<MangaDoc>("Manga", mangaSchema);
