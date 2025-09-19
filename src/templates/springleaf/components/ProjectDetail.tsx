import React from 'react';
import { ProjectDetailProps } from '../../../schema/campaignSchema';

interface Props {
  projectDetail: ProjectDetailProps;
}

const ProjectDetail: React.FC<Props> = ({ projectDetail }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {projectDetail.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {projectDetail.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {/* Overview Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {projectDetail.overview.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {projectDetail.overview.description}
              </p>
              
              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900">Key Features</h4>
                {projectDetail.overview.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="bg-gradient-to-br from-primary-50 to-sage-50 rounded-2xl p-8 min-h-[400px] flex items-center justify-center border border-primary-100">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Project Visualization</h4>
                <p className="text-gray-600">Architectural renderings and layouts</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectDetail.specifications.map((spec, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-primary-200 pb-2">
                    {spec.category}
                  </h4>
                  <div className="space-y-3">
                    {spec.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{item.label}</span>
                        <span className="font-medium text-gray-900 text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          {projectDetail.amenities && projectDetail.amenities.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Premium Amenities
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectDetail.amenities.map((amenityGroup, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-accent-500 rounded-full mr-3"></div>
                      {amenityGroup.category}
                    </h4>
                    <div className="space-y-2">
                      {amenityGroup.items.map((amenity, amenityIndex) => (
                        <div key={amenityIndex} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                          <span className="text-gray-600 text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Interested in Learning More?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Schedule a private tour or speak with our sales team to discover everything this project has to offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Schedule Tour
              </button>
              <button className="bg-primary-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-900 transition-colors border border-primary-500">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;