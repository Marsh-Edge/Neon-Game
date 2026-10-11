"use client";

import Link from "next/link";
import { Home, Ghost } from "lucide-react";
import { PageShell } from "./components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl glass glass-border mb-5">
            <Ghost className="size-8 text-muted-foreground/40" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-foreground mb-3">
            404
          </h1>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2">
            {t("notFound.title")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {t("notFound.desc")}
          </p>
          <Link href="/">
            <Button className="bg-neon-cyan text-black hover:bg-neon-cyan/80 font-semibold px-6 h-9 text-sm cursor-pointer rounded-xl gap-2">
              <Home className="size-4" />
              {t("notFound.cta")}
            </Button>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}