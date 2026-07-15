import Link from "next/link";
import {
  Gamepad2,
  Globe,
  MessageCircle,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  store: [
    { label: "All Games", href: "/games" },
    { label: "New Releases", href: "/games" },
    { label: "On Sale", href: "/deals" },
    { label: "Free to Play", href: "/deals" },
    { label: "Pre-orders", href: "/games" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "System Requirements", href: "#" },
    { label: "Report a Bug", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: Share2, href: "#", label: "YouTube" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: ExternalLink, href: "https://github.com/Marsh-Edge", label: "GitHub" },
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Stripe",
];

export function Footer() {
  return (
    <footer className="w-full mt-auto">
      {/* Neon accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="glass border-t-0 border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Top: Logo + Links */}
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
                Your premium destination for the latest games at the best prices.
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
              <span>Created by</span>
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
              &copy; 2026 NeonGame. All rights reserved.
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
        </div>
      </div>
    </footer>
  );
}
