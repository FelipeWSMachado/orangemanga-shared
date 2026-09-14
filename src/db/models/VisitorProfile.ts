import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { READER_MODES } from "../../config";

const visitorProfileSchema = new Schema(
  {
    visitorId: { type: String, required: true, unique: true, index: true },
    allowAdult: { type: Boolean, default: false },
    readerMode: { type: String, enum: READER_MODES, default: "scroll" },
  },
  { timestamps: true },
);

export type VisitorProfileDoc = InferSchemaType<typeof visitorProfileSchema>;

export const VisitorProfile: Model<VisitorProfileDoc> =
  models.VisitorProfile ?? model<VisitorProfileDoc>("VisitorProfile", visitorProfileSchema);
