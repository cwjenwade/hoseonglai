import crypto from "crypto";

type ResearchTokenPayload = {
  projectId: string;
  projectTitle: string;
  projectTestUrl: string;
  participantCode: string;
  name: string;
  email: string;
  exp: number;
};

type ResearchInput = Omit<ResearchTokenPayload, "exp">;

function getSecretOrThrow(): string {
  const secret = process.env.RESEARCH_TOKEN_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing RESEARCH_TOKEN_SECRET. Set it in production to prevent forged research tokens.",
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