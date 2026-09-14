import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

/**
 * Config única (singleton, sem chave) do bloqueio obrigatório de anúncio
 * entre capítulos. chaptersPerGate = 0 desativa o bloqueio inteiro.
 */
const adGateConfigSchema = new Schema(
  {
    chaptersPerGate: { type: Number, default: 2, min: 0 },
    donorAdFreeDays: { type: Number, default: 7, min: 0 },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export type AdGateConfigDoc = InferSchemaType<typeof adGateConfigSchema>;

export const AdGateConfig: Model<AdGateConfigDoc> =
  models.AdGateConfig ?? model<AdGateConfigDoc>("AdGateConfig", adGateConfigSchema);
