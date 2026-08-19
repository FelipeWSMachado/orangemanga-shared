export const USER_ROLES = ["reader", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["active", "banned"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const MANGA_ORIGINS = ["manga_jp", "manhwa_kr", "manhua_cn", "novel"] as const;
export type MangaOrigin = (typeof MANGA_ORIGINS)[number];

export const MANGA_STATUSES = ["ongoing", "completed", "hiatus", "cancelled"] as const;
export type MangaStatus = (typeof MANGA_STATUSES)[number];

export const CHAPTER_STATUSES = ["draft", "published"] as const;
export type ChapterStatus = (typeof CHAPTER_STATUSES)[number];

export const COMMENT_TARGET_TYPES = ["manga", "chapter"] as const;
export type CommentTargetType = (typeof COMMENT_TARGET_TYPES)[number];

export const COMMENT_STATUSES = ["visible", "hidden", "pending"] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];

export const RATING_MODES = ["simple", "advanced"] as const;
export type RatingMode = (typeof RATING_MODES)[number];

export const RATING_CRITERIA = ["art", "story", "pacing", "translation"] as const;
export type RatingCriterion = (typeof RATING_CRITERIA)[number];

export const DONATION_STATUSES = ["pending", "paid", "expired", "failed"] as const;
export type DonationStatus = (typeof DONATION_STATUSES)[number];

export const ANALYTICS_EVENT_TYPES = [
  "pageview",
  "chapter_read",
  "search",
  "signup",
  "donation_completed",
] as const;
export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[number];

export const AD_SLOT_KEYS = ["home_top", "explore_sidebar", "reader_between_pages", "manga_detail_bottom"] as const;
export type AdSlotKey = (typeof AD_SLOT_KEYS)[number];

export const GENRES = [
  "acao",
  "aventura",
  "comedia",
  "drama",
  "fantasia",
  "romance",
  "terror",
  "sobrenatural",
  "artes_marciais",
  "esporte",
  "slice_of_life",
  "misterio",
  "psicologico",
  "ficcao_cientifica",
  "yaoi_bl",
  "yuri_gl",
  "hentai",
] as const;
export type Genre = (typeof GENRES)[number];

export const ACCESS_TOKEN_TTL_SECONDS = 15 * 60; // 15 min
export const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 dias

export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";
export const VISITOR_ID_COOKIE = "visitor_id";
