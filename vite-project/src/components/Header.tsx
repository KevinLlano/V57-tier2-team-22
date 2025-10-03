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
      className={`flex justify-between items-center sticky top-5 z-30 rounded-xl p-2 md:px-6 py-2
            mx-4 md:mx-32 lg:mx-80
             shadow-md ${scrolled ? 'bg-white opacity-80' : ' bg-white'}`}
    >
      {/* logo + brand name */}
      <Link to='/'>
        <div className='flex gap-3 items-center ml-3 md:ml-0'>
          <img src={logo} alt='logo' className='h-5 md:h-8' />
          <span className='font-bold text-lg md:text-3xl'>pr tracker</span>
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
