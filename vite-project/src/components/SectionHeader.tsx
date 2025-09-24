import { useState } from 'react';
import Button from './Button';
import Toast from './Toast';

type SectionHeaderProps = {
  activeTab: 'open' | 'closed';
  onSave: () => void;
  onRefresh: () => void;
};

export default function SectionHeader({ activeTab }: SectionHeaderProps) {
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className='bg-white rounded-2xl flex flex-col p-5 md:p-7 gap-3 border-b border-grey-secondary'>
      <h1 className='font-bold text-xl mb-3.5 md:text-3xl '>
        {' '}
        {activeTab === 'open' ? 'Open PRs' : 'Closed PRs'}
      </h1>
      <div className='flex gap-5'>
        <div>
          <Button
            variant='secondary'
            onClick={() => showToast('JSON saved successfully!')}
          >
            SAVE JSON
          </Button>
        </div>
        <div>
          <Button
            variant='tertiary'
            onClick={() => showToast('JSON saved successfully!')}
          >
            refresh
          </Button>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
