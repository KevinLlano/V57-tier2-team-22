import { PRData } from '../types';
// Low-level fetch returning the raw GitHub Pull Request objects
export async function fetchPullRequests(
  owner: string,
  repo: string
): Promise<any[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?per_page=50&state=all`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  const apiToken = import.meta.env.VITE_GITHUB_TOKEN;
  if (apiToken) headers['Authorization'] = `token ${apiToken}`;
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
}

// Higher-level convenience: map raw GitHub data into the app's PR shape
export async function fetchMappedPullRequests(
  owner: string,
  repo: string
): Promise<PRData[]> {
  const raw = await fetchPullRequests(owner, repo);

  return (raw as any[]).map((pr) => {
    let lastActionType: string = 'Created';
    if (pr.draft) lastActionType = 'Created';
    else if (pr.state === 'closed' && pr.merged_at)
      lastActionType = 'Change Requested';
    else if (pr.state === 'closed') lastActionType = 'Commented';
    else if (pr.requested_reviewers && pr.requested_reviewers.length > 0)
      lastActionType = 'Change Requested';
    return {
      number: pr.number,
      title: pr.title,
      url: pr.html_url,
      state: pr.state,
      author: {
        username: pr.user?.login ?? 'unknown',
        avatar: pr.user?.avatar_url ?? '',
      },
      createdAt: pr.created_at,
      reviewers: (pr.requested_reviewers || []).map((r: any) => ({
        username: r.login,
        avatar: r.avatar_url,
      })),
      lastActionDate: pr.updated_at || pr.created_at,
      lastActionType,
    };
  });
}
