import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

interface SearchProps {
  setOwner: (value: string) => void;
  setRepo: (value: string) => void;
  loading: boolean;
  input: string;
  setInput: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
  setOwner,
  setRepo,
  onLoad,
  loading,
  input,
  setInput,
}) => {
  const isValid = input.includes("/") && input.split("/").length === 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const [owner, repo] = input.split('/').map((part) => part.trim());

    if (owner && repo) {
      setOwner(owner);
      setRepo(repo);
    } else {
      alert('Please enter in the format: owner/repo');
    }
  };

  return (
    <form onSubmit={handleSearch} className='relative w-64 md:w-80 lg:w-96'>
      <div
        className={`bg-white px-4 py-3 border rounded-full w-full flex items-center gap-2 transition-all duration-200 ring-1
          ${
            input.length === 0
              ? 'ring-grey border-grey'
              : input.includes('/') && input.split('/').length === 2
              ? 'ring-green border-green'
              : 'ring-error border-error'
          }`}
      >
        <input
          value={input}
          onChange={handleChange}
          placeholder='Search GitHub: owner/repo'
          disabled={loading}
          className='flex-1 outline-none text-grey placeholder-grey text-sm md:text-base pl-3 pr-9'
        />
        <button
          type='submit'
          disabled={loading}
          className='absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-green hover:bg-green-secondary text-white rounded-full p-2 transition disabled:opacity-50'
        >
          {loading ? (
            <CircularProgress size={18} color='inherit' />
          ) : (
            <SearchIcon fontSize='small' />
          )}
        </button>
      </div>
    </form>
  );
};

export default Search;
