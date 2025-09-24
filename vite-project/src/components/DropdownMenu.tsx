import { useState, useRef } from 'react';
import Button from './Button';
import { UseClickOutside } from '../hooks/UseClickOutside';

interface DropdownMenuProps {
  label: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

export default function DropdownMenu({
  label,
  options = [],
  value,
  onSelect,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  UseClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className='relative inline-block'>
      <Button variant='tertiary' onClick={() => setIsOpen((prev) => !prev)}>
        {value ? `Filter ${label}: ${value}` : `Filter ${label}`}
      </Button>

      <div
        className={`absolute mt-2 rounded border border-gray-200 bg-white shadow-lg min-w-40 transition-all duration-200 ease-out origin-top z-10 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul>
          {options.length === 0 ? (
            <li className='p-2 text-gray-400 cursor-not-allowed'>
              No {label} available
            </li>
          ) : (
            options.map((option) => (
              <li
                key={option}
                className='px-4 py-2 cursor-pointer 
                m-1
                hover:bg-green hover:text-white hover:rounded

                '
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
