"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { PageShell } from "./components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./context/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl glass glass-border mb-5">
            <AlertTriangle className="size-8 text-status-error/70" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2">
            {t("error.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {t("error.desc")}
          </p>
          <Button
            onClick={reset}
            className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm cursor-pointer rounded-xl gap-2"
          >
            <RotateCcw className="size-4" />
            {t("error.retry")}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}