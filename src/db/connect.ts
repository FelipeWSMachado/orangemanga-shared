import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var __orangemangaMongooseConn: Promise<typeof mongoose> | undefined;
}

/**
 * Cached-connection pattern required in serverless (Vercel functions reuse the
 * module scope across warm invocations, but re-run the module on cold starts —
 * without this cache each cold start would open a new pool and eventually
 * exhaust the Atlas connection limit). Also used as-is by the always-on
 * api-home process, where the cache simply means "connect once".
 */
export async function connectMongo(uri: string): Promise<typeof mongoose> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!globalThis.__orangemangaMongooseConn) {
    mongoose.set("strictQuery", true);
    globalThis.__orangemangaMongooseConn = mongoose.connect(uri, {
      maxPoolSize: 10,
    });
  }

  return globalThis.__orangemangaMongooseConn;
}
