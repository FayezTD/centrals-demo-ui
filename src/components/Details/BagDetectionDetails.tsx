import React from 'react';
import { Row, Col, Card, Badge, Table } from 'react-bootstrap';

const BagDetectionDetails: React.FC = () => {
  return (
    <div className="enhanced-demo-details">
      {/* Overview */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-box me-2 text-primary"></i>
            Overview
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <p className="lead-text">
          The <strong>Automated Object Detection & Counting System</strong> is an AI-powered solution designed to bring 
          accuracy and transparency to logistics and supply chain operations. Using advanced computer vision models, it can 
          detect and count products such as bags, sacks, and boxes from images or video feeds captured during loading and unloading.
        </p>
        
        <div className="highlight-box">
          <i className="fas fa-chart-line me-2"></i>
          The system helps organizations <strong>verify dispatch and delivery quantities in real time</strong>, reduce manual effort, 
          and minimize financial losses due to discrepancies. With its ability to adapt to varied environments, integrate seamlessly 
          with existing logistics systems, and scale across multiple locations, it enables enterprises to achieve 
          <strong> greater efficiency, reliability, and operational control</strong>.
        </div>
      </section>

      {/* Business Challenges */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
            Business Problems & Challenges
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h6>Quantity Mismatch</h6>
              <p>Mismatch in quantity dispatched vs. received, leading to revenue leakage</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-user-clock"></i>
              </div>
              <h6>Manual Counting Issues</h6>
              <p>Slow, error-prone, and labor-intensive, especially with high SKU diversity</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-eye-slash"></i>
              </div>
              <h6>Lack of Visibility</h6>
              <p>No real-time visibility and audit trail to identify when discrepancies occur</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h6>Operational Inefficiency</h6>
              <p>Inefficiencies across multiple logistics partners increase costs</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Solution Overview */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-lightbulb me-2 text-success"></i>
            Solution Overview
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Card className="solution-card mb-4">
          <Card.Body>
            <p className="mb-3">
              The system leverages <strong>computer vision and AI-driven models</strong> to automatically detect, 
              count, and verify products during loading and unloading.
            </p>
            <ul className="solution-features">
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Accurate, automated product counts</strong> across diverse SKUs
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Audit trail with visual evidence</strong> for complete operational transparency
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Scalable deployment</strong> across warehouses and distribution centers
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Seamless integration</strong> with enterprise systems via APIs
              </li>
            </ul>
          </Card.Body>
        </Card>
      </section>

      {/* Key Capabilities */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-star me-2 text-warning"></i>
            Key Capabilities
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          {[
            { icon: 'fa-boxes', title: '200+ SKU Types', desc: 'Bags, sacks, cartons, boxes and more' },
            { icon: 'fa-video', title: 'Multiple Inputs', desc: 'Works with images and video streams' },
            { icon: 'fa-check-double', title: 'Real-time Verification', desc: 'Instant quantity verification' },
            { icon: 'fa-file-alt', title: 'Audit-Ready Logs', desc: 'Complete visual evidence trail' },
            { icon: 'fa-expand-arrows-alt', title: 'Scalable', desc: 'Multiple distribution centers' },
            { icon: 'fa-robot', title: 'Minimal Intervention', desc: 'Self-learning capability' },
          ].map((capability, idx) => (
            <Col key={idx} md={4} className="mb-3">
              <div className="capability-card">
                <i className={`fas ${capability.icon} fa-2x text-primary mb-2`}></i>
                <h6>{capability.title}</h6>
                <p>{capability.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Tech Stack */}
      <section className="detail-section mb-5">
        <Row>
          <Col lg={6}>
            <div className="section-header">
              <h5 className="section-subtitle">
                <i className="fas fa-code me-2 text-danger"></i>
                Tools & Technologies
              </h5>
            </div>
            <Card className="info-card h-100">
              <Card.Body>
                <Table bordered hover size="sm" className="tech-table mb-0">
                  <tbody>
                    <tr>
                      <td><strong>AI Models</strong></td>
                      <td><Badge bg="primary">YOLOv8</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Backend</strong></td>
                      <td>
                        <Badge bg="success" className="me-1">FastAPI</Badge>
                        <Badge bg="success">Flask</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Frontend</strong></td>
                      <td><Badge bg="info">React + TypeScript</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Database</strong></td>
                      <td><Badge bg="secondary">PostgreSQL</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Deployment</strong></td>
                      <td><Badge bg="warning" text="dark">Cloud/On-Premise</Badge></td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6}>
            <div className="section-header">
              <h5 className="section-subtitle">
                <i className="fas fa-database me-2 text-primary"></i>
                Data Sources
              </h5>
            </div>
            <Card className="info-card h-100">
              <Card.Body>
                <ul className="dataset-list">
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Roboflow datasets</strong> for bags, sacks, and boxes
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Custom enterprise datasets</strong> from loading/unloading operations
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Extensible</strong> to new SKU formats
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Use Cases */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-briefcase me-2 text-info"></i>
            Use Cases
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          {[
            { num: '01', title: 'Logistics & Warehousing', desc: 'Verify dispatched vs. received quantities' },
            { num: '02', title: 'Manufacturing Plants', desc: 'Automate inventory counts at loading bays' },
            { num: '03', title: 'Retail Distribution', desc: 'Ensure delivery accuracy at retail hubs' },
            { num: '04', title: '3PL Providers', desc: 'Provide transparent service with verifiable counts' },
            { num: '05', title: 'Loss Prevention', desc: 'Investigate pilferage with visual audit trails' },
          ].map((usecase, idx) => (
            <Col key={idx} lg={6} className="mb-3">
              <div className="usecase-card">
                <div className="usecase-number">{usecase.num}</div>
                <h6>{usecase.title}</h6>
                <p>{usecase.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Value Proposition */}
      <section className="detail-section mb-4">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-trophy me-2 text-warning"></i>
            Value Proposition
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          {[
            { icon: 'fa-crosshairs', title: '95%+ Accuracy', desc: 'High detection accuracy with standard input' },
            { icon: 'fa-shield-alt', title: 'Loss Prevention', desc: 'Minimize untraceable inventory discrepancies' },
            { icon: 'fa-tachometer-alt', title: '80-90% Efficiency', desc: 'Reduce manual counting efforts' },
            { icon: 'fa-expand-arrows-alt', title: 'Scalability', desc: 'Deployable across multiple sites' },
            { icon: 'fa-eye', title: 'Transparency', desc: 'Visual audit trail enhances accountability' },
          ].map((value, idx) => (
            <Col key={idx} md={4} lg className="mb-3">
              <div className="value-card">
                <div className="value-icon">
                  <i className={`fas ${value.icon}`}></i>
                </div>
                <h6>{value.title}</h6>
                <p>{value.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default BagDetectionDetails