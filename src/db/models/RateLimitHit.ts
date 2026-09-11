import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Contador simples baseado em Mongo (índice TTL só pra limpeza, não pra
// decidir o limite — a janela é sempre calculada explicitamente na query).
// Evita depender de um serviço externo (Redis/Upstash) só pra isso.
//
// Vive aqui (e não em cada app) para usar sempre a mesma instância de
// mongoose que connectMongo() conecta — um app que importe "mongoose"
// direto para montar esse model corre o risco de acabar com uma cópia
// bundlada separada (ex: Next.js com serverExternalPackages), nunca
// conectada, cujas queries travam até estourar o buffer do Mongoose.
const rateLimitHitSchema = new Schema({
  key: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export type RateLimitHitDoc = InferSchemaType<typeof rateLimitHitSchema>;

export const RateLimitHit: Model<RateLimitHitDoc> =
  models.RateLimitHit ?? model<RateLimitHitDoc>("RateLimitHit", rateLimitHitSchema);
