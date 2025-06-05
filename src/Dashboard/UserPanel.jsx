// UserPanel.js
import React from 'react';
import './Userpanel.css';
import { useTheme } from "../ThemeContext";

const UserPanel = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`user-panel ${darkMode ? 'dark' : 'light'}`}>
      <aside className="sidebar">
        <h2>User Panel</h2>
        <ul>
          <li className="active">Profile</li>
          <li>Orders</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
        <button className="toggle-btn">
          Toggle Theme
        </button>
      </aside>

     <main className="panel-content">
  <div className="welcome-section">
    <h2>
      Welcome back, <span className="highlight">User</span> 👋
    </h2>
    <p>
      Manage your account, track orders, and personalize your preferences effortlessly.
    </p>

    {/* <div className="quick-actions">
      <button className="action-btn">View Profile</button>
      <button className="action-btn">My Orders</button>
      <button className="action-btn">Settings</button>
    </div> */}
  </div>
</main>


    </div>
  );
};

export default UserPanel;
