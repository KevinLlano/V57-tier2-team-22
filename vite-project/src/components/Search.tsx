import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

interface SearchProps {
  owner: string;
  repo: string;
  setOwner: (value: string) => void;
  setRepo: (value: string) => void;
  onLoad: () => void;
  loading: boolean;
}

// TODO: add x to clear search

const Search: React.FC<SearchProps> = ({
  setOwner,
  setRepo,
  onLoad,
  loading,
}) => {
  const [input, setInput] = useState('');

  const isValid = input.includes('/') && input.split('/').length === 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (isValid) {
      const [owner, repo] = input.split('/').map((part) => part.trim());
      setOwner(owner);
      setRepo(repo);
      onLoad();
    } else {
      // change later
      alert('Please enter in the format: owner/repo');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch();
    }
  };

  return (
    <div
      className={`bg-white px-4 py-3 border rounded-full w-64 md:w-80 lg:w-96 
    flex justify-center md:justify-start gap-4 transition-all duration-200 ring-1 mb-5 md:mb-7 lg:mb-14
    ${
      input.length === 0
        ? 'ring-grey border-grey'
        : isValid
        ? 'ring-green border-green'
        : 'ring-error border-error'
    }`}
    >
      {loading ? (
        <CircularProgress size={20} className='text-grey' />
      ) : (
        <SearchIcon
          className={`${
            isValid
              ? 'text-green'
              : input.length > 0
              ? 'text-error'
              : 'text-grey'
          }`}
        />
      )}
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder='Search GitHub: owner/repo'
        disabled={loading}
        className='text-sm md:text-base flex-1 outline-none text-grey placeholder-grey'
      />
    </div>
  );
};

export default Search;
