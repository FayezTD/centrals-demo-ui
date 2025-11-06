
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import apiService from '../../../services/apiService';
import { CropPredictionResponse } from '../../../types';
import './CropRecommendationApp.css';

const CropRecommendationApp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  
  const [result, setResult] = useState<CropPredictionResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('auth_token');
    console.log('🔍 Token check on mount:', token ? 'EXISTS' : 'MISSING');
    
    if (!token) {
      console.warn('⚠️ No token found - user may need to login again');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIncrement = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (parseFloat(prev[field as keyof typeof prev] || '0') + 1).toString()
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      // Check token before making request
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        setIsLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      console.log('🚀 Submitting prediction with token:', token.substring(0, 30) + '...');

      // Prepare API payload
      const payload = {
        N: parseFloat(formData.nitrogen),
        P: parseFloat(formData.phosphorous),
        K: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };

      console.log('📦 Payload:', payload);

      // Call the real API
      const response: CropPredictionResponse = await apiService.predictCrop(payload);
      
      console.log('✅ Prediction response:', response);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.message || 'Failed to get prediction');
      }
      
    } catch (err: any) {
      console.error('❌ Prediction error:', err);
      
      // Check if it's an auth error
      if (err.code === '401') {
        setError('Session expired. Please login again to continue.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(err.message || 'Failed to get prediction. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorous: '',
      potassium: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="crop-recommendation-app">
      {/* Header */}
      <div className="app-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col lg={2} md={3}>
              <img 
                src="https://thirdeyedata.ai/wp-content/uploads/2023/06/ThirdEye-Data-Logo.png" 
                alt="ThirdEye Data Logo" 
                className="app-logo"
              />
            </Col>
            <Col lg={8} md={6}>
              <h1 className="app-title">
                <span className="crop-icon">🌾</span>
                Smart Crop Recommendation
              </h1>
              <p className="app-subtitle">
                Welcome, {user?.email || result?.user_email || 'User'}!
              </p>
            </Col>
            <Col lg={2} md={3} className="text-end">
              <Button variant="outline-light" onClick={() => navigate('/dashboard')} size="sm">
                <i className="fas fa-home me-2"></i>
                Back to Demo Center
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="app-content">
        <Row className="justify-content-center">
          <Col xl={10} lg={11}>
            <Card className="main-card">
              <Card.Body className="p-5">
                <div className="app-banner mb-4">
                  <div className="banner-icon">
                    <img 
                      src="https://thirdeyedata.ai/wp-content/uploads/2023/06/ThirdEye-Data-Logo.png" 
                      alt="Logo"
                      style={{ height: '40px' }}
                    />
                  </div>
                  <h2 className="banner-title">
                    <span className="emoji-icon">🌱</span> Crop Suggestion Based on Soil & Climate
                  </h2>
                  <p className="banner-description">
                    Provide soil and weather parameters below to get the best crop suggestion.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* Left Column - Soil Parameters */}
                    <Col lg={6}>
                      <h5 className="form-section-title">
                        <i className="fas fa-leaf me-2"></i>
                        Soil Parameters
                      </h5>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌿</span> Nitrogen Content (N)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="nitrogen"
                            value={formData.nitrogen}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('nitrogen')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌿</span> Phosphorous Content (P)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="phosphorous"
                            value={formData.phosphorous}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('phosphorous')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌿</span> Potassium Content (K)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="potassium"
                            value={formData.potassium}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('potassium')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌊</span> pH Value of the Soil
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="ph"
                            value={formData.ph}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            max="14"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('ph')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Right Column - Weather Parameters */}
                    <Col lg={6}>
                      <h5 className="form-section-title">
                        <i className="fas fa-cloud-sun me-2"></i>
                        Weather Parameters
                      </h5>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌡️</span> Temperature (°C)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="temperature"
                            value={formData.temperature}
                            onChange={handleChange}
                            placeholder="-50.00"
                            step="0.01"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('temperature')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">💧</span> Humidity (%)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="humidity"
                            value={formData.humidity}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            max="100"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('humidity')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <span className="emoji-icon">🌧️</span> Rainfall (mm)
                        </Form.Label>
                        <div className="input-group-custom">
                          <Form.Control
                            type="number"
                            name="rainfall"
                            value={formData.rainfall}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleIncrement('rainfall')}
                            type="button"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button 
                      type="submit" 
                      className="predict-button"
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Analyzing Soil & Climate Data...
                        </>
                      ) : (
                        <>
                          <span className="emoji-icon">🌾</span> Predict the Best Crop
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary"
                      onClick={handleReset}
                      size="lg"
                      className="ms-3"
                    >
                      Reset
                    </Button>
                  </div>
                </Form>

                {/* Results */}
                {result && (
                  <div className="results-section mt-5">
                    <Card className="result-card">
                      <Card.Body className="text-center p-4">
                        <div className="result-icon mb-3">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <h3 className="result-title">Recommended Crop</h3>
                        <h2 className="result-crop">{result.crop}</h2>
                       
                        
                        <div className="parameters-used mt-4">
                          <h6 className="mb-3">
                            <i className="fas fa-info-circle me-2"></i>
                            Parameters Used for Analysis
                          </h6>
                          <Row className="text-start">
                            <Col md={6}>
                              <div className="param-item">
                                <strong>Nitrogen (N):</strong> {result.parameters.N}
                              </div>
                              <div className="param-item">
                                <strong>Phosphorous (P):</strong> {result.parameters.P}
                              </div>
                              <div className="param-item">
                                <strong>Potassium (K):</strong> {result.parameters.K}
                              </div>
                              <div className="param-item">
                                <strong>pH Level:</strong> {result.parameters.ph}
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="param-item">
                                <strong>Temperature:</strong> {result.parameters.temperature}°C
                              </div>
                              <div className="param-item">
                                <strong>Humidity:</strong> {result.parameters.humidity}%
                              </div>
                              <div className="param-item">
                                <strong>Rainfall:</strong> {result.parameters.rainfall} mm
                              </div>
                            </Col>
                          </Row>
                        </div>
                        
                        {result.user_email && (
                          <div className="user-info mt-3">
                            <small className="text-muted">
                              <i className="fas fa-user me-2"></i>
                              Prediction for: {result.user_email}
                            </small>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="app-footer">
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

export default CropRecommendationApp;