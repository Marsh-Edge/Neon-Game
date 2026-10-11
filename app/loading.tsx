import { PageShell } from "./components/layout/PageShell";
import { GameGridSkeleton } from "./components/home/GameSkeleton";

export default function Loading() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-3">
          <div className="h-9 w-56 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-72 max-w-full rounded bg-muted animate-pulse" />
        </div>
        <GameGridSkeleton count={6} />
      </div>
    </PageShell>
  );
}
