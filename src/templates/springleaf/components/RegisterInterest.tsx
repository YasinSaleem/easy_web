import React, { useState } from 'react';
import { RegisterInterestProps } from '../../../schema/campaignSchema';

interface Props {
  registerInterest: RegisterInterestProps;
}

const RegisterInterest: React.FC<Props> = ({ registerInterest }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='min-h-screen bg-gray-50 py-16'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          {/* Golden Email Icon */}
          <div className='inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-full mb-6'>
            <svg
              className='w-10 h-10 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          </div>

          {/* Elegant Heading */}
          <h1 className='text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight'>
            {registerInterest.title || 'Register Your Interest'}
          </h1>

          {/* Descriptive Subtext */}
          <p className='text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed'>
            {registerInterest.subtitle ||
              "Leave your details and we'll get back to you with personalized information about this exclusive property opportunity."}
          </p>

          {/* Decorative Line with Golden Center Dot */}
          <div className='flex items-center justify-center mb-8'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <div className='mx-4 w-2 h-2 bg-primary-500 rounded-full'></div>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className='bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Two-column row for Name and Email */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Full Name Field */}
              <div>
                <label htmlFor='fullName' className='block text-white text-sm font-medium mb-2'>
                  <div className='flex items-center space-x-2'>
                    <svg
                      className='w-4 h-4 text-primary-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                    <span>
                      Full Name<span className='text-red-400 ml-1'>*</span>
                    </span>
                  </div>
                </label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder='Enter your full name'
                  className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'
                />
              </div>

              {/* Email Address Field */}
              <div>
                <label htmlFor='email' className='block text-white text-sm font-medium mb-2'>
                  <div className='flex items-center space-x-2'>
                    <svg
                      className='w-4 h-4 text-primary-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    <span>
                      Email Address<span className='text-red-400 ml-1'>*</span>
                    </span>
                  </div>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder='Enter your email address'
                  className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor='mobile' className='block text-white text-sm font-medium mb-2'>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-primary-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  <span>
                    Mobile Number<span className='text-red-400 ml-1'>*</span>
                  </span>
                </div>
              </label>
              <input
                type='tel'
                id='mobile'
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder='Enter your mobile number'
                className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor='message' className='block text-white text-sm font-medium mb-2'>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-primary-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707z'
                    />
                  </svg>
                  <span>
                    Message <span className='text-gray-400 text-xs'>(optional)</span>
                  </span>
                </div>
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder='Tell us about your specific requirements or questions...'
                className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none'
              />
            </div>

            {/* Submit Button */}
            <div className='pt-4'>
              <button
                type='submit'
                className='inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all shadow-lg hover:shadow-xl'
              >
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Send Message
              </button>
            </div>

            {/* Privacy Notice */}
            <div className='pt-4 border-t border-gray-600'>
              <p className='text-xs text-gray-400 leading-relaxed'>
                By submitting this form, you consent to being contacted by{' '}
                {registerInterest.businessName || 'our team'}
                regarding this property opportunity. We respect your privacy and will not share your
                information with third parties.
              </p>
            </div>
          </form>
        </div>

        {/* Additional Contact Information */}
        {registerInterest.contactInfo &&
          (registerInterest.contactInfo.email || registerInterest.contactInfo.phone) && (
            <div className='mt-12 text-center'>
              <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Alternative Contact Methods
                </h3>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-6 text-sm'>
                  {registerInterest.contactInfo.email && (
                    <div className='flex items-center space-x-2 text-primary-600'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                      <a
                        href={`mailto:${registerInterest.contactInfo.email}`}
                        className='hover:underline'
                      >
                        {registerInterest.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {registerInterest.contactInfo.phone && (
                    <div className='flex items-center space-x-2 text-primary-600'>
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                      <a
                        href={`tel:${registerInterest.contactInfo.phone}`}
                        className='hover:underline'
                      >
                        {registerInterest.contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};

export default RegisterInterest;
