import React from 'react';
import { Row, Col, Card, Badge, Table } from 'react-bootstrap';

const VegetationIndexDetails: React.FC = () => {
  return (
    <div className="enhanced-demo-details">
      {/* Overview */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-satellite me-2 text-success"></i>
            Overview
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <p className="lead-text">
          The <strong>Crop Management System using Remote Sensing and AI</strong> leverages satellite imagery and 
          advanced machine learning algorithms to monitor crop health, detect stress factors, and provide actionable 
          recommendations for precision farming.
        </p>
        
        <div className="highlight-box">
          <i className="fas fa-leaf me-2"></i>
          By combining <strong>multispectral images (RGB, NIR, SWIR)</strong> with <strong>AI-driven analysis</strong>, 
          the solution generates vegetation indices such as <strong>NDVI, EVI, and NDWI</strong>, enabling farmers and 
          agronomists to assess crop conditions across large farmlands without manual intervention.
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
                <i className="fas fa-user-clock"></i>
              </div>
              <h6>Labor-Intensive Monitoring</h6>
              <p>Manual monitoring is time-consuming and limits scalability across large farmlands</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-hourglass-half"></i>
              </div>
              <h6>Delayed Detection</h6>
              <p>Stress conditions detected too late, leading to irreversible crop damage</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h6>Inefficient Resource Use</h6>
              <p>Without precise data, water and fertilizers are applied uniformly, causing waste</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h6>Low Yield Predictability</h6>
              <p>Lack of data-driven insights makes yield forecasting unreliable</p>
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
              The system uses <strong>Sentinel-2 satellite imagery</strong> combined with AI-powered vegetation 
              index calculations to provide real-time crop health insights.
            </p>
            <ul className="solution-features">
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Automated satellite image processing</strong> for RGB, NIR, and SWIR bands
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>6+ vegetation indices</strong>: NDVI, NDMI, NDWI, MSAVI, CWSI, EVI
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Visual heatmaps and reports</strong> for easy interpretation
              </li>
              <li>
                <i className="fas fa-check-circle text-success me-2"></i>
                <strong>Actionable recommendations</strong> for irrigation, fertilization, and harvesting
              </li>
            </ul>
          </Card.Body>
        </Card>
      </section>

      {/* Vegetation Indices Explained */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-chart-area me-2 text-primary"></i>
            Vegetation Indices Explained
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="success" className="me-2">NDVI</Badge>
                  <h6 className="mb-0">Normalized Difference Vegetation Index</h6>
                </div>
                <p className="small mb-0">
                  Measures overall vegetation health and biomass. Higher values indicate healthier, 
                  denser vegetation. Range: -1 to +1
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="info" className="me-2">NDMI</Badge>
                  <h6 className="mb-0">Normalized Difference Moisture Index</h6>
                </div>
                <p className="small mb-0">
                  Detects plant water stress. Lower values indicate drought conditions. 
                  Critical for irrigation planning.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="primary" className="me-2">NDWI</Badge>
                  <h6 className="mb-0">Normalized Difference Water Index</h6>
                </div>
                <p className="small mb-0">
                  Monitors vegetation water content and identifies water bodies. 
                  Essential for flood assessment.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="warning" text="dark" className="me-2">MSAVI</Badge>
                  <h6 className="mb-0">Modified Soil-Adjusted Vegetation Index</h6>
                </div>
                <p className="small mb-0">
                  Reduces soil brightness influence in sparse vegetation areas. 
                  Better for early-stage crop monitoring.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="danger" className="me-2">CWSI</Badge>
                  <h6 className="mb-0">Crop Water Stress Index</h6>
                </div>
                <p className="small mb-0">
                  Quantifies crop water stress levels. High values indicate severe stress 
                  requiring immediate irrigation.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-3">
            <Card className="index-card">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="secondary" className="me-2">EVI</Badge>
                  <h6 className="mb-0">Enhanced Vegetation Index</h6>
                </div>
                <p className="small mb-0">
                  Optimized for high-biomass regions, minimizes atmospheric and canopy 
                  background influences.
                </p>
              </Card.Body>
            </Card>
          </Col>
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
                      <td><strong>Satellite Data</strong></td>
                      <td><Badge bg="primary">Sentinel-2</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Image Processing</strong></td>
                      <td>
                        <Badge bg="success" className="me-1">Rasterio</Badge>
                        <Badge bg="success">NumPy</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Backend</strong></td>
                      <td>
                        <Badge bg="success" className="me-1">Flask</Badge>
                        <Badge bg="success">FastAPI</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Frontend</strong></td>
                      <td><Badge bg="info">React + TypeScript</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Visualization</strong></td>
                      <td>
                        <Badge bg="warning" text="dark" className="me-1">Matplotlib</Badge>
                        <Badge bg="warning" text="dark">Seaborn</Badge>
                      </td>
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
                    <strong>Sentinel-2 imagery</strong> (10m-20m resolution)
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>RGB, NIR, SWIR bands</strong> for multispectral analysis
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Ground truth data</strong> for validation
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Weather data integration</strong> for enhanced insights
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
            { num: '01', title: 'Precision Agriculture', desc: 'Optimize fertilizer and water application based on crop health zones' },
            { num: '02', title: 'Drought Monitoring', desc: 'Early detection of water stress for timely irrigation' },
            { num: '03', title: 'Yield Prediction', desc: 'Forecast crop yields using historical vegetation trends' },
            { num: '04', title: 'Disease Detection', desc: 'Identify anomalies indicating pest or disease outbreaks' },
            { num: '05', title: 'Insurance Claims', desc: 'Provide objective evidence for crop damage assessments' },
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
            { icon: 'fa-clock', title: '90% Faster', desc: 'Automated analysis vs. manual field surveys' },
            { icon: 'fa-tint', title: '30% Water Savings', desc: 'Precision irrigation based on stress zones' },
            { icon: 'fa-chart-line', title: '15-20% Yield Increase', desc: 'Data-driven farming decisions' },
            { icon: 'fa-dollar-sign', title: 'Cost Reduction', desc: 'Optimize resource utilization' },
            { icon: 'fa-globe', title: 'Scalable', desc: 'Monitor thousands of acres remotely' },
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

export default VegetationIndexDetails;