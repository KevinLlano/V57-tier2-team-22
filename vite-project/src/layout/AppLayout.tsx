import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className='h-screen bg-bg-main'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
