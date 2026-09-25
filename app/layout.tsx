import type { Metadata } from "next";
import { Jost, Lora } from "next/font/google";
import { Shell } from "@/components/Shell";
import "./globals.css";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Baía Seafood Restaurant",
  description: "Baía, pronounced Ba-hia, is a seafood restaurant upstairs at Entrance 5, V&A Waterfront, Cape Town.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${jost.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
