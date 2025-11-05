import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Demo } from '../../types';

interface DemoCardProps {
  demo: Demo;
}

const DemoCard: React.FC<DemoCardProps> = ({ demo }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/demo/${demo.id}`);
  };

  return (
    <Card className="demo-card h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="demo-icon mb-3">
          <span className="icon-emoji">{demo.icon}</span>
        </div>
        
        <Card.Title className="demo-title mb-2">{demo.title}</Card.Title>
        
        <div className="mb-2">
          <Badge bg="light" text="dark" className="category-badge">
            {demo.category}
          </Badge>
        </div>
        
        <Card.Text className="demo-description mb-3 flex-grow-1">
          {demo.description}
        </Card.Text>
        
        <div className="demo-technologies mb-3">
          <div className="tech-label mb-2">
            <i className="fas fa-code me-2"></i>
            <strong>Technologies:</strong>
          </div>
          <div className="tech-stack">
            {demo.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} bg="success" className="tech-badge me-1 mb-1">
                {tech}
              </Badge>
            ))}
            {demo.technologies.length > 3 && (
              <Badge bg="secondary" className="tech-badge me-1 mb-1">
                +{demo.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="demo-features mb-3">
          <div className="features-label mb-2">
            <i className="fas fa-check-circle me-2"></i>
            <strong>Key Features:</strong>
          </div>
          <ul className="features-list">
            {demo.features.slice(0, 2).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <Button 
          variant="success" 
          className="demo-details-btn mt-auto"
          onClick={handleViewDetails}
        >
          <i className="fas fa-info-circle me-2"></i>
          View Demo Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DemoCard;
