// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "90-Day Concierge Parental Health Protocol | Dt. Ashwini Gawad — Clinical Dietitian, Mumbai",
  description:
    "Your parents are in Mumbai. Their diabetes is unmanaged. The 90-Day Concierge Protocol: a senior clinical dietitian coordinates with their doctors, trains their cook, and sends you bi-weekly health dashboards. For NRI families in Canada, USA & UK.",
  keywords: [
    "NRI parent health",
    "Mumbai dietitian",
    "concierge nutrition",
    "elderly diabetes management India",
    "clinical dietitian Mumbai",
    "parental health protocol",
    "NRI healthcare India",
  ],
  openGraph: {
    title: "90-Day Concierge Parental Health Protocol | Dt. Ashwini Gawad",
    description:
      "A 25-year veteran clinical dietitian who coordinates with your parents' Mumbai doctors, trains their cook, and sends you a bi-weekly clinical dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise-bg min-h-screen bg-midnight-950 font-body text-slate-200 antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
