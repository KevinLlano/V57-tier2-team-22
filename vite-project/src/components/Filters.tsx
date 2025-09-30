import DropdownMenu from "./DropdownMenu";
import Button from "./Button";
import { useState } from "react";

interface FiltersProps {
  owner: string;
  repo: string;
  setOwner: (v: string) => void;
  setRepo: (v: string) => void;
  onLoad: () => void; // trigger reload of PRs
}

export default function Filters({ owner, repo, setOwner, setRepo, onLoad }: FiltersProps) {
  const [author, setAuthor] = useState("");
  const [reviewer, setReviewer] = useState("");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-5 flex-wrap items-start">
      {/* Owner / Repo selection */}
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
        <Button variant="primary" onClick={onLoad}>Load</Button>
      </div>
      {/* Existing Author / Reviewer filters */}
      <DropdownMenu
        label="Author"
        options={["jazz", "matthew", "kevin", "viral", "thais"]}
        onSelect={setAuthor}
      />
      <DropdownMenu
        label="Reviewer"
        options={["jazz", "matthew", "kevin", "viral", "thais"]}
        onSelect={setReviewer}
      />
      <div className="mt-1 md:mt-0">
        <Button onClick={() => alert("searching....")}>Search</Button>
      </div>
      {/* Status line */}
      <div className="text-sm text-error self-center flex-1 min-w-[220px]">
        Active → Author: {author || "All"}, Reviewer: {reviewer || "All"}
      </div>
    </div>
  );
}
