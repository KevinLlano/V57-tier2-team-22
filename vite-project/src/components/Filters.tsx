import DropdownMenu from './DropdownMenu';
import Button from './Button';

type FiltersProps = {
  author: string;
  reviewer: string;
  authorOptions: string[];
  reviewerOptions: string[];
  onAuthorChange: (val: string) => void;
  onReviewerChange: (val: string) => void;
  onClear: () => void;
};

export default function Filters({
  author,
  reviewer,
  authorOptions,
  reviewerOptions,
  onAuthorChange,
  onReviewerChange,
  onClear,
}: FiltersProps) {
  return (
    <>
      <DropdownMenu
        label='Author'
        options={authorOptions}
        value={author}
        onSelect={onAuthorChange}
      />
      <DropdownMenu
        label='Reviewer'
        options={reviewerOptions}
        value={reviewer}
        onSelect={onReviewerChange}
      />
      <div className='mt-1 md:mt-0'>
        <Button onClick={onClear}>Clear Filters</Button>
      </div>
      {/* Status line */}
      <div className="text-sm text-error self-center flex-1 min-w-[220px]">
        Active → Author: {author || 'All'}, Reviewer: {reviewer || 'All'}
      </div>
    </>
  );
}
