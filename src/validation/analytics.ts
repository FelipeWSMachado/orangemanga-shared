import { z } from "zod";
import { ANALYTICS_EVENT_TYPES } from "../config";

export const trackEventSchema = z.object({
  type: z.enum(ANALYTICS_EVENT_TYPES),
  path: z.string().trim().max(300).optional(),
  manga: z.string().min(1).optional(),
  chapter: z.string().min(1).optional(),
});
export type TrackEventInput = z.infer<typeof trackEventSchema>;
