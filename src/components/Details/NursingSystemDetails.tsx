import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const NursingSystemDetails: React.FC = () => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">Automated Nursing System Overview</h5>
      
      <p className="lead">
        Revolutionize healthcare delivery with our AI-powered nursing management platform. 
        Streamline workflows, enhance patient care, and reduce administrative burden through 
        intelligent automation and predictive analytics.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-heartbeat me-2 text-success"></i>Patient Care Features</h6>
              <ul>
                <li>Real-time vital signs monitoring</li>
                <li>Automated medication reminders</li>
                <li>Patient risk assessment AI</li>
                <li>Early warning system alerts</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-clipboard-check me-2 text-success"></i>Workflow Automation</h6>
              <ul>
                <li>Smart scheduling optimization</li>
                <li>Electronic health records integration</li>
                <li>Task prioritization engine</li>
                <li>Automated documentation</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Clinical Benefits</h6>
      <ul>
        <li><strong>Patient Safety:</strong> 40% reduction in medication errors</li>
        <li><strong>Efficiency:</strong> Save 2-3 hours per nurse per shift</li>
        <li><strong>Quality of Care:</strong> Improved patient satisfaction scores by 25%</li>
        <li><strong>Compliance:</strong> 100% adherence to care protocols</li>
      </ul>

      <h6 className="mt-4 mb-3">Technology & Security</h6>
      <p>
        Built with HIPAA compliance at its core, our system employs end-to-end encryption, 
        role-based access controls, and comprehensive audit trails. The platform integrates 
        with existing hospital information systems and supports both cloud and on-premise 
        deployments.
      </p>
    </div>
  );
};

export default NursingSystemDetails;
