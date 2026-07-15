"use client";

import Link from "next/link";
import { Gamepad2, type LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/app/context/LanguageContext";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FooterTranslationsProps {
  socialLinks: SocialLink[];
  paymentMethods: string[];
}

export function FooterTranslations({ socialLinks, paymentMethods }: FooterTranslationsProps) {
  const { t } = useLanguage();

  const footerLinks = {
    store: [
      { label: t("footer.store.allGames"), href: "/games" },
      { label: t("footer.store.newReleases"), href: "/games" },
      { label: t("footer.store.onSale"), href: "/deals" },
      { label: t("footer.store.freeToPlay"), href: "/deals" },
      { label: t("footer.store.preorders"), href: "/games" },
    ],
    support: [
      { label: t("footer.support.helpCenter"), href: "#" },
      { label: t("footer.support.contactUs"), href: "#" },
      { label: t("footer.support.refundPolicy"), href: "#" },
      { label: t("footer.support.systemReqs"), href: "#" },
      { label: t("footer.support.reportBug"), href: "#" },
    ],
    company: [
      { label: t("footer.company.aboutUs"), href: "#" },
    ],
    legal: [
      { label: t("footer.legal.terms"), href: "#" },
      { label: t("footer.legal.privacy"), href: "#" },
      { label: t("footer.legal.cookies"), href: "#" },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Logo + Social */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
          <Link href="/" className="flex items-center gap-2.5 mb-3 group">
            <div className="flex size-8 items-center justify-center rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 transition-all duration-300 group-hover:bg-neon-cyan/15 group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.15)]">
              <Gamepad2 className="size-4 text-neon-cyan" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
              NEON<span className="text-neon-cyan">GAME</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground/70 max-w-[220px] mb-4 leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex size-9 items-center justify-center rounded-lg glass border border-border text-muted-foreground hover:text-neon-purple hover:border-neon-purple/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.15)] transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              {category}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground/70 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="my-8 bg-border" />

      {/* Bottom: Creator + Copyright + Payment */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
          <span>{t("footer.createdBy")}</span>
          <a
            href="https://github.com/Marsh-Edge"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neon-cyan/70 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
          >
            Marsh-Edge
          </a>
        </div>
        <p className="text-xs text-muted-foreground/50 order-last sm:order-none">
          &copy; {t("footer.rights")}
        </p>
        <div className="flex items-center gap-2">
          {paymentMethods.map((method) => (
            <div
              key={method}
              className="flex items-center justify-center px-3 py-1.5 rounded-lg glass border border-border text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider"
            >
              {method}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
