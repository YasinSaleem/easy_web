import React from 'react';
import { ValuePropositionProps } from '../../../schema/campaignSchema';

interface Props {
  valueProposition: ValuePropositionProps;
}

const ValueProposition: React.FC<Props> = ({ valueProposition }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {valueProposition.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {valueProposition.subtitle}
          </p>
        </div>

        {/* USPs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {valueProposition.usps.map((usp, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-primary-50 to-sage-50 rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary-100">
                {/* Icon */}
                <div className="bg-primary-100 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {usp.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {usp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {valueProposition.stats && valueProposition.stats.length > 0 && (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {valueProposition.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-100 text-sm md:text-base">
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