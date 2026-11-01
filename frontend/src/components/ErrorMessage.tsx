interface Props { message: string; onClose: () => void }

export default function ErrorMessage({ message, onClose }: Props) {
  return (
    <div role="alert" className="flex items-start justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <span>⚠️ {message}</span>
      <button onClick={onClose} aria-label="Dismiss error" className="font-bold hover:text-red-900">✕</button>
    </div>
  );
}
