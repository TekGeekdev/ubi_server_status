function Skeleton({ className }) {
  return <div className={`bg-div2-border/50 rounded animate-pulse ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="corner-cut bg-div2-surface border border-div2-border p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded" />
          <div className="space-y-2">
            <Skeleton className="w-16 h-2.5" />
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
        <Skeleton className="w-28 h-6 rounded" />
      </div>
      <div className="border-t border-div2-border" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-9 rounded" />
        ))}
      </div>
    </div>
  );
}
