import type { PredictionResult } from "../types";

const badge = (status: string) =>
  status.startsWith("High") ? "bg-green-100 text-green-700"
  : status.startsWith("Moderate") ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

export default function ResultCard({ result }: { result: PredictionResult | null }) {
  if (!result) {
    return (
      <div className="grid h-full min-h-64 place-items-center rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
        <div><div className="text-4xl">🔍</div><p className="mt-2">Your prediction will appear here.</p></div>
      </div>
    );
  }
  const top3 = [...result.probabilities].sort((a, b) => b.value - a.value).slice(0, 3);
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-slate-500">Predicted category</p>
        <p className="text-3xl font-extrabold text-blue-700">{result.label}</p>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-slate-500">Confidence</span>
          <span className="font-bold text-violet-700">{result.confidence.toFixed(2)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-700"
            style={{ width: `${result.confidence}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Status</span>
        <span className={`rounded-full px-3 py-1 font-medium ${badge(result.status)}`}>{result.status}</span>
      </div>
      <div>
        <p className="mb-2 text-sm text-slate-500">Top 3 probabilities</p>
        <ul className="space-y-1 text-sm">
          {top3.map((p) => (
            <li key={p.label} className="flex justify-between rounded-lg bg-slate-50 px-3 py-1.5">
              <span>{p.label}</span><span className="font-medium">{p.value.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
