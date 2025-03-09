import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Plus, Edit, Trash2, Search, Users, Clock } from 'react-feather';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('hospitals');
  const [showAddHospitalForm, setShowAddHospitalForm] = useState(false);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for hospitals
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      image: "/placeholder.svg",
      address: "123 Healthcare Ave, Medical District",
      services: [
        { id: 1, name: "General Consultation", price: 500, queueCount: 12, waitTime: 45 },
        { id: 2, name: "X-Ray", price: 1200, queueCount: 5, waitTime: 20 },
        { id: 3, name: "Blood Test", price: 800, queueCount: 8, waitTime: 30 }
      ]
    },
    {
      id: 2,
      name: "Metro Medical Center",
      image: "/placeholder.svg",
      address: "456 Health Street, Care City",
      services: [
        { id: 1, name: "Cardiology Consultation", price: 1500, queueCount: 7, waitTime: 35 },
        { id: 2, name: "ECG", price: 1000, queueCount: 3, waitTime: 15 },
        { id: 3, name: "Ultrasound", price: 2000, queueCount: 6, waitTime: 25 }
      ]
    }
  ]);

  // Form states
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    image: '/placeholder.svg'
  });

  const [newService, setNewService] = useState({
    name: '',
    price: '',
    queueCount: 0,
    waitTime: 0
  });

  // Handlers
  const handleAddHospital = (e) => {
    e.preventDefault();
    const hospitalId = hospitals.length > 0 ? Math.max(...hospitals.map(h => h.id)) + 1 : 1;
    const hospital = {
      id: hospitalId,
      ...newHospital,
      services: []
    };
    setHospitals([...hospitals, hospital]);
    setNewHospital({ name: '', address: '', image: '/placeholder.svg' });
    setShowAddHospitalForm(false);
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!selectedHospital) return;

    const serviceId = selectedHospital.services.length > 0 
      ? Math.max(...selectedHospital.services.map(s => s.id)) + 1 
      : 1;
    
    const service = {
      id: serviceId,
      ...newService,
      price: Number(newService.price),
      queueCount: Number(newService.queueCount),
      waitTime: Number(newService.waitTime)
    };

    const updatedHospitals = hospitals.map(hospital => {
      if (hospital.id === selectedHospital.id) {
        return {
          ...hospital,
          services: [...hospital.services, service]
        };
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    setNewService({ name: '', price: '', queueCount: 0, waitTime: 0 });
    setShowAddServiceForm(false);
    
    // Update the selected hospital
    const updatedSelectedHospital = updatedHospitals.find(h => h.id === selectedHospital.id);
    setSelectedHospital(updatedSelectedHospital);
  };

  const handleDeleteHospital = (hospitalId) => {
    const updatedHospitals = hospitals.filter(hospital => hospital.id !== hospitalId);
    setHospitals(updatedHospitals);
    if (selectedHospital && selectedHospital.id === hospitalId) {
      setSelectedHospital(null);
    }
  };

  const handleDeleteService = (serviceId) => {
    if (!selectedHospital) return;

    const updatedHospitals = hospitals.map(hospital => {
      if (hospital.id === selectedHospital.id) {
        return {
          ...hospital,
          services: hospital.services.filter(service => service.id !== serviceId)
        };
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    
    // Update the selected hospital
    const updatedSelectedHospital = updatedHospitals.find(h => h.id === selectedHospital.id);
    setSelectedHospital(updatedSelectedHospital);
  };

  const handleUpdateQueue = (serviceId, change) => {
    if (!selectedHospital) return;

    const updatedHospitals = hospitals.map(hospital => {
      if (hospital.id === selectedHospital.id) {
        return {
          ...hospital,
          services: hospital.services.map(service => {
            if (service.id === serviceId) {
              const newQueueCount = Math.max(0, service.queueCount + change);
              const newWaitTime = Math.max(0, Math.round(newQueueCount * (service.waitTime / service.queueCount || 5)));
              return {
                ...service,
                queueCount: newQueueCount,
                waitTime: newWaitTime || 0
              };
            }
            return service;
          })
        };
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    
    // Update the selected hospital
    const updatedSelectedHospital = updatedHospitals.find(h => h.id === selectedHospital.id);
    setSelectedHospital(updatedSelectedHospital);
  };

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard-page">
      <Header />
      
      <main className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">Manage hospitals and services</p>
        </div>
        
        <div className="admin-dashboard-tabs">
          <button 
            className={`admin-tab ${activeTab === 'hospitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('hospitals')}
          >
            Hospitals
          </button>
          <button 
            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('services');
              if (!selectedHospital && hospitals.length > 0) {
                setSelectedHospital(hospitals[0]);
              }
            }}
          >
            Services & Queues
          </button>
        </div>
        
        {activeTab === 'hospitals' && (
          <div className="hospitals-section">
            <div className="hospitals-header">
              <div className="search-container">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search hospitals..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <button 
                className="add-hospital-button"
                onClick={() => setShowAddHospitalForm(true)}
              >
                <Plus size={18} />
                Add Hospital
              </button>
            </div>
            
            {showAddHospitalForm && (
              <div className="form-overlay">
                <div className="form-container">
                  <h2 className="form-title">Add New Hospital</h2>
                  <form onSubmit={handleAddHospital}>
                    <div className="form-group">
                      <label htmlFor="hospitalName">Hospital Name</label>
                      <input 
                        type="text" 
                        id="hospitalName" 
                        value={newHospital.name}
                        onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="hospitalAddress">Address</label>
                      <input 
                        type="text" 
                        id="hospitalAddress" 
                        value={newHospital.address}
                        onChange={(e) => setNewHospital({...newHospital, address: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={() => setShowAddHospitalForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Add Hospital
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            <div className="hospitals-grid">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
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
                    <div className="hospital-details">
                      <h3 className="hospital-name">{hospital.name}</h3>
                      <p className="hospital-address">{hospital.address}</p>
                      <p className="hospital-services-count">
                        {hospital.services.length} Services Available
                      </p>
                    </div>
                    <div className="hospital-actions">
                      <button 
                        className="edit-button"
                        onClick={() => {
                          setSelectedHospital(hospital);
                          setActiveTab('services');
                        }}
                      >
                        <Edit size={16} />
                        Manage Services
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteHospital(hospital.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No hospitals found. Add a new hospital to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="services-section">
            <div className="services-header">
              <div className="hospital-selector">
                <label htmlFor="hospitalSelect">Select Hospital:</label>
                <select 
                  id="hospitalSelect"
                  value={selectedHospital ? selectedHospital.id : ''}
                  onChange={(e) => {
                    const hospital = hospitals.find(h => h.id === Number(e.target.value));
                    setSelectedHospital(hospital);
                  }}
                >
                  {hospitals.map(hospital => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedHospital && (
                <button 
                  className="add-service-button"
                  onClick={() => setShowAddServiceForm(true)}
                >
                  <Plus size={18} />
                  Add Service
                </button>
              )}
            </div>
            
            {showAddServiceForm && selectedHospital && (
              <div className="form-overlay">
                <div className="form-container">
                  <h2 className="form-title">Add New Service</h2>
                  <h3 className="form-subtitle">For {selectedHospital.name}</h3>
                  <form onSubmit={handleAddService}>
                    <div className="form-group">
                      <label htmlFor="serviceName">Service Name</label>
                      <input 
                        type="text" 
                        id="serviceName" 
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="servicePrice">Price (₹)</label>
                      <input 
                        type="number" 
                        id="servicePrice" 
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="queueCount">Initial Queue Count</label>
                      <input 
                        type="number" 
                        id="queueCount" 
                        value={newService.queueCount}
                        onChange={(e) => setNewService({...newService, queueCount: e.target.value})}
                        min="0"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="waitTime">Initial Wait Time (minutes)</label>
                      <input 
                        type="number" 
                        id="waitTime" 
                        value={newService.waitTime}
                        onChange={(e) => setNewService({...newService, waitTime: e.target.value})}
                        min="0"
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="cancel-button" onClick={() => setShowAddServiceForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Add Service
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {selectedHospital ? (
              <div className="services-content">
                <div className="selected-hospital-info">
                  <h2 className="selected-hospital-name">{selectedHospital.name}</h2>
                  <p className="selected-hospital-address">{selectedHospital.address}</p>
                </div>
                
                {selectedHospital.services.length > 0 ? (
                  <div className="services-table-container">
                    <table className="services-table">
                      <thead>
                        <tr>
                          <th>Service Name</th>
                          <th>Price (₹)</th>
                          <th>Queue</th>
                          <th>Wait Time</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedHospital.services.map(service => (
                          <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>₹{service.price}</td>
                            <td>
                              <div className="queue-control">
                                <button 
                                  className="queue-button decrease"
                                  onClick={() => handleUpdateQueue(service.id, -1)}
                                  disabled={service.queueCount <= 0}
                                >
                                  -
                                </button>
                                <span className="queue-count">
                                  <Users size={14} className="queue-icon" />
                                  {service.queueCount}
                                </span>
                                <button 
                                  className="queue-button increase"
                                  onClick={() => handleUpdateQueue(service.id, 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>
                              <span className="wait-time">
                                <Clock size={14} className="wait-icon" />
                                {service.waitTime} mins
                              </span>
                            </td>
                            <td>
                              <button 
                                className="delete-service-button"
                                onClick={() => handleDeleteService(service.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-services">
                    <p>No services available for this hospital. Add a service to get started.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-hospital-selected">
                <p>Please select a hospital to manage its services.</p>
                {hospitals.length === 0 && (
                  <p>No hospitals available. Please add a hospital first.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default AdminDashboardPage;