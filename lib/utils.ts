export async function kvRateLimit(key: string, limit = 5, window = 900) {
  const mem = (globalThis as any).__kv ||= new Map();
  const now = Date.now();
  let rec = mem.get(key) || {c:0,t:now};
  if (now - rec.t > window*1000) rec = {c:1,t:now}; else rec.c++;
  mem.set(key, rec);
  return {allowed: rec.c <= limit, count: rec.c};
}

export async function verifyHCaptcha(token?: string) {
  if (!token) return false;
  if (!process.env.HCAPTCHA_SECRET) return true; // dev mode = всегда ок
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET}`
    });
    const data = await res.json();
    return !!data.success;
  } catch { return false; }
}
