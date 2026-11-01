interface Props { url: string; name: string; onRemove: () => void; onChange: () => void }

export default function ImagePreview({ url, name, onRemove, onChange }: Props) {
  return (
    <div>
      <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
        <img src={url} alt={`Preview of ${name}`} className="max-h-full max-w-full object-contain" />
      </div>
      <p className="mt-2 truncate text-xs text-slate-500">{name}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={onChange} className="flex-1 rounded-xl border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">Change</button>
        <button onClick={onRemove} className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Remove</button>
      </div>
    </div>
  );
}
