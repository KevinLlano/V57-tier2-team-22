import Button from './Button';
import Filters from './Filters';
import { useCallback } from 'react';

interface SectionHeaderProps {
  owner: string;
  repo: string;
  setOwner: (v: string) => void;
  setRepo: (v: string) => void;
  onLoad: () => void;
}


export default function SectionHeader({ owner, repo, setOwner, setRepo, onLoad }: SectionHeaderProps) {
  // Helper to request current PR data from Dashboard via custom event bridge
  const getCurrentPRs = useCallback(async () => {
    return new Promise<any[]>(resolve => {
      const handler = (e: any) => {
        window.removeEventListener('provide-pr-data', handler as any);
        resolve(e.detail || []);
      };
      window.addEventListener('provide-pr-data', handler as any, { once: true });
      window.dispatchEvent(new CustomEvent('request-pr-data', { detail: { replyEvent: 'provide-pr-data' } }));
      setTimeout(() => {
        window.removeEventListener('provide-pr-data', handler as any);
        resolve([]);
      }, 2000);
    });
  }, []);

  // Reusable download trigger
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Export CSV of currently displayed PRs
  const handleExport = useCallback(async () => {
    const prData = await getCurrentPRs();
    if (!prData.length) {
      alert('No PR data to export yet. Click Load first.');
      return;
    }
    // Flatten data for CSV
    const rows: Record<string, any>[] = prData.map((pr: any) => ({
      Number: pr.number,
      Title: pr.title,
      Author: pr.author?.username,
      State: pr.state,
      CreatedAt: pr.createdAt,
      LastActionDate: pr.lastActionDate,
      LastActionType: pr.lastActionType || '',
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
    triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${owner}-${repo}-prs.csv`);
    setTimeout(() => alert('Downloaded Successfully'), 400);
  }, [owner, repo, getCurrentPRs]);

  // Export raw JSON of currently displayed PRs
  const handleExportJson = useCallback(async () => {
    const prData = await getCurrentPRs();
    if (!prData.length) {
      alert('No PR data to export yet. Click Load first.');
      return;
    }
    triggerDownload(new Blob([JSON.stringify(prData, null, 2)], { type: 'application/json' }), `${owner}-${repo}-prs.json`);
    setTimeout(() => alert('Saved Successfully'), 400);
  }, [owner, repo, getCurrentPRs]);
  return (
    <div className='bg-white rounded-2xl flex flex-col p-5 gap-4 border-b border-grey-secondary'>
      <div className='flex flex-wrap gap-6 items-center justify-between'>
        <h1 className='font-bold text-xl md:text-3xl'>Open PRs</h1>
        <div className='flex gap-3 items-center '>
          <Button variant='primary' onClick={handleExportJson}>Save JSON</Button>
          <Button variant='primary' onClick={handleExport}>Download CSV</Button>
          <Button
            variant='primary'
            onClick={() => {
              alert('refreshed');
            }}
          >
            refresh
          </Button>
        </div>
      </div>
      <Filters owner={owner} repo={repo} setOwner={setOwner} setRepo={setRepo} onLoad={onLoad} />
    </div>
  );
}
