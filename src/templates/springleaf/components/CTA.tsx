import React from 'react';
import { CTAProps } from '../../../schema/campaignSchema';

interface Props {
  cta: CTAProps;
}

const CTA: React.FC<Props> = ({ cta }) => {
  return (
    <section className='relative py-20 bg-gradient-to-br from-sage-700 to-primary-800 text-white overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-accent-600 to-transparent'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-3xl md:text-5xl font-bold mb-6 leading-tight'>{cta.title}</h2>
        <p className='text-xl text-sage-100 mb-12 leading-relaxed max-w-3xl mx-auto'>
          {cta.subtitle}
        </p>

        {/* CTA Button */}
        <div className='mb-12'>
          <a
            href={cta.ctaLink}
            className='inline-flex items-center px-12 py-4 bg-accent-500 text-white font-bold text-lg rounded-xl hover:bg-accent-600 transition-all transform hover:scale-105 shadow-lg'
          >
            {cta.ctaText}
            <svg className='ml-3 w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </a>
        </div>

        {/* Trust Badges */}
        {cta.trustBadges && cta.trustBadges.length > 0 && (
          <div className='flex flex-wrap justify-center gap-8 text-sm text-sage-200'>
            {cta.trustBadges.map((badge, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-accent-400 rounded-full'></div>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full opacity-5 transform translate-x-32 -translate-y-32'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-sage-400 rounded-full opacity-5 transform -translate-x-24 translate-y-24'></div>
    </section>
  );
};

export default CTA;
