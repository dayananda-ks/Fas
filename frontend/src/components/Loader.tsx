export default function Loader({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span role="status" aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-white/40 border-t-white ${className}`} />
  );
}
