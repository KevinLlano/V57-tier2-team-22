type TabsProps = {
  activeTab: 'open' | 'closed';
  onTabChange: (tab: 'open' | 'closed') => void;
};

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className='flex p-2 rounded-full shadow-md font-semibold'>
      <button
        onClick={() => onTabChange('open')}
        className={`rounded-full py-2 lg:py-3 text-center flex-1 cursor-pointer ${
          activeTab === 'open' ? 'bg-green text-white' : 'text-black'
        }`}
      >
        OPEN PR's
      </button>
      <button
        onClick={() => {
          onTabChange('closed');
        }}
        className={`rounded-full py-2 lg:py-3 text-center flex-1 cursor-pointer ${
          activeTab === 'closed' ? 'bg-green text-white' : 'text-black'
        }`}
      >
        CLOSED PR's
      </button>
    </div>
  );
}
