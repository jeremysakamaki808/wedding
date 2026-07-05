import React from 'react';

interface CardData {
  title: string;
  lines: string[];
  icon: React.ReactNode;
}

const ICON_CLASS = 'w-7 h-7 md:w-8 md:h-8 text-burgundy';

const CARDS: CardData[] = [
  {
    title: 'The Venue',
    lines: ['Kaimea Estates', 'Oʻahu, Hawaiʻi'],
    icon: (
      <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
      </svg>
    ),
  },
  {
    title: 'Date',
    lines: ['October 16, 2026', '3:30 PM Ceremony'],
    icon: (
      <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm3 5h3v3H8v-3z" />
      </svg>
    ),
  },
  {
    title: 'Shuttle',
    lines: ['Kahala Mall', 'Mānoa Marketplace', 'Ala Moana Center'],
    icon: (
      <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
        <path d="M4 16c0 .9.4 1.7 1 2.2V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.8c.6-.5 1-1.3 1-2.2V6c0-3.5-3.6-4-8-4S4 2.5 4 6v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM6 11V6h12v5H6z" />
      </svg>
    ),
  },
];

export default function HeroCards() {
  return (
    <div className="mt-4 md:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-[520px]">
      {CARDS.map((card, index) => (
        <div
          key={card.title}
          className={`flex flex-col items-center text-center gap-1.5 rounded-xl border border-burgundy/40 bg-navy-dark/55 backdrop-blur-md px-3 py-3.5 md:py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft hover:border-burgundy/70 animate-fade-up ${
            index === 0
              ? '[animation-delay:0.35s]'
              : index === 1
                ? '[animation-delay:0.5s]'
                : '[animation-delay:0.65s]'
          }`}
        >
          {card.icon}
          <h3 className="font-display uppercase tracking-[0.12em] text-base md:text-lg text-burgundy mt-1">
            {card.title}
          </h3>
          <div className="space-y-0.5">
            {card.lines.map(line => (
              <p key={line} className="text-cream text-xs md:text-[13px] leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
