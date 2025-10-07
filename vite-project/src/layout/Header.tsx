import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [today, setToday] = useState<string>('');

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    );
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    //TODO: scroll transparent - > use scrolled fn provided
    <header
      className={`flex h-14 md:h-20 w-full justify-between items-center fixed top-0 z-10 
    p-2 md:px-16
    transition-colors duration-300 ease-in-out
    ${scrolled ? 'backdrop-blur-md shadow-s' : 'bg-transparent'}
  `}
    >
      {/* logo + brand name */}
      <Link to='/'>
        <div className='flex gap-3 items-center justify-center ml-3 md:ml-0'>
          <img src={logo} alt='logo' className='h-6 md:h-8' />
          <span
            className='font-semibold text-2xl md:text-3xl text-white '
            style={{ textShadow: '0 2px 3px rgba(0, 0, 0, 0.3)' }}
          >
            pr tracker
          </span>
        </div>
      </Link>

      <span
        className='text-sm hidden sm:inline text-grey'
        aria-label={`Today is ${today}`}
      >
        {today}
      </span>
    </header>
  );
};

export default Header;
