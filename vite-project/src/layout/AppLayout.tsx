import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='bg-bg-main overflow-y-auto flex-grow'>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
