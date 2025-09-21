import React from 'react';
import { HeroProps } from '../../../schema/campaignSchema';

interface Props {
  hero: HeroProps;
}

const Hero: React.FC<Props> = ({ hero }) => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${hero.backgroundImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&crop=center'})`,
        }}
      ></div>

      {/* Gradient Overlay for better text readability */}
      <div className='absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60'></div>

      {/* Subtle Pattern Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent'></div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16'>
        <div className='max-w-5xl mx-auto'>
          {/* Main Title */}
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg'>
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className='text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-md'>
            {hero.subtitle}
          </p>

          {/* CTA Buttons with specific styling */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center mb-16'>
            {hero.ctaButtons.map((button, index) => {
              // Specific styling based on button text/purpose
              const isRegisterButton =
                button.text.toLowerCase().includes('register') || button.href.includes('#register');
              const isGalleryButton =
                button.text.toLowerCase().includes('gallery') || button.href.includes('#gallery');

              let buttonClasses =
                'group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ';

              if (isRegisterButton) {
                // Green button with white text for Register Interest
                buttonClasses +=
                  'bg-green-600 text-white hover:bg-green-700 shadow-xl backdrop-blur-sm border border-green-500';
              } else if (isGalleryButton) {
                // Translucent button with white text for View Gallery
                buttonClasses +=
                  'bg-white/10 text-white border-2 border-white hover:bg-white hover:text-gray-900 backdrop-blur-sm';
              } else {
                // Default styling for other buttons
                buttonClasses +=
                  button.variant === 'primary'
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-xl backdrop-blur-sm border border-primary-500'
                    : 'bg-white/10 text-white border-2 border-white hover:bg-white hover:text-primary-900 backdrop-blur-sm';
              }

              return (
                <a key={index} href={button.href} className={buttonClasses}>
                  <span className='group-hover:scale-105 transition-transform duration-200 inline-block'>
                    {button.text}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Trust Indicators with enhanced design */}
          {hero.trustIndicators && hero.trustIndicators.length > 0 && (
            <div className='flex flex-wrap justify-center gap-8 text-sm text-gray-200'>
              {hero.trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm'
                >
                  <div className='w-2 h-2 bg-primary-400 rounded-full animate-pulse'></div>
                  <span className='font-medium'>{indicator}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Animated Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <div className='w-8 h-12 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-300 cursor-pointer'>
            <div className='w-1 h-3 bg-white rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-20 right-10 w-32 h-32 border border-white/20 rounded-full animate-spin-slow hidden lg:block'></div>
      <div className='absolute bottom-20 left-10 w-24 h-24 border border-white/20 rounded-full animate-pulse hidden lg:block'></div>
    </section>
  );
};

export default Hero;
