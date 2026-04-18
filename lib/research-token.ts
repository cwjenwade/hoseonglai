import crypto from "crypto";

type ResearchTokenPayload = {
  registrationId: string;
  projectId: string;
  participantCode: string;
  exp: number;
};

type ResearchInput = Omit<ResearchTokenPayload, "exp">;

function getSecretOrThrow(): string {
  const secret = process.env.RESEARCH_TOKEN_SECRET;
  if (secret) return secret;

  const fallbackSecret = process.env.RESEARCH_TOKEN_FALLBACK_SECRET;
  if (fallbackSecret) {
    console.warn("RESEARCH_TOKEN_SECRET_MISSING_USING_FALLBACK_SECRET");
    return fallbackSecret;
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    console.warn("RESEARCH_TOKEN_SECRET_MISSING_USING_SERVICE_ROLE_KEY_FALLBACK");
    return serviceRoleKey;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing RESEARCH_TOKEN_SECRET (and no fallback secret available).",
    );
  }

  return "dev-secret-change-me";
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  while (input.length % 4) input += "=";
  return Buffer.from(input, "base64").toString("utf8");
}

function sign(data: string) {
  return crypto
    .createHmac("sha256", getSecretOrThrow())
    .update(data)
    .digest("hex");
}

export function signResearchToken(input: ResearchInput) {
  const payload: ResearchTokenPayload = {
    ...input,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 天有效期
  };

  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

export function verifyResearchToken(token: string): ResearchTokenPayload | null {
  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  if (expected !== signature) return null;

  const parsed = JSON.parse(base64UrlDecode(encoded)) as ResearchTokenPayload;

  if (!parsed.exp || Date.now() > parsed.exp) return null;

  return parsed;
}
