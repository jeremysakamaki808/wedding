import { readFileSync } from 'fs';
import path from 'path';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Venue from './components/sections/Venue';
import Timeline from './components/sections/Timeline';
import WeddingParty from './components/sections/WeddingParty';
import Gallery from './components/sections/Gallery';
import RSVPSection from './components/sections/RSVPSection';
import type { WeddingData } from '@/types';

export default function Home() {
  // Load wedding data
  const dataPath = path.join(process.cwd(), 'public/data/wedding.json');
  const rawData = readFileSync(dataPath, 'utf-8');
  const weddingData: WeddingData = JSON.parse(rawData);

  return (
    <main className="w-full bg-dark-navy text-gray-100">
      <Navbar />
      <Hero />
      <Venue data={weddingData} />
      <Timeline data={weddingData} />
      <WeddingParty data={weddingData} />
      <Gallery />
      <RSVPSection data={weddingData} />
      <Footer data={weddingData} />
    </main>
  );
}
