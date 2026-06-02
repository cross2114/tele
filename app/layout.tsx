import type { Metadata } from "next";
import { RevealBoot } from "@/components/RevealBoot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telemiles",
  description: "AI and 5G smart devices for connected life."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <RevealBoot />
      </body>
    </html>
  );
}
