import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const BagDetectionDetails: React.FC = () => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">Bag Detection System Overview</h5>
      
      <p className="lead">
        Our advanced Bag Detection System utilizes cutting-edge computer vision and deep learning 
        techniques to automate product detection, counting, and quality control in manufacturing 
        and logistics environments.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-brain me-2 text-success"></i>AI Model Performance</h6>
              <ul>
                <li>99.5% detection accuracy</li>
                <li>Real-time processing at 30 FPS</li>
                <li>Handles multiple object classes</li>
                <li>Robust to lighting variations</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-cogs me-2 text-success"></i>Technical Capabilities</h6>
              <ul>
                <li>YOLO v8 detection algorithm</li>
                <li>Custom trained models</li>
                <li>Edge deployment support</li>
                <li>API integration ready</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Industry Applications</h6>
      <ul>
        <li><strong>Manufacturing:</strong> Automated quality inspection on production lines</li>
        <li><strong>Logistics:</strong> Package counting and sorting in warehouses</li>
        <li><strong>Retail:</strong> Inventory management and stock tracking</li>
        <li><strong>Security:</strong> Baggage screening and monitoring systems</li>
      </ul>

      <h6 className="mt-4 mb-3">Key Differentiators</h6>
      <p>
        Unlike traditional vision systems, our solution combines multiple AI models to achieve 
        superior accuracy even in challenging conditions such as occlusion, varying lighting, 
        and different bag orientations. The system learns continuously and improves over time.
      </p>
    </div>
  );
};

export default BagDetectionDetails;
