import PRDashboard from "../components/Dashboard";
import SectionHeader from "../components/SectionHeader";
import Tabs from "../components/Tabs";

export default function PRsPage() {
  return (
    <main className="bg-bg-main p-3 md:p8 lg:px-14 lg:py-11 flex flex-col gap-4 lg:gap-10">
      <Tabs />
      <SectionHeader />
      <PRDashboard />
    </main>
  );
}
