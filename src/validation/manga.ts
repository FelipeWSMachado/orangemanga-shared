import { z } from "zod";
import { MANGA_ORIGINS, MANGA_STATUSES, GENRES, CHAPTER_STATUSES } from "../config";

export const createMangaSchema = z.object({
  title: z.string().trim().min(1).max(200),
  alternativeTitles: z.array(z.string().trim().min(1).max(200)).max(20).optional(),
  synopsis: z.string().trim().min(1).max(5000),
  origin: z.enum(MANGA_ORIGINS),
  status: z.enum(MANGA_STATUSES).optional(),
  genres: z.array(z.enum(GENRES)).max(10).optional(),
  tags: z.array(z.string().trim().min(1).max(30)).max(20).optional(),
  author: z.string().trim().max(120).optional(),
  studio: z.string().trim().max(120).optional(),
  releaseYear: z.number().int().min(1900).max(2100).optional(),
});
export type CreateMangaInput = z.infer<typeof createMangaSchema>;

export const updateMangaSchema = createMangaSchema.partial().extend({
  isPublished: z.boolean().optional(),
});
export type UpdateMangaInput = z.infer<typeof updateMangaSchema>;

export const listMangasQuerySchema = z.object({
  origin: z.enum(MANGA_ORIGINS).optional(),
  genre: z.enum(GENRES).optional(),
  search: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(24),
});
export type ListMangasQuery = z.infer<typeof listMangasQuerySchema>;

export const createChapterSchema = z.object({
  number: z.number().positive(),
  title: z.string().trim().max(200).optional(),
});
export type CreateChapterInput = z.infer<typeof createChapterSchema>;

export const updateChapterSchema = z.object({
  title: z.string().trim().max(200).optional(),
  status: z.enum(CHAPTER_STATUSES).optional(),
  pages: z
    .array(
      z.object({
        key: z.string().min(1),
        order: z.number().int().min(0),
      })
    )
    .optional(),
});
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;
