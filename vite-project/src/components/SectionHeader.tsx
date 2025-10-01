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
  totalPRs,
  filteredPRs,
  activeTab,
}: SectionHeaderProps) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className='bg-white rounded-2xl flex flex-col p-5 gap-4 border-b border-grey-secondary'>
  
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:gap-5 flex-wrap items-start">
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

        {/* PR count and active filters - positioned to the right for visual balance maybe? */}
        <div className="flex flex-col text-sm text-gray-600 lg:text-right">
          <div className="font-medium">
            {totalPRs} total PRs • {filteredPRs} {activeTab}
          </div>
          <div className="text-gray-600">
            Active → Author: {author || 'All'}, Reviewer: {reviewer || 'All'}
          </div>
        </div>
      </div>
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
