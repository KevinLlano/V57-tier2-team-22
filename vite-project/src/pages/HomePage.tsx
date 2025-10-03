import React from 'react';
import Skater from '../assets/hero-img.png';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero - white - main page */}
      {/* image */}
      <section className='h-screen flex flex-col md:flex-col-reverse bg-bg-main px-4  md:p-10 lg:px-20 lg:pb-7'>
        <div className='flex justify-center mt-16 mb-5 md:mt-0'>
          <img
            src={Skater}
            alt='Skater illustration'
            className='max-h-[40vh] md:max-h-[40vh]'
          />
        </div>
        {/* text */}
        <div className=' flex flex-col text-center items-center md:items-start gap-7 md:text-left'>
          <div className='font-bold text-3xl md:text-5xl lg:text-6xl flex flex-col gap-2'>
            <p>Track Your Team's</p>
            <p className=''>GitHub Pull Requests</p>
            <p className='block italic'>
              with{' '}
              <span className='text-[#FF720D] underline decoration-4'>
                ease
              </span>
            </p>
          </div>
          <p className='mb-2 mx-3 md:text-left'>
            Stay in the loop, power up your collab, and keep every PR on your
            radar
          </p>

          <Button size='lg'>Search Github</Button>
        </div>
      </section>
      {/* Green feature bg - full second page */}
      <section className='h-screen bg-green'>
        <div className='max-w-6xl mx-auto px-6 py-20 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <article className='bg-white rounded-2xl p-8 shadow-lg flex flex-col items-start justify-start  h-72'>
              <div className='w-14 h-14 rounded-full bg-gray-100 grid place-items-center text-2xl mb-4'>
                👁️
              </div>
              <h3 className='text-2xl font-semibold '>
                See Open PRs, Instantly
              </h3>
              <p className='text-gray-600 mt-3'>
                Quick overview of all pending pull requests
              </p>
            </article>
            <article className='bg-white rounded-2xl p-8 shadow-lg flex flex-col items-start justify-start h-72'>
              <div className='w-14 h-14 rounded-full bg-gray-100 grid place-items-center text-2xl mb-4'>
                🕒
              </div>
              <h3 className='text-2xl font-semibold'>
                Review Closed PRs at a Glance
              </h3>
              <p className='text-gray-600 mt-3'>
                Track completed work and review history
              </p>
            </article>
            <article className='bg-white rounded-2xl p-8 shadow-lg flex flex-col items-start justify-start h-72'>
              <div className='w-14 h-14 rounded-full bg-gray-100 grid place-items-center text-2xl mb-4'>
                ❓
              </div>
              <h3 className='text-2xl font-semibold'>
                AI help when you need it
              </h3>
              <p className='text-gray-600 mt-3'>
                Get assistance with PR management
              </p>
            </article>
          </div>
        </div>
      </section>
      {/* floating chat button */}
      {/* <button aria-label="chat" className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow grid place-items-center border">
        💬
      </button> */}
    </div>
  );
};

export default HomePage;
