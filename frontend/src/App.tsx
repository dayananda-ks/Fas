import { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import ImagePreview from "./components/ImagePreview";
import ResultCard from "./components/ResultCard";
import CategoryGrid from "./components/CategoryGrid";
import AboutCNN from "./components/AboutCNN";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { usePrediction } from "./hooks/usePrediction";

export default function App() {
  const p = usePrediction();
  const changeRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main className="mx-auto max-w-6xl space-y-4 px-4">
        {p.error && <ErrorMessage message={p.error} onClose={p.clearError} />}
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-blue-100/50">
            <h2 className="mb-4 text-lg font-semibold">1. Upload image</h2>
            {p.previewUrl && p.file ? (
              <ImagePreview url={p.previewUrl} name={p.file.name} onRemove={p.reset} onChange={() => changeRef.current?.click()} />
            ) : (
              <UploadBox onSelect={p.selectFile} />
            )}
            <input ref={changeRef} type="file" accept=".jpg,.jpeg,.png" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) p.selectFile(f); e.target.value = ""; }} />
            <button onClick={p.predict} disabled={!p.file || p.loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-semibold text-white shadow transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-40">
              {p.loading ? <><Loader /> Predicting...</> : "Predict"}
            </button>
          </section>
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-violet-100/50">
            <h2 className="mb-4 text-lg font-semibold">2. Result</h2>
            <ResultCard result={p.result} />
          </section>
        </div>
      </main>
      <CategoryGrid active={p.result?.label} />
      <AboutCNN />
      <Footer />
    </div>
  );
}
