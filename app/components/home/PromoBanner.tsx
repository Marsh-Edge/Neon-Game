import { Button } from "@/components/ui/button";
import { Flame, Timer } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-2xl glass glass-border-strong">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/20 via-purple-500/20 to-neon-cyan/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-neon-magenta/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-neon-cyan/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 sm:px-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Flame className="size-5 text-neon-magenta animate-pulse-glow" />
              <span className="text-xs font-bold tracking-widest uppercase text-neon-magenta">
                Limited Time
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Summer Sale
            </h2>
            <p className="text-lg text-white/70">
              Up to <span className="font-bold text-neon-cyan">70% off</span> on
              thousands of games
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/* Countdown */}
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Timer className="size-4" />
              <span>Ends in 3 days</span>
            </div>
            <Button
              size="lg"
              className="bg-neon-magenta text-white hover:bg-neon-magenta/80 neon-glow-magenta font-semibold px-8 h-11 text-sm cursor-pointer"
            >
              Shop the Sale
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
