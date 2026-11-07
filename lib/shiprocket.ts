const BASE = "https://apiv2.shiprocket.in/v1/external";

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) throw new Error("Shiprocket API credentials are not configured.");
  const response = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.token) {
    throw new Error(data.message || "Shiprocket authentication failed. Check the API user credentials in Vercel.");
  }
  cachedToken = data.token as string;
  tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
  return cachedToken;
}

export async function shiprocketGet(path: string) {
  const token = await getToken();
  const response = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Shiprocket request failed.");
  return data;
}
