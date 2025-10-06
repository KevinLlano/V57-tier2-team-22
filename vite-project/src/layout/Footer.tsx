import { ArrowOutward } from '@mui/icons-material';
import logo from '../assets/logo.png';

const developers = [
  {
    name: 'Jazz',
    Github: 'https://github.com/jazxbx',
  },
  {
    name: 'Kevin',
    LinkedIn: 'https://www.linkedin.com/in/kevinllanos7',
    Github: 'https://github.com/KevinLlano',
  },
  {
    name: 'Matthew',
    LinkedIn: 'https://linkedin.com/in/matthew-neie',
    Github: 'https://github.com/MatthewNeie',
  },
];

const scrumMaster = {
  name: 'Thais',
  LinkedIn: 'https://www.linkedin.com/in/thaisaya/',
  Github: 'https://github.com/thaisaya',
};

const productOwner = {
  name: 'Viral',
  LinkedIn: 'https://www.linkedin.com/in/viral-barot-mba/',
};

//  className='flex flex-col md:flex-row md:justify-around'

const Footer: React.FC = () => (
  <footer className='bg-[#FF720D]'>
    <div className='flex flex-col justify-between items-start px-2 py-5 text-sm mx-5 lg:mx-20'>
      {/* Logo + Link */}
      <div className='flex items-center gap-4 mb-6 '>
        <img src={logo} alt='logo' className='h-11' />
        <a
          className='rounded-full text-black px-7 py-3 border hover:bg-black hover:text-bg-main transition-colors flex items-center gap-2'
          href='https://github.com/chingu-voyages/V57-tier2-team-22'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github link
          <ArrowOutward />
        </a>
      </div>
      {/* Team */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-10 w-full '>
        {/* DEVELOPERS */}
        <section>
          <h3 className='mb-4 text-md text-black capitalize font-medium'>
            Developers
          </h3>
          <ul className='space-y-4 text-sm'>
            {developers.map((developer) => (
              <li className='flex items-center' key={developer.name}>
                <span className='w-20'>{developer.name}</span>
                {developer.Github && (
                  <a
                    className='pill hover:pillHover'
                    href={developer.Github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Github
                  </a>
                )}
                {developer.LinkedIn && (
                  <a
                    className='pill hover:pillHover'
                    href={developer.LinkedIn}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    LinkedIn
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* SCRUM MASTER */}
        <section>
          <h3 className='mb-4 text-md text-black capitalize font-medium'>
            Scrum Master
          </h3>
          <ul className='space-y-4 text-sm'>
            <li className='flex'>
              <span className='w-20'>{scrumMaster.name}</span>
              <div className='flex'>
                <a
                  href={scrumMaster.LinkedIn}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='pill'
                >
                  LinkedIn
                </a>
                <a
                  href={scrumMaster.Github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='pill'
                >
                  GitHub
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* PRODUCT OWNER */}
        <section>
          <h3 className='mb-4 text-md text-black capitalize font-medium '>
            Product Owner
          </h3>
          <ul className='space-y-4 text-sm'>
            <li className='flex'>
              <span className='w-20'>{productOwner.name}</span>
              <div className='flex'>
                <a
                  href={productOwner.LinkedIn}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='pill'
                >
                  LinkedIn
                </a>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <hr />
    <div className='text-center text-xs text-black p-2'>
      © {new Date().getFullYear()} PR Tracker | Chingu Voyage 57 Team 22
    </div>
  </footer>
);

export default Footer;
