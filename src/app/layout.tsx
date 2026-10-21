import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fiber Manager | Σύστημα Αυτοψιών & Διαχείρισης FTTH",
  description:
    "Επαγγελματική πλατφόρμα πεδίου για αυτοψίες οπτικών ινών FTTH, ψηφιακές υπογραφές, αυτόματα σκαριφήματα, τεχνικές περιγραφές και αρχειοθέτηση φακέλων έργων.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="ftth-theme light" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased ftth-theme bg-slate-50 text-slate-900`}>
        <TooltipProvider>
          {children}
          <Toaster position="top-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
