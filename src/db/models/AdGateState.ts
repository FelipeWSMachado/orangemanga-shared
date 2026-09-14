import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

/**
 * Contador de capítulos lidos desde o último bloqueio de anúncio, um
 * documento por leitor (logado: "user:<id>"; anônimo: "visitor:<id>").
 * Zera quando o bloqueio é exibido — ver POST /api/chapters/read.
 */
const adGateStateSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    readsSinceGate: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export type AdGateStateDoc = InferSchemaType<typeof adGateStateSchema>;

export const AdGateState: Model<AdGateStateDoc> =
  models.AdGateState ?? model<AdGateStateDoc>("AdGateState", adGateStateSchema);
