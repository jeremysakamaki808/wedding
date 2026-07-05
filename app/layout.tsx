import type { Metadata } from 'next';
import { Great_Vibes, Montserrat, Playfair_Display, Lora } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const lora = Lora({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
});

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

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
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${greatVibes.variable} ${montserrat.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#172243" />
      </head>
      <body className="bg-navy-dark text-cream font-sans">{children}</body>
    </html>
  );
}
