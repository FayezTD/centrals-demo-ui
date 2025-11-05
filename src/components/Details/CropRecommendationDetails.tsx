// import React from 'react';
// import { Row, Col, Card } from 'react-bootstrap';

// const CropRecommendationDetails: React.FC = () => {
//   return (
//     <div className="specific-demo-details">
//       <h5 className="mb-4">Smart Crop Recommendation System Overview</h5>
      
//       <p className="lead">
//         Empower farmers with data-driven crop selection using our AI-powered recommendation 
//         engine. Analyze soil conditions, weather patterns, and historical data to maximize 
//         yield and profitability.
//       </p>

//       <Row className="mt-4">
//         <Col md={6}>
//           <Card className="info-card mb-3">
//             <Card.Body>
//               <h6><i className="fas fa-seedling me-2 text-success"></i>Agricultural Intelligence</h6>
//               <ul>
//                 <li>Soil nutrient analysis</li>
//                 <li>pH and moisture level optimization</li>
//                 <li>Climate pattern prediction</li>
//                 <li>Crop rotation recommendations</li>
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="info-card mb-3">
//             <Card.Body>
//               <h6><i className="fas fa-chart-line me-2 text-success"></i>Predictive Analytics</h6>
//               <ul>
//                 <li>Yield forecasting models</li>
//                 <li>Market price predictions</li>
//                 <li>Risk assessment algorithms</li>
//                 <li>Profitability analysis</li>
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h6 className="mt-4 mb-3">Farmer Impact</h6>
//       <ul>
//         <li><strong>Productivity:</strong> 25% average increase in crop yield</li>
//         <li><strong>Resource Optimization:</strong> 30% reduction in water and fertilizer usage</li>
//         <li><strong>Income:</strong> 20-35% improvement in farmer income</li>
//         <li><strong>Sustainability:</strong> Reduced environmental impact through precision agriculture</li>
//       </ul>

//       <h6 className="mt-4 mb-3">Data Sources & Models</h6>
//       <p>
//         Our system combines multiple data sources including satellite imagery, IoT sensor 
//         networks, government agricultural databases, and weather APIs. Machine learning models 
//         trained on decades of agricultural data provide region-specific recommendations with 
//         over 90% accuracy.
//       </p>
//     </div>
//   );
// };

// export default CropRecommendationDetails;


import React from 'react';
import { Row, Col, Card, Badge, Table } from 'react-bootstrap';

const CropRecommendationDetails: React.FC = () => {
  return (
    <div className="enhanced-demo-details">
      {/* Overview Section */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-seedling me-2 text-success"></i>
            Overview
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <p className="lead-text">
          This solution leverages <strong>AI and machine learning</strong> to recommend the most suitable 
          crop for a given field based on soil nutrients and climate conditions. By analyzing soil parameters 
          (N, P, K, pH) along with weather factors (temperature, humidity, rainfall), the system provides 
          <strong> data-driven crop suggestions</strong> that help farmers adopt <strong>precision agriculture</strong> practices.
        </p>
        
        <div className="highlight-box">
          <i className="fas fa-chart-line me-2"></i>
          Our prototype, developed using a <strong>Random Forest model (achieving ~99% accuracy on open datasets)</strong>, 
          allows users to input soil and climate parameters and instantly receive the best crop recommendation. 
          This ensures <strong>higher yields, optimized resource use, and reduced environmental impact</strong>.
        </div>
      </section>

      {/* Business Problem Section */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
            Business Problem & Challenges
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h6>Resource Wastage</h6>
              <p>Uniform farming practices waste water, fertilizers, and pesticides</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <h6>Lack of Guidance</h6>
              <p>Farmers lack real-time, data-backed guidance on which crops to cultivate</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h6>Environmental Impact</h6>
              <p>Overuse of chemicals leads to environmental degradation</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="challenge-card">
              <div className="challenge-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h6>Inconsistent Yields</h6>
              <p>Varying soil fertility and climate conditions cause yield inconsistency</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Solution Overview Section */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-lightbulb me-2 text-warning"></i>
            Solution Overview
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          <Col lg={12}>
            <Card className="solution-card mb-4">
              <Card.Body>
                <ul className="solution-features">
                  <li>
                    <i className="fas fa-brain text-success me-2"></i>
                    An <strong>AI-powered recommendation engine</strong> trained on soil and climate datasets
                  </li>
                  <li>
                    <i className="fas fa-keyboard text-success me-2"></i>
                    Accepts user input (NPK, pH, temperature, humidity, rainfall)
                  </li>
                  <li>
                    <i className="fas fa-magic text-success me-2"></i>
                    Predicts the <strong>best crop choice</strong> with high accuracy using Random Forest
                  </li>
                  <li>
                    <i className="fas fa-cogs text-success me-2"></i>
                    Enables <strong>Variable Rate Application (VRA)</strong>: applying inputs only where needed
                  </li>
                  <li>
                    <i className="fas fa-mobile-alt text-success me-2"></i>
                    Easy-to-use interface for farmers, accessible via web or mobile
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* System Architecture Diagram */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-project-diagram me-2 text-info"></i>
            High-Level Solution Flow
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Card className="diagram-card">
          <Card.Body className="text-center p-4">
            <div className="flow-diagram">
              <div className="flow-step">
                <div className="step-circle">1</div>
                <div className="step-content">
                  <i className="fas fa-database fa-2x text-primary mb-2"></i>
                  <h6>Data Collection</h6>
                  <p>Soil & Climate Parameters</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-circle">2</div>
                <div className="step-content">
                  <i className="fas fa-brain fa-2x text-success mb-2"></i>
                  <h6>AI Processing</h6>
                  <p>Random Forest Model</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-circle">3</div>
                <div className="step-content">
                  <i className="fas fa-chart-line fa-2x text-warning mb-2"></i>
                  <h6>Prediction</h6>
                  <p>Best Crop Recommendation</p>
                </div>
              </div>
              
              <div className="flow-arrow">→</div>
              
              <div className="flow-step">
                <div className="step-circle">4</div>
                <div className="step-content">
                  <i className="fas fa-leaf fa-2x text-success mb-2"></i>
                  <h6>Action</h6>
                  <p>Precision Agriculture</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-muted">
              <small>The system processes input data through our trained ML model to provide accurate crop recommendations</small>
            </div>
          </Card.Body>
        </Card>
      </section>

      {/* Dataset & Technologies */}
      <section className="detail-section mb-5">
        <Row>
          <Col lg={6} className="mb-4">
            <div className="section-header">
              <h5 className="section-subtitle">
                <i className="fas fa-database me-2 text-primary"></i>
                Dataset Sources
              </h5>
            </div>
            <Card className="info-card h-100">
              <Card.Body>
                <ul className="dataset-list">
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Soil & Climate Datasets</strong> (Open Source, Kaggle)
                    <p className="ms-4 mb-2 text-muted small">Containing crop labels, nutrient levels, and weather parameters</p>
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>ISRIC SoilGrids, FAO Data</strong>
                    <p className="ms-4 mb-2 text-muted small">Global soil characteristics</p>
                  </li>
                  <li>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <strong>Weather APIs</strong>
                    <p className="ms-4 mb-0 text-muted small">OpenWeatherMap, NASA POWER, IMD - Temperature, rainfall, humidity</p>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-4">
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
                      <td><strong>Programming</strong></td>
                      <td><Badge bg="primary">Python</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Libraries</strong></td>
                      <td>
                        <Badge bg="info" className="me-1 mb-1">NumPy</Badge>
                        <Badge bg="info" className="me-1 mb-1">Pandas</Badge>
                        <Badge bg="info" className="me-1 mb-1">Scikit-learn</Badge>
                        <Badge bg="info" className="me-1 mb-1">Matplotlib</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>ML Model</strong></td>
                      <td><Badge bg="success">Random Forest (~99% accuracy)</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Interface</strong></td>
                      <td><Badge bg="warning" text="dark">React + TypeScript</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Deployment</strong></td>
                      <td><Badge bg="secondary">Docker, Cloud platforms</Badge></td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Use Cases */}
      <section className="detail-section mb-5">
        <div className="section-header">
          <h4 className="section-title">
            <i className="fas fa-users me-2 text-info"></i>
            Use Cases
          </h4>
          <div className="title-underline"></div>
        </div>
        
        <Row>
          <Col lg={6} className="mb-3">
            <div className="usecase-card">
              <div className="usecase-number">01</div>
              <h6>Individual Farmers</h6>
              <p>Seeking data-driven crop selection for their fields</p>
            </div>
          </Col>
          <Col lg={6} className="mb-3">
            <div className="usecase-card">
              <div className="usecase-number">02</div>
              <h6>Agricultural Advisory Platforms</h6>
              <p>Recommending crops to farming communities</p>
            </div>
          </Col>
          <Col lg={6} className="mb-3">
            <div className="usecase-card">
              <div className="usecase-number">03</div>
              <h6>Government/NGO Initiatives</h6>
              <p>Promoting sustainable farming practices</p>
            </div>
          </Col>
          <Col lg={6} className="mb-3">
            <div className="usecase-card">
              <div className="usecase-number">04</div>
              <h6>Agri-tech Companies</h6>
              <p>Integrating precision agriculture solutions</p>
            </div>
          </Col>
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
        
        <Row className="value-props">
          <Col md={4} className="mb-3">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h6>Improved Yield</h6>
              <p>Selecting crops aligned with soil & climate ensures higher productivity</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-recycle"></i>
              </div>
              <h6>Resource Optimization</h6>
              <p>Reduces fertilizer, water, and pesticide wastage</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h6>Cost Efficiency</h6>
              <p>Helps farmers maximize returns with minimal inputs</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h6>Sustainability</h6>
              <p>Protects the environment by reducing chemical overuse</p>
            </div>
          </Col>
          <Col md={6} className="mb-3">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-expand-arrows-alt"></i>
              </div>
              <h6>Scalability</h6>
              <p>Can be deployed across diverse geographies and crop varieties</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Integration */}
      <section className="detail-section mb-4">
        <div className="section-header">
          <h5 className="section-subtitle">
            <i className="fas fa-plug me-2 text-success"></i>
            Compatibility with 3rd Party Systems
          </h5>
        </div>
        
        <Card className="integration-card">
          <Card.Body>
            <Row>
              <Col md={4} className="text-center mb-3">
                <i className="fas fa-server fa-3x text-primary mb-2"></i>
                <p className="small mb-0">Integrates with existing farm management systems</p>
              </Col>
              <Col md={4} className="text-center mb-3">
                <i className="fas fa-cloud fa-3x text-info mb-2"></i>
                <p className="small mb-0">Compatible with API-based data feeds</p>
              </Col>
              <Col md={4} className="text-center mb-3">
                <i className="fas fa-wifi fa-3x text-success mb-2"></i>
                <p className="small mb-0">Extends to IoT sensors for automated data collection</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default CropRecommendationDetails;
