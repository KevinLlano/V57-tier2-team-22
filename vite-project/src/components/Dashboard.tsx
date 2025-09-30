import React from "react";
import { useState, useEffect } from "react";
import prData from "../data/mockData.json";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDate } from "../utils/formatDate";

interface Props {
  date: string;
}

const PRDashboard: React.FC = () => {
  const items: Item[] = prData;

  console.log(items);

  const [prs, setPrs] = useState(items);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [titleAsc, setTitleAsc] = useState(true);
  const [authorAsc, setAuthorAsc] = useState(true);
  const [numAsc, setNumAsc] = useState(true);
  const [dateAsc, setDateAsc] = useState(true);
  const [selectedPR, setSelectedPR] = useState({ number: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const totalPages = Math.ceil(prs.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = prs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNumber = Number(e);
    const pr = prs.find((item) => item.number === selectedNumber) || null;
    setSelectedPR(pr);
    setDropdownOpen(false); // reset dropdown on selection change
  };

  console.log(selectedPR.number);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const sortById = () => {
    const sorted = [...prs].sort((a, b) =>
      numAsc ? a.number - b.number : b.number - a.number
    );
    setPrs(sorted);
    setNumAsc(!numAsc);
  };

  const sortByTitle = () => {
    const sorted = [...prs].sort((a, b) =>
      titleAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setPrs(sorted);
    setTitleAsc(!titleAsc);
  };

  const sortByAuthor = () => {
    const sorted = [...prs].sort((a, b) =>
      authorAsc
        ? a.author.username.localeCompare(b.author.username)
        : b.author.username.localeCompare(a.author.username)
    );
    setPrs(sorted);
    setAuthorAsc(!authorAsc);
  };

  const sortByDate = () => {
    const sorted = [...prs].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateAsc ? dateB - dateA : dateA - dateB;
    });
    setPrs(sorted);
    setDateAsc(!dateAsc);
  };

  return (
    <div className="flex flex-col items-center bg-[#f5f5f4]">
      <div style={{ width: "70vw" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "solid 1px lightgray",
          }}
        >
          <thead>
            <tr>
              <th
                style={thStyleId}
                onClick={() => {
                  sortById();
                }}
              >
                #
              </th>
              <th
                style={thStyleTitle}
                onClick={() => {
                  sortByTitle();
                }}
              >
                TITLE
              </th>
              <th
                style={thStyleAuthor}
                onClick={() => {
                  sortByAuthor();
                }}
              >
                AUTHOR
              </th>
              <th
                style={thStyleCreated}
                onClick={() => {
                  sortByDate();
                }}
              >
                CREATED
              </th>
              <th style={thStyleReviewers}>REVIEWERS</th>
              <th style={thStyleDate}>LAST ACTION DATE</th>
              <th style={thStyleArrow}></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((pr) => (
              <tr key={pr.number} style={trStyle}>
                <td style={tdStyleId}>{pr.number}</td>
                <td style={tdStyleTitle}>
                  <a href={pr.url} className="hover:underline">
                    {pr.title}
                  </a>
                </td>
                <td style={tdStyleAuthor}>
                  <a
                    className="flex items-center"
                    href={`https://github.com/${pr.author.username}`}
                  >
                    <img src={pr.author.avatar} className="h-10 rounded-4xl" />
                    <p className="ml-2 hover:underline">{pr.author.username}</p>
                  </a>
                </td>
                <td style={tdStyleCreated}>{formatDate(pr.createdAt)}</td>
                <td style={tdStyleReviewers}>
                  <div className="relative flex mb-14">
                    <div className="absolute bg-white rounded-md hover:cursor-pointer">
                      {pr.number === selectedPR.number
                        ? pr.reviewers.map((i) => (
                            <div
                              key={pr.number}
                              onClick={() => {
                                handleSelectChange(pr.number);
                              }}
                              className="flex items-center p-2"
                            >
                              <img
                                src={i.avatar}
                                className="h-10 rounded-4xl"
                              />
                              <p className="ml-2">{i.username}</p>
                            </div>
                          ))
                        : pr.reviewers.slice(0, 1).map((i) => (
                            <div
                              key={pr.number}
                              onClick={() => {
                                handleSelectChange(pr.number);
                              }}
                              className="flex items-center p-2"
                            >
                              <img
                                src={i.avatar}
                                className="h-10 rounded-4xl"
                              />
                              <p className="ml-2">{i.username}</p>
                              {pr.reviewers.length > 1 ? (
                                <ExpandMoreIcon />
                              ) : null}
                            </div>
                          ))}
                    </div>
                  </div>
                </td>
                <td style={tdStyleDate}>{formatDate(pr.lastActionDate)}</td>
                <td style={tdStyleArrow}>
                  <ChevronRightIcon className="hover:cursor-pointer" />
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
  cursor: "pointer",
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
  cursor: "pointer",
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
  cursor: "pointer",
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
  cursor: "pointer",
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

const trStyle: React.CSSProperties = {
  height: "",
  backgroundColor: "white",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
};

export default PRDashboard;
