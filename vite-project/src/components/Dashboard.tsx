import React from "react";
import { useState, useEffect } from "react";
// import prData from "../data/mockData.json"; // replaced by live GitHub data
import { fetchMappedPullRequests } from "../utils/githubApi";
import { PullRequest } from "../types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "../utils/formatDate";


interface DashboardProps {
  owner: string;
  repo: string;
}

// Dashboard component to display Owner/Repo PRs
const PRDashboard: React.FC<DashboardProps> = ({ owner, repo }) => {
  const [prs, setPrs] = useState<PullRequest[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 



  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMappedPullRequests(owner, repo);
        if (!cancelled) setPrs(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to load PRs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [owner, repo]);
  // Provide PR data for export when SectionHeader dispatches request
  useEffect(() => {
    const handler = (e: any) => {
      const detail = prs;
      const replyEventName = e.detail?.replyEvent || 'provide-pr-data';
      const reply = new CustomEvent(replyEventName, { detail });
      window.dispatchEvent(reply);
    };
    window.addEventListener('request-pr-data', handler);
    return () => window.removeEventListener('request-pr-data', handler);
  }, [prs]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(prs.length / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = prs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center bg-[#f5f5f4]">
      <div style={{ width: "70vw" }}>
        <div className="flex justify-end items-center gap-4 my-4">
        </div>
        
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "solid 1px lightgray",
          }}
        >
          <thead>
            <tr>
              <th style={thStyleId}>#</th>
              <th style={thStyleTitle}>TITLE</th>
              <th style={thStyleAuthor}>AUTHOR</th>
              <th style={thStyleCreated}>CREATED</th>
              <th style={thStyleReviewers}>REVIEWERS</th>
              <th style={thStyleDate}>LAST ACTION DATE</th>
              <th style={thStyleArrow}></th> 
              <th style={thStyleLastAction}>LAST ACTION</th> 
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} style={{ padding: 20 }}>Loading PRs...</td></tr>
            )}
            {error && !loading && (
              <tr><td colSpan={7} style={{ padding: 20, color: 'red' }}>{error}</td></tr>
            )}
            {!loading && !error && currentItems.map((pr) => (
              <tr key={pr.number} style={trStyle}>
                <td style={tdStyleId}>{pr.number}</td>
                <td style={tdStyleTitle}>
                  <a href={pr.url}>{pr.title}</a>
                </td>
                <td style={tdStyleAuthor}>
                  <div className="flex items-center">
                    <img src={pr.author.avatar} className="h-10 rounded-4xl" />
                    <p className="ml-2">{pr.author.username}</p>
                  </div>
                </td>
                <td style={tdStyleCreated}>{formatDate(pr.createdAt)}</td>
                <td style={tdStyleReviewers}>
                  {pr.reviewers.map((i) => (
                    <div className="flex items-center p-2">
                      <img src={i.avatar} className="h-10 rounded-4xl" />
                      <p className="ml-2">{i.username}</p>
                    </div>
                  ))}
                </td>
                <td style={tdStyleDate}>{formatDate(pr.lastActionDate)}</td>
                <td style={tdStyleArrow}>
                  <ChevronRightIcon className="hover:cursor-pointer" />
                </td>
                <td style={tdStyleLastAction}>
                  {renderLastActionBadge(pr.lastActionType)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 mb-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className={`px-4 py-2 rounded hover:cursor-pointer ${
                page === currentPage
                  ? "bg-green text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const thStyleId: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "5vw",
  paddingLeft: "30px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};
const thStyleTitle: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "14vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};
const thStyleAuthor: React.CSSProperties = {
  display: "flex",
  textAlign: "left",
  height: "50px",
  width: "12vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};
const thStyleCreated: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "10vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};
const thStyleReviewers: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "15vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};
const thStyleDate: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "13vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};

const thStyleArrow: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "2vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};

const thStyleLastAction: React.CSSProperties = {
  textAlign: "left",
  height: "50px",
  width: "10vw",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  color: "#7B818E",
  fontWeight: "600",
  backgroundColor: "#F9FAFB",
};

const tdStyleId: React.CSSProperties = {
  height: "70px",
  width: "5vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#121827",
  paddingLeft: "30px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleTitle: React.CSSProperties = {
  height: "70px",
  width: "14vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#121827",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleAuthor: React.CSSProperties = {
  height: "70px",
  width: "12vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#121827",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleCreated: React.CSSProperties = {
  height: "50px",
  width: "10vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#7F8491",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleReviewers: React.CSSProperties = {
  height: "50px",
  width: "15vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#4E5665",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleDate: React.CSSProperties = {
  height: "50px",
  width: "13vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#7F8491",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleArrow: React.CSSProperties = {
  height: "50px",
  width: "2vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#7F8491",
  paddingRight: "30px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: "600",
};

const tdStyleLastAction: React.CSSProperties = {
  height: "50px",
  width: "10vw",
  textAlign: "left",
  borderBottom: "2px solid #eee",
  color: "#121827",
  padding: "10px",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: 500,
};

const trStyle: React.CSSProperties = {
  height: "",
  backgroundColor: "white",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
};

function renderLastActionBadge(type?: string) {
  if (!type) return null;
  const base: React.CSSProperties = {
    display: 'inline-block',
    fontSize: 12,
    lineHeight: '16px',
    padding: '2px 8px',
    borderRadius: 8,
    fontWeight: 600,
  };
  const styleMap: Record<string, React.CSSProperties> = {
    Created: { background: '#E8F2FF', color: '#0B57D0' },
    Draft: { background: '#F3E8FF', color: '#6B21A8' },
    Merged: { background: '#E6F4EA', color: '#1E7F37' },
    Closed: { background: '#FEE2E2', color: '#B91C1C' },
  };
  const style = { ...base, ...(styleMap[type] || { background: '#E2E8F0', color: '#334155' }) };
  return <span style={style}>{type}</span>;
}

export default PRDashboard;
