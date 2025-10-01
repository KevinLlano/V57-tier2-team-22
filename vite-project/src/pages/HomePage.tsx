import React from 'react';
import Skater from '../assets/Skater.png';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className='bg-[#f4f5f3] flex flex-col'>
      {/* Hero - white - main page */}
      <section className='min-h-[95vh] bg-white flex items-center'>
        <div className='max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center w-full'>
          <div>
            <h1 className='text-4xl md:text-6xl font-black tracking-tight text-black'>
              Track Your Team's GitHub Pull Requests
              <span className='block italic'>
                with{' '}
                <span className='text-[#211306] underline decoration-4'>
                  ease
                </span>
              </span>
            </h1>
            <p className='mt-6 text-gray-700 text-xl max-w-xl text-center'>
              Stay in the loop, power up your collab, and keep every PR on your
              radar
            </p>
            <div className='mt-8'>
              <Link
                to='/prs'
                className='inline-flex items-center gap-2 bg-[#0f7a6e] hover:bg-[#0c5f59] text-white font-medium px-6 py-4 rounded-lg shadow-lg text-lg'
              >
                Get started → See Open PR’s
              </Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='w-full max-w-2xl aspect-[4/3] rounded-2xl bg-white shadow-[0_12px_48px_rgba(0,0,0,0.08)] grid place-items-center'>
              <img
                src={Skater}
                alt='Skater illustration'
                className='w-68 h-68 md:w-122 md:h-122 object-contain'
              />
            </div>
          </div>
        </div>
      </section>

      {/* scroll down button */}
      {/* <div className="w-full flex justify-center mt-4 mb-8">
        <button
          aria-label='Scroll to bottom'
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            })
          }
          className='inline-flex items-center gap-3 bg-gradient-to-r from-[#1e1e1e] to-[#0f7a6e] text-white font-medium px-4 py-2 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#06b6d4]/30'
        >
          <svg className='w-4 h-4' viewBox='0 0 20 20' fill='none' aria-hidden>
            <path
              d='M4 7l6 6 6-6'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Scroll</span>
        </button>
      </div> */}

      {/* Green feature bg - full second page  */}
      <section className='min-h-[calc(100vh-22rem)] bg-[#134b47] text-black/90 flex items-start'>
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
