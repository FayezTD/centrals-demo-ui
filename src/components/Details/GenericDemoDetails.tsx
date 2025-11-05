import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Demo } from '../../types';

interface GenericDemoDetailsProps {
  demo: Demo;
}

const GenericDemoDetails: React.FC<GenericDemoDetailsProps> = ({ demo }) => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">{demo.title} - Detailed Overview</h5>
      
      <p className="lead">{demo.description}</p>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-check-double me-2 text-success"></i>Core Capabilities</h6>
              <Row>
                {demo.features.map((feature, index) => (
                  <Col key={index} md={6} className="mb-2">
                    <div className="feature-item">
                      <i className="fas fa-angle-right text-success me-2"></i>
                      {feature}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Technology Stack</h6>
      <p>
        This solution is built using cutting-edge technologies: {demo.technologies.join(', ')}. 
        The architecture is designed for scalability, reliability, and high performance.
      </p>

      <h6 className="mt-4 mb-3">Business Value</h6>
      <ul>
        <li>Accelerate digital transformation initiatives</li>
        <li>Reduce operational costs through automation</li>
        <li>Improve decision-making with data-driven insights</li>
        <li>Enhance customer experience and satisfaction</li>
        <li>Gain competitive advantage through AI adoption</li>
      </ul>

      <h6 className="mt-4 mb-3">Implementation</h6>
      <p>
        Our team provides end-to-end support from proof of concept to production deployment. 
        We offer customization services to adapt the solution to your specific business requirements, 
        integrate with existing systems, and provide ongoing maintenance and support.
      </p>
    </div>
  );
};

export default GenericDemoDetails;
