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
    { label: "All Games", href: "#" },
    { label: "New Releases", href: "#" },
    { label: "On Sale", href: "#" },
    { label: "Free to Play", href: "#" },
    { label: "Pre-orders", href: "#" },
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
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Partners", href: "#" },
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
  { icon: ExternalLink, href: "#", label: "GitHub" },
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
      <div className="glass glass-border rounded-t-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Top: Logo + Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Logo + Social */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Gamepad2 className="size-6 text-neon-cyan" />
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-neon-cyan">
                  NEONGAME
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mb-4">
                Your premium destination for the latest games at the best
                prices.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-lg glass glass-border text-muted-foreground hover:text-neon-purple hover:border-neon-purple/40 transition-colors duration-200"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-[family-name:var(--font-display)] text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-white/10" />

          {/* Bottom: Copyright + Payment */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 NeonGame. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex items-center justify-center px-3 py-1.5 rounded-md glass glass-border text-[10px] font-medium text-muted-foreground uppercase tracking-wider"
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
