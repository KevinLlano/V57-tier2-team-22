// FIXME:

import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className='fixed bottom-5 right-5 bg-green text-white px-4 py-2 rounded-lg shadow-lg transition-opacity'>
      {message}
    </div>
  );
}
