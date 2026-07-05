import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kelsey & Jeremy | October 16, 2026 | Oʻahu, Hawaiʻi',
  description:
    'Join us for an elegant, relaxed, unforgettable celebration at Kaimea Estates on the island of Oʻahu.',
  keywords: 'wedding, Hawaii, Oahu, Kaimea Estates, Kelsey and Jeremy',
  authors: [{ name: 'Kelsey & Jeremy' }],
  openGraph: {
    title: 'Kelsey & Jeremy | October 16, 2026 | Oʻahu, Hawaiʻi',
    description:
      'Join us for an elegant, relaxed, unforgettable celebration at Kaimea Estates on the island of Oʻahu.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#131A30" />
      </head>
      <body className="bg-navy-dark text-cream font-sans">{children}</body>
    </html>
  );
}
