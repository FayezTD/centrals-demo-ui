import React from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { APP_CONFIG } from '../../utils/constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" className="dashboard-header shadow-sm">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src={APP_CONFIG.LOGO_URL}
            alt={APP_CONFIG.COMPANY_NAME}
            height="45"
            className="me-3"
          />
          <div>
            <h5 className="mb-0 fw-bold">{APP_CONFIG.APP_NAME}</h5>
            <small className="text-muted">Powered by {APP_CONFIG.COMPANY_NAME}</small>
          </div>
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <div className="user-info me-3">
            <i className="fas fa-user-circle fa-lg text-success me-2"></i>
            <span className="fw-medium">{user?.name || user?.email}</span>
          </div>
          
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-success" id="user-dropdown">
              <i className="fas fa-cog"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item disabled>
                <strong>{user?.email}</strong>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#profile">
                <i className="fas fa-user me-2"></i> Profile
              </Dropdown.Item>
              <Dropdown.Item href="#settings">
                <i className="fas fa-cog me-2"></i> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
