import { CATEGORIES } from "../constants/categories";

export default function CategoryGrid({ active }: { active?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold">Supported Categories</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {CATEGORIES.map((c) => {
          const on = c.label === active;
          return (
            <div key={c.label}
              className={`rounded-2xl border p-4 text-center transition ${
                on ? "border-violet-500 bg-gradient-to-br from-blue-50 to-violet-50 shadow-md ring-2 ring-violet-300"
                   : "border-slate-100 bg-white shadow-sm"}`}>
              <div className="text-3xl">{c.icon}</div>
              <p className="mt-1 text-sm font-medium">{c.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
