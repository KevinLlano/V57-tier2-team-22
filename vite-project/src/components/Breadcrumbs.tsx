// TODO: when clicked goes to users profile or repo
import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  user: string;
  repo: string;
  userUrl: string;
  repoUrl: string;
};

export default function Breadcrumbs({
  user,
  repo,
  userUrl,
  repoUrl,
}: BreadcrumbsProps) {
  return (
    <div>
      {' '}
      <nav className='text-sm text-grey flex items-center gap-2'>
        <Link to={userUrl} className='hover:underline cursor-pointer'>
          {user}
        </Link>
        <span>/</span>
        <Link
          to={repoUrl}
          className='font-medium text-black hover:underline cursor-pointer'
        >
          {repo}
        </Link>
      </nav>
    </div>
  );
}
