import { useEffect, useState } from 'react';
import { fetchMappedPullRequests } from '../utils/GitHubApi';
import { PRData } from '../types';
import PRDashboard from '../components/Dashboard';
import SectionHeader from '../components/SectionHeader';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import Button from '../components/Button';

export default function PRsPage() {
  // Owner and repo state for the search component
  const [owner, setOwner] = useState('chingu-voyages');
  const [repo, setRepo] = useState('v57-tier2-team-22');
  
  // PR data and filters (with upstream's open/closed functionality)
  const [prs, setPrs] = useState<PRData[]>([]);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [author, setAuthor] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [loading, setLoading] = useState(false);

  // Load PRs from GitHub API
  const loadPRs = async () => {
    if (!owner || !repo) return;
    setLoading(true);
    try {
      const data = await fetchMappedPullRequests(owner, repo);
      setPrs(data);
    } catch (error) {
      console.error('Failed to load PRs:', error);
      setPrs([]);
    } finally {
      setLoading(false);
    }
  };

  // REAL TIME RELOAD ON OWNER/REPO CHANGE
  // useEffect(() => {
  //   loadPRs();
  // }, [owner, repo]);

  // Generate filter options from loaded PRs
  const authorOptions = [
    'All',
    ...new Set(prs.map((pr) => pr.author.username)),
  ];

  const reviewerOptions = [
    'All',
    ...new Set(prs.flatMap((pr) => pr.reviewers.map((r: any) => r.username))),
  ];

  const handleClearFilters = () => {
    setAuthor('');
    setReviewer('');
  };

  const handleSaveJSON = () => {
    const filteredPrs = prs.filter(pr => {
      const matchesTab = activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
      const matchesAuthor = !author || author === 'All' || pr.author.username === author;
      const matchesReviewer = !reviewer || reviewer === 'All' || pr.reviewers.some((r: any) => r.username === reviewer);
      return matchesTab && matchesAuthor && matchesReviewer;
    });
    
    const blob = new Blob([JSON.stringify(filteredPrs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${owner}-${repo}-${activeTab}-prs.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const filteredPrs = prs.filter(pr => {
      const matchesTab = activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
      const matchesAuthor = !author || author === 'All' || pr.author.username === author;
      const matchesReviewer = !reviewer || reviewer === 'All' || pr.reviewers.some((r: any) => r.username === reviewer);
      return matchesTab && matchesAuthor && matchesReviewer;
    });

    if (!filteredPrs.length) {
      alert('No PR data to export. Try adjusting filters or loading PRs first.');
      return;
    }

    const rows = filteredPrs.map((pr: any) => ({
      Number: pr.number,
      Title: pr.title,
      Author: pr.author?.username,
      State: pr.state,
      CreatedAt: pr.createdAt,
      LastActionDate: pr.lastActionDate,
      Reviewers: (pr.reviewers || []).map((r: any) => r.username).join('; '),
      URL: pr.url
    }));

    const headers = Object.keys(rows[0]);
    const escape = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      return /[",\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str;
    };
    const lines = [headers.join(','), ...rows.map(r => headers.map(h => escape((r as any)[h])).join(','))];
    const csv = lines.join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${owner}-${repo}-${activeTab}-prs.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Filter PRs based on current tab and filters  
  const filteredPRs = prs.filter(pr => {
    const matchesTab = activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
    const matchesAuthor = !author || author === 'All' || pr.author.username === author;
    const matchesReviewer = !reviewer || reviewer === 'All' || pr.reviewers.some((r: any) => r.username === reviewer);
    return matchesTab && matchesAuthor && matchesReviewer;
  });

  return (
    <main className='bg-bg-main p-3 md:p8 lg:px-14 lg:py-11 flex flex-col gap-4 lg:gap-2'>
      {/* Pull Requests header */}
      <div className='rounded-2xl p-2'>
        <h2 className='font-semibold text-lg'>Pull Requests</h2>
      </div>
      
      {/* Search and action buttons */}
      <div className='bg-white rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between'>
        <Search 
          owner={owner}
          repo={repo}
          setOwner={setOwner}
          setRepo={setRepo}
          onLoad={loadPRs}
          loading={loading}
        />
        
          {/* Action buttons positioned to the right of search */}
        <div className='flex gap-3'>
          <Button variant='primary' onClick={handleSaveJSON}>
            Save JSON
          </Button>
          <Button variant='primary' onClick={handleExportCSV}>
            Download CSV
          </Button>
          <Button variant='primary' onClick={loadPRs}>
            Refresh
          </Button>
        </div>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionHeader
        author={author}
        reviewer={reviewer}
        authorOptions={authorOptions}
        reviewerOptions={reviewerOptions}
        onAuthorChange={setAuthor}
        onReviewerChange={setReviewer}
        onClear={handleClearFilters}
        totalPRs={prs.length}
        filteredPRs={filteredPRs.length}
        activeTab={activeTab}
      />
      {/* Dashboard receives filtered data as props requested by jazz */}
      <PRDashboard prs={filteredPRs} loading={loading} />
    </main>
  );
}
