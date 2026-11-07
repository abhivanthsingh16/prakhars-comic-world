import { createHmac, timingSafeEqual } from "node:crypto";

const PROOF_TTL_MS = 30 * 60 * 1000;

export function createPhoneVerificationProof(phone: string) {
  const secret = process.env.MSG91_AUTHKEY;
  if (!secret) throw new Error("MSG91 server authentication is not configured.");
  const timestamp = Date.now().toString();
  const signature = createHmac("sha256", secret).update(`${phone}:${timestamp}`).digest("hex");
  return `${timestamp}.${signature}`;
}

export function isPhoneVerificationProofValid(phone: string, proof: unknown) {
  const secret = process.env.MSG91_AUTHKEY;
  if (!secret || typeof proof !== "string") return false;
  const [timestamp, signature, extra] = proof.split(".");
  if (!timestamp || !signature || extra || !/^\d{13}$/.test(timestamp)) return false;
  const age = Date.now() - Number(timestamp);
  if (age < 0 || age > PROOF_TTL_MS) return false;
  const expected = createHmac("sha256", secret).update(`${phone}:${timestamp}`).digest();
  let supplied: Buffer;
  try { supplied = Buffer.from(signature, "hex"); } catch { return false; }
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}
