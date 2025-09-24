import DropdownMenu from './DropdownMenu';
import Button from './Button';

type FiltersProps = {
  author: string;
  reviewer: string;
  authorOptions: string[];
  reviewerOptions: string[];
  onAuthorChange: (val: string) => void;
  onReviewerChange: (val: string) => void;
  onSearch: () => void;
};

export default function Filters({
  author,
  reviewer,
  authorOptions,
  reviewerOptions,
  onAuthorChange,
  onReviewerChange,
  onSearch,
}: FiltersProps) {
  return (
    <div className='flex flex-col gap-2 md:flex-row md:gap-5'>
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
      <div className='mt-3 md:mt-0'>
        <Button onClick={onSearch}>Search</Button>
      </div>
      {/* TODO: for debugging display, remove later */}
      <div className='text-sm text-error self-center flex-1'>
        Active → Author: {author || 'All'}, Reviewer: {reviewer || 'All'}
      </div>
    </div>
  );
}
