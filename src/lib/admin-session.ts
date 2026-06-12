import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vha_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "change-me-in-production";
}

export function createAdminSessionToken(adminId: string): string {
  const payload = JSON.stringify({
    adminId,
    exp: Date.now() + MAX_AGE * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(encoded)
    .digest("hex");
  return `${encoded}.${sig}`;
}

export function verifyAdminSessionToken(token: string): string | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(encoded)
    .digest("hex");
  if (sig !== expected) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as { adminId: string; exp: number };
    if (payload.exp < Date.now()) return null;
    return payload.adminId;
  } catch {
    return null;
  }
}

export async function setAdminSession(adminId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, createAdminSessionToken(adminId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSessionId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export async function requireAdminSession(): Promise<string> {
  const adminId = await getAdminSessionId();
  if (!adminId) {
    throw new Error("UNAUTHORIZED");
  }
  return adminId;
}
