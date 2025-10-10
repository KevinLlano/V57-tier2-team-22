import React, { useEffect, useState } from "react";
import axios from "axios";

const OAuth: React.FC = ({
  user,
  repos,
  token,
  repo,
  setRepo,
  input,
  setInput,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE) || 1;
  const currentItems = repos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleExtract = (url) => {
    const match = url.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)(\/)?$/);
    setInput(match ? match[1] : null);
  };

  return (
    <>
      {!token ? (
        <div></div>
      ) : (
        <div className="p-20 flex flex-col items-center justify-center text-center">
          <h1 className="mb-6 font-semibold">Your Repositories:</h1>
          <div className="w-[600px] flex flex-wrap text-center items-center justify-center md:w-[800px] lg:w-[1200px]">
            {currentItems.map((repo) => (
              <div
                key={repo.id}
                className="w-[200px] flex text-center items-center justify-center mb-1 mr-1 cursor-pointer md:w-[200px] lg:w-[300px]"
                onClick={() => {
                  handleExtract(repo.html_url);
                }}
              >
                <p className="w-[200px] h-[50px] border rounded-lg flex text-center items-center justify-center hover:bg-green hover:text-white md:h-[60px] md:w-[240px] lg:w-[300px] lg:h-[60px]">
                  {repo.name}
                </p>
              </div>
            ))}
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
      )}
    </>
  );
};

export default OAuth;
