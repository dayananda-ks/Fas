const stack = ["React", "TypeScript", "Tailwind CSS", "FastAPI", "TensorFlow", "Python"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 px-4 py-8 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        {stack.map((s) => (
          <span key={s} className="rounded-full bg-gradient-to-r from-blue-50 to-violet-50 px-3 py-1 text-xs font-medium text-violet-700">{s}</span>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">Fashion Item Classification using CNN • College Mini Project</p>
    </footer>
  );
}
