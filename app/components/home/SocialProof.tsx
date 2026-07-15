"use client";

import { Eye, Clock } from "lucide-react";
import { socialProof } from "@/app/data/games";
import { FadeIn } from "@/components/ui/FadeIn";

export function SocialProof() {
  return (
    <section className="w-full">
      <FadeIn variant="fadeIn">
        <div className="glass rounded-xl overflow-hidden border border-border border-l-2 border-l-neon-cyan/40">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 py-4">
            {/* Live viewers */}
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-status-success" />
              </span>
              <Eye className="size-4 text-status-success" />
              <span className="text-sm font-medium text-foreground/80">
                {socialProof.activeViewers.toLocaleString()} people are viewing
                this right now
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-border" />

            {/* Recent purchases - scrolling ticker */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex gap-8 animate-ticker whitespace-nowrap">
                {[...socialProof.recentPurchases, ...socialProof.recentPurchases].map(
                  (purchase, i) => (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <Clock className="size-3 text-muted-foreground/60" />
                      <span className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70">
                          {purchase.user}
                        </span>{" "}
                        purchased{" "}
                        <span className="font-medium text-neon-cyan/80">
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
      </FadeIn>
    </section>
  );
}
