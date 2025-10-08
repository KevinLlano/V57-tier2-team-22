import { useEffect, useState } from 'react';
import { fetchMappedPullRequests } from '../utils/GitHubApi';
import { PRData } from '../types';
import PRDashboard from '../components/Dashboard';
import SectionHeader from '../components/SectionHeader';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import Button from '../components/Button';
import Breadcrumbs from '../components/Breadcrumbs';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useLocation } from 'react-router-dom';

export default function PRsPage() {
  //location gets data from search bar in usenavigate
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log(location.pathname);

  //get from params or empty
  const [owner, setOwner] = useState(params.get('owner') || '');
  const [repo, setRepo] = useState(params.get('repo') || '');

  // PR data and filters (with upstream's open/closed functionality)
  const [prs, setPrs] = useState<PRData[]>([]);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [author, setAuthor] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPRs = async () => {
    if (!owner || !repo) return;
    setLoading(true);
    console.log('refreshed');
    try {
      // TODO: for testing! remove this
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await fetchMappedPullRequests(owner, repo);
      setPrs(data);
    } catch (error) {
      console.error('Failed to load PRs:', error);
      setPrs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPRs();
  }, [owner, repo]);

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
    const filteredPrs = prs.filter((pr) => {
      const matchesTab =
        activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
      const matchesAuthor =
        !author || author === 'All' || pr.author.username === author;
      const matchesReviewer =
        !reviewer ||
        reviewer === 'All' ||
        pr.reviewers.some((r: any) => r.username === reviewer);
      return matchesTab && matchesAuthor && matchesReviewer;
    });

    const blob = new Blob([JSON.stringify(filteredPrs, null, 2)], {
      type: 'application/json',
    });
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
    const filteredPrs = prs.filter((pr) => {
      const matchesTab =
        activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
      const matchesAuthor =
        !author || author === 'All' || pr.author.username === author;
      const matchesReviewer =
        !reviewer ||
        reviewer === 'All' ||
        pr.reviewers.some((r: any) => r.username === reviewer);
      return matchesTab && matchesAuthor && matchesReviewer;
    });

    if (!filteredPrs.length) {
      alert(
        'No PR data to export. Try adjusting filters or loading PRs first.'
      );
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
      URL: pr.url,
    }));

    const headers = Object.keys(rows[0]);
    const escape = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      return /[",\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str;
    };
    const lines = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => escape((r as any)[h])).join(',')),
    ];
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
  const filteredPRs = prs.filter((pr) => {
    const matchesTab =
      activeTab === 'open' ? pr.state === 'open' : pr.state === 'closed';
    const matchesAuthor =
      !author || author === 'All' || pr.author.username === author;
    const matchesReviewer =
      !reviewer ||
      reviewer === 'All' ||
      pr.reviewers.some((r: any) => r.username === reviewer);
    return matchesTab && matchesAuthor && matchesReviewer;
  });

  return (
    <div className='min-h-full mt-16 flex flex-col gap-4 p-3 md:p-8 lg:px-30 lg:py-11 overflow-y-auto'>
      {/* Search and action buttons */}
      <div className='m-auto'>
        <Search
          owner={owner}
          repo={repo}
          setOwner={setOwner}
          setRepo={setRepo}
          onLoad={loadPRs}
          loading={loading}
        />
      </div>

      {!owner && !repo && !loading && (
        <div className='mt-20 text-center'>
          <p className='text-2xl font-semibold text-black'>
            Start searching GitHub 🚀
          </p>
          <p className='text-grey mt-2 text-sm'>
            Enter an owner/repo above to load pull requests.
          </p>
        </div>
      )}

      {loading && (
        <div className='mt-20 text-grey text-lg text-center'>
          Fetching pull requests...
        </div>
      )}

      {!loading && owner && repo && prs.length === 0 && (
        <div className='text-2xl mt-20 text-center text-grey'>
          No GitHub Repository found for{' '}
          <strong>
            {owner}/{repo}
          </strong>
          .
        </div>
      )}

      {!loading && owner && repo && prs.length > 0 && (
        <div>
          <Breadcrumbs owner={owner} repo={repo} />
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className='mt-10 flex flex-col gap-4 md:flex-row md:justify-between'>
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
            {/* Action buttons */}
            <div className='flex gap-3 md:h-[38px]'>
              <Button onClick={handleSaveJSON}>
                <DownloadIcon />
                <span className='lg:hidden'>JSON</span>
                <span className='hidden lg:inline'>Save JSON</span>
              </Button>
              <Button onClick={handleExportCSV}>
                <DownloadIcon />
                <span className='lg:hidden'>CSV</span>
                <span className='hidden lg:inline'>Export CSV</span>
              </Button>
              <Button onClick={loadPRs}>
                <RefreshIcon />
                <span className='hidden lg:inline'>Reload PRs</span>
              </Button>
            </div>
          </div>
          <div className='mt-6'>
            {loading ? (
              <div className='text-center text-grey text-lg'>
                Fetching pull requests...
              </div>
            ) : (
              <PRDashboard
                prs={filteredPRs}
                activeTab={activeTab}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
