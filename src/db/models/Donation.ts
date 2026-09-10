import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { DONATION_STATUSES } from "../../config";

const donorSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    isAnonymous: { type: Boolean, default: false },
    userRef: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const donationSchema = new Schema(
  {
    providerPaymentId: { type: String, unique: true, index: true, sparse: true },
    donor: { type: donorSchema, default: () => ({}) },
    amountCents: { type: Number, required: true },
    currency: { type: String, default: "BRL" },
    message: { type: String },
    status: { type: String, enum: DONATION_STATUSES, default: "pending", index: true },
    qrCode: { type: String },
    qrCodeBase64: { type: String },
    ticketUrl: { type: String },
    expiresAt: { type: Date },
    paidAt: { type: Date },
    rawWebhookPayload: { type: Schema.Types.Mixed },
    showOnPublicWall: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type DonationDoc = InferSchemaType<typeof donationSchema>;

export const Donation: Model<DonationDoc> = models.Donation ?? model<DonationDoc>("Donation", donationSchema);
