import React, { useState, useEffect } from "react";
import { PRData } from "../types";
import { formatDate } from "../utils/formatDate";

interface DashboardProps {
  prs: PRData[];
  loading: boolean;
  activeTab: string;
}

const PRDashboard: React.FC<DashboardProps> = ({ prs, loading, activeTab }) => {
  const [data, setData] = useState<PRData[]>([]);
  const [titleAsc, setTitleAsc] = useState(true);
  const [authorAsc, setAuthorAsc] = useState(true);
  const [numAsc, setNumAsc] = useState(true);
  const [dateAsc, setDateAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPages = !data
    ? Math.ceil(prs.length / ITEMS_PER_PAGE) || 1
    : Math.ceil(data.length / ITEMS_PER_PAGE) || 1;
  const currentItems = !data
    ? prs.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setData(prs);
  }, [prs]);

  console.log(activeTab);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderLastActionBadge = (lastActionDate: string) => {
    return (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green rounded-full">
        {formatDate(lastActionDate)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-[#f5f5f4] p-8">
        <div className="text-center">Loading PRs...</div>
      </div>
    );
  }

  const sortById = () => {
    const sorted = [...prs].sort((a, b) =>
      numAsc ? a.number - b.number : b.number - a.number
    );
    setData(sorted);
    setNumAsc(!numAsc);
  };

  const sortByTitle = () => {
    const sorted = [...prs].sort((a, b) =>
      titleAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setData(sorted);
    setTitleAsc(!titleAsc);
  };

  const sortByAuthor = () => {
    const sorted = [...prs].sort((a, b) =>
      authorAsc
        ? a.author.username.localeCompare(b.author.username)
        : b.author.username.localeCompare(a.author.username)
    );
    setData(sorted);
    setAuthorAsc(!authorAsc);
  };

  const sortByDate = () => {
    const sorted = [...prs].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateAsc ? dateB - dateA : dateA - dateB;
    });
    setData(sorted);
    setDateAsc(!dateAsc);
  };

  return (
    <div className="flex flex-col items-center bg-[#f5f5f4]">
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md bg-white w-full mt-6 max-w-7xl">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  sortById();
                }}
              >
                ID
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  sortByTitle();
                }}
              >
                Title
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  sortByAuthor();
                }}
              >
                Author
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => {
                  sortByDate();
                }}
              >
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reviewers
              </th>
              {activeTab === "open" ? (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Action Date
                </th>
              ) : (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Closed
                </th>
              )}
              {activeTab === "open" ? (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((pr) => (
              <tr key={pr.number} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    {pr.number}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 w-100">
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-semibold hover:underline"
                  >
                    {pr.title}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={pr.author.avatar}
                      alt={pr.author.username}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://github.com/identicons/" +
                          pr.author.username +
                          ".png";
                      }}
                    />
                    <a
                      className="flex items-center"
                      href={`https://github.com/${pr.author.username}`}
                    >
                      <p className="ml-2 font-medium hover:underline">
                        {pr.author.username}
                      </p>
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(pr.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center space-x-1">
                    {pr.reviewers.length > 0 ? (
                      <>
                        {pr.reviewers.slice(0, 3).map((reviewer) => (
                          <img
                            key={reviewer.username}
                            className="h-6 w-6 rounded-full"
                            src={reviewer.avatar}
                            alt={reviewer.username}
                            title={reviewer.username}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://github.com/identicons/" +
                                reviewer.username +
                                ".png";
                            }}
                          />
                        ))}
                        {pr.reviewers.length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">
                            +{pr.reviewers.length - 3} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400 italic">No reviewers</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {renderLastActionBadge(pr.lastActionDate)}
                </td>
                {activeTab === "open" ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        pr.lastActionType === "Created"
                          ? "bg-blue-100 text-blue-800"
                          : pr.lastActionType === "Commented"
                          ? "bg-yellow-100 text-yellow-800"
                          : pr.lastActionType === "Change Requested"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {pr.lastActionType}
                    </span>
                  </td>
                ) : null}
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No PRs found. Try loading PRs or adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded cursor-pointer bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + Math.max(1, currentPage - 2);
            if (page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 border rounded cursor-pointer ${
                  currentPage === page
                    ? "bg-green text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              handlePageClick(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded cursor-pointer bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PRDashboard;
