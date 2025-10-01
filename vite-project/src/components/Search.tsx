import React from "react";
import Button from "./Button";

interface SearchProps {
  owner: string;
  repo: string;
  setOwner: (value: string) => void;
  setRepo: (value: string) => void;
  onLoad: () => void;
  loading: boolean;
}

const Search: React.FC<SearchProps> = ({
  owner,
  repo,
  setOwner,
  setRepo,
  onLoad,
  loading
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        value={owner}
        onChange={e => setOwner(e.target.value)}
        placeholder="Owner: chingu-voyages"
        className="border p-2 rounded text-sm"
        style={{ minWidth: 170 }}
      />
      <input
        value={repo}
        onChange={e => setRepo(e.target.value)}
        placeholder="Repo: v57-tier2-team-22"
        className="border p-2 rounded text-sm"
        style={{ minWidth: 190 }}
      />
      <Button variant="primary" onClick={onLoad} disabled={loading}>
        {loading ? 'Loading...' : 'Load'}
      </Button>
    </div>
  );
};

export default Search;