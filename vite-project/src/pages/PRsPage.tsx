import { useEffect, useState } from 'react';
import { fetchPRs } from '../api-mocks/api';
import { PRData } from '../types';

import SectionHeader from '../components/SectionHeader';
import Tabs from '../components/Tabs';
import Filters from '../components/Filters';

export default function PRsPage() {
  const [prs, setPrs] = useState<PRData[]>([]);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [author, setAuthor] = useState('');
  const [reviewer, setReviewer] = useState('');

  useEffect(() => {
    fetchPRs().then((data) => {
      setPrs(data);
      console.log(data);
    });
  }, []);

  const authorOptions = [
    'All',
    ...new Set(prs.map((pr) => pr.author.username)),
  ];

  console.log(authorOptions);

  const reviewerOptions = [
    'All',
    ...new Set(prs.flatMap((pr) => pr.reviewers.map((r) => r.username))),
  ];

  console.log(reviewerOptions);
  return (
    <main className='bg-bg-main h-screen p-3 md:p8 lg:px-14 lg:py-11 flex flex-col gap-4 lg:gap-10'>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionHeader
        activeTab={activeTab}
        onSave={() => console.log('Save JSON')}
        onRefresh={() => console.log('Refresh')}
      />
      <Filters
        author={author}
        reviewer={reviewer}
        authorOptions={authorOptions}
        reviewerOptions={reviewerOptions}
        onAuthorChange={(val) => setAuthor(val === 'All' ? '' : val)}
        onReviewerChange={(val) => setReviewer(val === 'All' ? '' : val)}
        onSearch={() => console.log('Search clicked!')}
      />
    </main>
  );
}
