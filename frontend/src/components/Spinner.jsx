export default function Spinner({ size = "md", text = "" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-gray-600 border-t-primary-400`}
      />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
}
