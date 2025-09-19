import React, { useState } from 'react';
import { HeaderProps } from '../../../schema/campaignSchema';

interface Props {
  header: HeaderProps;
}

const Header: React.FC<Props> = ({ header }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Mobile menu button - moved to left */}
          <button
            data-mobile-menu-button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all duration-200'
          >
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <div className='flex items-center flex-1 justify-center md:justify-start md:ml-0'>
            <div className='flex-shrink-0'>
              <h1 className='text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer'>
                {header.projectName}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {header.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className='text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group'
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300'></span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu with smooth animation */}
      <div
        data-mobile-menu
        className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t'>
          {header.navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className='text-gray-700 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-md'
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
