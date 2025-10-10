import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Search from "../components/Search";
import { useState } from "react";
import Footer from "../layout/Footer";
// TODO: CLEAN UP COLORS ADD TO GLOBALS CSS

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>("");

  // will navigate to /prs/owners/repo
  const handleLoad = () => {
    if (!owner || !repo) {
      return;
    }
    setLoading(true);
    navigate(`/prs?owner=${owner}&repo=${repo}`);
  };

  return (
    <div className="bg-black text-bg-main">
      {/* --- Hero section--- */}
      <section className="gradient bg-no-repeat bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-6 md:px-10 lg:px-20 py-16 md:py-24 text-center">
        {/* Text Content */}
        <div className="flex flex-col gap-6 items-center">
          {/* Heading */}
          <div className="font-bold lg:font-extrabold text-4xl md:text-5xl lg:text-7xl flex flex-col gap-3 leading-tight">
            <p>Track Your Team's</p>
            <p>GitHub Pull Requests</p>
            <p className="italic">
              with{" "}
              <span className="text-[#FF720D] underline decoration-4">
                ease
              </span>
            </p>
          </div>

          {/* Subtext */}
          <div className="md:w-2/3">
            <p className="text-grey-secondary md:text-lg mb-10 font-extralight">
              Stay in the loop, power up your collab, and keep every PR on your
              radar.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Search
              owner={owner}
              repo={repo}
              setOwner={setOwner}
              setRepo={setRepo}
              onLoad={handleLoad}
              loading={loading}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="min-h-screen flex flex-col gap-6 md:gap-10 lg:gap-20 items-center p-8 md:py-12 bg-black-900 lg:grid grid-cols-2">
        {/* grid left */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-9xl whitespace-pre-line">
            Every PR.{"\n"}
            Every Review.{"\n"}
            One Place.{"\n"}
          </h2>
          <p className="mt-7 md:text-2xl">
            Your team’s PR workflow — simplified, organized, and built for
            better collaboration.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {/* grid right */}
          <Card
            icon={"🚀"}
            title={"Faster Collaboration"}
            text={
              "Keep everyone aligned with real-time updates on open and closed PRs. No more guessing who’s working on what."
            }
          />
          <Card
            icon={"🕵️‍♀️"}
            title={"Clear Visibility"}
            text={
              "Tabs and filters give instant insight into PR status, authors, and reviewers—so you can focus only on what matters."
            }
          />
          <Card
            icon={"👩‍💻"}
            title={"Smarter Decisions"}
            text={
              "Export PR data to CSV/JSON for reporting, analytics, or sharing outside GitHub."
            }
          />
        </div>
      </section>

      {/* Floating chat button */}
      {/* <button aria-label="chat" className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow grid place-items-center border">
        💬
      </button> */}
      <Footer />
    </div>
  );
};

export default HomePage;
