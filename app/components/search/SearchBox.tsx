"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allGames, genreNameKey } from "@/app/data/games";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  autoFocus?: boolean;
  onNavigate?: () => void;
}

export function SearchBox({ autoFocus, onNavigate }: SearchBoxProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const resultsId = "search-results";

  const results = useMemo(() => {
    if (deferredQuery.length === 0) return [];
    return allGames
      .filter(
        (game) =>
          game.title.toLowerCase().includes(deferredQuery) ||
          game.genres.some((genre) =>
            genre.toLowerCase().includes(deferredQuery)
          ) ||
          game.developer.toLowerCase().includes(deferredQuery)
      )
      .slice(0, 6);
  }, [deferredQuery]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const navigate = () => {
    setOpen(false);
    setQuery("");
    onNavigate?.();
  };

  return (
    <div ref={wrapperRef} className="relative w-full group">
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-neon-cyan transition-colors duration-200" />
      <Input
        type="search"
        role="combobox"
        aria-expanded={open && deferredQuery.length > 0}
        aria-controls={resultsId}
        aria-autocomplete="list"
        autoFocus={autoFocus}
        placeholder={t("nav.search")}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="ps-9 frosted-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground h-9"
      />

      {open && deferredQuery.length > 0 && (
        <div className="absolute inset-x-0 top-full mt-2 z-50 frosted border border-border rounded-xl overflow-hidden shadow-xl">
          {results.length > 0 ? (
            <>
              <p className="px-3.5 pt-2.5 pb-1 text-[11px] font-medium text-muted-foreground">
                {t("search.resultCount", { n: results.length })}
              </p>
              <ul id={resultsId} role="listbox" aria-label={t("nav.search")} className="max-h-80 overflow-y-auto pb-1">
                {results.map((game) => (
                  <li key={game.id} role="option" aria-selected={false}>
                    <Link
                      href={`/games/${game.id}`}
                      onClick={navigate}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5",
                        "hover:bg-muted transition-colors duration-150"
                      )}
                    >
                      <span className="relative size-9 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br dark:bg-white/[0.06] bg-black/[0.04] border border-border">
                        {game.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={game.image} alt="" className="size-full object-cover" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground truncate">
                          {game.title}
                        </span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {t(genreNameKey(game.genres[0]))} · {game.developer}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="px-3.5 py-3 text-sm text-muted-foreground">
              {t("search.noResults", { query })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}