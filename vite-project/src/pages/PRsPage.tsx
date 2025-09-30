import PRDashboard from "../components/Dashboard";
import SectionHeader from "../components/SectionHeader";
import Tabs from "../components/Tabs";
import { useState, useCallback } from 'react';

export default function PRsPage() {
  const [owner, setOwner] = useState("chingu-voyages");
  const [repo, setRepo] = useState("v57-tier2-team-22");
  const [reloadKey, setReloadKey] = useState(0); // force refetch when user clicks Load

  const handleLoad = useCallback(() => {
    setReloadKey(k => k + 1);
  }, []);

  return (
    <main className="bg-bg-main p-3 md:p8 lg:px-14 lg:py-11 flex flex-col gap-4 lg:gap-2">
      <Tabs />
      <SectionHeader owner={owner} repo={repo} setOwner={setOwner} setRepo={setRepo} onLoad={handleLoad} />
      <PRDashboard key={owner + repo + reloadKey} owner={owner} repo={repo} />
    </main>
  );
}
