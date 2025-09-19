import React from 'react';
import { ValuePropositionProps } from '../../../schema/campaignSchema';

interface Props {
  valueProposition: ValuePropositionProps;
}

const ValueProposition: React.FC<Props> = ({ valueProposition }) => {
  const getIconForIndex = (index: number) => {
    const icons = [
      <path
        key='check'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 13l4 4L19 7'
      />, // Check
      <path
        key='lightning'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 10V3L4 14h7v7l9-11h-7z'
      />, // Lightning
      <path
        key='sun'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
      />, // Sun
    ];
    return icons[index % icons.length];
  };

  return (
    <section className='section-padding bg-gray-50'>
      <div className='container-wide'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6'>
            {valueProposition.title}
          </h2>
          <div className='w-24 h-1 bg-primary-600 mx-auto mb-6 rounded-full'></div>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            {valueProposition.subtitle}
          </p>
        </div>

        {/* USPs Grid with enhanced hover effects */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {valueProposition.usps.map((usp, index) => (
            <div key={index} className='group'>
              <div className='bg-white rounded-2xl p-8 h-full shadow-lg border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-primary-200 hover:bg-gradient-to-br hover:from-white hover:to-primary-50'>
                {/* Enhanced Icon with animation */}
                <div className='bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 group-hover:scale-110'>
                  <svg
                    className='w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    {getIconForIndex(index)}
                  </svg>
                </div>

                <h3 className='text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-900 transition-colors duration-300'>
                  {usp.title}
                </h3>
                <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                  {usp.description}
                </p>

                {/* Hover indicator */}
                <div className='w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-12 mt-4'></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        {valueProposition.stats && valueProposition.stats.length > 0 && (
          <div className='relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent'></div>
            <div className='absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full'></div>
            <div className='absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full'></div>

            <div className='relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8'>
              {valueProposition.stats.map((stat, index) => (
                <div key={index} className='text-center group'>
                  <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300'>
                    {stat.number}
                  </div>
                  <div className='text-primary-100 text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity duration-300'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ValueProposition;
