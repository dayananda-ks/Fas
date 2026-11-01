import type { PredictionResult } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function predictImage(file: File): Promise<PredictionResult> {
  const form = new FormData();
  form.append("file", file);
  let res: Response;
  try {
    res = await fetch(`${API_URL}/predict`, { method: "POST", body: form });
  } catch {
    throw new Error("Cannot reach the server. Make sure the backend is running.");
  }
  if (!res.ok) {
    let msg = `Server error (${res.status}).`;
    try { msg = (await res.json()).detail ?? msg; } catch { /* ignore */ }
    throw new Error(msg);
  }
  return (await res.json()) as PredictionResult;
}
