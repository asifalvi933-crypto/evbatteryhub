import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'EV Battery Hub India | EV Battery Scrap Value & Exchange Calculator',
  description: 'Calculate EV battery scrap value for LFP, NMC and lead acid batteries and get instant battery exchange deals in India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
