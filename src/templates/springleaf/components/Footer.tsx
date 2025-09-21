import React from 'react';
import { FooterProps } from '../../../schema/campaignSchema';

interface Props {
  footer: FooterProps;
}

const Footer: React.FC<Props> = ({ footer }) => {
  // Function to render correct social media icon
  const renderSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();

    switch (platformLower) {
      case 'facebook':
        return (
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        );
      case 'instagram':
        return (
          <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.637-2.074-4.637-4.637S9.437 7.35 12 7.35s4.637 2.074 4.637 4.637S14.563 16.624 12 16.624zm5.875-8.794c-.597 0-1.078-.482-1.078-1.078s.481-1.078 1.078-1.078 1.078.482 1.078 1.078-.481 1.078-1.078 1.078z M12 9.684c-1.29 0-2.316 1.026-2.316 2.316s1.026 2.316 2.316 2.316 2.316-1.026 2.316-2.316S13.29 9.684 12 9.684z' />
        );
      case 'twitter':
        return (
          <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
        );
      case 'linkedin':
        return (
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        );
      case 'youtube':
        return (
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        );
      default:
        // Default generic link icon
        return (
          <path d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
        );
    }
  };

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
                {footer.contact.phone && (
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
                )}
                {footer.contact.email && (
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
                )}
                {footer.contact.address && (
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
                )}
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
            {footer.legalLinks &&
              footer.legalLinks.length > 0 &&
              footer.legalLinks.some((link) => link.href && link.href.trim() !== '') && (
                <div>
                  <h4 className='text-lg font-semibold text-white mb-4'>Legal</h4>
                  <ul className='space-y-2 mb-6'>
                    {footer.legalLinks
                      .filter((link) => link.href && link.href.trim() !== '')
                      .map((link, index) => (
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
              )}

            {/* Social Links */}
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <div>
                <h4 className='text-lg font-semibold text-white mb-4'>Follow Us</h4>
                <div className='flex space-x-4'>
                  {/* Deduplicate social links by platform */}
                  {footer.socialLinks
                    .filter(
                      (social, index, arr) =>
                        arr.findIndex(
                          (s) => s.platform.toLowerCase() === social.platform.toLowerCase()
                        ) === index
                    )
                    .map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-300 hover:text-accent-400 transition-colors'
                      >
                        <span className='sr-only'>{social.platform}</span>
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                          {renderSocialIcon(social.platform)}
                        </svg>
                      </a>
                    ))}
                </div>
              </div>
            )}
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
