import "../styles/dashboard.css";
import carLogo from "../images/car-logo.jpg";
import carImage from "../images/car-image.jpg";
import userIcon from "../images/user-icon.png";
import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

export function UserDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    }
  }, []);

  // useEffect(() => {
  //   // Get user data from location state (passed during navigation)
  //   const userData = location.state?.userData;
  //   if (userData) {
  //     setUserName(userData.name || 'User');
  //   }
  // }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    navigate('/home');
  };

  const handleNavigation = (path) => {
    if (path === '/about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/') {
      homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/profile') {
      navigate('/profile');
    } else if (path === '/cars') {
      navigate('/cars');
    } else if (path === '/sell') {
      navigate('/sell');
    } else if (path === '/service') {
      console.log('Booking service');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="main-container">
      {/* Header Section */}
      <div className="header">
        <div className="logo">
          <img src={carLogo} alt="Car Connect Logo" />
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          </div>
        </div>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button onClick={() => handleNavigation('/')}>Home</button>
          <button onClick={() => handleNavigation('/about')}>About Us</button>
        </nav>
        
        <div className="user-section">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">Search</button>
          </div>
          
          <div className="user-icon" ref={menuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={userIcon} alt="User Icon" />
            <span className="userName">{username}</span>  {/* Username beside icon */}
            {isMenuOpen && (
              <div className="user-menu">
                <button onClick={() => handleNavigation('/profile')}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section" ref={homeRef} style={{ backgroundImage: `url(${carImage})` }}>
        <div className="content-left">
          <h1>
            <span className="car-text">CAR</span>
            <span className="ct-text">CNT</span>
          </h1>
          <h3>Discover Your Ideal Vehicle</h3>
          <p>Your one-stop destination for buying, selling, and servicing vehicles.</p>
        </div>
        
        <div className="content-right">
          <div className="feature-card">
            <ul className="button-list">
              <li><button className="action-btn" onClick={() => handleNavigation('/cars')}>Buy a Car</button></li>
              <li><button className="action-btn" onClick={() => handleNavigation('/sell')}>Sell Your Car</button></li>
              <li><button className="action-btn" onClick={() => handleNavigation('/service')}>Book Service</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section" ref={aboutRef}>
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Your Trusted Car Partner</h3>
            <p>We are committed to providing the best automotive solutions for our customers. With years of experience in the industry, we offer:</p>
            <ul>
              <li>Wide selection of quality vehicles</li>
              <li>Professional car maintenance services</li>
              <li>Transparent buying and selling process</li>
              <li>Expert guidance and support</li>
            </ul>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h4>1000+</h4>
              <p>Cars Sold</p>
            </div>
            <div className="stat-item">
              <h4>500+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h4>50+</h4>
              <p>Expert Mechanics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}