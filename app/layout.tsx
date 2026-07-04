import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wedding Celebration | Hawaii',
  description: 'Join us for a tropical celebration of love on the island of Oahu',
  keywords: 'wedding, Hawaii, Oahu, celebration, aloha',
  authors: [{ name: 'Wedding Team' }],
  openGraph: {
    title: 'Wedding Celebration | Hawaii',
    description: 'Join us for a tropical celebration of love on the island of Oahu',
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
        <meta name="theme-color" content="#0A0E27" />
      </head>
      <body className="bg-dark-navy text-gray-100">
        {children}
      </body>
    </html>
  );
}
