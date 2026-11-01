export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-14 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-3xl rounded-full bg-gradient-to-r from-blue-200/60 to-violet-200/60 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <h1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
          Fashion Item Classification
        </h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          Upload a fashion image and let AI identify the clothing category.
        </p>
      </div>
    </section>
  );
}
