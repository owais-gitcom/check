import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import RegisterPopup from "./Register/RegisterPopup";
import LoginPopup from "./Login/LoginPopup";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/Contact";

import UserPanel from './Dashboard/UserPanel';

import "./App.css";

import { ThemeProvider } from "./ThemeContext"; // ✅ Wrap with this

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {/* Navbar with click handlers */}
          <Navbar
            onRegisterClick={() => setShowRegister(true)}
            onLoginClick={() => setShowLogin(true)}
          />

          {/* Register & Login Popups */}
          {showRegister && (
            <RegisterPopup onClose={() => setShowRegister(false)} />
          )}
          {showLogin && (
            <LoginPopup onClose={() => setShowLogin(false)} />
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
<Route path="/dashboard" element={<UserPanel />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
