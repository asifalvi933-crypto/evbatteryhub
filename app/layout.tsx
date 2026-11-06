import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
