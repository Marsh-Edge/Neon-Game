"use client";

import { useState } from "react";
import { Mail, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-2xl glass glass-border">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-magenta/5" />

        <div className="relative flex flex-col sm:flex-row items-center gap-6 px-8 py-8 sm:px-12">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex size-10 items-center justify-center rounded-xl bg-neon-cyan/10 glass-border">
              <Zap className="size-5 text-neon-cyan" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
                Stay in the Loop
              </h3>
              <p className="text-xs text-muted-foreground">
                Get deals before anyone else
              </p>
            </div>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-status-success">
              <CheckCircle className="size-5" />
              <span className="text-sm font-medium">
                You&apos;re subscribed! Check your inbox.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full sm:max-w-md gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 glass glass-border bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:border-neon-cyan focus-visible:ring-neon-cyan/30 h-9"
                />
              </div>
              <Button
                type="submit"
                className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm shrink-0 cursor-pointer"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
