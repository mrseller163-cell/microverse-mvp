export async function publishConsent(userId?: string) {
  try {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  } catch (e) {
    console.error("publishConsent failed", e);
  }
}
