import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const LoyaltyAssistantDetails: React.FC = () => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">Intelligent Loyalty Assistant Overview</h5>
      
      <p className="lead">
        Transform customer engagement with our AI-powered conversational assistant designed 
        specifically for loyalty programs. Leverage natural language processing to provide 
        personalized, context-aware interactions at scale.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-comment-dots me-2 text-success"></i>NLP Capabilities</h6>
              <ul>
                <li>Multi-language support (15+ languages)</li>
                <li>Sentiment analysis in real-time</li>
                <li>Intent recognition with 95% accuracy</li>
                <li>Contextual conversation management</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-users me-2 text-success"></i>Personalization Features</h6>
              <ul>
                <li>Customer behavior analysis</li>
                <li>Personalized recommendations</li>
                <li>Dynamic reward suggestions</li>
                <li>Predictive engagement scoring</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Business Impact</h6>
      <ul>
        <li><strong>Customer Retention:</strong> Increase retention rates by 35% through personalized engagement</li>
        <li><strong>Support Automation:</strong> Handle 80% of customer queries automatically</li>
        <li><strong>Engagement:</strong> 3x increase in loyalty program participation</li>
        <li><strong>Revenue:</strong> Drive 20% uplift in customer lifetime value</li>
      </ul>

      <h6 className="mt-4 mb-3">Integration Ecosystem</h6>
      <p>
        Seamlessly integrates with popular CRM platforms (Salesforce, HubSpot), messaging 
        channels (WhatsApp, SMS, Email), and loyalty management systems. Deploy across web, 
        mobile, and social media platforms with a unified conversation experience.
      </p>
    </div>
  );
};

export default LoyaltyAssistantDetails;
