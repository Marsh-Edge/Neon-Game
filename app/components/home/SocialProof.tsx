import { Eye, Clock } from "lucide-react";
import { socialProof } from "@/app/data/games";

export function SocialProof() {
  return (
    <section className="w-full">
      <div className="glass glass-border rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 py-4">
          {/* Live viewers */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-status-success" />
            </span>
            <Eye className="size-4 text-status-success" />
            <span className="text-sm font-medium text-foreground">
              {socialProof.activeViewers.toLocaleString()} people are viewing
              this right now
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-white/10" />

          {/* Recent purchases - scrolling ticker */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-8 animate-ticker whitespace-nowrap">
              {[...socialProof.recentPurchases, ...socialProof.recentPurchases].map(
                (purchase, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0">
                    <Clock className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      <span className="font-medium text-white/80">
                        {purchase.user}
                      </span>{" "}
                      purchased{" "}
                      <span className="font-medium text-neon-cyan">
                        {purchase.game}
                      </span>{" "}
                      {purchase.time}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
