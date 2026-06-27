import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AageKyaKaru",
  description: "Structured student guidance for courses, colleges, cities, fees, and hostels."
};

const navItems = [
  { href: "/after-10th", label: "10th" },
  { href: "/after-12th", label: "12th" },
  { href: "/after-diploma", label: "Diploma" },
  { href: "/after-degree", label: "Degree" },
  { href: "/colleges", label: "Colleges" },
  { href: "/cities", label: "Cities" },
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Quiz" },
  { href: "/chat", label: "AI Chat" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/92 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-2 text-lg font-black text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-ink text-white">
                <Compass size={19} />
              </span>
              AageKyaKaru
            </Link>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="Primary navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-white hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
