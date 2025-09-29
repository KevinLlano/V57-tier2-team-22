import { useEffect, useState } from 'react';
import { fetchPRs } from '../api-mocks/api';
import { PRData } from '../types';

import SectionHeader from '../components/SectionHeader';
import Tabs from '../components/Tabs';

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

  const handleClearFilters = () => {
    setAuthor('');
    setReviewer('');
  };

  // TODO: add breadcrumb logic here

  return (
    <main className='bg-bg-main h-screen p-3 md:p8 lg:px-14 lg:py-11 flex flex-col gap-4 lg:gap-10'>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionHeader
        activeTab={activeTab}
        author={author}
        reviewer={reviewer}
        authorOptions={authorOptions}
        reviewerOptions={reviewerOptions}
        onAuthorChange={setAuthor}
        onReviewerChange={setReviewer}
        onSave={() => console.log('Saved JSON')}
        onRefresh={() => console.log('Refreshed')}
        onClear={handleClearFilters}
      />
    </main>
  );
}
