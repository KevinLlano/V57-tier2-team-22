import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout: React.FC = ({ user, token, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} token={token} onLogout={onLogout} />
      <main className="bg-bg-main overflow-y-auto flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
