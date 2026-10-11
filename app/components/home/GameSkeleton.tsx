import { cn } from "@/lib/utils";

export function GameCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl glass glass-border overflow-hidden",
        "min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px] shrink-0",
        className
      )}
    >
      <div className="relative aspect-video bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.02] from-black/[0.05] to-black/[0.02]">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
      <div className="flex flex-col gap-2.5 p-3.5">
        <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-2.5 w-1/2 rounded bg-muted animate-pulse" />
        <div className="h-2.5 w-1/3 rounded bg-muted animate-pulse" />
        <div className="mt-1.5 h-4 w-1/2 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export function GameGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <GameCardSkeleton />
        </div>
      ))}
    </div>
  );
}
