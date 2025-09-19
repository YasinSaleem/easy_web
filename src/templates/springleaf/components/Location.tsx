import React from 'react';
import { LocationProps } from '../../../schema/campaignSchema';

interface Props {
  location: LocationProps;
}

const Location: React.FC<Props> = ({ location }) => {
  return (
    <section className='py-16 bg-gradient-to-br from-sage-50 to-primary-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>{location.title}</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{location.subtitle}</p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Location Details */}
          <div className='space-y-8'>
            {/* Address */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-primary-100 hover:shadow-md transition-shadow'>
              <div className='flex items-start space-x-4'>
                <div className='bg-primary-100 rounded-lg p-3 flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-primary-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>Address</h3>
                  <p className='text-gray-600 leading-relaxed'>{location.address}</p>
                </div>
              </div>
            </div>

            {/* Transportation */}
            {location.transportation && location.transportation.length > 0 && (
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-primary-100 hover:shadow-md transition-shadow'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-primary-100 rounded-lg p-3 flex-shrink-0'>
                    <svg
                      className='w-6 h-6 text-primary-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Transportation</h3>
                    <div className='space-y-2'>
                      {location.transportation.map((transport, index) => (
                        <div key={index} className='flex items-center space-x-3'>
                          <div className='w-2 h-2 bg-primary-500 rounded-full'></div>
                          <span className='text-gray-600'>{transport}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities */}
            {location.nearbyAmenities && location.nearbyAmenities.length > 0 && (
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-primary-100 hover:shadow-md transition-shadow'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-primary-100 rounded-lg p-3 flex-shrink-0'>
                    <svg
                      className='w-6 h-6 text-primary-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Nearby Amenities</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      {location.nearbyAmenities.map((amenity, index) => (
                        <div key={index} className='flex items-center space-x-3'>
                          <div className='w-2 h-2 bg-accent-500 rounded-full'></div>
                          <span className='text-gray-600 text-sm'>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map or Image Placeholder */}
          <div className='bg-gradient-to-br from-primary-100 to-sage-100 rounded-2xl p-8 min-h-[400px] flex items-center justify-center border border-primary-200'>
            <div className='text-center'>
              <div className='bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm'>
                <svg
                  className='w-8 h-8 text-primary-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Interactive Map</h3>
              <p className='text-gray-600'>Explore the neighborhood and surroundings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
