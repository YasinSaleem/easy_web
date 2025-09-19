import React, { useState } from 'react';
import { FloorPlansProps } from '../../../schema/campaignSchema';

interface Props {
  floorPlans: FloorPlansProps;
}

const FloorPlans: React.FC<Props> = ({ floorPlans }) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {floorPlans.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {floorPlans.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Floor Plan List */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-6">
              {floorPlans.plans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPlan(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all ${
                    selectedPlan === index
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${
                        selectedPlan === index ? 'text-white' : 'text-gray-900'
                      }`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        selectedPlan === index ? 'text-primary-100' : 'text-gray-600'
                      }`}>
                        {plan.type}
                      </p>
                      <div className={`flex items-center space-x-4 text-sm ${
                        selectedPlan === index ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        <span>{plan.bedrooms} BD</span>
                        <span>{plan.bathrooms} BA</span>
                        <span>{plan.size}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        selectedPlan === index ? 'text-white' : 'text-primary-600'
                      }`}>
                        {plan.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Floor Plan Details */}
          <div className="lg:col-span-2">
            {floorPlans.plans[selectedPlan] && (
              <div className="bg-gray-50 rounded-3xl p-8">
                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {floorPlans.plans[selectedPlan].name}
                      </h3>
                      <p className="text-gray-600">{floorPlans.plans[selectedPlan].type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-600 mb-1">
                        {floorPlans.plans[selectedPlan].price}
                      </p>
                      <p className="text-gray-600">Starting from</p>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                      </svg>
                      <span className="font-medium">{floorPlans.plans[selectedPlan].bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      <span className="font-medium">{floorPlans.plans[selectedPlan].bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="font-medium">{floorPlans.plans[selectedPlan].size}</span>
                    </div>
                  </div>
                </div>

                {/* Floor Plan Image */}
                <div className="bg-white rounded-2xl p-8 mb-8 min-h-[400px] flex items-center justify-center border-2 border-primary-100">
                  <div className="text-center">
                    <div className="bg-primary-50 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Floor Plan Blueprint</h4>
                    <p className="text-gray-600">Interactive floor plan for {floorPlans.plans[selectedPlan].name}</p>
                  </div>
                </div>

                {/* Features */}
                {floorPlans.plans[selectedPlan].features && floorPlans.plans[selectedPlan].features.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Features & Highlights</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {floorPlans.plans[selectedPlan].features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                          <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                    Schedule Viewing
                  </button>
                  <button className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
                    Download Floor Plan
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    Request Info
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-sage-100 to-primary-100 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Find the Perfect Floor Plan?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our design team can work with you to create custom modifications to any of our floor plans to suit your specific needs.
          </p>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            Discuss Custom Options
          </button>
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;