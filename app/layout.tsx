import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeonGame - Premium Game Store",
  description: "Discover and purchase the latest games at unbeatable prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
