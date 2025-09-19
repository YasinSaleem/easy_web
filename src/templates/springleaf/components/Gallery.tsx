import React, { useState } from 'react';
import { GalleryProps } from '../../../schema/campaignSchema';

interface Props {
  gallery: GalleryProps;
}

const Gallery: React.FC<Props> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? gallery.images
      : gallery.images.filter((img) => img.category === selectedCategory);

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>{gallery.title}</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>{gallery.subtitle}</p>
        </div>

        {/* Enhanced Category Filter */}
        {gallery.categories && gallery.categories.length > 0 && (
          <div className='flex flex-wrap justify-center gap-4 mb-12'>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md hover:shadow-lg'
              }`}
            >
              All Images
              {selectedCategory === 'all' && (
                <span className='ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse'></span>
              )}
            </button>
            {gallery.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className='ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse'></span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Enhanced Image Grid with better animations */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className='group cursor-pointer'
              onClick={() => setSelectedImage(image.src)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl'>
                {/* Image Container with enhanced hover effects */}
                <div className='aspect-[4/3] bg-gradient-to-br from-primary-100 via-primary-50 to-sage-100 flex items-center justify-center relative overflow-hidden'>
                  <div className='text-center p-6 transition-all duration-300 group-hover:scale-110'>
                    <div className='bg-white rounded-full p-3 mx-auto mb-3 w-12 h-12 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:bg-primary-50 transition-all duration-300'>
                      <svg
                        className='w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-colors duration-300'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300'>
                      {image.alt}
                    </p>
                  </div>

                  {/* Enhanced Hover Overlay with animations */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-800/0 group-hover:from-primary-600/20 group-hover:to-primary-800/40 transition-all duration-500 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100'>
                      <div className='bg-white rounded-full p-4 shadow-2xl group-hover:shadow-primary-200/50 border border-primary-100'>
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
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corners */}
                  <div className='absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                {/* Enhanced Image Info */}
                {image.category && (
                  <div className='p-4'>
                    <span className='inline-flex items-center text-xs font-medium text-primary-700 bg-primary-100 px-3 py-1.5 rounded-full group-hover:bg-primary-200 transition-colors duration-300'>
                      <div className='w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 animate-pulse'></div>
                      {image.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className='group cursor-pointer'
              onClick={() => setSelectedImage(image.src)}
            >
              <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                {/* Image Placeholder */}
                <div className='aspect-[4/3] bg-gradient-to-br from-primary-100 to-sage-100 flex items-center justify-center relative overflow-hidden'>
                  <div className='text-center p-6'>
                    <div className='bg-white rounded-full p-3 mx-auto mb-3 w-12 h-12 flex items-center justify-center shadow-sm'>
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
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm text-gray-600 font-medium'>{image.alt}</p>
                  </div>

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='bg-white rounded-full p-3 shadow-lg'>
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
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                {image.category && (
                  <div className='p-4'>
                    <span className='text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg'>
                      {image.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredImages.length > 12 && (
          <div className='text-center mt-12'>
            <button className='bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors'>
              Load More Images
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4'>
            <div className='relative max-w-4xl max-h-full'>
              <button
                onClick={() => setSelectedImage(null)}
                className='absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors'
              >
                <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              {/* Image placeholder for lightbox */}
              <div className='bg-gradient-to-br from-primary-100 to-sage-100 rounded-lg aspect-[4/3] max-h-[80vh] flex items-center justify-center'>
                <div className='text-center p-8'>
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
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <p className='text-lg text-gray-700 font-medium'>Full Resolution Image</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
