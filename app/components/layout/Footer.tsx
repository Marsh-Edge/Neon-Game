import {
  Globe,
  MessageCircle,
  Share2,
  ExternalLink,
} from "lucide-react";
import { FooterTranslations } from "./FooterTranslations";

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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="glass border-t-0 border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <FooterTranslations socialLinks={socialLinks} paymentMethods={paymentMethods} />
        </div>
      </div>
    </footer>
  );
}
