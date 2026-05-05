export default function Loading() {
  return (
    <div className="min-h-screen bg-hotel-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center leading-none">
          <span className="font-cormorant font-medium text-2xl text-hotel-text tracking-wide">
            Casa Boutique
          </span>
          <span className="font-cormorant font-light text-sm tracking-[0.22em] uppercase text-hotel-gold mt-1">
            San Diego
          </span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-hotel-gold/60 animate-pulse"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
