import { useCallback, useEffect, useState } from "react";
import { predictImage } from "../services/api";
import type { PredictionResult } from "../types";

const ALLOWED = ["image/jpeg", "image/png"];
const MAX_BYTES = 5 * 1024 * 1024;

export function usePrediction() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Free the object URL when it changes or on unmount
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const selectFile = useCallback((f: File) => {
    if (!ALLOWED.includes(f.type)) return setError("Only JPG, JPEG and PNG images are supported.");
    if (f.size > MAX_BYTES) return setError("File is too large. Maximum size is 5MB.");
    setError(null);
    setResult(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, []);

  const predict = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      setResult(await predictImage(file));
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [file]);

  const reset = useCallback(() => {
    setFile(null); setPreviewUrl(null); setResult(null); setError(null);
  }, []);

  return { file, previewUrl, result, loading, error, selectFile, predict, reset, clearError: () => setError(null) };
}
