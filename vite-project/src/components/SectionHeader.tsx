import { useState } from 'react';
import Button from './Button';
import Toast from './Toast';
import Filters from './Filters';

type SectionHeaderProps = {
  activeTab: 'open' | 'closed';
  author: string;
  reviewer: string;
  authorOptions: string[];
  reviewerOptions: string[];
  onAuthorChange: (value: string) => void; // passing setAuthor w/c is a string as argument so need to type that
  onReviewerChange: (value: string) => void;
  onSave: () => void;
  onRefresh: () => void;
  onClear: () => void;
};

export default function SectionHeader({
  activeTab,
  author,
  reviewer,
  authorOptions,
  reviewerOptions,
  onAuthorChange,
  onReviewerChange,
  onSave,
  onRefresh,
  onClear,
}: SectionHeaderProps) {
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
          <Button variant='secondary' onClick={onSave}>
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
      <Filters
        author={author}
        reviewer={reviewer}
        authorOptions={authorOptions}
        reviewerOptions={reviewerOptions}
        onAuthorChange={onAuthorChange}
        onReviewerChange={onReviewerChange}
        onClear={onClear}
      />
    </div>
  );
}
