import { useRef, useState } from "react";

interface Props { onSelect: (file: File) => void }

export default function UploadBox({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onSelect(f);
  };

  return (
    <div
      role="button" tabIndex={0} aria-label="Upload an image"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
        dragging ? "border-violet-500 bg-violet-50" : "border-blue-300 bg-blue-50/40 hover:bg-blue-50"
      }`}
    >
      <div className="text-4xl">📤</div>
      <p className="mt-3 font-semibold">Drag &amp; drop an image here</p>
      <p className="text-sm text-slate-500">or click to browse • JPG, JPEG, PNG • max 5MB</p>
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onSelect(f); e.target.value = ""; }} />
    </div>
  );
}
