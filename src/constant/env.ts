export const isProd = process.env.NODE_ENV === "production";
export const isLocal = process.env.NODE_ENV === "development";

export const showLogger = isLocal ? true : false;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3040/api";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? "";
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "";
