/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Captcha from './Captcha';
import { APP_CONFIG } from '../../utils/constants';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('✅ Already authenticated, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!captchaVerified) {
      setError('Please complete CAPTCHA verification');
      return;
    }

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 Attempting login...');
      const result = await login({ email, password, captcha: captchaValue });
      
      console.log('📊 Login result:', result);
      
      if (result.success) {
        // Check if token was stored
        const storedToken = localStorage.getItem('auth_token');
        console.log('🔑 Token in localStorage:', storedToken ? 'EXISTS' : 'MISSING');
        
        if (storedToken) {
          setSuccess(result.message + ' - Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          setError('Login successful but token was not stored. Please try again.');
        }
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col lg={5} className="login-left-section">
            <div className="welcome-section">
              <div className="logo-container mb-4">
                <img 
                  src={APP_CONFIG.LOGO_URL} 
                  alt={`${APP_CONFIG.COMPANY_NAME} Logo`} 
                  className="company-logo"
                />
              </div>
              <h1 className="welcome-title">
                Welcome to {APP_CONFIG.COMPANY_NAME}'s<br />
                AI Solutions Demo Central
              </h1>
              <p className="welcome-description">
                Explore our comprehensive AI Solutions Demo Central featuring cutting-edge artificial 
                intelligence applications. Experience the power of machine learning, computer vision, 
                NLP, and predictive analytics designed for real-world business transformations and 
                digital innovation.
              </p>
            </div>
          </Col>
          
          <Col lg={5} className="login-right-section">
            <div className="login-form-container">
              <h2 className="login-title">USER LOGIN</h2>
              <p className="login-subtitle">Access your AI solutions portal</p>
              
              {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Captcha
                  value={captchaValue}
                  onChange={setCaptchaValue}
                  onVerify={setCaptchaVerified}
                />

                {captchaVerified && (
                  <Alert variant="success" className="captcha-success">
                    <i className="fas fa-check-circle me-2"></i>
                    CAPTCHA verified successfully!
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="login-button w-100 mt-3"
                  disabled={!captchaVerified || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Authenticating...
                    </>
                  ) : (
                    'LOGIN'
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      
      <footer className="login-footer">
        <p>© 2025 {APP_CONFIG.COMPANY_NAME} AI Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;