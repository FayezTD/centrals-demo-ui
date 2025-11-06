/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Spinner, Alert, Card, Badge, Tabs, Tab } from 'react-bootstrap';
// import Header from '../Dashboard/Header';
// import { DEMOS } from '../../utils/constants';
// import { Demo } from '../../types';
// import apiService from '../../services/apiService';
// import BagDetectionDetails from './BagDetectionDetails';
// import LoyaltyAssistantDetails from './LoyaltyAssistantDetails';
// import NursingSystemDetails from './NursingSystemDetails';
// import CropRecommendationDetails from './CropRecommendationDetails';
// import VisionAnalyticsDetails from './VisionAnalyticsDetails';
// import VegetationIndexDetails from './VegetationIndexDetails';
// import GenericDemoDetails from './GenericDemoDetails';

// const DemoDetail: React.FC = () => {
//   const { demoId } = useParams<{ demoId: string }>();
//   const navigate = useNavigate();
  
//   const [demo, setDemo] = useState<Demo | null>(null);
//   const [launchUrl, setLaunchUrl] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLaunching, setIsLaunching] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadDemoDetails();
//   }, [demoId]);

//   const loadDemoDetails = async () => {
//     try {
//       setIsLoading(true);
//       setError('');

//       // Find demo from constants
//       const foundDemo = DEMOS.find((d) => d.id === demoId);
      
//       if (!foundDemo) {
//         setError('Demo not found');
//         return;
//       }

//       setDemo(foundDemo);

//       // Try to fetch additional details from API
//       try {
//         const apiDetails = await apiService.getDemoDetails(demoId!);
//         if (apiDetails.launchUrl) {
//           setLaunchUrl(apiDetails.launchUrl);
//         }
//       } catch (apiError) {
//         console.warn('Could not fetch additional details from API:', apiError);
//         // Continue with local data
//       }
//     } catch (err: any) {
//       setError(err.message || 'Failed to load demo details');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLaunchDemo = async () => {
//     if (!demo) return;

//     try {
//       setIsLaunching(true);
//       setError('');

//       let url = launchUrl;

//       // If no URL cached, fetch it
//       if (!url) {
//         const response = await apiService.getLaunchDemoUrl(demo.id);
//         url = response.launchUrl || response.url;
//       }

//       if (url) {
//         // Open in new tab
//         window.open(url, '_blank', 'noopener,noreferrer');
//       } else {
//         setError('Demo URL not available. Please contact support.');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Failed to launch demo');
//     } finally {
//       setIsLaunching(false);
//     }
//   };

//   const renderSpecificDetails = () => {
//     if (!demo) return null;

//     switch (demo.id) {
//       case 'bag-detection':
//         return <BagDetectionDetails />;
//       case 'loyalty-assistant':
//         return <LoyaltyAssistantDetails />;
//       case 'nursing-system':
//         return <NursingSystemDetails />;
//       case 'crop-recommendation':
//         return <CropRecommendationDetails />;
//       case 'vision-analytics':
//         return <VisionAnalyticsDetails />;
//       case 'vegetation-index':
//         return <VegetationIndexDetails />;
//       default:
//         return <GenericDemoDetails demo={demo} />;
//     }
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Header />
//         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
//           <Spinner animation="border" variant="success" />
//         </div>
//       </>
//     );
//   }

//   if (error && !demo) {
//     return (
//       <>
//         <Header />
//         <Container className="mt-5">
//           <Alert variant="danger">{error}</Alert>
//           <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>
//             Back to Dashboard
//           </Button>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <div className="demo-detail-page">
//       <Header />
      
//       <div className="demo-detail-hero">
//         <Container>
//           <Row className="align-items-center">
//             <Col lg={1}>
//               <div className="demo-icon-large">
//                 {demo?.icon}
//               </div>
//             </Col>
//             <Col lg={8}>
//               <h1 className="detail-title">{demo?.title}</h1>
//               <p className="detail-subtitle">{demo?.description}</p>
//               <Badge bg="light" text="dark" className="category-badge-large">
//                 {demo?.category}
//               </Badge>
//             </Col>
//             <Col lg={3} className="text-lg-end">
//               <Button
//                 variant="success"
//                 size="lg"
//                 className="launch-btn"
//                 onClick={handleLaunchDemo}
//                 disabled={isLaunching}
//               >
//                 {isLaunching ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Launching...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-rocket me-2"></i>
//                     Launch Demo
//                   </>
//                 )}
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 className="mt-2 w-100"
//                 onClick={() => navigate('/dashboard')}
//               >
//                 <i className="fas fa-arrow-left me-2"></i>
//                 Back to Dashboard
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <Container className="demo-detail-content">
//         {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

//         <Row className="mb-4">
//           <Col lg={12}>
//             <Card className="tech-card">
//               <Card.Body>
//                 <h5 className="mb-3">
//                   <i className="fas fa-layer-group me-2"></i>
//                   Technology Stack
//                 </h5>
//                 <div className="tech-stack-detail">
//                   {demo?.technologies.map((tech, index) => (
//                     <Badge key={index} bg="success" className="tech-badge-large me-2 mb-2">
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row className="mb-4">
//           <Col lg={12}>
//             <Card className="features-card">
//               <Card.Body>
//                 <h5 className="mb-3">
//                   <i className="fas fa-star me-2"></i>
//                   Key Features
//                 </h5>
//                 <Row>
//                   {demo?.features.map((feature, index) => (
//                     <Col key={index} lg={6} className="mb-2">
//                       <div className="feature-item">
//                         <i className="fas fa-check-circle text-success me-2"></i>
//                         {feature}
//                       </div>
//                     </Col>
//                   ))}
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row>
//           <Col lg={12}>
//             <Card className="details-card">
//               <Card.Body>
//                 <Tabs defaultActiveKey="overview" className="mb-3">
//                   <Tab eventKey="overview" title="Overview">
//                     {renderSpecificDetails()}
//                   </Tab>
//                   <Tab eventKey="architecture" title="Architecture">
//                     <h5 className="mb-3">System Architecture</h5>
//                     <p>This demo implements a robust, scalable architecture designed for production environments.</p>
//                     <ul>
//                       <li>Microservices-based architecture for modularity</li>
//                       <li>RESTful API design for seamless integration</li>
//                       <li>Cloud-native deployment with auto-scaling capabilities</li>
//                       <li>Real-time data processing pipeline</li>
//                       <li>Secure authentication and authorization layer</li>
//                     </ul>
//                   </Tab>
//                   <Tab eventKey="use-cases" title="Use Cases">
//                     <h5 className="mb-3">Industry Applications</h5>
//                     <p>This solution can be applied across multiple industries and scenarios:</p>
//                     <ul>
//                       <li>Enterprise-level business process automation</li>
//                       <li>Quality control and assurance workflows</li>
//                       <li>Data-driven decision making systems</li>
//                       <li>Customer experience optimization</li>
//                       <li>Operational efficiency improvements</li>
//                     </ul>
//                   </Tab>
//                   <Tab eventKey="benefits" title="Benefits">
//                     <h5 className="mb-3">Business Benefits</h5>
//                     <Row>
//                       <Col md={6}>
//                         <div className="benefit-box mb-3">
//                           <h6><i className="fas fa-chart-line me-2 text-success"></i>Increased Efficiency</h6>
//                           <p>Automate repetitive tasks and reduce manual intervention by up to 80%</p>
//                         </div>
//                       </Col>
//                       <Col md={6}>
//                         <div className="benefit-box mb-3">
//                           <h6><i className="fas fa-dollar-sign me-2 text-success"></i>Cost Reduction</h6>
//                           <p>Significantly lower operational costs through intelligent automation</p>
//                         </div>
//                       </Col>
//                       <Col md={6}>
//                         <div className="benefit-box mb-3">
//                           <h6><i className="fas fa-clock me-2 text-success"></i>Time Savings</h6>
//                           <p>Reduce processing time from hours to minutes with AI acceleration</p>
//                         </div>
//                       </Col>
//                       <Col md={6}>
//                         <div className="benefit-box mb-3">
//                           <h6><i className="fas fa-bullseye me-2 text-success"></i>Enhanced Accuracy</h6>
//                           <p>Achieve 99%+ accuracy with advanced machine learning models</p>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Tab>
//                 </Tabs>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row className="mt-4">
//           <Col className="text-center">
//             <div className="action-cta">
//               <h4>Ready to explore this solution?</h4>
//               <p className="text-muted">Launch the interactive demo to experience the capabilities firsthand</p>
//               <Button
//                 variant="success"
//                 size="lg"
//                 onClick={handleLaunchDemo}
//                 disabled={isLaunching}
//               >
//                 {isLaunching ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Launching Demo...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-rocket me-2"></i>
//                     Launch Interactive Demo
//                   </>
//                 )}
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <footer className="dashboard-footer mt-5">
//         <Container>
//           <Row>
//             <Col className="text-center">
//               <p className="mb-0">© 2025 ThirdEye Data AI Solutions. All rights reserved.</p>
//             </Col>
//           </Row>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default DemoDetail;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Card, Badge, Tabs, Tab } from 'react-bootstrap';
import Header from '../Dashboard/Header';
import { DEMOS } from '../../utils/constants';
import { Demo } from '../../types';
import BagDetectionDetails from './BagDetectionDetails';
import LoyaltyAssistantDetails from './LoyaltyAssistantDetails';
import NursingSystemDetails from './NursingSystemDetails';
import CropRecommendationDetails from './CropRecommendationDetails';
import VisionAnalyticsDetails from './VisionAnalyticsDetails';
import VegetationIndexDetails from './VegetationIndexDetails';
import GenericDemoDetails from './GenericDemoDetails';
import LoadingSpinner from '../Common/LoadingSpinner';

const DemoDetail: React.FC = () => {
  const { demoId } = useParams<{ demoId: string }>();
  const navigate = useNavigate();
  
  const [demo, setDemo] = useState<Demo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDemoDetails();
  }, [demoId]);

  const loadDemoDetails = () => {
    try {
      setIsLoading(true);
      setError('');

      setTimeout(() => {
        const foundDemo = DEMOS.find((d) => d.id === demoId);
        
        if (!foundDemo) {
          setError('Demo not found');
          setIsLoading(false);
          return;
        }

        setDemo(foundDemo);
        setIsLoading(false);
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Failed to load demo details');
      setIsLoading(false);
    }
  };

  const handleLaunchDemo = () => {
    if (!demo) {
      console.error('❌ No demo object found');
      return;
    }

    console.log('🚀 Launching demo:', demo.id);
    
    switch (demo.id) {
      // Internal React Apps
      case 'crop-recommendation':
        navigate('/demo-app/crop-recommendation');
        break;
      case 'bag-detection':
        navigate('/demo-app/bag-detection');
        break;
      case 'vegetation-index':
        navigate('/demo-app/vegetation-analysis');
        break;
      case 'vision-analytics':
        navigate('/demo-app/vision-analytics');
        break;
      
      // External Streamlit Apps
      case 'healthcare-intelligence':
        window.open(import.meta.env.VITE_HEALTHCARE_DEMO_URL || 'https://healthcare-ai-demo.streamlit.app/', '_blank');
        break;
      case 'predictive-maintenance':
        window.open(import.meta.env.VITE_PREDICTIVE_MAINTENANCE_DEMO_URL || 'https://predictive-maintenance-demo.streamlit.app/', '_blank');
        break;
      
      // Coming Soon
      case 'nursing-system':
        alert(`Interactive demo for "${demo.title}" is coming soon!`);
        break;
      case 'loyalty-assistant':
        alert(`Interactive demo for "${demo.title}" is coming soon!`);
        break;
      
      default:
        alert(`Demo for "${demo.title}" is under development.`);
    }
  };

  const isExternalDemo = () => {
    return demo && ['healthcare-intelligence', 'predictive-maintenance'].includes(demo.id);
  };

  const renderSpecificDetails = () => {
    if (!demo) return null;

    switch (demo.id) {
      case 'bag-detection':
        return <BagDetectionDetails />;
      case 'loyalty-assistant':
        return <LoyaltyAssistantDetails />;
      case 'nursing-system':
        return <NursingSystemDetails />;
      case 'crop-recommendation':
        return <CropRecommendationDetails />;
      case 'vision-analytics':
        return <VisionAnalyticsDetails />;
      case 'vegetation-index':
        return <VegetationIndexDetails />;
      default:
        return <GenericDemoDetails demo={demo} />;
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <LoadingSpinner message="Loading demo details..." fullScreen />
      </>
    );
  }

  if (error && !demo) {
    return (
      <>
        <Header />
        <Container className="mt-5">
          <Alert variant="danger">{error}</Alert>
          <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>
            <i className="fas fa-arrow-left me-2"></i>
            Back to Dashboard
          </Button>
        </Container>
      </>
    );
  }

  return (
    <div className="demo-detail-page">
      <Header />
      
      <div className="demo-detail-hero py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={1} md={2} className="text-center">
              <div className="demo-icon-large">
                {demo?.icon}
              </div>
            </Col>
            <Col lg={7} md={6}>
              <h1 className="detail-title mb-3">{demo?.title}</h1>
              <p className="detail-subtitle mb-3">{demo?.description}</p>
              <div className="d-flex gap-2 flex-wrap">
                <Badge bg="light" text="dark" className="category-badge-large">
                  {demo?.category}
                </Badge>
                {isExternalDemo() && (
                  <Badge bg="info" className="category-badge-large">
                    <i className="fas fa-external-link-alt me-1"></i>
                    External Demo
                  </Badge>
                )}
              </div>
            </Col>
            <Col lg={4} md={4}>
              <div className="action-buttons">
                <Button
                  variant="success"
                  size="lg"
                  className="launch-btn w-100 mb-3"
                  onClick={handleLaunchDemo}
                >
                  {isExternalDemo() ? (
                    <>
                      <i className="fas fa-external-link-alt me-2"></i>
                      Open Demo in New Tab
                    </>
                  ) : (
                    <>
                      <i className="fas fa-rocket me-2"></i>
                      Launch Interactive Demo
                    </>
                  )}
                </Button>
                <Button
                  variant="outline-light"
                  className="w-100"
                  onClick={() => navigate('/dashboard')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="demo-detail-content py-5">
        {isExternalDemo() && (
          <Alert variant="info" className="mb-4">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Note:</strong> This demo is hosted externally on Streamlit Cloud. 
            It will open in a new browser tab.
          </Alert>
        )}

        <Row className="mb-5">
          <Col lg={12}>
            <Card className="tech-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">
                  <i className="fas fa-layer-group me-2"></i>
                  Technology Stack
                </h5>
                <div className="tech-stack-detail">
                  {demo?.technologies.map((tech, index) => (
                    <Badge key={index} bg="success" className="tech-badge-large me-2 mb-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12}>
            <Card className="features-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">
                  <i className="fas fa-star me-2"></i>
                  Key Features
                </h5>
                <Row>
                  {demo?.features.map((feature, index) => (
                    <Col key={index} lg={6} md={6} className="mb-3">
                      <div className="feature-item">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={12}>
            <Card className="details-card">
              <Card.Body className="p-4">
                <Tabs defaultActiveKey="overview" className="mb-4 custom-tabs">
                  <Tab eventKey="overview" title={<><i className="fas fa-info-circle me-2"></i>Overview</>}>
                    <div className="tab-content-wrapper p-3">
                      {renderSpecificDetails()}
                    </div>
                  </Tab>
                  <Tab eventKey="architecture" title={<><i className="fas fa-sitemap me-2"></i>Architecture</>}>
                    <div className="tab-content-wrapper p-3">
                      <h5 className="mb-3">System Architecture</h5>
                      <p className="lead-text">This demo implements a robust, scalable architecture.</p>
                      <ul className="architecture-list">
                        <li><i className="fas fa-check text-success me-2"></i>Microservices architecture</li>
                        <li><i className="fas fa-check text-success me-2"></i>RESTful API design</li>
                        <li><i className="fas fa-check text-success me-2"></i>Cloud-native deployment</li>
                        <li><i className="fas fa-check text-success me-2"></i>Real-time processing</li>
                      </ul>
                    </div>
                  </Tab>
                  <Tab eventKey="benefits" title={<><i className="fas fa-trophy me-2"></i>Benefits</>}>
                    <div className="tab-content-wrapper p-3">
                      <h5 className="mb-4">Business Benefits</h5>
                      <Row>
                        <Col md={6} className="mb-4">
                          <div className="benefit-box">
                            <h6><i className="fas fa-chart-line me-2 text-success"></i>Increased Efficiency</h6>
                            <p>Automate tasks and reduce manual intervention by up to 80%</p>
                          </div>
                        </Col>
                        <Col md={6} className="mb-4">
                          <div className="benefit-box">
                            <h6><i className="fas fa-dollar-sign me-2 text-success"></i>Cost Reduction</h6>
                            <p>Lower operational costs through intelligent automation</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col className="text-center">
            <div className="action-cta p-5">
              <h3 className="mb-3">Ready to explore?</h3>
              <Button variant="success" size="lg" onClick={handleLaunchDemo} className="cta-button">
                {isExternalDemo() ? (
                  <>
                    <i className="fas fa-external-link-alt me-2"></i>
                    Open Demo in New Tab
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket me-2"></i>
                    Launch Demo Now
                  </>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="dashboard-footer py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0">© 2025 ThirdEye Data AI Solutions. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default DemoDetail;