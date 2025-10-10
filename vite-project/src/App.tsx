import React, { useEffect, useState } from "react";
import axios from "axios";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import PRsPage from "./pages/PRsPage";
import NotFound from "./pages/NotFound";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [user, setUser] = useState<{ name: string; avatar_url: string } | null>(
    null
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get("token");

    if (accessToken) {
      window.history.replaceState({}, document.title, "/"); // Remove token from URL
      setToken(accessToken);
      fetchUser(accessToken);
      fetchRepos(accessToken);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      });
      console.log(res.data);
      setUser({
        name: res.data.name || res.data.login,
        avatar_url: res.data.avatar_url,
      });
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  const fetchRepos = async (token: string) => {
    try {
      const res = await axios.get("https://api.github.com/user/repos", {
        headers: { Authorization: `token ${token}` },
      });
      setRepos(res.data);
    } catch (err) {
      console.error("Error fetching repos:", err);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setRepos([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          element={
            <AppLayout user={user} token={token} onLogout={handleLogout} />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route
            path="/prs"
            element={<PRsPage user={user} repos={repos} token={token} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
