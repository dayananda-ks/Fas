export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white" aria-hidden>F</div>
        <span className="text-sm font-semibold sm:text-base">Fashion Item Classification using CNN</span>
      </div>
    </header>
  );
}
