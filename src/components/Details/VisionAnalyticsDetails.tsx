import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const VisionAnalyticsDetails: React.FC = () => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">Smart Vision Analytics Platform Overview</h5>
      
      <p className="lead">
        Transform visual data into actionable insights with our enterprise-grade computer vision 
        platform. Powered by deep learning, our solution delivers real-time object detection, 
        classification, and analytics at scale.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-eye me-2 text-success"></i>Vision Capabilities</h6>
              <ul>
                <li>Multi-object detection and tracking</li>
                <li>Defect identification with 99%+ accuracy</li>
                <li>Automated counting and measurement</li>
                <li>Quality assessment automation</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-tachometer-alt me-2 text-success"></i>Performance Metrics</h6>
              <ul>
                <li>Real-time processing at 60 FPS</li>
                <li>99.8% detection accuracy</li>
                <li>Sub-100ms latency</li>
                <li>Handles 4K video streams</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Industry Applications</h6>
      <ul>
        <li><strong>Manufacturing:</strong> Automated quality control and defect detection</li>
        <li><strong>Retail:</strong> Customer analytics and inventory management</li>
        <li><strong>Security:</strong> Surveillance and anomaly detection</li>
        <li><strong>Healthcare:</strong> Medical image analysis and diagnostics</li>
      </ul>

      <h6 className="mt-4 mb-3">Technical Architecture</h6>
      <p>
        Built on state-of-the-art CNN architectures including YOLO, ResNet, and EfficientNet. 
        Supports edge deployment with TensorRT optimization, cloud processing with auto-scaling, 
        and hybrid architectures. Includes comprehensive REST APIs and SDKs for seamless integration.
      </p>
    </div>
  );
};

export default VisionAnalyticsDetails;
