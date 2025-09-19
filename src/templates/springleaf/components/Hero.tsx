import React from 'react';
import { HeroProps } from '../../../schema/campaignSchema';

interface Props {
  hero: HeroProps;
}

const Hero: React.FC<Props> = ({ hero }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-sage-800 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            {hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            {hero.ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                  button.variant === 'primary'
                    ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-lg'
                    : 'bg-white bg-opacity-10 text-white border-2 border-white hover:bg-white hover:text-primary-900 backdrop-blur-sm'
                }`}
              >
                {button.text}
              </a>
            ))}
          </div>

          {/* Trust Indicators */}
          {hero.trustIndicators && hero.trustIndicators.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              {hero.trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;