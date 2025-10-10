import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-bg-main flex flex-col justify-center items-center gap-14'>
      <div className=''>
        <h1 className='text-9xl font-semibold leading-none flex items-center justify-center gap-2'>
          404
        </h1>
        <p className='text-2xl text-center mt-6'>Page Not Found</p>
      </div>

      <Button size='md' onClick={() => navigate('/')}>
        Go back home
      </Button>
    </div>
  );
}
