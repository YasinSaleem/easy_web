import React from 'react';
import { FooterProps } from '../../../schema/campaignSchema';

interface Props {
  footer: FooterProps;
}

const Footer: React.FC<Props> = ({ footer }) => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='py-16'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='lg:col-span-2'>
              <h3 className='text-2xl font-bold text-accent-400 mb-4'>{footer.projectName}</h3>
              <p className='text-gray-300 mb-6 leading-relaxed max-w-md'>{footer.description}</p>

              {/* Contact Info */}
              <div className='space-y-3 text-sm text-gray-300'>
                <div className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-accent-400'
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
                  <span>{footer.contact.phone}</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <svg
                    className='w-5 h-5 text-accent-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  <span>{footer.contact.email}</span>
                </div>
                <div className='flex items-start space-x-3'>
                  <svg
                    className='w-5 h-5 text-accent-400 mt-0.5'
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
                  <span>{footer.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className='text-lg font-semibold text-white mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                {footer.navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className='text-gray-300 hover:text-accent-400 transition-colors text-sm'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className='text-lg font-semibold text-white mb-4'>Legal</h4>
              <ul className='space-y-2 mb-6'>
                {footer.legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className='text-gray-300 hover:text-accent-400 transition-colors text-sm'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              {footer.socialLinks && footer.socialLinks.length > 0 && (
                <div>
                  <h4 className='text-lg font-semibold text-white mb-4'>Follow Us</h4>
                  <div className='flex space-x-4'>
                    {footer.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-300 hover:text-accent-400 transition-colors'
                      >
                        <span className='sr-only'>{social.platform}</span>
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='py-6 border-t border-gray-800'>
          <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-400'>
            <div>
              © {new Date().getFullYear()} {footer.projectName}. All rights reserved.
            </div>
            <div className='mt-2 md:mt-0'>Built with modern web technologies</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
