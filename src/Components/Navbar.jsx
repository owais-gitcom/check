import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import Swal from "sweetalert2";

const Navbar = ({ onRegisterClick, onLoginClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { darkMode, toggleMode } = useTheme();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    // 🔐 Clear token or session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // ❌ Close dropdown
    setUserMenuOpen(false);

    // 🔁 Redirect to home
    navigate("/");

    // ✅ Stylish logout popup
    Swal.fire({
      title: "Goodbye 👋",
      text: "Your session has ended. Come back soon!",
      icon: "info",
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      timer: 3000,
      timerProgressBar: true
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">MyWebsite</Link>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/services" className={location.pathname === "/services" ? "active" : ""} onClick={() => setMenuOpen(false)}>Services</Link></li>
        <li><Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""} onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
        <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>

      <div className="nav-right">
        <div className="user-menu-wrapper">
          <FaUserCircle className="icon profile-icon" title="Profile" onClick={toggleUserMenu} />
          {userMenuOpen && (
            <div className="user-dropdown">
              <button onClick={onRegisterClick}>Register</button>
              <button onClick={onLoginClick}>Login</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {darkMode ? (
          <FaSun className="icon toggle-icon" onClick={toggleMode} title="Light Mode" />
        ) : (
          <FaMoon className="icon toggle-icon" onClick={toggleMode} title="Dark Mode" />
        )}

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
