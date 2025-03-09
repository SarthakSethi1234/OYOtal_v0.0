import React, { useState } from 'react';
import { Search, MapPin, Clock, Users, ChevronDown, ChevronUp, Plus, X } from 'react-feather';
import './UserDashboardPage.css';
import Header from './Header';
import Footer from './Footer';

function UserDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [bookingHospital, setBookingHospital] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  
  // Sample data for hospitals
  const [hospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      image: "https://via.placeholder.com/300x200?text=City+General+Hospital",
      address: "123 Healthcare Ave, Medical District",
      distance: 2.5,
      services: [
        { id: 1, name: "General Consultation", price: 500, queueCount: 12, waitTime: 45 },
        { id: 2, name: "X-Ray", price: 1200, queueCount: 5, waitTime: 20 },
        { id: 3, name: "Blood Test", price: 800, queueCount: 8, waitTime: 30 }
      ]
    },
    {
      id: 2,
      name: "Metro Medical Center",
      image: "https://via.placeholder.com/300x200?text=Metro+Medical+Center",
      address: "456 Health Street, Care City",
      distance: 4.8,
      services: [
        { id: 1, name: "Cardiology Consultation", price: 1500, queueCount: 7, waitTime: 35 },
        { id: 2, name: "ECG", price: 1000, queueCount: 3, waitTime: 15 },
        { id: 3, name: "Ultrasound", price: 2000, queueCount: 6, waitTime: 25 }
      ]
    },
    {
      id: 3,
      name: "Wellness Hospital",
      image: "https://via.placeholder.com/300x200?text=Wellness+Hospital",
      address: "789 Wellness Blvd, Healthy Heights",
      distance: 7.2,
      services: [
        { id: 1, name: "General Consultation", price: 600, queueCount: 9, waitTime: 35 },
        { id: 2, name: "Dental Checkup", price: 1000, queueCount: 4, waitTime: 25 },
        { id: 3, name: "Physiotherapy", price: 1200, queueCount: 5, waitTime: 30 }
      ]
    }
  ]);

  // Get all unique services from all hospitals
  const allServices = [...new Set(
    hospitals.flatMap(hospital => 
      hospital.services.map(service => service.name)
    )
  )].sort();

  // Filter hospitals based on search term and selected service
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = 
      selectedService === '' || 
      hospital.services.some(service => service.name === selectedService);
    
    return matchesSearch && matchesService;
  });

  // Sort hospitals by distance
  const sortedHospitals = [...filteredHospitals].sort((a, b) => a.distance - b.distance);

  const handleBookNow = (hospital, service) => {
    setBookingHospital(hospital);
    setBookingService(service);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the booking data to a server
    alert(`Booking confirmed at ${bookingHospital.name} for ${bookingService.name} on ${bookingDate} at ${bookingTime}`);
    setShowBookingForm(false);
    
    // Reset form
    setBookingDate('');
    setBookingTime('');
    setBookingName('');
    setBookingPhone('');
    setBookingEmail('');
  };

  return (
    <div className="dashboard-page">
      < Header/>
      <main className="dashboard-main container">
        <div className="page-header">
          <h1 className="page-title">Find Hospitals Near You</h1>
          <p className="page-subtitle">Search for services and book appointments</p>
        </div>
        
        <div className="search-container">
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for hospitals or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label htmlFor="serviceFilter" className="filter-label">Filter by Service:</label>
                <select
                  id="serviceFilter"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="service-select"
                >
                  <option value="">All Services</option>
                  {allServices.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {sortedHospitals.length} {sortedHospitals.length === 1 ? 'Hospital' : 'Hospitals'} Found
              {selectedService && ` for ${selectedService}`}
            </h2>
            <button className="add-hospital-button">
              <Plus size={16} />
              Add Hospital
            </button>
          </div>
          
          <div className="hospitals-grid">
            {sortedHospitals.length > 0 ? (
              sortedHospitals.map(hospital => (
                <div key={hospital.id} className="hospital-card">
                  <div className="hospital-image-container">
                    <img 
                      src={hospital.image || "/placeholder.svg"} 
                      alt={hospital.name} 
                      className="hospital-image"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200?text=${hospital.name}`;
                      }}
                    />
                  </div>
                  
                  <div className="hospital-content">
                    <h3 className="hospital-name">{hospital.name}</h3>
                    
                    <div className="hospital-location">
                      <MapPin size={16} className="location-icon" />
                      <span className="location-text">{hospital.address}</span>
                      <span className="distance-badge">{hospital.distance} km</span>
                    </div>
                    
                    <div className="services-list">
                      <h4 className="services-title">Available Services:</h4>
                      
                      {hospital.services
                        .filter(service => 
                          selectedService === '' || service.name === selectedService
                        )
                        .map(service => (
                          <div key={service.id} className="service-item">
                            <div className="service-header">
                              <span className="service-name">{service.name}</span>
                              <span className="service-price">₹{service.price}</span>
                            </div>
                            
                            <div className="service-meta">
                              <div className="queue-info">
                                <Users size={14} className="queue-icon" />
                                <span>{service.queueCount} in queue</span>
                              </div>
                              
                              <div className="wait-info">
                                <Clock size={14} className="wait-icon" />
                                <span>~{service.waitTime} min wait</span>
                              </div>
                            </div>
                            
                            <button 
                              className="book-button"
                              onClick={() => handleBookNow(hospital, service)}
                            >
                              Book Now
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3 className="no-results-title">No hospitals found</h3>
                <p className="no-results-message">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showBookingForm && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <div className="booking-modal-header">
              <h2 className="booking-modal-title">Book Appointment</h2>
              <button 
                className="close-modal-button"
                onClick={() => setShowBookingForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {bookingHospital && bookingService && (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="booking-details">
                  <h3 className="booking-hospital">{bookingHospital.name}</h3>
                  <p className="booking-service">{bookingService.name} - ₹{bookingService.price}</p>
                </div>
                
                <div className="form-fields">
                  <div className="form-group">
                    <label htmlFor="bookingName" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      id="bookingName" 
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bookingEmail" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="bookingEmail" 
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bookingPhone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      id="bookingPhone" 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="bookingDate" className="form-label">Date</label>
                      <input 
                        type="date" 
                        id="bookingDate" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookingTime" className="form-label">Time</label>
                      <input 
                        type="time" 
                        id="bookingTime" 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="confirm-button">
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    < Footer/>
    </div>
  );
}

export default UserDashboardPage;
