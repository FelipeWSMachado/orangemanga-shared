import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { RATING_MODES } from "../../config";

const advancedScoresSchema = new Schema(
  {
    art: { type: Number, min: 1, max: 5 },
    story: { type: Number, min: 1, max: 5 },
    pacing: { type: Number, min: 1, max: 5 },
    translation: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

const ratingSchema = new Schema(
  {
    manga: { type: Schema.Types.ObjectId, ref: "Manga", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mode: { type: String, enum: RATING_MODES, required: true },
    simpleScore: { type: Number, min: 1, max: 5 },
    advanced: { type: advancedScoresSchema },
    reviewText: { type: String },
  },
  { timestamps: true }
);

ratingSchema.index({ manga: 1, user: 1 }, { unique: true });

export type RatingDoc = InferSchemaType<typeof ratingSchema>;

export const Rating: Model<RatingDoc> = models.Rating ?? model<RatingDoc>("Rating", ratingSchema);
