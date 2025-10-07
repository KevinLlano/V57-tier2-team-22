import React, { useEffect, useState } from "react";
import axios from "axios";

const OAuth: React.FC = ({ user, repos, token }) => {
  console.log(repos);

  return (
    <div style={{ padding: 20, marginTop: 100 }}>
      {!token ? (
        <div></div>
      ) : (
        <div>
          <h2>Your Repositories:</h2>
          <br></br>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OAuth;
