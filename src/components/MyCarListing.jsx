import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import "../styles/MyCarListing.css";
import carLogo from "../images/car-logo.jpg";
import userIcon from "../images/user-icon.png";

export function MyCarListing() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const menuRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
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

  const carImages = [
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000",
  ];

  const defaultCarAnimation = "https://media.istockphoto.com/id/1042273960/photo/small-cute-blue-car.webp?b=1&s=612x612&w=0&k=20&c=JI1CIEzgwI4CtyMN7VnDjKVquxtA-VUycde6TN-VczQ=";

  const [cars] = useState([
    {
      carId: 1,
      make: "TOYOTA",
      model: "CAMRY",
      year: 2020,
      mileage: 25000,
      carLocation: "BANGALORE",
      TotalNoOfOwners: 1,
      status: "AVAILABLE",
      carImageUrls: [carImages[0]],
      conditionReportId: "CR001",
      saleDecision: 0,
      price: "$25,000"
    },
    {
      carId: 2,
      make: "BMW",
      model: "3 Series",
      year: 2021,
      mileage: 15000,
      carLocation: "MUMBAI",
      TotalNoOfOwners: 2,
      status: "AVAILABLE",
      carImageUrls: [carImages[1]],
      conditionReportId: "CR002",
      saleDecision: 0,
      price: "$45,000"
    },
    {
      carId: 3,
      make: "AUDI",
      model: "A4",
      year: 2019,
      mileage: 35000,
      carLocation: "DELHI",
      TotalNoOfOwners: 1,
      status: "AVAILABLE",
      carImageUrls: [carImages[2]],
      conditionReportId: "CR003",
      saleDecision: 0,
      price: "$35,000"
    }
  ]);

  const handleViewMore = (carId) => {
    setExpandedCard(carId);
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
  };

  const handleAddCar = () => {
    navigate('/add-car');
  };

  const getDefaultImage = (make) => {
    return defaultCarAnimation;
  };

  return (
    <div className="car-listings-container">
      <div className="listings-header">
        <div className="logo" onClick={() => navigate('/home')}>
          <img src={carLogo} alt="Car Logo" className="car-logo" />
          <h1>My Car Listings</h1>
        </div>

        <div className="user-section">
          <div className="user-icon" ref={menuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="username">{username}</span>
            <img src={userIcon} alt="User Icon" />
            {isMenuOpen && (
              <div className="user-menu">
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => navigate('/cars')}>Browse Cars</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="add-car-section">
          <button className="add-car-btn" onClick={handleAddCar}>
            <i className="fas fa-plus"></i> Add New Car
          </button>
        </div>

        <div className="car-cards-container">
          {expandedCard && (
            <div className="expanded-view">
              {cars.filter(car => car.carId === expandedCard).map(car => (
                <div key={car.carId} className="expanded-card" ref={cardRef}>
                  <button className="close-btn" onClick={handleCloseExpanded}>
                    <i className="fas fa-arrow-left"></i> Back
                  </button>
                  <div className="expanded-image">
                    <img 
                      src={car.carImageUrls[0] || defaultCarAnimation} 
                      alt={`${car.make} ${car.model}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultCarAnimation;
                      }}
                    />
                  </div>
                  <div className="car-info">
                    <h2>{car.make} {car.model}</h2>
                    <p className="price">{car.price}</p>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Year:</span>
                        <span>{car.year}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Mileage:</span>
                        <span>{car.mileage} km</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Location:</span>
                        <span>{car.carLocation}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Total Owners:</span>
                        <span>{car.TotalNoOfOwners}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Status:</span>
                        <span>{car.status}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Report ID:</span>
                        <span>{car.conditionReportId}</span>
                      </div>
                    </div>
                    <div className="action-buttons">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!expandedCard && cars.map(car => (
            <div 
              key={car.carId} 
              className="car-card"
              onClick={() => handleViewMore(car.carId)}
            >
              <img 
                src={car.carImageUrls[0] || getDefaultImage(car.make)}
                alt={`${car.make} ${car.model}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getDefaultImage(car.make);
                }}
              />
              <div className="car-info">
                <h3>{car.make} {car.model}</h3>
                <p>Year: {car.year}</p>
                <p>Mileage: {car.mileage} km</p>
                <p>Location: {car.carLocation}</p>
                <p className="price">{car.price}</p>
                <div className="card-actions">
                  <button className="edit-btn" onClick={(e) => {
                    e.stopPropagation(); // Prevent card expansion when clicking buttons
                  }}>Edit</button>
                  <button className="delete-btn" onClick={(e) => {
                    e.stopPropagation(); // Prevent card expansion when clicking buttons
                  }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 