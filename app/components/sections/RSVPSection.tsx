'use client';

import React from 'react';
import type { WeddingData } from '@/types';

interface RSVPSectionProps {
  data: WeddingData;
}

export default function RSVPSection({ data }: RSVPSectionProps) {
  const { rsvp } = data;
  const deadlineDate = new Date(rsvp.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="rsvp" className="py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            RSVP
          </h2>
          <p className="text-charcoal/75 text-lg mb-4">
            Join us for the celebration of a lifetime
          </p>
          <p className="text-burgundy font-semibold">
            Please respond by {formattedDeadline}
          </p>
        </div>

        {/* Form Placeholder */}
        <div className="bg-ivory border border-cream-dark rounded-lg p-8">
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Your Name <span className="text-burgundy">*</span>
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 placeholder-brown/40">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Email Address <span className="text-burgundy">*</span>
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 placeholder-brown/40">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Radio Options */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-4">
                Will you be attending? <span className="text-burgundy">*</span>
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="yes"
                    disabled
                    className="w-4 h-4 text-burgundy cursor-pointer opacity-50"
                  />
                  <label htmlFor="yes" className="ml-3 text-charcoal/50 opacity-50">
                    Yes, I'll be there!
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="no"
                    disabled
                    className="w-4 h-4 text-burgundy cursor-pointer opacity-50"
                  />
                  <label htmlFor="no" className="ml-3 text-charcoal/50 opacity-50">
                    No, I can't make it
                  </label>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Leave a message for the happy couple
              </label>
              <div className="w-full px-4 py-3 bg-cream/50 border-2 border-cream-dark rounded-lg text-brown/50 h-32">
                [Form will be interactive in Phase 4]
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled
              className="w-full px-6 py-3 bg-burgundy text-ivory text-lg font-bold rounded-full opacity-50 cursor-not-allowed"
            >
              Submit RSVP
            </button>

            {/* Info Text */}
            <p className="text-center text-charcoal/60 text-sm mt-4">
              Full form functionality will be available in Phase 4. Currently a static layout.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-8 text-center">Questions?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.faqs.slice(0, 4).map((faq, index) => (
              <div
                key={index}
                className="bg-ivory p-6 rounded-lg border border-sage/30 hover:border-sage transition-colors duration-300"
              >
                <h4 className="text-lg font-serif font-bold text-burgundy mb-2">{faq.question}</h4>
                <p className="text-charcoal/75">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
