import { useState } from 'react';
import Toast from './Toast';
import Filters from './Filters';

type SectionHeaderProps = {
  author: string;
  reviewer: string;
  authorOptions: string[];
  reviewerOptions: string[];
  onAuthorChange: (value: string) => void;
  onReviewerChange: (value: string) => void;
  onClear: () => void;
  totalPRs: number;
  filteredPRs: number;
  activeTab: 'open' | 'closed';
};

export default function SectionHeader({
  author,
  reviewer,
  authorOptions,
  reviewerOptions,
  onAuthorChange,
  onReviewerChange,
  onClear,
}: SectionHeaderProps) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className='flex gap-4'>
      <div>
        <div className='flex gap-3  md:gap-5 flex-wrap items-start'>
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
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
