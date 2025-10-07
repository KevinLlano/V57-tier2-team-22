import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  user: { name: string; avatar_url: string } | null;
  onLogout: () => void;
}

export const Header: React.FC = ({ user, token, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    );
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:4000/auth/github";
  };

  console.log(user);

  return (
    //TODO: scroll transparent - > use scrolled fn provided
    <header
      className={`flex h-14 md:h-20 w-full justify-between items-center fixed top-0 z-10 
    p-2 md:px-16
    transition-colors duration-300 ease-in-out
    ${scrolled ? "backdrop-blur-md shadow-s" : "bg-transparent"}
  `}
    >
      {/* logo + brand name */}
      <Link to="/">
        <div className="flex gap-3 items-center justify-center ml-3 md:ml-0">
          <img src={logo} alt="logo" className="h-6 md:h-8" />
          <span
            className="font-semibold text-2xl md:text-3xl text-white "
            style={{ textShadow: "0 2px 3px rgba(0, 0, 0, 0.3)" }}
          >
            pr tracker
          </span>
        </div>
      </Link>
      <div className="flex text-center items-center justify-center">
        {!token ? (
          <button
            className="bg-green text-white w-36 p-2 rounded-2xl cursor-pointer mr-10"
            onClick={handleLogin}
          >
            GitHub Login
          </button>
        ) : (
          <div className="mb-2"></div>
        )}
        {user && (
          <div className="flex text-center items-center justify-center mr-10">
            <img
              src={user.avatar_url}
              alt="Profile"
              className="h-16 rounded-full"
            />
            <h2 className="ml-2">{user.name}</h2>
            <button
              className="bg-green text-white w-24 p-2 rounded-2xl cursor-pointer ml-10"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
        <span
          className="text-sm hidden sm:inline text-grey"
          aria-label={`Today is ${today}`}
        >
          {today}
        </span>
      </div>
    </header>
  );
};

export default Header;
