import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { AD_SLOT_KEYS } from "../../config";

const adSlotConfigSchema = new Schema(
  {
    slotKey: { type: String, enum: AD_SLOT_KEYS, required: true, unique: true },
    enabled: { type: Boolean, default: false },
    adSenseSlotId: { type: String },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export type AdSlotConfigDoc = InferSchemaType<typeof adSlotConfigSchema>;

export const AdSlotConfig: Model<AdSlotConfigDoc> =
  models.AdSlotConfig ?? model<AdSlotConfigDoc>("AdSlotConfig", adSlotConfigSchema);
