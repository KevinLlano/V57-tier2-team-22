
export async function fetchPullRequests(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  const apiToken = import.meta.env.VITE_GITHUB_TOKEN;
  if (apiToken) {
    headers['Authorization'] = `token ${apiToken}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}
