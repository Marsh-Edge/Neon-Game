import { PageShell } from "../components/layout/PageShell";
import { GameGridSkeleton } from "../components/home/GameSkeleton";

export default function Loading() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="h-9 w-48 rounded-lg bg-muted animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-24 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
        <GameGridSkeleton count={6} />
      </div>
    </PageShell>
  );
}
