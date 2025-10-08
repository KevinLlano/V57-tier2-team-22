import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  owner: string;
  repo: string;
};

export default function Breadcrumbs({ owner, repo }: BreadcrumbsProps) {
  if (!owner || !repo) return null;
  return (
    <div>
      {' '}
      <nav className='text-sm text-grey flex items-center gap-2 mb-4'>
        <Link to='/' className='hidden md:inline hover:text-green font-medium'>
          Home {''} /
        </Link>
        <a
          href={`https://github.com/${owner}`}
          target='blank'
          rel='noopener noreferrer'
        >
          {owner}
        </a>
        <span className='text-grey'>/</span>
        <a
          href={`https://github.com/${owner}/${repo}`}
          target='blank'
          rel='noopener noreferrer'
        >
          {' '}
          <span className='text-green'>{repo}</span>
        </a>
      </nav>
    </div>
  );
}
